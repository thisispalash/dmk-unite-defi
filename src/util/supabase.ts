import { createClient } from '@supabase/supabase-js';

// These should be in your .env.local file
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client for browser usage (public)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for server-side operations (protected)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type MonkeyUser = {
  id: string;
  username: string;
  sw_address: string;
}

// @dev this is a backend function, password should already be hashed!
export async function registerUser(username: string, password: string) {

  const { data, error } = await supabaseAdmin
    .from('monkey_copy_user')
    .insert({ username, password })
    .select();

  if (error?.code === '23505') {
    return {
      success: false,
      message: 'Username already exists',
      data: null,
    }
  }

  if (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    }
  }
  
  return {
    success: true,
    message: 'User registered successfully',
    data
  }
}

// @dev this is a backend function, password should already be hashed!
export async function loginUser(username: string, password: string) {

  const { data, error } = await supabaseAdmin
    .from('monkey_copy_user')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  
  if (error?.code === 'PGRST116') {
    return {
      success: false,
      message: 'Invalid username or password',
      data: null,
    }
  }

  if (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    }
  }

  return {
    success: true,
    message: 'Login successful',
    data
  }
}