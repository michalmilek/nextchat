import { useMutation } from "@tanstack/react-query";
import {
  addUserToConversation,
  deleteConversation,
  deleteUserFromConversation,
  postConversation,
  postConversationGroup,
} from "./conversations";
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

export const useDeleteConversation = () => {
  const router = useRouter();
  const deleteConversationMutation = useMutation(deleteConversation, {
    onSuccess: () => {
      router.push("/conversations");
      toast.success("Conversation deleted successfully");
    },
    onError: () => {
      toast.error("ERROR");
    },
  });

  return deleteConversationMutation;
};

export const useDeleteUserFromConversation = () => {
  const deleteUserFromConversationMutation = useMutation(
    deleteUserFromConversation,
    {
      onSuccess: () => {
        toast.success("User deleted successfully from conversation");
      },
      onError: () => {
        toast.error("ERROR");
      },
    }
  );

  return deleteUserFromConversationMutation;
};

export const useAddUserToConversation = () => {
  const addUserToConversationMutation = useMutation(addUserToConversation, {
    onSuccess: () => {
      toast.success("User added successfully to conversation");
    },
    onError: () => {
      toast.error("ERROR");
    },
  });

  return addUserToConversationMutation;
};