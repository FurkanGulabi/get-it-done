"use server";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/db";
import RegisterFormSchema from "@/schemas/RegisterFormSchema";
import bcryptjs from "bcryptjs";
import { z } from "zod";

const Register = async (formData: z.infer<typeof RegisterFormSchema>) => {
  try {
    const validatedFields = RegisterFormSchema.safeParse(formData);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const { name, surname, email, password } = validatedFields.data;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use" };
    }

    await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error during registration:", error);
    return { error: "Something went wrong" };
  }
};

export { Register };
