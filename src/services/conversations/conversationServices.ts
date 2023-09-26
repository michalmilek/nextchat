import { useMutation } from "@tanstack/react-query";
import { postConversation } from "./conversations";
import { useRouter } from "next/navigation";

export const usePostConversation = () => {
  const router = useRouter();
  const postConversationMutation = useMutation(postConversation, {
    onSuccess: (_, postId) => {
      router.push(`/conversations/${postId}`);
    },
  });

  return postConversationMutation;
};
