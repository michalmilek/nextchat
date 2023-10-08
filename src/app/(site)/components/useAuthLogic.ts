import React, { useCallback, useMemo, useState } from "react";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import ToasterContext from "@/context/ToasterContext";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRegister } from "@/services/auth/authServices";
import { Register } from "@/services/auth/auth";
import { toast } from "react-toastify";

export type Variant = "LOGIN" | "REGISTER";

const useAuthLogic = () => {
  const [manualLoading, setManualLoading] = useState(false);
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const { mutate: registerFn } = useRegister();

  const initialValues = useMemo(() => {
    return {
      name: "",
      email: "",
      password: "",
    };
  }, []);

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().when("variant", {
          is: (variant: Variant) => variant === "REGISTER",
          then: () => yup.string().required(),
        }),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
      }),
    [variant]
  );

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const submitAuthForm: SubmitHandler<FieldValues> = (data: FieldValues) => {
    if (variant === "LOGIN") {
      setManualLoading(true);
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback: any) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in");
          }
        })
        .catch((e) => console.log(e))
        .finally(() => setManualLoading(false));
    } else {
      registerFn(data as Register);
    }
  };

  const socialActions = async (action: "github" | "google" | "facebook") => {
    try {
      setManualLoading(true);
      const callback = await signIn(action, { redirect: false });
      if (callback?.error) {
        toast.error("Invalid credentials");
      }
      if (callback?.ok && !callback?.error) {
        toast.success("Logged in");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setManualLoading(false);
    }
  };

  return {
    variant,
    schema,
    toggleVariant,
    socialActions,
    initialValues,
    submitAuthForm,
    manualLoading,
  };
};

export default useAuthLogic;
