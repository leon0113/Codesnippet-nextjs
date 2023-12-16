'use client'

import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast";


export default function SwitchForm({ checked, onToggle, name }: { checked: boolean, onToggle: () => Promise<string>, name: string }) {

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const { error } = JSON.parse(await onToggle());

        if (error?.message) {

            toast({
                title: "Failed to updated " + name,
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-0 text-xs">
                        <code className="text-white">
                            {error.message}
                        </code>
                    </pre>
                ),
            })

        } else {

            toast({
                title: "Blog successfully updated " + name
            })
        }
    }




    return (
        <form onSubmit={onSubmit}>
            <Switch checked={checked} type='submit' />
        </form>
    )
}
