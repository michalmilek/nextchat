import SocialButton from "@/app/components/inputs/buttons/SocialButton";
import React from "react";

const AuthSocialButtons = () => {
  return (
    <div className="flex gap-3 w-full justify-center items-center">
      <SocialButton provider="Google" />
      <SocialButton provider="Facebook" />
    </div>
  );
};

export default AuthSocialButtons;
