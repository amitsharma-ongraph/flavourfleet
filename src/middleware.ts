// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const requestUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/verification/role`;

    const res = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    if (data.role === "Restaurant") {
      return NextResponse.redirect(new URL("/restaurant", request.url));
    } else if (data.role === "Admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    } else if (data.role === "User") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/restaurant-menu/:path*",
    "/search/:path*",
  ],
};
