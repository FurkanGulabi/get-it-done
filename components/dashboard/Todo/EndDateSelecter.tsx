import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDays } from "date-fns";

interface EndDateSelecterProps {
  date: Date | string;
  setDate: (date: Date | string) => void;
  field: { onChange: (value: Date | string) => void };
}

const EndDateSelecter = ({ date, setDate, field }: EndDateSelecterProps) => {
  // Function to display the appropriate label for the button
  const displayDate = () => {
    if (typeof date === "string") {
      // Handle special string cases
      if (date === "undefined") return "Select end date";
      return date; // whencompleted or other strings
    }
    // Handle Date object
    return format(date, "dd MMM yyyy");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-start w-full text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayDate()} {/* Display date based on logic */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {/* Select dropdown to handle predefined date options */}
        <Select
          onValueChange={(value) => {
            if (value === "whencompleted" || value === "undefined") {
              setDate(value);
              field.onChange(value); // Sync with React Hook Form
            } else {
              // Calculate the future date based on the selected option
              const newDate = addDays(new Date(), parseInt(value));
              setDate(newDate);
              field.onChange(newDate); // Sync with React Hook Form
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="whencompleted">When completed</SelectItem>
            <SelectItem value="undefined">Select later</SelectItem>
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>

        {/* Calendar component for selecting a specific date */}
        <Calendar
          mode="single"
          selected={typeof date === "string" ? undefined : date}
          onSelect={(day) => {
            if (day) {
              setDate(day);
              field.onChange(day); // Sync with React Hook Form
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default EndDateSelecter;
