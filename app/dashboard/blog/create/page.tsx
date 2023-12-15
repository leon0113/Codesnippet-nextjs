"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { EyeOpenIcon, Pencil1Icon, RocketIcon, StarIcon } from "@radix-ui/react-icons"
import { Switch } from "@/components/ui/switch"
import { BsSave } from 'react-icons/bs';
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import MarkdownPreview from "@/components/markdown/MarkdownPreview"


//! ______________________________________-Form Schema-_____________________________________________________
const FormSchema = z.object({
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


//! ______________________________________-Form component-_____________________________________________________
export default function BlogForm() {

  const [isPreview, setIsPreview] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      image: "",
      content: "",
      isPremium: false,
      isPublish: true,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border rounded-md space-y-6 pb-10">

        {/*------------------------ action buttons----------------------------------  */}
        <div className="p-5 flex items-center gap-2 flex-wrap justify-between border-b">

          {/* preview button  */}
          <div className="flex gap-5 items-center flex-wrap">
            <span role="button" tabIndex={0} className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md hover:ring-2 hover:ring-violet-500 transition-all"
              onClick={() => setIsPreview(!isPreview && !form.getFieldState("image").invalid)}
            >
              {
                isPreview ? (
                  <>
                    <Pencil1Icon />
                    Edit
                  </>
                ) : (
                  <>
                    <EyeOpenIcon />
                    Preview
                  </>
                )
              }
            </span>

            {/* premium button  */}
            <FormField
              control={form.control}
              name="isPremium"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md hover:ring-2 hover:ring-violet-500 transition-all">
                      <StarIcon />
                      <span>Premium</span>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* publish button  */}
            <FormField
              control={form.control}
              name="isPublish"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md hover:ring-2 hover:ring-violet-500 transition-all">
                      <RocketIcon />
                      <span>Publish</span>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {/* save button  */}
          <Button className="flex items-center gap-2" disabled={!form.formState.isValid}>
            <BsSave />
            Save
          </Button>

        </div>


        {/*!!! =---------------------------create blog header form-----------------------------------=  */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <div className={cn("p-2 w-full flex break-words gap-2", isPreview ? 'divide-x-0' : "divide-x")}>
                  {/* input field  */}
                  <Input placeholder="Title" {...field} className={cn("border-none text-lg font-medium leading-relaxed", isPreview ? "w-0 p-0" : "w-full lg:w-1/2")} />
                  {/* preview field  */}
                  <div className={cn("lg:px-10", isPreview ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                    <h1 className="text-2xl font-medium">{form.getValues().title}</h1>
                  </div>
                </div>

              </FormControl>
              {form.getFieldState("title").invalid && form.getValues().title && <FormMessage />}

            </FormItem>
          )}
        />

        {/* -------------------------- Image url field  */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <div className={cn("p-2 w-full flex break-words gap-2", isPreview ? 'divide-x-0' : "divide-x")}>
                  {/* input field  */}
                  <Input placeholder="Unplash image url" {...field} className={cn("border-none text-lg font-medium leading-relaxed", isPreview ? "w-0 p-0" : "w-full lg:w-1/2")} />
                  {/* preview field  */}
                  <div className={cn("lg:px-10", isPreview ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>
                    {
                      !isPreview ? <><p>Click on preview to see image</p></> : <div className="relative h-80 mt-5">
                        <Image src={form.getValues().image} alt='image' fill className="object-cover object-center rounded-md" />
                      </div>
                    }
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("image").invalid && form.getValues().image &&
                <div className="">
                  <FormMessage />
                </div>}

            </FormItem>
          )}
        />

        {/*--------------------------------------- blog text  */}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <div className={cn("p-2 w-full flex break-words gap-2", isPreview ? 'divide-x-0' : "divide-x h-70vh")}>

                  <Textarea placeholder="Write details" {...field} className={cn("border-none text-lg font-medium leading-relaxed resize-none h-full", isPreview ? "w-0 p-0" : "w-full lg:w-1/2")} />

                  <div className={cn("overflow-y-auto", isPreview ? "mx-auto w-full lg:w-4/5" : "w-1/2 lg:block hidden")}>

                    <MarkdownPreview content={form.getValues().content} />

                  </div>
                </div>
              </FormControl>
              {form.getFieldState("title").invalid && form.getValues().content && <FormMessage />}

            </FormItem>
          )}
        />

      </form>
    </Form>
  )
}

