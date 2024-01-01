import { useUser } from '@/lib/store/user';
import Image from 'next/image';
import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link';
import { Button } from '../ui/button';
import { DashboardIcon, LockOpen1Icon } from '@radix-ui/react-icons'
import { createBrowserClient } from '@supabase/ssr';


export default function UserProfile() {
    const user = useUser((state) => state.user);
    const setUser = useUser((state) => state.setUser);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(undefined);
    }

    const isAdmin = user?.user_metadata?.role === "admin";
    console.log(isAdmin);

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Image
                        src={user?.user_metadata.avatar_url}
                        alt="user-image"
                        width={50}
                        height={50}
                        className='rounded-full ring-2 ring-violet-600'
                    />
                </PopoverTrigger>
                <PopoverContent className='flex flex-col items-center p-2 space-y-3'>
                    <div className='flex flex-col items-center px-4 text-sm '>
                        <p>{user?.user_metadata?.name}</p>
                        <p className='text-gray-500'>{user?.user_metadata?.email}</p>
                    </div>
                    {isAdmin ? <Link href='/dashboard' className='block'>
                        <Button>
                            DashBoard
                            <DashboardIcon className='ml-2' />
                        </Button>
                    </Link> : ""}
                    <Button
                        variant='ghost'
                        className='border'
                        onClick={handleLogout}
                    >
                        Logout
                        <LockOpen1Icon className='ml-2' />
                    </Button>
                </PopoverContent>
            </Popover>
        </>
    )
}
