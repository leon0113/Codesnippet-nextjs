'use client'

import Link from 'next/link';
import React from 'react';
import { useUser } from '@/lib/store/user';
import UserProfile from './UserProfile';
import LoginButton from './LoginForm.jsx';

export default function Navbar() {
    const user = useUser((state) => state.user);
    // console.log(user);
    return (
        <nav className='flex items-center justify-between'>
            {/* logo  */}
            <div className='group'>
                <Link href='/' className='text-2xl font-bold'>Code<span className='text-violet-600'>Snippet</span></Link>
                <div className='h-1 w-0 group-hover:w-full transition-all bg-violet-500'></div>
            </div>

            {/* login  */}
            {user ? <UserProfile /> : <LoginButton />}

        </nav>
    )
}
