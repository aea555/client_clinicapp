import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CustomJwtPayload } from "types/Jwt.type";

export default function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const clientIp = req.headers.get("x-forwarded-for") || req.ip || req.headers.get("remote-addr");

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/logout") {
    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  if (
    !token &&
    !["/auth/login", "/auth/register"].includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token.value);
      const userId = decoded.nameid;
      const role = decoded.role.toLowerCase();

      if (req.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
      }

      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        const pathParts = req.nextUrl.pathname.split('/');
        const pathUserId = pathParts[3]; // Extracting the user ID from the URL
        const rolePath = pathParts[2]; // Extracting the role from the URL

        // Check if the user is on the wrong dashboard
        if (userId !== pathUserId || rolePath !== role) {
          return NextResponse.redirect(new URL(`/dashboard/${role}/${userId}`, req.url));
        }
      }

      if (req.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL(`/dashboard/${role}/${userId}`, req.url));
      }

    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}
