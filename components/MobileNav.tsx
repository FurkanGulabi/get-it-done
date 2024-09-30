"use client";
import React, { useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import { SlEnergy } from "react-icons/sl";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"outline"}>
          <BiMenu size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        aria-describedby="drawer-description"
        className="flex flex-col items-center gap-2"
      >
        <VisuallyHidden>
          <h2>Navigation Drawer</h2>
        </VisuallyHidden>
        <p id="drawer-description" className="sr-only">
          This drawer provides access to navigation links for the application.
        </p>
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
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
