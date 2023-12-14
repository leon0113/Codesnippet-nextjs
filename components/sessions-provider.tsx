'use client'

import { createBrowserClient } from "@supabase/ssr";
import { useEffect } from "react"
import { useUser } from '../lib/store/user'

export default function SessionsProvider() {
    const setUser = useUser((state) => state.setUser)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const readUserSession = async () => {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user)
    }

    useEffect(() => {
        readUserSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>

        </>
    )
}
