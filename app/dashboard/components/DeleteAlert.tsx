'use client'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import React, { useTransition } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteBlogFromDb } from '@/lib/actions/blog'
import { toast } from '@/components/ui/use-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { cn } from '@/lib/utils'

export default function DeleteAlert({ blogId, blogTitle }: { blogId: string, blogTitle: string }) {

    const [isPending, startTransition] = useTransition();

    const deleteBlog = async (e: { preventDefault: () => void }) => {


        startTransition(async () => {
            const result = await deleteBlogFromDb(blogId);

            const { error } = JSON.parse(result);

            if (error?.message) {

                toast({
                    title: "Failed to Delete blog",
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
                    title: "Blog successfully Deleted: " + blogTitle
                })
            }
        })
    }

    return (

        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='outline' className='flex items-center gap-2'>
                    <TrashIcon />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete blog {blogTitle}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        blog and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteBlog} className='hover:bg-red-600 flex items-center gap-2'>
                        <AiOutlineLoading3Quarters className={cn("animate-spin", { "hidden": !isPending })} />
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    )
}
