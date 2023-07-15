import Footer from '@/components/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Mangement System',
  description: 'it is a task management system,for stamurai',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (

    <html lang="en">
      <body className={`${inter.className} flex flex-col justify-between min-h-screen`}>

        <main>
          <h1 className='py-3 bg-blue-200 text-center text-3xl font-semibold px-5'>
            Task Management System
          </h1>
          {children}
        </main>

        <Footer></Footer>
        
      </body>
    </html>


  )
}

export default RootLayout;