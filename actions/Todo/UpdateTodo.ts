"use server";
import prisma from "@/lib/db";
import { TodoType } from "@/types/TodoType";

async function changePriorityForOneDayLeft(todoId: string) {
  await prisma.todo.update({
    where: { id: todoId },
    data: { priority: "HIGH" },
  });
}

async function changeStatusForPastDueDate(todoId: string) {
  await prisma.todo.update({
    where: { id: todoId },
    data: { status: "POSTPONED" },
  });
}

async function updateTodoCompletion(todoId: string, isCompleted: boolean) {
  await prisma.todo.update({
    where: { id: todoId },
    data: { isCompleted },
  });

  return { success: true };
}

async function deleteTodo(todoId: string) {
  await prisma.todo.delete({
    where: { id: todoId },
  });

  return { success: true };
}

async function updateTodo(todoData: TodoType) {
  await prisma.todo.update({
    where: { id: todoData.id },
    data: {
      ...todoData,
      endDate:
        typeof todoData.endDate === "string"
          ? todoData.endDate
          : todoData.endDate?.toISOString(),
    },
  });

  return { success: true };
}

export {
  changePriorityForOneDayLeft,
  changeStatusForPastDueDate,
  updateTodoCompletion,
  deleteTodo,
  updateTodo,
};
