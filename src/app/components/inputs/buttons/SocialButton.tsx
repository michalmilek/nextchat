import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

interface SocialButtonProps {
  provider: "Google" | "Facebook";
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, ...rest }) => {
  const Icon = provider === "Google" ? FaGoogle : FaFacebook;

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
