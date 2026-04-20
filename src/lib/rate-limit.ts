import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env, hasRedis } from "./env";

type Result = { success: boolean; remaining: number; reset: number };

type Entry = { count: number; resetAt: number };

class MemoryLimiter {
  private map = new Map<string, Entry>();
  constructor(
    private readonly limit: number,
    private readonly windowMs: number
  ) {}

  check(key: string): Result {
    const now = Date.now();
    const cur = this.map.get(key);
    if (!cur || cur.resetAt < now) {
      this.map.set(key, { count: 1, resetAt: now + this.windowMs });
      return { success: true, remaining: this.limit - 1, reset: now + this.windowMs };
    }
    if (cur.count >= this.limit) {
      return { success: false, remaining: 0, reset: cur.resetAt };
    }
    cur.count += 1;
    return { success: true, remaining: this.limit - cur.count, reset: cur.resetAt };
  }
}

let redis: Redis | null = null;
function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      url: env.UPSTASH_REDIS_REST_URL!,
      token: env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return redis;
}

const memoryLimiters = new Map<string, MemoryLimiter>();
const redisLimiters = new Map<string, Ratelimit>();

let warnedNoRedis = false;

export function getLimiter(
  name: string,
  limit: number,
  windowSeconds: number
) {
  if (hasRedis) {
    let rl = redisLimiters.get(name);
    if (!rl) {
      rl = new Ratelimit({
        redis: getRedis(),
        limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
        analytics: false,
        prefix: `rl:${name}`,
      });
      redisLimiters.set(name, rl);
    }
    return {
      async check(key: string): Promise<Result> {
        const r = await rl!.limit(key);
        return { success: r.success, remaining: r.remaining, reset: r.reset };
      },
    };
  }

  if (!warnedNoRedis) {
    console.warn(
      "[rate-limit] UPSTASH_REDIS_* not set — falling back to in-memory limiter (per-instance, resets on deploy)"
    );
    warnedNoRedis = true;
  }

  let ml = memoryLimiters.get(name);
  if (!ml) {
    ml = new MemoryLimiter(limit, windowSeconds * 1000);
    memoryLimiters.set(name, ml);
  }
  return {
    async check(key: string): Promise<Result> {
      return ml!.check(key);
    },
  };
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const ip = fwd.split(",")[0]?.trim();
    if (ip) return ip;
  }
  return req.headers.get("x-real-ip") || "unknown";
}
