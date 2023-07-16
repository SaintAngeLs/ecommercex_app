import clientPromise from '@/lib/mongoodb'
import NextAuth from 'next-auth'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
   
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    
  ],
   adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);