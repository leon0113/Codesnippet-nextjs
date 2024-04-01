export type IUpdateBlogType = {
    created_at: string;
    id: string;
    image_url: string;
    is_premium: boolean;
    is_publish: boolean;
    title: string;
    blog_content: {
        blog_id: string;
        content: string;
        created_at: string;
    } | null;
} | null

