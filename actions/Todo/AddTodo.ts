"use server";
import { auth } from "@/auth"; // Assuming you're using a custom auth function
import prisma from "@/lib/db";
import AddTodoFormSchema from "@/schemas/AddTodoFormSchema";
import { z } from "zod";

async function AddTodo(values: z.infer<typeof AddTodoFormSchema>) {
  try {
    // Fetch the session (logged-in user)
    const session = await auth();

    if (!session) {
      throw new Error("You must be logged in to perform this action");
    }

    // Validate form data using Zod
    const validatedFields = AddTodoFormSchema.safeParse(values);

    if (!validatedFields.success) {
      // If validation fails, return the Zod error
      return { error: validatedFields.error.errors };
    }

    // Destructure the validated data
    const { title, description, priority, status, date } = validatedFields.data;

    // Create a new todo and associate it with the user

    let transformDate: string;

    date;

    if (date === "whencompleted") {
      transformDate = "whencompleted"; // If the date is "whencompleted", keep it as is
    } else if (date === "undefined") {
      transformDate = "undefined"; // If date is undefined, set the string "undefined"
    } else if (date instanceof Date) {
      // If it's a valid date, convert it to ISO format
      transformDate = date.toISOString();
    } else {
      throw new Error("Invalid date format");
    }

    //TODO: Implement react query here

    await prisma.todo.create({
      data: {
        title,
        description: description || "",
        priority: priority || "MEDIUM", // Default to MEDIUM if not provided
        status: status || "PENDING", // Default to PENDING if not provided
        endDate: transformDate, // Convert the date to a string
        user: {
          connect: {
            email: session.user.email, // Connect the todo to the user by email
          },
        },
      },
    });

    return { success: true };
  } catch (error: unknown) {
    console.error(error);
    // Handle and return meaningful errors
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
}

export { AddTodo };
