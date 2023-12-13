import Link from 'next/link'
import React from 'react'
import LoginForm from './LoginForm.jsx'

export default function Navbar() {
    return (
        <nav className='flex items-center justify-between'>
            {/* logo  */}
            <div className='group'>
                <Link href='/' className='text-2xl font-bold'>Text<span className='text-violet-600'>Shorts</span></Link>
                <div className='h-1 w-0 group-hover:w-full transition-all bg-violet-500'></div>
            </div>

            {/* login  */}
            <LoginForm />

        </nav>
    )
}
