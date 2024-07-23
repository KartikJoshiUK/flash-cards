
"use server";
import { User } from "@clerk/nextjs/server";
import { prisma } from "../../lib/prisma";
import getUserData from "@/utils/converters";

export const getCategories = async (user : User | null) => {
    const userData = getUserData(user);
    if(!userData) return [];
    const entries = await prisma.user.findMany({
        where: {
            id: userData.id
        }
    })
    return entries.map(entry => entry.category)
}

export const getCards = async (user : User | null, category : string) => {
    const userData = getUserData(user);
    if(!userData) return [];
    const entries = await prisma.card.findMany({
        where: {
            uid: userData.id,
            category: category
        }
    })
    return entries;
}