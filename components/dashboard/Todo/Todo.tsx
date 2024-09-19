import { TodoType } from "@/types/TodoType";
import React from "react";

interface TodoProps {
  todo: TodoType;
}

const Todo = ({ todo }: TodoProps) => {
  // Define background color based on priority
  const priorityColor =
    todo.priority === "HIGH"
      ? "bg-red-500/40 border-red-500"
      : todo.priority === "MEDIUM"
      ? "bg-yellow-500/40 border-yellow-500"
      : "bg-green-500/40 border-green-500";

  // Define label for the status of the todo
  const statusLabel = {
    PENDING: "Pending",
    ONGOING: "Ongoing",
    POSTPONED: "Postponed",
    COMPLETED: "Completed",
  }[todo.status];

  // Handle endDate display logic
  const endDateLabel =
    todo.endDate === "whencompleted"
      ? "When Completed"
      : new Date(todo.endDate!).toLocaleDateString();

  return (
    <div
      className={`shadow w-full border !text-foreground flex flex-col gap-2 p-4 ${priorityColor} rounded-lg`}
    >
      {/* Title */}
      <h2 className="text-white font-bold text-lg">{todo.title}</h2>

      {/* Description */}
      <p className="text-white">{todo.description}</p>

      {/* Status */}
      <p className="text-sm">
        Status:{" "}
        <span
          className={`font-semibold ${
            todo.status === "COMPLETED"
              ? "text-green-500"
              : todo.status === "POSTPONED"
              ? "text-yellow-500"
              : "text-blue-500"
          }`}
        >
          {statusLabel}
        </span>
      </p>

      {/* Completion Indicator */}
      <p className="text-sm">
        Completed:{" "}
        <span
          className={`font-semibold ${
            todo.isCompleted ? "text-green-500" : "text-red-500"
          }`}
        >
          {todo.isCompleted ? "Yes" : "No"}
        </span>
      </p>

      {/* Created At */}
      <p className="text-sm text-gray-400">
        Created At: {new Date(todo.createdAt).toLocaleDateString()}
      </p>

      {/* End Date */}
      <p className="text-sm text-gray-400">
        End Date: {endDateLabel || "Not Set"}
      </p>
    </div>
  );
};

export default Todo;
