import sharp from 'sharp';

// Traditional, hand-traced photographic alpha matte. No generated pixels.
// Coordinates refer to a 1200px-wide preview of Alec Wilson's original.
// Photo and this adaptation: CC BY-SA 2.0. See docs/fonti-media.md.
const root = 'public/images/hero/';
const paths = [
  // Airframe, including vertical and horizontal stabilisers.
  'M84 287 L160 279 Q174 280 171 270 L143 202 L124 195 L118 169 Q134 164 155 166 L243 283 L493 287 Q500 268 524 267 L548 269 L589 257 L592 241 L645 231 L643 222 L678 219 L700 226 Q744 226 764 244 L810 272 L858 277 Q893 285 918 308 L960 349 Q989 363 1038 377 Q1046 383 1035 390 Q1007 402 958 409 L792 416 L650 413 L590 407 L577 411 L556 405 Q458 396 385 363 L300 331 L264 340 L252 352 L237 354 L250 329 L220 315 L168 308 L85 290 Z',
  // Main rotor mast and hub.
  'M676 227 L677 211 L664 210 L659 204 L669 198 L679 199 L688 193 L711 192 L724 199 L741 201 L745 211 L732 216 L710 214 L708 226 Z',
  // Four complete rotor blades (the original motion blur is retained).
  'M674 203 L617 196 L281 152 L281 155 L617 199 L672 209 Z',
  'M693 199 L737 161 L781 107 L819 104 L823 107 L768 171 L719 204 Z',
  'M728 206 Q898 215 1103 209 L1119 207 L1134 210 L1130 214 L1100 219 Q893 224 741 215 Z',
  'M690 211 L652 226 L594 239 L590 247 L650 237 L706 220 Z',
  // Landing gear and wheels.
  'M620 409 L621 426 L630 437 L633 453 L642 454 L642 434 L652 428 L658 413 Z',
  'M938 405 L934 425 L939 432 L936 442 L945 442 L948 428 L952 409 Z',
  'M588 406 L589 421 L603 427 L615 427 L616 422 L600 418 L602 410 Z',
];
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2305" height="1031" viewBox="0 0 1200 536.75"><g fill="white">${paths.map(d=>`<path d="${d}"/>`).join('')}<ellipse cx="632" cy="457" rx="13" ry="16"/><ellipse cx="651" cy="432" rx="11" ry="11"/><ellipse cx="943" cy="440" rx="10" ry="12"/></g><g fill="none" stroke="white" stroke-width="2"><path d="M260 334 Q170 398 117 384"/><path d="M849 277 L849 273"/></g><g fill="white" opacity=".65"><path d="M164 278 L109 239 L112 224 L132 233 L172 272 Z"/><path d="M173 290 L212 334 L213 343 L199 337 L165 298 Z"/></g></svg>`;
const mask = await sharp(Buffer.from(svg)).blur(0.65).png().toBuffer();
const cutout = await sharp(root+'helicopter-original.jpg').composite([{input:mask,blend:'dest-in'}]).png().toBuffer();
await sharp(cutout).extract({left:135,top:180,width:2050,height:745})
  .webp({quality:94,alphaQuality:100}).toFile(root+'helicopter.webp');
// Crop the real orbital photograph to Sicily, the northern coast and Aeolian chain.
const m=await sharp(root+'sicily-iss-original.jpg').metadata();
await sharp(root+'sicily-iss-original.jpg')
  .extract({left:Math.round(m.width*.10),top:Math.round(m.height*.43),width:Math.round(m.width*.52),height:Math.round(m.height*.55)})
  .resize({width:2600,withoutEnlargement:true}).webp({quality:90}).toFile(root+'sicily-aeolian.webp');
console.log('Hero photographs prepared.');

