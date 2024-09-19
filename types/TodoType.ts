export interface TodoType {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  status: "PENDING" | "ONGOING" | "POSTPONED" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
  endDate: string | null; // Could be a date string or "whencompleted"
  userId: string;
}
