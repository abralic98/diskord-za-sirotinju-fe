import routes from "@/lib/routes";
import { cookies } from "next/headers";

import { NextResponse, type NextRequest } from "next/server";
import { LocalStorageKeys } from "./helpers/LocalStorage";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const kuki = await cookies();
  const token = kuki.get(LocalStorageKeys.TOKEN);
  console.log(token, "token middleware");
  if (pathname.startsWith(routes.dashboard)) {
    if (!token) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }
  }
}
