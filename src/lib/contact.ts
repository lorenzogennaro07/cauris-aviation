export const enquiryTypes = ["general", "private", "hospitality", "partnerships", "other"] as const;
export const limits = { name: 120, email: 254, phone: 40, message: 5000 };
export type ContactData = { name: string; email: string; phone: string; type: string; message: string; website: string; locale: "it" | "en" };
export type ContactErrors = Partial<Record<keyof typeof limits | "type", string>>;
export function validateContact(value: unknown): { data?: ContactData; errors: ContactErrors } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { errors: { message: "invalid" } };
  const v = { phone: "", website: "", ...value } as Record<string, unknown>;
  const errors: ContactErrors = {};
  for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
    if (typeof v[key] !== "string" || (v[key] as string).length > limits[key] || (key !== "phone" && !(v[key] as string).trim())) errors[key] = "invalid";
  }
  if (typeof v.email === "string" && (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v.email.trim()) || /[\r\n]/.test(v.email))) errors.email = "invalid";
  if (!enquiryTypes.includes(v.type as typeof enquiryTypes[number])) errors.type = "invalid";
  if (typeof v.website !== "string" || v.website.length > 200 || !["it", "en"].includes(v.locale as string)) errors.message = "invalid";
  if (Object.keys(errors).length) return { errors };
  return { errors, data: { name: (v.name as string).trim(), email: (v.email as string).trim(), phone: (v.phone as string).trim(), message: (v.message as string).trim(), type: v.type as string, website: (v.website as string).trim(), locale: v.locale as "it" | "en" } };
}
