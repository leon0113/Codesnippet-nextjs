import * as z from "zod";

export const BlogFormSchema = z
    .object({
        title: z.string().min(2, {
            message: "title is too short",
        }),
        content: z.string().min(10, {
            message: "Content is too short",
        }),
        image: z.string().url({
            message: "Invalid url",
        }),
        is_premium: z.boolean(),
        is_publish: z.boolean(),
    })
    .refine(
        (data) => {
            const image_url = data.image;
            try {
                const url = new URL(image_url);
                return url.hostname === "images.unsplash.com";
            } catch {
                return false;
            }
        },
        {
            message: "Currently we are supporting only the image from unsplash",
            path: ["image_url"],
        }
    );

export type BlogFormSchemaType = z.infer<typeof BlogFormSchema>;