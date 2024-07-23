import React from "react";
import { prisma } from "../../lib/prisma";
import getUserData from "@/utils/converters";
import { currentUser } from "@clerk/nextjs";
import Card from "../card/[id]/_components/Card";

type Props = {};

export default async function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
    if(searchParams?.categories === undefined) return <div>page1</div>;
  const categories = searchParams.categories.split(",");
  const user = getUserData(await currentUser());
  
  const cards = await prisma.card.findMany({
    where: {
      category: {
        in: categories
      },
      uid : user?.id
    }
  })
  
  return <div className="flex items-center gap-4 p-6 flex-wrap justify-center">
    {cards.map((card) => (
        <Card key={card.id} card={card}/>
    ))}
  </div>;
}
