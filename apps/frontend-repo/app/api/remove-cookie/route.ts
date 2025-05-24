import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH() {
  (await cookies()).delete('idToken');
  (await cookies()).delete('name');
  return NextResponse.json({ message: 'Token removed from cookie' });
}
