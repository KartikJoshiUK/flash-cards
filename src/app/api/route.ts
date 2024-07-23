// pages/api/getUser.js (Server-side function to fetch Clerk user details)
import { getAuth } from '@clerk/nextjs/server';
// import { Clerk } from '@clerk/clerk-sdk-node';

// const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

export default async function GET() {
  const { userId } = getAuth(Request.arguments);
  if (!userId) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return Response.json({ message: userId }, { status: 200 });
  // try {
  //   const user = await clerk.users.getUser(userId);
  //   res.status(200).json(user);
  // } catch (error) {
  //   console.error('Error fetching user details:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
}
