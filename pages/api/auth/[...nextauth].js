import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorizationUrl:
    //     'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    //   profile(profile) {
    //     return {
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //     };
    //   },
    //   session: {
    //     jwt: {
    //       encryption: true,
    //     },
    //     secret: 'secret token',
    //     callbacks: {
    //       async jwt(token, account) {
    //         if (account?.accessToken) {
    //           token.accessToken = account.accessToken;
    //         }
    //         return token;
    //       },
    //       redirect: async (url, _baseUrl) => {
    //         if (url === '/') {
    //           return Promise.resolve('/');
    //         }
    //         return Promise.resolve('/');
    //       },
    //     },
    //   },
    //   database: process.env.DATABASE_URL,
    // }),
    CredentialsProvider({
      async authorize(req) {
        const admin = await prisma.user.findUnique({
          where: {
            username: req.email,
          },
        });
        if (admin) {
          if (
            req.username === admin.username &&
            req.password === admin.password
          ) {
            return admin;
          } else {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        username: token.name,
      };
      return session;
    },
  },
  pages: {
    signIn: '/Login',
  },
});
