import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { getCards } from '@/app/actions/getDetails'
import Card from '@/app/card/[id]/_components/Card'

type Props = {
    category: string
}

export default async function Cards({category}: Props) {
    const cards = await getCards(await currentUser(), category)
    
  return (
    <div className='flex p-6 gap-4 flex-wrap justify-center'>
        {cards?.map((card) => (
          <Card card={card} key={card.id} editable/>
        ))}
    </div>
  )
}