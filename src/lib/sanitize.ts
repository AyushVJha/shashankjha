const TAG_RE = /<\/?[a-z][^>]*>/gi;
const CONTROL_RE = /[\u0000-\u001F\u007F]/g;

export function stripHtml(input: string): string {
  return input.replace(TAG_RE, "");
}

export function normalizeWhitespace(input: string): string {
  return input.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n");
}

export function sanitizeText(input: string): string {
  return normalizeWhitespace(stripHtml(input).replace(CONTROL_RE, "")).trim();
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
