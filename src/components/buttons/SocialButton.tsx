import React from "react";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";

interface SocialButtonProps extends React.ComponentProps<"button"> {
  provider: "Google" | "Facebook" | "Github";
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, ...rest }) => {
  let Icon;

  if (provider === "Google") {
    Icon = FaGoogle;
  } else if (provider === "Facebook") {
    Icon = FaFacebook;
  } else if (provider === "Github") {
    Icon = FaGithub;
  }

  return (
    <button
      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      {...rest}>
      <span className="sr-only">{provider} login</span>
      <Icon className="w-5 h-5 mr-2" />
      {provider}
    </button>
  );
};

export default SocialButton;
