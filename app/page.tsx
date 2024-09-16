import { Logout } from "@/actions/Logout";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HomePage = async () => {
  const session = await auth();

  return (
    <div className="h-full flex justify-center flex-col gap-2 items-center">
      <div className="flex flex-row items-center justify-center gap-2">
        <Link href={"/auth/login"}>
          <Button size={"lg"}>Login</Button>
        </Link>
        <Link href={"/auth/register"}>
          <Button size={"lg"}>Register</Button>
        </Link>
      </div>
      {session && (
        <div className="flex flex-col items-center justify-center">
          <pre>{JSON.stringify(session?.user, null, 2)}</pre>
          <form action={Logout}>
            <Button type="submit">Logout</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
