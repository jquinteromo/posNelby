
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");


  const USER = process.env.AUTH_USER;
  const PASS = process.env.AUTH_PASS;

  const basicAuth = authHeader?.split(" ")[1];
  if (basicAuth) {
    const [user, password] = atob(basicAuth).split(":");


    if (user === USER && password === PASS) {
      return NextResponse.next();
    }
  }

 
  return new Response("Authentication Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="Secure Area"`,
    },
  });
}


export const config = {
  matcher: ["/"],
};

