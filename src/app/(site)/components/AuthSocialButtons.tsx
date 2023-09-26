import SocialButton from "@/components/buttons/SocialButton";
import React from "react";
import useAuthLogic from "./useAuthLogic";

const AuthSocialButtons = () => {
  const { socialActions } = useAuthLogic();

  return (
    <div className="flex gap-3 w-full justify-center items-center">
      <SocialButton
        provider="Google"
        onClick={() => socialActions("google")}
      />
      <SocialButton
        onClick={() => socialActions("github")}
        provider="Github"
      />
    </div>
  );
};

export default AuthSocialButtons;
