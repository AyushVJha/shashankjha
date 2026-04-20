import { NextResponse, type NextRequest } from "next/server";
import { nanoid } from "nanoid";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (
    host === "www.shashankjha.in" &&
    process.env.NODE_ENV === "production"
  ) {
    const url = new URL(request.url);
    url.host = "shashankjha.in";
    return NextResponse.redirect(url, 308);
  }

  const requestId = request.headers.get("x-request-id") || nanoid(12);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", requestId);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("x-request-id", requestId);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)"],
};
