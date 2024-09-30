"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TodoType } from "@/types/TodoType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import AddTodoFormSchema from "@/schemas/AddTodoFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTodo } from "@/actions/Todo/UpdateTodo";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EndDateSelecter from "../EndDateSelecter";
import { Textarea } from "@/components/ui/textarea";

interface EditTodoButtonProps {
  defaultTodo?: TodoType;
}

const EditTodoButton = ({ defaultTodo }: EditTodoButtonProps) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient(); // Get the query client to trigger refetch

  const form = useForm<z.infer<typeof AddTodoFormSchema>>({
    resolver: zodResolver(AddTodoFormSchema),
    defaultValues: {
      title: defaultTodo?.title,
      description: defaultTodo?.description,
      date: defaultTodo?.endDate || "undefined",
      priority: defaultTodo?.priority,
      status: defaultTodo?.status,
    },
  });

  const mutation = useMutation({
    mutationFn: updateTodo, // Ensure this is provided correctly
    onSuccess: (data) => {
      if (data.success) {
        setOpen(false);
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["todos"] }); // Trigger refetch
      }
    },
    onError: (error) => {
      console.error("Error submitting form", error);
    },
  });

  const onSubmit = (values: z.infer<typeof AddTodoFormSchema>) => {
    console.log(values);
    const parsedData = {
      ...defaultTodo,
      id: defaultTodo?.id || "",
      title: values.title || "",
      description: values.description || "",
      endDate:
        typeof values.date === "string"
          ? values.date
          : values.date?.toISOString(),
      priority: values.priority || "MEDIUM",
      status: values.status || "ONGOING",
      isCompleted: defaultTodo?.isCompleted || false,
      createdAt: defaultTodo?.createdAt || new Date(),
      updatedAt: defaultTodo?.updatedAt || new Date(),
      userId: defaultTodo?.userId || "",
    };

    mutation.mutate(parsedData);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant={"default"} className="rounded-full">
            <FaEdit />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>Edit your todo here</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the title of the todo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="max-h-32"
                        placeholder="Enter the description of the todo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date Field */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <EndDateSelecter
                        date={field.value} // Sync date field value
                        setDate={field.onChange} // Update React Hook Form date field
                        field={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority Field */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Priority</SelectLabel>
                            <SelectItem value="LOW">Low</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="HIGH">High</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status Field */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="ONGOING">Ongoing</SelectItem>
                            <SelectItem value="POSTPONED">Postponed</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTodoButton;
