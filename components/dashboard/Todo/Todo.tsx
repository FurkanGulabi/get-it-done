import { TodoType } from "@/types/TodoType";
import React from "react";
import DeleteTodoButton from "./buttons/DeleteTodoButton";
import TodoCheckbox from "./buttons/TodoCheckbox";
import EditTodoButton from "./buttons/EditTodoButton";
interface TodoProps {
  todo: TodoType;
  defaultTodo?: TodoType;
}

const Todo = ({ todo, defaultTodo }: TodoProps) => {
  // Define background color based on priority
  const priorityColor = {
    HIGH: "border-red-500",
    MEDIUM: "border-yellow-500",
    LOW: "border-green-500",
  }[todo.priority];

  // Define label for the status of the todo
  const statusLabel = {
    PENDING: "Pending",
    ONGOING: "Ongoing",
    POSTPONED: "Postponed",
    COMPLETED: "Completed",
  }[todo.status];

  const completedLabel = todo.isCompleted ? "Yes" : "No";

  return (
    <div
      className={`shadow w-full !text-foreground border-b-8 items-center justify-between flex flex-row gap-2 p-4 ${priorityColor} rounded-lg`}
    >
      <div className="flex flex-row items-center gap-6">
        <TodoCheckbox todoId={todo.id} isCompleted={todo.isCompleted} />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">{todo.title}</h2>
          <p className="opacity-80 text-sm">{todo.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-12">
        <div className="flex flex-row gap-2 items-center">
          <DeleteTodoButton todoId={todo.id} />
          <EditTodoButton defaultTodo={defaultTodo} />
        </div>
        <div>
          <p>Status: {statusLabel}</p>
          <p>Completed: {completedLabel}</p>
          <p>End Date: {todo.endDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
