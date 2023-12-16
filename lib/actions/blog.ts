"use server"

import { blogFormSchemaType } from './../../app/dashboard/schema/index';
import { createServerClient } from '@supabase/ssr';
import { Database } from './../types/supabase';
import { cookies } from "next/headers"
import { revalidatePath } from 'next/cache';

const cookieStore = cookies();

const DASHBOARD = '/dashboard';

const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value
            }
        }
    }
);


//! ----------------------Create Blog to db Function--------------------------------------------
export async function createBlog(data: blogFormSchemaType) {

    // console.log("data", data);
    const { ["content"]: excludedKey, ...blogs } = data;
    const resultBlog = await supabase.from("blogs").insert(blogs).select("id").single();
    // console.log(resultBlog);
    if (resultBlog.error) {
        return JSON.stringify(resultBlog);
    } else {

        const resultBlogContent = await supabase.from("blog_content").insert({ blog_id: resultBlog.data.id!, content: data.content });

        return JSON.stringify(resultBlogContent);
    }

}


//! ----------------------Read Blogs from db Function--------------------------------------------
export async function readBlogs() {
    return supabase.from("blogs").select("*").order("created_at", { ascending: true })
}


//! ----------------------Delete Blog from db Function--------------------------------------------
export async function deleteBlogFromDb(blogId: string) {
    const result = await supabase.from("blogs").delete().eq("id", blogId);
    revalidatePath(DASHBOARD);
    return JSON.stringify(result);
}
