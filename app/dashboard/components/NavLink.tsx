'use client'
import { cn } from "@/lib/utils"
import { ReaderIcon, PersonIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function NavLink() {

    const pathName = usePathname()

    const links = [
        {
            href: '/dashboard',
            text: "Dashboard",
            Icon: ReaderIcon
        },
        {
            href: '/dashboard/user',
            text: "Users",
            Icon: PersonIcon
        },
    ]
    return (
        <div className="flex items-center gap-5 border-b pb-2">
            {
                links.map(({ href, text, Icon }, index) => {
                    return <Link key={index} href={href}
                        className={cn("flex items-center gap-1 hover:underline transition-all", { "text-violet-500 underline": pathName === href })}>
                        <Icon />
                        {text}
                    </Link>
                })
            }
        </div>
    )
}
