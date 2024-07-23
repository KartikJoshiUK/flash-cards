import React from 'react'
import Actions from './_components/Actions'
import Categories from './_components/Categories'
import { currentUser } from '@clerk/nextjs/server'
import { getCategories } from '../actions/getDetails'
type Props = {}

export default async function page({}: Props) {
  const categories = await getCategories(await currentUser())
  return (
    <div>
        <Actions categories={categories}/>
        <Categories categories={categories}/>
    </div>
  )
}