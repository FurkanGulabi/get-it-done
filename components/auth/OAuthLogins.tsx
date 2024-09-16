import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

const OAuthLogins = () => {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      <Button className="w-full">
        <FaGoogle size={24} />
      </Button>
      <Button className="w-full">
        <FaGithub size={24} />
      </Button>
    </div>
  );
};

export default OAuthLogins;
