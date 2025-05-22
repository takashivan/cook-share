import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS;

// 認証をかけたいドメイン（例: 本番）
const protectedDomains = ["chefdom.jp", "www.chefdom.jp"];

export function middleware(req: NextRequest) {
  // 本番環境でのみ認証をかける
  if (process.env.VERCEL_ENV !== "production") {
    return NextResponse.next();
  }

  const hostname = req.headers.get("host") || "";

  const isProtected = protectedDomains.includes(hostname);

  if (!isProtected) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic") {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (user === BASIC_AUTH_USER && pass === BASIC_AUTH_PASS) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("認証が必要です", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
