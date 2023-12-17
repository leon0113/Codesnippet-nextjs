'use client'
import BlogForm from '@/app/dashboard/components/BlogForm'
import { IUpdateBlogType } from '@/lib/types/updateBlogType'
import { toast } from '@/components/ui/use-toast';
// import { updateBlog } from '@/lib/actions/blog';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function EditForm({ blog }: { blog: IUpdateBlogType }) {
    // const router = useRouter();

    // const handleUpdate = async (data: IUpdateBlogType) => {
    //     // console.log("create blog page", data);
    //     const result = await updateBlog(data);
    //     const { error } = JSON.parse(result);
    //     // console.log(result);
    //     if (error?.message) {

    //         toast({
    //             title: "Failed to update blog",
    //             description: (
    //                 <pre className="mt-2 w-full rounded-md bg-slate-950 p-0 text-xs">
    //                     <code className="text-white">
    //                         {error.message}
    //                     </code>
    //                 </pre>
    //             ),
    //         })

    //     } else {

    //         toast({
    //             // title: "Blog successfully update: " + data.title
    //         })
    //         router.push('/dashboard')
    //     }

    // }

    return (
        <BlogForm onHandleSubmit={() => { }} blog={blog} />
    )
}
