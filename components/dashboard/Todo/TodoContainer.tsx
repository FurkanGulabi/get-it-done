"use client";
import React from "react";
import Todo from "./Todo";
import { GetTodos } from "@/actions/Todo/GetTodos";
import { TodoType } from "@/types/TodoType"; // Import TodoType interface
import { CircularProgress } from "@nextui-org/react";
import { formatDate, remainingDaysFormatter } from "@/lib/formatDate";
import { useQuery } from "@tanstack/react-query";

// Helper function to sort todos by isCompleted and priority
const sortTodos = (todos: TodoType[]) => {
  return todos.sort((a, b) => {
    // Sort by completion status: uncompleted first
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1; // Completed todos go to the bottom
    }

    // If both are uncompleted, sort by priority: HIGH > MEDIUM > LOW
    const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

const fetchAndFormatTodos = async (): Promise<TodoType[]> => {
  const data = await GetTodos();
  if (data && Array.isArray(data)) {
    const formattedData = await Promise.all(
      data.map(async (todo) => ({
        ...todo,
        createdAt: formatDate(todo.createdAt),
        updatedAt: formatDate(todo.updatedAt),
        endDate:
          todo.endDate === "whencompleted"
            ? "When completed"
            : todo.endDate === "undefined"
            ? "Select Later"
            : todo.endDate && !isNaN(new Date(todo.endDate).getTime())
            ? await remainingDaysFormatter(todo.endDate, todo.id)
            : todo.endDate,
      }))
    );
    return formattedData as TodoType[];
  } else {
    throw new Error("Unexpected data format");
  }
};

const TodoContainer = () => {
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchAndFormatTodos,
  });

  // Sort todos if data is available
  const sortedTodos = todos ? sortTodos(todos) : [];

  return (
    <div className="flex flex-col gap-2 items-center">
      {isLoading ? (
        <CircularProgress size={"lg"} />
      ) : isError ? (
        <div>
          <p>Error loading todos: {error?.message}</p>
        </div>
      ) : (
        sortedTodos?.map((todo) => <Todo key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoContainer;
