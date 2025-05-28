import { NextResponse, type NextRequest } from "next/server";
import routes from "@/lib/routes";
import { CookieKeys } from "./helpers/cookies";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(CookieKeys.TOKEN)?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL(routes.login, request.url));
  }

  const protectedRoutes = [routes.dashboard, routes.settings, routes.profile];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) {
    return NextResponse.next(); // allow unprotected routes
  }

  try {
    const response = await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { meQuery { id } }`,
      }),
    });

    const result = await response.json();
    const isValid = result?.data?.meQuery?.id;

    if (isValid) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }
  } catch (error) {
    console.error("Token validation error in middleware:", error);
    return NextResponse.redirect(new URL(routes.login, request.url));
  }
}
