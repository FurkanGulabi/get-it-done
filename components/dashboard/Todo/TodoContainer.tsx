"use client";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import { GetTodos } from "@/actions/Todo/GetTodos";
import { TodoType } from "@/types/TodoType"; // Import TodoType interface
import { CircularProgress } from "@nextui-org/react";
import { formatDate, remainingDaysFormatter } from "@/lib/formatDate";

const TodoContainer = () => {
  const [todos, setTodos] = useState<TodoType[]>([]); // Define state with type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GetTodos().then((data) => {
      if (data) {
        if (Array.isArray(data)) {
          const formattedData = data.map((todo) => ({
            ...todo,
            createdAt: formatDate(todo.createdAt),
            updatedAt: formatDate(todo.updatedAt),
            endDate:
              todo.endDate === "whencompleted"
                ? "When completed"
                : todo.endDate === "undefined"
                ? "Select Later"
                : todo.endDate && !isNaN(new Date(todo.endDate).getTime())
                ? remainingDaysFormatter(todo.endDate)
                : todo.endDate,
          }));
          setTodos(formattedData as TodoType[]);
          setLoading(false);
        } else {
          console.error("Unexpected data format:", data);
        }
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      {loading ? (
        <CircularProgress size={"lg"} />
      ) : (
        todos.map((todo) => <Todo key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoContainer;
