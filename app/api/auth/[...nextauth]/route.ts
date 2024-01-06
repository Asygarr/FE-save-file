import { axiosInstance } from "@/libs/axios-instance";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const res = await axiosInstance.post("/auth/login", credentials);

        const user = res.data.data;

        if (res.status === 200 && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }: any) {
      if ("id" in token) {
        session.user = token.id;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
