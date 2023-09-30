import { useMutation } from "@tanstack/react-query";
import { postMessage } from "./messages";

export const usePostMessage = () => {
  return useMutation(postMessage);
};
