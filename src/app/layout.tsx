
import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import Header from './_home/Header'
import Footer from './_home/Footer'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlashCardFlow',
  description: 'Master the Art of Words, One Flashcard at a Time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className='min-h-screen flex flex-col'>
          <Header/>
          <div className='flex-1 flex flex-col'>{children}</div>
          <Footer/>
          <aside id='modal' className='z-50'/>
        </body>
      </html>
    </ClerkProvider>
  )
}