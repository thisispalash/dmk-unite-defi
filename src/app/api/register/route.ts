import { NextRequest, NextResponse } from 'next/server';

import { registerUser } from '@/util/supabase';

export async function POST(request: NextRequest) {

  // @dev password should already be hashed!
  const { username, password } = await request.json();

  const { success, message, data } = await registerUser(username, password);

  return NextResponse.json({ success, message, data });
}