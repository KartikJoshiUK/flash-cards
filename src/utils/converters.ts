import { User } from "@clerk/nextjs/server";


export default function getUserData(user : User | null){
    if(user == null) return null;
    return {
        id: user.id,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddresses: user.emailAddresses[0].emailAddress
    }
}