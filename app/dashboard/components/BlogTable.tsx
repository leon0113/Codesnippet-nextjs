import { Button } from '@/components/ui/button'
import { EyeOpenIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { readBlogs, updateSwitchFormFromDb } from '@/lib/actions/blog'
import DeleteAlert from './DeleteAlert'
import SwitchForm from './SwitchForm'
import { BlogFormSchemaType } from '../schema'
import Link from 'next/link'


export default async function BlogTable() {

    const { data: blogs } = await readBlogs()

    return (
        <div className='overflow-x-auto'>
            <div className='border bg-graident-dark rounded-md w-[900px] md:w-full'>
                {/* table header  */}
                <div className='grid grid-cols-6 p-5 text-gray-500 border-b'>
                    <h1 className='col-span-2'>Title</h1>
                    <h1>Premium</h1>
                    <h1>Publish</h1>
                </div>
                {/* table content  */}
                {
                    blogs?.map((blog) => {

                        const updatePremium = updateSwitchFormFromDb.bind(null, blog.id, { is_premium: !blog.is_premium } as unknown as BlogFormSchemaType)
                        const updatePublish = updateSwitchFormFromDb.bind(null, blog.id, { is_publish: !blog.is_publish } as unknown as BlogFormSchemaType)

                        return (<div key={blog.id} className='grid grid-cols-6 p-5'>
                            <h1 className='col-span-2'>{blog.title}</h1>
                            <SwitchForm checked={blog.is_premium} name='Premium' onToggle={updatePremium} />
                            <SwitchForm checked={blog.is_publish} name='Publish' onToggle={updatePublish} />
                            <BlogActions blogId={blog.id} blogTitle={blog.title} />
                        </div>)
                    })
                }

            </div>
        </div>
    )
}

const BlogActions = ({ blogId, blogTitle }: { blogId: string, blogTitle: string }) => {
    return (
        <div className='flex items-center gap-2'>
            {/* view button  */}
            <Link href={"/blog/" + blogId}>
                <Button variant='outline' className='flex items-center gap-2'>
                    <EyeOpenIcon />
                    View
                </Button>
            </Link>
            {/* delete action */}
            <DeleteAlert blogId={blogId} blogTitle={blogTitle} />
            {/* edit button  */}
            <Link href={'/dashboard/blog/edit/' + blogId}>
                <Button variant='outline' className='flex items-center gap-2'>
                    <Pencil1Icon />
                    Edit
                </Button>
            </Link>
        </div>
    )
} 