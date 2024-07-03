import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenName } from "utils/configUtils";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/") {
    url.pathname = `${getTokenName()}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/", `/${getTokenName()}`],
};
