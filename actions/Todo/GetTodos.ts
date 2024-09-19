"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

async function GetTodos() {
  try {
    const session = await auth();

    if (!session) {
      return { error: "You must be logged in to get your todos" };
    }

    const todos = await prisma.todo.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
    });

    console.log(todos);
    return todos;
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
export { GetTodos };
