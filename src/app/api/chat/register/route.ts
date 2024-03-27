import { NextRequest, NextResponse } from 'next/server';

import { signIn } from '@/app/api/auth/next-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log({ email, password });

    if (!email || !password) {
      return NextResponse.json({ error: 'Email or password is missing' }, { status: 400 });
    }

    const result = await signIn('register', {
      redirect: false,
      email,
      password,
    });

    console.log(result);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    } else {
      return NextResponse.json({ message: 'registed in successfully' });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
