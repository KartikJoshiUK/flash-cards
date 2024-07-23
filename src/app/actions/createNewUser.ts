"use server";
import { prisma } from "../../lib/prisma";

export const createNewUser = async (cUserId: string) => {
  return await prisma.user.create({
    data: {
      id: cUserId,
    },
  });
};
