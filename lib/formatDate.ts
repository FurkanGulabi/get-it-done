export const formatDate = (dateStr: Date | string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const remainingDaysFormatter = (dateStr: Date | string) => {
  const date = new Date(dateStr);
  const now = new Date();

  // Calculate the difference in milliseconds and convert it to days
  const diffInMilliseconds = date.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

  //Todo: If diffInDays remain 1 day change the todo priority to high on database

  // Return the formatted string
  return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} left`;
};
