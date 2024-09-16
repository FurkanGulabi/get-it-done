import { UserRole } from "@prisma/client";
import { type DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      surname?: string;
      emailVerified?: Date | null; // Include emailVerified (can be null if not verified)
      role: UserRole; // Role from Prisma schema
      createdAt: Date; // Created at timestamp
      updatedAt: Date; // Updated at timestamp
    } & DefaultUser;
  }

  interface User extends DefaultUser {
    surname?: string;
    emailVerified?: Date | null; // Include emailVerified (nullable)
    role: UserRole; // Role from Prisma schema
    createdAt: Date; // Created at timestamp
    updatedAt: Date; // Updated at timestamp
  }
}

// ExtendedUser type including additional fields
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  surname?: string;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
