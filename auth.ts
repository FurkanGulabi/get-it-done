import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/db";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, getUserById } from "./data/user";
import LoginFormSchema from "./schemas/LoginFormSchema";
import bcryptjs from "bcryptjs";
import { Role } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  /* TODO: Add logo to the auth  
  theme:{
    logo:"/logo.png"
  }, */
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcryptjs.compare(password, user.password);

          if (passwordMatch) {
            return {
              id: user.id,
              name: user.name ?? undefined, // Convert null to undefined
              surname: user.surname ?? undefined, // Convert null to undefined
              email: user.email,
              emailVerified: user.emailVerified ?? undefined, // Convert null to undefined
              image: user.image ?? undefined, // Convert null to undefined
              role: user.role as Role, // Make sure the role is typed correctly
              createdAt: user.createdAt, // Pass the createdAt field
              updatedAt: user.updatedAt, // Pass the updatedAt field
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.surname = token.surname; // Attach surname to session.user
        session.user.role = token.role; // Attach role to session.user
        session.user.createdAt = token.createdAt; // Attach createdAt to session.user
        session.user.updatedAt = token.updatedAt; // Attach updatedAt to session.user
        session.user.emailVerified = token.emailVerified; // Attach emailVerified to session.user
      }
      return session;
    },

    async jwt({ token, user }) {
      // When user signs in, store additional data in the token
      if (user) {
        token.sub = user.id; // Store user ID in the JWT
        token.email = user.email;

        // Fetch additional fields like role, surname, createdAt, etc.
        const existingUser = await getUserById(user.id);

        if (existingUser) {
          token.surname = existingUser.surname; // Store surname in the JWT
          token.role = existingUser.role; // Store the user's role in the JWT
          token.createdAt = existingUser.createdAt; // Store createdAt in the JWT
          token.updatedAt = existingUser.updatedAt; // Store updatedAt in the JWT
          token.emailVerified = existingUser.emailVerified; // Store emailVerified in the JWT
        }
      }

      return token;
    },
  },
});
