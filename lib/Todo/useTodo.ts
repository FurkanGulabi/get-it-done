import { useQueryClient } from "@tanstack/react-query";
import { updateTodoCompletion, deleteTodo } from "@/actions/Todo/UpdateTodo";

function useHandleCheckbox() {
  const queryClient = useQueryClient();

  // Function to handle the checkbox change
  async function handleCheckbox(todoId: string, todoIsCompleted: boolean) {
    try {
      const data = await updateTodoCompletion(todoId, !todoIsCompleted);
      if (data?.success) {
        // Invalidate the todos query to refetch the updated data
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    } catch (error) {
      console.error("Failed to update completion status", error);
    }
  }

  return { handleCheckbox };
}

function useDeleteTodo() {
  const queryClient = useQueryClient();

  async function handleDelete(todoId: string) {
    try {
      const data = await deleteTodo(todoId);
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  }
  return { handleDelete };
}

export { useHandleCheckbox, useDeleteTodo };
