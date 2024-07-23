import React from 'react'
import Link from 'next/link';
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';

type Props = {}

export default async function Home({}: Props) {
  
  return (
    <div className='flex-1 flex relative max-h-[calc(100vh-128px)]'>
      <video className='flex-1 object-cover' autoPlay muted loop src="/banner-video.mp4"/>
      <div className='absolute top-0 left-0 w-full h-full bg-black/50 text-white flex items-center justify-center flex-col p-6 text-center gap-4'>
      <h1 className='text-3xl font-bold md:text-5xl'>Welcome to FlashCardFlow</h1>
      <p className='text-gray-100 md:text-2xl'>Master the Art of Words, One Flashcard at a Time: Your Journey to Fluent Learning Begins Here</p>
      <SignedOut>
        <SignIn/>
      </SignedOut>
      <SignedIn>
      <Link className='bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors hover:shadow-md font-semibold md:text-xl' href={'/dashboard'}>Get Started</Link>
      </SignedIn>
      </div>
    </div>
  )
}