import React from 'react'
import Actions from './_components/Actions'
import Cards from './_components/Cards'

export default function page( { params }: { params: { category: string } }) {
  return (
    <div>
        <Actions category={params.category}/>
        <Cards category={params.category}/>
    </div>
  )
}