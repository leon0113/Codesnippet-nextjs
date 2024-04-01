import React from 'react'

export default function Footer() {
    return (
        <footer className="border-t border-black/5 py-5 mt-auto flex flex-col">
            <small>A personal blog application for <a href="https://github.com/leon0113" target='_blank' className='font-bold hover:opacity-50'>Tahjib Hossain Leon</a></small>
            <small className="opacity-50 mt-5">
                &copy; {new Date().getFullYear()} <a href="https://github.com/leon0113" target='_blank'><span className='font-bold text-base text-violet-500 opacity-100 hover:text-violet-600'>leon0113</span></a>. All rights reserved.
            </small>
        </footer>
    )
}
