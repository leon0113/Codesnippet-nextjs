'use client'
import React from 'react'
import BlogForm from '../../components/BlogForm'
import { BlogFormSchemaType } from '../../schema'
import { toast } from '@/components/ui/use-toast'
import { createBlog } from '../../../../lib/actions/blog'
import { useRouter } from 'next/navigation'

export default function CreateBlog() {

    const router = useRouter();

    const handleCreate = async (data: BlogFormSchemaType) => {
        // console.log("create blog page", data);
        const result = await createBlog(data);
        const { error } = JSON.parse(result);
        // console.log(result);
        if (error?.message) {

            toast({
                title: "Failed to create blog",
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
                title: "Blog successfully created: " + data.title
            })
            router.push('/dashboard')
        }

    }

    return (
        <BlogForm onHandleSubmit={handleCreate} />
    )
}
