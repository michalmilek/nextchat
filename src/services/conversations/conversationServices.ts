import { useMutation } from "@tanstack/react-query";
import { postConversation, postConversationGroup } from "./conversations";
import { useRouter } from "next/navigation";
import { FullConversationType } from "@/types";
import { toast } from "react-toastify";

export const usePostConversation = () => {
  const router = useRouter();
  const postConversationMutation = useMutation(postConversation, {
    onSuccess: (response: FullConversationType) => {
      router.push(`/conversations/${response.id}`);
      toast.success(`Conversation created successfully.`);
      toast.error("ERROR");
    },
  });

  return postConversationMutation;
};
export const usePostConversationGroup = () => {
  const router = useRouter();
  const postConversationGroupMutation = useMutation(postConversationGroup, {
    onSuccess: (response: FullConversationType) => {
      router.push(`/conversations/${response.id}`);
      toast.success(`Conversation created successfully.`);
    },
    onError: () => {
      toast.error("ERROR");
    },
  });

  return postConversationGroupMutation;
};
