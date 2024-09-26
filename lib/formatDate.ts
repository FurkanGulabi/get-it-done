import {
  changePriorityForOneDayLeft,
  changeStatusForPastDueDate,
} from "@/actions/Todo/UpdateTodo";

export const formatDate = (dateStr: Date | string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const remainingDaysFormatter = async (
  dateStr: Date | string,
  todoId: string
) => {
  const date = new Date(dateStr);
  const now = new Date();

  // Calculate the difference in milliseconds and convert it to days
  const diffInMilliseconds = date.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays === 1 || diffInDays <= 0) {
    await changePriorityForOneDayLeft(todoId);
  }

  //Todo: If diffInDays remain 0 day change the todo status to POSTPONED on database and  display past due date on the todo card
  if (diffInDays <= 0) {
    await changeStatusForPastDueDate(todoId);
  }

  // Return the formatted string
  return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} left`;
};
