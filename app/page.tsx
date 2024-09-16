import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-row items-center justify-center gap-2">
        <Link href={"/auth/login"}>
          <Button size={"lg"}>Login</Button>
        </Link>
        <Link href={"/auth/register"}>
          <Button size={"lg"}>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
