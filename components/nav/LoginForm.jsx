'use client';

import { Button } from '../ui/button'
import { FaGithub } from "react-icons/fa";
import { createBrowserClient } from '@supabase/ssr'
import { usePathname } from 'next/navigation';



export default function LoginButton() {

    const pathName = usePathname();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const handleLogin = () => {
        supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: location.origin + "/auth/callback?next" + pathName
            }
        })
    }

    return (
        <>
            <Button variant='outline' onClick={handleLogin} className='flex items-center gap-2'>
                <FaGithub />
                Login
            </Button>
        </>
    )
}
