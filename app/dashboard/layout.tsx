import React, { ReactNode } from 'react'
import NavLink from './components/NavLink'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className='space-y-5'>
            <NavLink />
            {children}
        </div>
    )
}
