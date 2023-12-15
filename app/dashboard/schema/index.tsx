import { z } from "zod";

//! ______________________________________-Form Schema-_____________________________________________________
export const FormSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    image: z.string().url({
        message: "Invalid image URL",
    }),
    content: z.string().min(10, {
        message: "Title must be at least 10 characters.",
    }),
    isPublish: z.boolean(),
    isPremium: z.boolean(),
}).refine((data) => {
    const image = data.image;

    try {

        const url = new URL(image);
        return url.hostname === "images.unsplash.com"

    } catch {
        return false
    }
},
    {
        message: "Currently we support image url from unplash only",
        path: ["image"]
    }
)


export type blogFormSchemaType = z.infer<typeof FormSchema>