import React from "react";
import { prisma } from "../../../lib/prisma";
import { currentUser } from "@clerk/nextjs";
import getUserData from "../../../utils/converters";
import Card from "./_components/Card";
export default async function page({ params }: { params: { id: string } }) {
  if (!Number.isInteger(parseInt(params.id))) return <div>Card not found</div>;
  const cUser = getUserData(await currentUser())!;
  const card = await prisma.card.findUnique({
    where: {
      id: parseInt(params.id),
      uid : cUser.id
    },
  });
  if (!card) return <div>Card not found</div>;
  return (
    <div className="flex flex-1 items-center justify-center ">
      <Card card={card}/>
    </div>
  );
}
