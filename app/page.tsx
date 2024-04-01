import { readBlogsOnHome } from "@/lib/actions/blog"
import Image from "next/image";
import Link from "next/link";


export default async function Home() {

  const { data: blogs } = await readBlogsOnHome();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0">

      {
        blogs?.map((blog, index) => {
          return (
            <Link
              href={"/blog/" + blog.id}
              key={index}
              className="w-full border rounded-md bg-graident-dark p-5 hover:ring-2 ring-violet-500 transition-all cursor-pointer first:lg:col-span-2 first:md:col-span-3"
            >
              {/* image container  */}
              <div className="relative w-full h-72 md:h-64 xl:h-96">
                <Image
                  priority
                  src={blog.image_url}
                  alt="blog_image"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 33vw"
                />
              </div>

              {/* content container */}
              <div className="mt-2 space-y-2">
                {/* publish date */}
                <p className="text-sm text-gray-500">{new Date(blog.created_at).toDateString()}</p>

                {/* bog title */}
                <h1 className="text-xl font-bold">{blog.title}</h1>

              </div>
            </Link>
          )
        })
      }
    </div>

  )
}
