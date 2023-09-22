"use client";

import React, { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/inputs/buttons/Button";
import Divider from "@/app/components/Divider";
import AuthSocialButtons from "./AuthSocialButtons";
import AnchorButton from "@/app/components/inputs/buttons/AnchorButton";
import AuthToggle from "./AuthToggle";

export type Variant = "LOGIN" | "REGISTER";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    if (variant === "LOGIN") {
      //AXIOS REGISTER
    } else {
      //nextAuth
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div className="mt-8 sm:mx-auto sm_w-full sm:max-w-md">
      <div className="bg-white px-4 py-u shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6 py-3"
          onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
            />
          )}
          <Input
            id="email"
            label="Email"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type={"password"}
            register={register}
            errors={errors}
          />
          <Button
            disabled={isLoading}
            label={variant === "REGISTER" ? "Sign up" : "Sign in"}
            className="w-full flex justify-center"
          />
          <Divider
            text="Or continue with"
            className="mt-10"
          />
        </form>
        <div className="mt-6 pb-6">
          <AuthSocialButtons />
        </div>

        <div className="pb-6">
          <AuthToggle
            variant={variant}
            toggleVariant={toggleVariant}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
