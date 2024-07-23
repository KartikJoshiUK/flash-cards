"use server";
import {LocalCard} from '../../types'
import {prisma} from '../../lib/prisma'
export const editCard = async (card: LocalCard, id : number) => {
    return await prisma.card.update({
        where: { id : id },
        data: card,
    });
}