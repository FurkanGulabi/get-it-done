import AddTodoButton from "@/components/dashboard/AddTodoButton";
import TodoContainer from "@/components/dashboard/Todo/TodoContainer";
import React from "react";

const Dashboard = () => {
  return (
    <main>
      <div className="container  gap-2 flex flex-col mx-auto">
        <div>
          <AddTodoButton />
        </div>
        <TodoContainer />
      </div>
    </main>
  );
};

export default Dashboard;
