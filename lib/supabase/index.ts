'use server'
import { createServerClient } from '@supabase/ssr';
import { Database } from './../types/supabase';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function CreateSupabaseServer() {
    const cookieStore = cookies();

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                }
            }
        }
    );

}

export type { Database };

export async function createSupabaseAdmin() {
    return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE!, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}
