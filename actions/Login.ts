"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import LoginFormSchema from "@/schemas/LoginFormSchema";
import { AuthError } from "next-auth";
import { z } from "zod";

const Login = async (values: z.infer<typeof LoginFormSchema>) => {
  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went Wrong" };
      }
    }
    throw error;
  }
};

export { Login };
