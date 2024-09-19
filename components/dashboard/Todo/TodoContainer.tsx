"use client";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import { GetTodos } from "@/actions/Todo/GetTodos";
import { TodoType } from "@/types/TodoType"; // Import TodoType interface

const TodoContainer = () => {
  const [todos, setTodos] = useState<TodoType[]>([]); // Define state with type

  useEffect(() => {
    GetTodos().then((data) => {
      if (data) {
        if (Array.isArray(data)) {
          const formattedData = data.map((todo) => ({
            ...todo,
            createdAt: todo.createdAt.toISOString(),
            updatedAt: todo.updatedAt.toISOString(),
          }));
          setTodos(formattedData as TodoType[]);
        } else {
          console.error("Unexpected data format:", data);
        }
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoContainer;
