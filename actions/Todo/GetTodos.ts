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
    todos;
    return todos;
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}

async function GetTodoById(todoId: string) {
  try {
    const session = await auth();

    if (!session) {
      return { error: "You must be logged in to get your todos" };
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    todo;

    return {
      success: true,
      data: todo,
    };
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}

export { GetTodos, GetTodoById };
