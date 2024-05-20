import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const token = localStorage.get('token')

	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/settings'],
}
