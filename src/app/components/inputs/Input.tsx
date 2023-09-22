"use client";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  register: UseFormRegister<FieldValues>;
  label: string;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  errors,
  autoComplete,
  disabled,
  ...rest
}) => {
  return (
    <div>
      <label
        htmlFor=""
        className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          autoComplete={id}
          className={clsx(
            `w-full
          form-input block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
           placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6
          `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity:"
          )}
          {...register(id)}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
