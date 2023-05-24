import { GetServerSidePropsContext } from "next";
import { DefaultSession, NextAuthOptions, Session } from "next-auth";
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      employee_firstname: string;
      employee_lastname: string;
      role: string;
      status: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    employee_firstname: string;
    employee_lastname: string;
    role: string;
    status: string;
    data: any;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const user = token.data;

      if (session) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.employee_firstname = user.employee_firstname;
        session.user.employee_lastname = user.employee_lastname;
        session.user.role = user.role;
        session.user.status = user.status;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.data = user;
      }

      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/admins/authenticate`,
          {
            email: credentials?.email,
            password: credentials?.password,
          }
        );

        let user = response.data.data || null;

        if (!user) throw new Error(response.data.message);

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
  },
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
};

export default NextAuth(authOptions);

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
