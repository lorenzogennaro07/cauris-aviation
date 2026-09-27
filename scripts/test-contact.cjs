const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const compile = file => ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const validation = {};
new Function('exports', compile('src/lib/contact.ts'))(validation);
function setup(env = {}, provider = async () => Response.json({ id: 'test-email-id' })) {
  const exported = {}, calls = [], logs = [];
  new Function('exports', 'require', 'process', 'fetch', 'console', compile('src/app/api/contact/route.ts'))(
    exported, () => validation, { env }, async (...args) => { calls.push(args); return provider(...args); },
    { error: (...args) => logs.push(args), info: (...args) => logs.push(args) });
  return { post: exported.POST, calls, logs };
}
const valid = { name: 'Technical test', email: 'test@example.com', phone: '+39 000', type: 'general', message: 'Test message', website: '', locale: 'it' };
const configured = { RESEND_API_KEY: 'test-only-not-a-real-key', CONTACT_FROM_EMAIL: 'test@example.com' };
const request = (payload, headers = {}, raw = false) => new Request('https://www.caurisaviation.com/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://www.caurisaviation.com', ...headers }, body: raw ? payload : JSON.stringify(payload) });
test('rejects invalid fields and honeypot before calling the provider', async () => {
  for (const changes of [{ name: ' ' }, { email: 'bad' }, { message: '' }, { type: 'booking' }, { website: 'bot' }, { name: 'x'.repeat(121) }, { message: 'x'.repeat(5001) }, { phone: 'x'.repeat(41) }, { locale: 'xx' }]) {
    const t = setup(configured); assert.equal((await t.post(request({ ...valid, ...changes }))).status, 400); assert.equal(t.calls.length, 0);
  }
});
test('rejects malformed JSON, wrong content type, oversized body and foreign origin', async () => {
  for (const [req, status] of [[request('{', {}, true), 400], [request(valid, { 'Content-Type': 'text/plain' }), 415], [request({ ...valid, message: 'x'.repeat(25000) }), 413], [request(valid, { Origin: 'https://other.example' }), 403]]) {
    const t = setup(configured); assert.equal((await t.post(req)).status, status); assert.equal(t.calls.length, 0);
  }
});
test('missing or blank server configuration returns 503 without exposing secrets', async () => {
  for (const env of [{}, { RESEND_API_KEY: 'secret' }, { ...configured, RESEND_API_KEY: '  ' }, { ...configured, CONTACT_FROM_EMAIL: '  ' }]) {
    const t = setup(env); const res = await t.post(request(valid)); assert.equal(res.status, 503); assert.deepEqual(await res.json(), { ok: false }); assert.equal(t.calls.length, 0); assert(!JSON.stringify(t.logs).includes('secret'));
  }
});
test('provider acceptance sends all fields, fixed recipient and Reply-To; IT and EN', async () => {
  for (const locale of ['it', 'en']) {
    const t = setup(configured); const res = await t.post(request({ ...valid, locale })); assert.equal(res.status, 200); assert.deepEqual(await res.json(), { ok: true });
    assert.equal(t.calls.length, 1); const [url, opts] = t.calls[0]; const email = JSON.parse(opts.body);
    assert.equal(url, 'https://api.resend.com/emails'); assert.deepEqual(email.to, ['info@caurisaviation.com']); assert.equal(email.reply_to, valid.email); assert.equal(email.from, configured.CONTACT_FROM_EMAIL);
    for (const value of [valid.name, valid.email, valid.phone, valid.message]) assert(email.text.includes(value));
    assert(JSON.stringify(t.logs).includes('test-email-id')); for (const secret of [valid.message, valid.email, configured.RESEND_API_KEY]) assert(!JSON.stringify(t.logs).includes(secret));
  }
});
test('phone may be omitted', async () => {
  const t = setup(configured); const payload = { ...valid }; delete payload.phone; assert.equal((await t.post(request(payload))).status, 200); assert(!JSON.parse(t.calls[0][1].body).text.includes('Telefono:'));
});
test('provider errors never become success; safe diagnostic codes only', async () => {
  for (const status of [401, 403, 422, 429, 500]) {
    const t = setup(configured, async () => Response.json({ name: 'validation_error', message: 'private-provider-detail' }, { status }));
    const res = await t.post(request(valid)); assert.equal(res.status, 502); assert.deepEqual(await res.json(), { ok: false }); assert(!JSON.stringify(t.logs).includes('private-provider-detail')); assert(JSON.stringify(t.logs).includes(String(status)));
  }
});
test('malformed successful responses are rejected', async () => {
  for (const result of [null, {}, { id: '' }, { id: ' ' }, { id: {} }]) { const t = setup(configured, async () => Response.json(result)); assert.equal((await t.post(request(valid))).status, 502); }
  const t = setup(configured, async () => new Response('not JSON')); assert.equal((await t.post(request(valid))).status, 502);
});
test('network failures and timeouts remain errors', async () => {
  for (const name of ['TypeError', 'TimeoutError', 'AbortError']) {
    const t = setup(configured, async () => { const error = new Error('private detail'); error.name = name; throw error; });
    const res = await t.post(request(valid)); assert.equal(res.status, 502); assert.deepEqual(await res.json(), { ok: false }); assert(!JSON.stringify(t.logs).includes('private detail'));
  }
});
