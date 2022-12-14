/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { get } from './lib/redis';

export default async function middleware(req: NextRequest) {
	const token = await getToken({ req });
	const url = req.nextUrl.pathname;

	if (url === '/auth') {
		if (!token) return NextResponse.next();
		else req.nextUrl.pathname = '/';
		return NextResponse.redirect(req.nextUrl);
	}

	if (token) {
		if (url === '/pro') {
			const data = await get(token?.email as string);
			if (!data?.stripeId) {
				req.nextUrl.pathname = '/';
				return NextResponse.redirect(req.nextUrl);
			}
		}
		return NextResponse.next();
	} else req.nextUrl.pathname = '/auth';
	return NextResponse.rewrite(req.nextUrl);
}

export const config = {
	matcher: ['/', '/auth', '/pro'],
};
