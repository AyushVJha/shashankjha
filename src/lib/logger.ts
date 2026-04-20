import { maskEmail, maskPhone } from "./mask";

type Level = "info" | "warn" | "error";

function fmt(level: Level, msg: string, meta?: Record<string, unknown>) {
  const safe = meta ? sanitizeMeta(meta) : undefined;
  const payload = { ts: new Date().toISOString(), level, msg, ...safe };
  const line = JSON.stringify(payload);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

function sanitizeMeta(meta: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(meta)) {
    if (typeof v === "string" && /email/i.test(k)) out[k] = maskEmail(v);
    else if (typeof v === "string" && /phone/i.test(k)) out[k] = maskPhone(v);
    else if (k === "message" || k === "body") out[k] = `[redacted:${typeof v === "string" ? v.length : 0}ch]`;
    else out[k] = v;
  }
  return out;
}

export const log = {
  info: (msg: string, meta?: Record<string, unknown>) => fmt("info", msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => fmt("warn", msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => fmt("error", msg, meta),
};
