'use client';

import { createBrowserClient } from '@supabase/ssr';
import { usePathname } from 'next/navigation';
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from '../ui/button';



export default function LoginButton() {

    const pathName = usePathname();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const handleLogin = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: location.origin + "/auth/callback?next" + pathName
            }
        })
    }

    return (
        <>
            <Button variant='outline' onClick={handleLogin} className='flex items-center gap-2'>
                <FaGoogle />
                {/* Login */}
            </Button>
        </>
    )
}
