import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SlEnergy } from "react-icons/sl";

const DesktopNav = () => {
  return (
    <>
      <Link href={"/auth/login"}>
        <Button variant={"outline"}>Login</Button>
      </Link>
      <Link href={"/auth/register"}>
        <Button
          variant={"default"}
          className="flex flex-row items-center gap-2"
        >
          <SlEnergy size={20} /> <span>Get Started for Free</span>
        </Button>
      </Link>
    </>
  );
};

export default DesktopNav;
