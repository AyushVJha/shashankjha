import { timingSafeEqual } from "node:crypto";
import { env } from "./env";

function decodeBasicAuth(authorization: string | null | undefined): string | null {
  if (!authorization?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = Buffer.from(authorization.slice(6), "base64").toString("utf8");
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) {
      return null;
    }
    return decoded.slice(separatorIndex + 1);
  } catch {
    return null;
  }
}

function safeEqual(candidate: string | null | undefined, expected: string | null | undefined): boolean {
  if (!candidate || !expected) {
    return false;
  }

  const candidateBuffer = Buffer.from(candidate);
  const expectedBuffer = Buffer.from(expected);
  if (candidateBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidateBuffer, expectedBuffer);
}

export function getAdminAccess(input: {
  authorization?: string | null;
  token?: string | null;
}) {
  const queryToken = input.token?.trim() || null;
  const basicPassword = decodeBasicAuth(input.authorization);

  const authorized =
    safeEqual(queryToken, env.ADMIN_TOKEN) || safeEqual(basicPassword, env.ADMIN_TOKEN);

  return {
    authorized,
    queryToken: safeEqual(queryToken, env.ADMIN_TOKEN) ? queryToken : null,
  };
}

export function unauthorizedAdminResponse() {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="The Chambers of SSJ Admin"',
    },
  });
}

export function withAdminToken(path: string, token: string | null) {
  if (!token) {
    return path;
  }

  const url = new URL(path, env.NEXT_PUBLIC_SITE_URL);
  url.searchParams.set("token", token);
  return `${url.pathname}${url.search}`;
}

export function safeAdminRedirectPath(
  candidate: FormDataEntryValue | null | undefined,
  fallbackPath: string,
  token: string | null
) {
  const value = typeof candidate === "string" ? candidate : "";
  const relativePath = value.startsWith("/") ? value : fallbackPath;
  return withAdminToken(relativePath, token);
}
