'use client';

import { Button } from '../ui/button'
import { FaGithub } from "react-icons/fa";
import { createBrowserClient } from '@supabase/ssr'
import { usePathname } from 'next/navigation';



export default function LoginForm() {

    const pathName = usePathname();
    // console.log(pathName);
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
        <Button onClick={handleLogin} className='flex text-red-500 items-center gap-2'>
            <FaGithub />
            Login
        </Button>
    )
}
