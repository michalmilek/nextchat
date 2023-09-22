import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface ButtonProps extends React.ComponentProps<"button"> {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "primary" | "secondary" | "warning" | "success";
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  type = "primary",
  className,
  ...rest
}) => {
  const buttonClasses = clsx(
    `
      inline-flex items-center px-4 py-2 border border-transparent text-base
      font-medium rounded-md shadow-sm text-white
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
    `,
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const primaryClasses = `
    bg-sky-600 hover:bg-sky-700 focus:ring-sky-500
  `;

  const secondaryClasses = `
    bg-gray-600 hover:bg-gray-700 focus:ring-gray-500
  `;

  const warningClasses = `
    bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500
  `;

  const successClasses = `
    bg-green-600 hover:bg-green-700 focus:ring-green-500
  `;

  let buttonVariantClasses = "";

  switch (type) {
    case "primary":
      buttonVariantClasses = primaryClasses;
      break;
    case "secondary":
      buttonVariantClasses = secondaryClasses;
      break;
    case "warning":
      buttonVariantClasses = warningClasses;
      break;
    case "success":
      buttonVariantClasses = successClasses;
      break;
    default:
      buttonVariantClasses = primaryClasses;
  }

  return (
    <button
      className={`${buttonClasses} ${buttonVariantClasses}`}
      disabled={disabled}
      {...rest}>
      {label}
    </button>
  );
};

export default Button;
