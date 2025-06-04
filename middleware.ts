import routes from "@/lib/routes";
import { cookies } from "next/headers";

import { NextResponse, type NextRequest } from "next/server";
import { CookieKeys } from "./helpers/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookiestore = await cookies();
  const token = cookiestore.get(CookieKeys.TOKEN);
  if (pathname.startsWith(routes.dashboard)) {
    if (!token) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }
  }
  if (pathname.startsWith(routes.settings)) {
    if (!token) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }
  }
}
