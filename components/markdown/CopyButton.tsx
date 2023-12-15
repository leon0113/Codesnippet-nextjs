'use client'
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { BsCopy } from 'react-icons/bs'
import { IoCheckmarkOutline } from 'react-icons/io5'

export default function CopyButton({ id }: { id: string }) {

    const [onCopy, setOnCopy] = useState(false);
    const [onDone, setOnDone] = useState(false);

    const handleCopy = async () => {
        const text = document.getElementById(id)?.textContent;

        try {
            await navigator.clipboard.writeText(text!)
            setOnCopy(true);
        } catch {
            console.log("Error while copying");
        }
    }

    return (
        <div onClick={handleCopy} className='p-2 hover:scale-105 cursor-pointer hover:bg-zinc-700 rounded-md relative'>
            {/* when we copy something  */}
            <IoCheckmarkOutline
                className={cn("cursor-pointer transition-all w-5 h-5 text-violet-500", onDone ? "scale-100" : "scale-0")}
                onTransitionEnd={() => {
                    setTimeout(() => {
                        setOnCopy(false);
                        setOnDone(false);
                    }, 500)
                }}
            />

            {/* copy button  */}
            <div className='h-full w-full absolute top-0 left-0 flex items-center justify-center'>
                <BsCopy
                    className={cn("transition-all", onCopy ? 'scale-0' : "scale-100")}
                    onTransitionEnd={() => {
                        if (onCopy) {
                            setOnDone(true);
                        }
                    }}
                />
            </div>
        </div>
    )
}
