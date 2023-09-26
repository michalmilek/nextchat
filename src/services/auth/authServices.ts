import { useMutation } from "@tanstack/react-query";
import { register } from "./auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const useRegister = () => {
  const router = useRouter();
  return useMutation(register, {
    onSuccess: (_, data) => {
      const { name, ...rest } = data;
      toast.success("User has been registered succesfully");
      signIn("credentials", rest);
    },
    onError: () => {
      toast.error(
        "Something has gone wrong! Please contact with administrator!"
      );
    },
  });
};
