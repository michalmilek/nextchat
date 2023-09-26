"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";
import Divider from "@/components/Divider";
import AuthSocialButtons from "./AuthSocialButtons";
import AnchorButton from "@/components/buttons/AnchorButton";
import AuthToggle from "./AuthToggle";
import axios from "axios";
import { useRegister } from "@/services/auth/authServices";
import useAuthLogic from "./useAuthLogic";
import { signIn, useSession } from "next-auth/react";

import { toast } from "react-toastify";
import { Register } from "@/services/auth/auth";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const session = useSession();
  const { isLoading } = useRegister();
  const { toggleVariant, variant, schema, submitAuthForm } = useAuthLogic();
  const router = useRouter();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    //@ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  return (
    <div className="mt-8 sm:mx-auto sm_w-full sm:max-w-md">
      <div className="bg-white px-4 py-u shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6 py-3"
          onSubmit={handleSubmit(submitAuthForm)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              error={
                errors.name?.message ? (errors.name.message as string) : ""
              }
            />
          )}
          <Input
            id="email"
            label="Email"
            register={register}
            error={
              errors.email?.message ? (errors.email.message as string) : ""
            }
          />
          <Input
            id="password"
            label="Password"
            type={"password"}
            register={register}
            error={
              errors.password?.message
                ? (errors.password.message as string)
                : ""
            }
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
