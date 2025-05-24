import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = body.token;
  const name = body.name;

  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 });
  }

  (await cookies()).set('idToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 55 // 55 minutes
  });

  (await cookies()).set('name', name, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 55 // 55 minutes
  });

  return NextResponse.json({ message: 'Token stored in cookie' });
}
