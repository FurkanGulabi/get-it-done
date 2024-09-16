import { z } from "zod";

const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .max(16, { message: "Maximum name length 16" }),
  surname: z
    .string()
    .min(1, { message: "Surname cannot be empty" })
    .max(16, { message: "Maximum surname length 16" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters long" }),
});

export default RegisterFormSchema;
