"use server";
import { prisma } from "../../lib/prisma";

export const createNewCategory = async (category: string, cUserId: string) => {
    category = category.trim().toLowerCase();
    
  await prisma.user.create({
    data: {
      id: cUserId,
      category : category
    }
  })
};
