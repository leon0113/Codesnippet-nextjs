import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from '@/components/nav/Navbar';
import SessionsProvider from '@/components/sessions-provider';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/footer/Footer';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodeSnippet - A Blog Site for leon0113',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className='max-w-7xl mx-auto p-10 space-y-5'>
            <Navbar />
            {children}
            {/* <Footer /> */}
          </main>
        </ThemeProvider>
        <Toaster />
        <SessionsProvider />
      </body>
    </html>
  )
}
