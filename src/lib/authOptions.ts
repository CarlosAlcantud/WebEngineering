import { NextAuthOptions, User } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import connect from '@/lib/mongoose';
import Users from '@/models/User';
import bcrypt from 'bcrypt';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'E-mail address',
          type: 'email',
          placeholder: 'jsmith@jsmith.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        await connect();

        // Check credentials here...
        if (!credentials?.email || !credentials?.password) {
            return null;
        }

       const user = await Users.findOne({email: credentials.email})
        if (user === null) {
        return null
        }

        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) {
            return null;
        }

        return { _id: "ID_HERE" } as User;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user._id = token._id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
      }
      return token;
    },
  },
};