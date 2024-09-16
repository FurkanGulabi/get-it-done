"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RegisterFormSchema from "@/schemas/RegisterFormSchema";
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
import { Register } from "@/actions/Register";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    setError("");
    setIsPending(true);
    await Register(values).then((data) => {
      if (data.error) {
        setError(data.error);
      } else if (data.success) {
        router.replace("/auth/login?success=true");
      }
    });
    setIsPending(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row gap-2 items-center justify-between">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
      </form>
    </Form>
  );
};

export default RegisterForm;
