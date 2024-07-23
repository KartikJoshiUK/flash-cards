import React from 'react'
import Link from 'next/link'

type Props = {
    categories : string[]
}

export default async function Categories({categories}: Props) {
    
    
  return (
    <div className='flex p-6 flex-wrap gap-4 justify-center'>
        {categories?.map((category) => (
            <Link href={`/dashboard/${category}`} className='min-w-52 text-xl bg-gray-200 p-4 rounded-md hover:bg-gray-100 transition-colors capitalize text-center hover:shadow-xl' key={category}>{category}</Link>
        ))}
    </div>
  )
}