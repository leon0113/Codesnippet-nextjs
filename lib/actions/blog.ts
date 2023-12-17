"use server"

import { BlogFormSchemaType } from './../../app/dashboard/schema/index';
import { createServerClient } from '@supabase/ssr';
import { Database } from './../types/supabase';
import { cookies } from "next/headers"
import { revalidatePath } from 'next/cache';
import { CreateSupabaseServer } from '../supabase'
import { IUpdateBlogType } from '../types/updateBlogType';


const DASHBOARD = '/dashboard';

// //! ----------------------Create Blog to db Function--------------------------------------------
export async function createBlog(data: BlogFormSchemaType) {
    const supabase = await CreateSupabaseServer();

    const { ["content"]: excludedKey, ...blogs } = data;
    const resultBlog = await supabase.from("blogs").insert(blogs).select("id").single();

    if (resultBlog.error) {
        return JSON.stringify(resultBlog);
    } else {

        const resultBlogContent = await supabase.from("blog_content").insert({ blog_id: resultBlog.data.id!, content: data.content });
        revalidatePath(DASHBOARD);
        return JSON.stringify(resultBlogContent);
    }

}


// //! ----------------------Read Blogs from db Function--------------------------------------------
export async function readBlogs() {
    const supabase = await CreateSupabaseServer();

    return supabase.from("blogs").select("*").order("created_at", { ascending: true })
}


// //! ----------------------Delete Blog from db Function--------------------------------------------
export async function deleteBlogFromDb(blogId: string) {
    const supabase = await CreateSupabaseServer();

    const result = await supabase.from("blogs").delete().eq("id", blogId);
    revalidatePath(DASHBOARD);
    revalidatePath("/blog/" + blogId);
    return JSON.stringify(result);
}


// //! ----------------------Update switchForm from db Function--------------------------------------------
export async function updateSwitchFormFromDb(blogId: string, data: BlogFormSchemaType) {
    const supabase = await CreateSupabaseServer();

    const result = await supabase.from("blogs").update(data).eq("id", blogId);
    revalidatePath(DASHBOARD);
    revalidatePath("/blog/" + blogId);
    return JSON.stringify(result);
}


//! ----------------------Read Blogs for EDIT from db Function--------------------------------------------
export async function editBlogsById(blogId: string) {
    const supabase = await CreateSupabaseServer();

    return supabase.from("blogs").select("*, blog_content(*)").eq("id", blogId).single();
}

//! ----------------------Update Blog from db Function--------------------------------------------
export async function updateBlogFormFromDb(blogId: string, data: BlogFormSchemaType) {
    const supabase = await CreateSupabaseServer();
    const { ["content"]: excludedKey, ...blogs } = data;

    const resultBlog = await supabase.from("blogs").update(blogs).eq("id", blogId);

    if (resultBlog.error) {
        return JSON.stringify(resultBlog);
    } else {
        const resultBlog = await supabase.from("blog_content").update({ content: data.content }).eq("blog_id", blogId);
        revalidatePath(DASHBOARD);
        revalidatePath("/blog/" + blogId);
        return JSON.stringify(resultBlog);
    }

}


// //! ----------------------Read Blogs from db Function--------------------------------------------
export async function readBlogsOnHome() {
    const supabase = await CreateSupabaseServer();

    return supabase.from("blogs").select("*").eq("is_publish", true).order("created_at", { ascending: true })
}