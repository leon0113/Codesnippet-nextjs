'use client'

import { createBrowserClient } from "@supabase/ssr";
import { Database } from '@/lib/types/supabase';
import { useEffect, useState } from "react";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";

export default function BlogContent({ blogId }: { blogId: string }) {

    const [blogContent, setBlogContent] = useState<{
        blog_id: string;
        content: string;
        created_at: string;
    } | null>(null);

    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const readBlogContent = async () => {
        const { data } = await supabase.from("blog_content").select("*").eq("blog_id", blogId).single();
        setBlogContent(data);
    }

    useEffect(() => {
        readBlogContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(BlogContent);
    return (
        <MarkdownPreview className="sm:px-10" content={blogContent?.content || ""} />
    )
}
