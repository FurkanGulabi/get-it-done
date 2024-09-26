import { Checkbox } from "@/components/ui/checkbox";
import { useHandleCheckbox } from "@/lib/Todo/useTodo";
import React from "react";

const TodoCheckbox = ({
  todoId,
  isCompleted,
}: {
  todoId: string;
  isCompleted: boolean;
}) => {
  const { handleCheckbox: handleCheckboxHook } = useHandleCheckbox(); // Import the hook
  const [loading, setLoading] = React.useState(false);

  const handleCheckbox = async () => {
    setLoading(true);
    await handleCheckboxHook(todoId, isCompleted);
    setLoading(false);
  };

  return (
    <Checkbox
      checked={isCompleted}
      disabled={loading}
      onClick={handleCheckbox} // Use the handler from the hook
      className="w-10 h-10 rounded-full !cursor-pointer"
    />
  );
};

export default TodoCheckbox;
