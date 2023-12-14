'use client'

import Link from 'next/link';
import React from 'react';
import { useUser } from '@/lib/store/user';
import UserProfile from './UserProfile';
import LoginButton from './LoginForm.jsx';

export default function Navbar() {
    const user = useUser((state) => state.user);
    return (
        <nav className='flex items-center justify-between'>
            {/* logo  */}
            <div className='group'>
                <Link href='/' className='text-2xl font-bold'>Text<span className='text-violet-600'>Shorts</span></Link>
                <div className='h-1 w-0 group-hover:w-full transition-all bg-violet-500'></div>
            </div>

            {/* login  */}
            {user ? <UserProfile /> : <LoginButton />}

        </nav>
    )
}
