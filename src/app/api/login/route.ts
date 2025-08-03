import { NextRequest, NextResponse } from 'next/server';

import { loginUser } from '@/util/supabase';

export async function POST(request: NextRequest) {

  // @dev password should already be hashed!
  const { username, password } = await request.json();

  const { success, message, data } = await loginUser(username, password);

  return NextResponse.json({ success, message, data });
}