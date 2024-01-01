import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import { useUser } from '@/lib/store/user'
import LoginForm from '../nav/LoginForm'
import { checkOut } from '@/lib/actions/stripe'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { loadStripe } from '@stripe/stripe-js'

export default function Checkout() {
    const pathName = usePathname();

    const [isPending, startTransition] = useTransition();

    const user = useUser((state) => state.user);

    if (!user?.id) {
        return (
            <div className='flex flex-col gap-5 items-center h-96 w-full justify-center'>
                <h1 className=' text-2xl font-bold text-violet-700'>Please login first</h1>
                <LoginForm />
            </div>
        )
    }

    //!------------ stripe
    const handleCheckOut = (e: any) => {
        e.preventDefault();

        startTransition(async () => {
            const data = JSON.parse(await checkOut(user?.user_metadata?.email!, location.origin + pathName));
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

            await stripe?.redirectToCheckout({ sessionId: data.id })
        })

    }

    return (
        <form className={cn('h-96 w-full flex items-center justify-center', { "animate-pulse": isPending })} onSubmit={handleCheckOut}>
            <Button variant="ghost" className='flex flex-col p-10 gap-5 ring-2 ring-violet-500 bg-graident-dark'>
                <span className='flex items-center gap-4 text-2xl font-bold text-violet-700'>
                    <LightningBoltIcon className={cn('w-5 h-5', !isPending ? "animate-bounce" : "animate-spin")} />
                    Upgrade to Pro
                </span>
                <span>Unlock Blog Content</span>
            </Button>
        </form>
    )
}
