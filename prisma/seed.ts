// This file is just for seeding local db

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main(){
    const user = await prisma.user.upsert({
        where: {
            id: '1'
        },
        update: {},
        create: {
            id: 'Jane Doe',
            categories: ['jane@doe'],
        },
    })
    console.log(user)
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})