export function maskEmail(email: string | null | undefined): string {
  if (!email) return "[none]";
  const at = email.indexOf("@");
  if (at < 0) return "[invalid]";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const keep = local.slice(0, Math.min(2, local.length));
  return `${keep}${"*".repeat(Math.max(1, local.length - keep.length))}@${domain}`;
}

export function maskPhone(phone: string | null | undefined): string {
  if (!phone) return "[none]";
  if (phone.length <= 4) return "*".repeat(phone.length);
  return `${phone.slice(0, 3)}${"*".repeat(phone.length - 6)}${phone.slice(-3)}`;
}
