import Image from "next/image"
import BlogContent from "./component/BlogContent";


export default async function SingleBlog({ params }: { params: { id: string } }) {

    const { data: blog } = await fetch(process.env.SITE_URL + "/api/blog?id=" + params.id).then(res => res.json());

    if (!blog?.id) {
        return <div>Blog Not Found</div>
    }

    return (
        <div className="max-w-5xl mx-auto min-h-screen pt-10 space-y-10">
            {/* ----------------header-and-time----------------  */}
            <div className="space-y-5 sm:px-10">
                <h1 className="text-3xl font-bold">{blog.title}</h1>
                <p className="text-sm text-gray-500">{new Date(blog.created_at).toDateString()}</p>
            </div>
            {/* ----------------blog-image------------------------  */}
            <div className="relative w-full h-72 md:h-64 xl:h-96">
                <Image
                    priority
                    src={blog.image_url}
                    alt="blog_image"
                    fill
                    className="object-cover object-center border rounded"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 33vw"
                />
            </div>
            <BlogContent blogId={blog.id} />
        </div>
    )
}
