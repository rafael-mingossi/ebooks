import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import GoogleProvider from 'next-auth/providers/google';

// const authHandler = (req, res) => NextAuth(req, res, options);
// export default authHandler;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      profile(profile) {
        return {
          // Return all the profile information you need.
          // The only truly required field is `id`
          // to be able identify the account when added to a database
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      session: {
        jwt: {
          encryption: true,
        },
        secret: 'secret token',
        callbacks: {
          async jwt(token, account) {
            if (account?.accessToken) {
              token.accessToken = account.accessToken;
            }
            return token;
          },
          redirect: async (url, _baseUrl) => {
            if (url === '/') {
              return Promise.resolve('/');
            }
            return Promise.resolve('/');
          },
        },
      },
      database: process.env.DATABASE_URL,
    }),
  ],
  //adapter: PrismaAdapter(prisma),
});
