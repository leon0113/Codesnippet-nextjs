import { editBlogsById } from "@/lib/actions/blog"
import EditForm from "../components/EditForm"


export default async function EditBlog({ params }: { params: { id: string } }) {

    const { data: blog } = await editBlogsById(params.id)

    return (
        <EditForm blog={blog} />
    )
}
