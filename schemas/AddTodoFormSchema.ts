import { z } from "zod";

const AddTodoFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(32, { message: "Title should be less than 32 characters" }),
  description: z
    .string()
    .max(256, { message: "Description should be less than 256 characters" })
    .optional(),
  date: z
    .union([
      z.date({ required_error: "End date is required" }),
      z.literal("undefined"), // Accept the string "undefined"
      z.literal("whencompleted"), // Accept the string "whencompleted"
    ])
    .refine(
      (value) =>
        value instanceof Date ||
        value === "undefined" ||
        value === "whencompleted",
      {
        message: "Please select a valid date or leave it undefined",
      }
    ),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["PENDING", "ONGOING", "POSTPONED", "COMPLETED"]),
});

export default AddTodoFormSchema;
