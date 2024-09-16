"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoginFormSchema from "@/schemas/LoginFormSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Login } from "@/actions/Login";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string>(
    searchParams.get("success") === "true"
      ? "Register successful, please login"
      : ""
  );
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    setError("");
    setSuccess("");
    setIsPending(true);
    await Login(values).then((data) => {
      if (data?.error) {
        setError(data.error);
      }
    });
    setIsPending(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="me@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full" type="submit">
          Login
        </Button>
        {error && (
          <p className="text-destructive break-words text-center font-bold">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 break-words text-center font-bold">
            {success}
          </p>
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
