import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "@/auth";

const OAuthLogins = () => {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      <form
        action={async () => {
          "use server";

          await signIn("google", { redirectTo: "/dashboard" });
        }}
        className="w-full"
      >
        <Button type="submit" className="w-full">
          <FaGoogle size={24} />
        </Button>
      </form>
      <form
        action={async () => {
          "use server";

          await signIn("github", { redirectTo: "/" });
        }}
        className="w-full"
      >
        <Button type="submit" className="w-full">
          <FaGithub size={24} />
        </Button>
      </form>
    </div>
  );
};

export default OAuthLogins;
