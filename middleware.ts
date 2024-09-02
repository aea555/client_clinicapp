import authMiddleware from './middlewares/authMiddleware';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  return authMiddleware(req);
}

export const config = {
  matcher:'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};