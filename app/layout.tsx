import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/ui/navbar'
import Footer from '@/app/ui/footer'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | pichabay',
    default: 'pichabay',
  },
  description: 'Simple pixabay client app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
          <Navbar />
          <Suspense>{children}</Suspense>
          <Footer />
        </div>
      </body>
    </html>
  )
}
