import { Logout } from "@/actions/Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@nextui-org/react";
import { DefaultSession } from "next-auth";
import Link from "next/link";

interface UserButtonProps {
  session: DefaultSession; // Define the type of session prop
}

export function UserButton({ session }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          className="select-none cursor-pointer"
          src={session?.user?.image || ""}
          isBordered
          showFallback
          name={session?.user?.name || ""}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {session?.user?.name} {session?.user?.surname}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/settings"}>Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <form action={Logout}>
          <DropdownMenuItem
            asChild
            className=" cursor-pointer w-full hover:!bg-destructive hover:!text-destructive-foreground"
          >
            <button type="submit">Log out</button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
