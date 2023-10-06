import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getApp } from "@/lib/firebase-admin";

const app = getApp();

const handler = NextAuth({
  // debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        idToken: {},
      },
      async authorize(credentials, req) {
        // console.log({ credentials });
        const idToken = credentials?.idToken;
        if (!idToken) {
          return null;
        }

        const decoded = await app.auth().verifyIdToken(idToken);
        // console.log("decoded", decoded);

        return { id: decoded.sub, ...decoded };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account, profile }) {
      // console.log("jwt", { token, user, account, profile });

      if (user) {
        token.id = user.id;
      }

      return { ...token, ...user };
    },
  },
});

export { handler as GET, handler as POST };
