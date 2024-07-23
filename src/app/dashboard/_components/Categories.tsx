import React from 'react'
import Link from 'next/link'

type Props = {
    categories : string[]
}

export default async function Categories({categories}: Props) {
    
    
  return (
    <div className='flex p-6 flex-col gap-4'>
        {categories?.map((category) => (
            <Link href={`/dashboard/${category}`} className='text-xl bg-gray-100 p-4 rounded-md hover:bg-gray-50 transition-colors capitalize text-center' key={category}>{category}</Link>
        ))}
    </div>
  )
}