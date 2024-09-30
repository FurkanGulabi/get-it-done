export interface TodoType {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  status: "PENDING" | "ONGOING" | "POSTPONED" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string | Date;
  updatedAt: string | Date;
  endDate: Date | string;
  userId: string;
}
