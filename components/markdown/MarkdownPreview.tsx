/* eslint-disable react/jsx-no-comment-textnodes */
import { cn } from '@/lib/utils';
import React from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.min.css'
import { PiTerminal } from 'react-icons/pi'
import CopyButton from './CopyButton';
import { icons } from '../../lib/icons/index'
import Image from 'next/image';

export default function MarkdownPreview({ content, className }: { content: string; className?: string }) {
    return (
        <Markdown
            className={cn("space-y-6", className)}
            rehypePlugins={[rehypeHighlight]}
            components={{
                h1: ({ node, ...props }) => {
                    return <h1 {...props} className='text-3xl font-bold' />
                },
                h2: ({ node, ...props }) => {
                    return <h2 {...props} className='text-2xl font-bold' />
                },
                h3: ({ node, ...props }) => {
                    return <h3 {...props} className='text-xl font-bold text-gray-400' />
                },
                h4: ({ node, ...props }) => {
                    return <h4 {...props} className='text-xs ' />
                },
                p: ({ node, ...props }) => {
                    return <p {...props} className='text-sm' />
                },
                // img: ({ node, ...props }) => {
                //     return <Image src {...props} className='text-sm' alt='image' />
                // },
                code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    // console.log(match);
                    // setting icons
                    if (match?.length) {
                        let Icon = PiTerminal;

                        const isMatch = icons.hasOwnProperty(match[1]);
                        if (isMatch) {
                            Icon = icons[match[1] as keyof typeof icons];
                        }

                        //  generate random id
                        const id = (Math.floor(Math.random() * 100) + 1).toString();


                        return <div className='bg-graident-dark text-gray-300 border rounded-md'>
                            {/* for language icon & copy btn  */}
                            <div className='flex items-center justify-between px-5 py-2 border-b-2'>
                                <div className='flex items-center gap-2'>
                                    <Icon />
                                    <span>
                                        {
                                            //@ts-ignore
                                            node?.data?.meta
                                        }
                                    </span>
                                </div>
                                <CopyButton id={id} />
                            </div>
                            {/* code content  */}
                            <div className='overflow-x-auto w-full'>
                                <div className='p-5' id={id}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    } else {
                        return <code className='bg-gray-700 rounded-md px-2'>{children}</code>
                    }

                }
            }}>
            {content}
        </Markdown>
    )
}
