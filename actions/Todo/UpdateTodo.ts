"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

async function changePriorityForOneDayLeft(todoId: string) {
  const session = await auth();
  const userId = session?.user.id;

  console.log("User ID: ", userId);
  console.log("Todo ID: ", todoId);

  await prisma.todo.update({
    where: { id: todoId },
    data: { priority: "HIGH" },
  });
}

async function changeStatusForPastDueDate(todoId: string) {
  const session = await auth();
  const userId = session?.user.id;

  console.log("User ID: ", userId);
  console.log("Todo ID: ", todoId);

  await prisma.todo.update({
    where: { id: todoId },
    data: { status: "POSTPONED" },
  });
}

async function updateTodoCompletion(todoId: string, isCompleted: boolean) {
  const session = await auth();
  const userId = session?.user.id;

  console.log("User ID: ", userId);
  console.log("Todo ID: ", todoId);

  await prisma.todo.update({
    where: { id: todoId },
    data: { isCompleted },
  });

  return { success: true };
}

async function deleteTodo(todoId: string) {
  const session = await auth();
  const userId = session?.user.id;

  console.log("User ID: ", userId);
  console.log("Todo ID: ", todoId);

  await prisma.todo.delete({
    where: { id: todoId },
  });

  return { success: true };
}

export {
  changePriorityForOneDayLeft,
  changeStatusForPastDueDate,
  updateTodoCompletion,
  deleteTodo,
};
