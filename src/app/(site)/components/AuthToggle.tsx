import React from "react";
import { Variant } from "./useAuthLogic";

interface AuthToggleProps {
  variant: Variant;
  toggleVariant: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ variant, toggleVariant }) => {
  return (
    <p className="text-center text-sm font-medium text-gray-600">
      {variant === "REGISTER"
        ? "Already have an account?"
        : "Dont you have an account?"}{" "}
      <button
        className="text-blue-500 hover:text-blue-700"
        onClick={toggleVariant}>
        {variant === "REGISTER" ? "Sign in" : "Sign up"}
      </button>
    </p>
  );
};

export default AuthToggle;
