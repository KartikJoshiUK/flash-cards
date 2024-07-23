"use server";
import { LocalCard } from "@/types";
import { prisma } from "../../lib/prisma";

export const createNewCard = async (card : LocalCard) => {
    
  await prisma.card.create({
    data: {
      uid: card.uid,
      category: card.category,
      title: card.title,
      description: card.description,
      imageUrl: card.imageUrl,
      colorCode : card.colorCode,
      hint : card.hint,
      type : card.type
    },
  });
};
