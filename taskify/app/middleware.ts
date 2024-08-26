// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Get the token from the cookies
  const token = req.cookies.get('sb-access-token');

  // Check if the token is present; if not, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Optionally, you can add additional validation here, like checking the token's validity
  
  return NextResponse.next();
}

// Specify the paths you want to protect
export const config = {
  matcher: ['/dashboard'],
};
