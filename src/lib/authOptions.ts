import { NextAuthOptions, User } from 'next-auth';
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

        // Check credentials here...    ---> Find user in database. Return null if invalid.
        // if the user cannot auntheticate with the credentials = null
        // if (credentials?.email == null|| credentials?.password == null) {
        //     return null;
        // }
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
        // if (user.password !== credentials.password) {
        //     return null;
        // }

        return { _id: user._id } as User;
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
  pages: {
    signIn: '/auth/signin',
  }
};