import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  const session = useSession();
  const user = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;



    const otherUser = conversation.users?.filter(
      (user) => user.email !== currentUserEmail
    );

    if (!otherUser) {
      return {
        id: "",
        name: "",
        email: "",
        emailVerified: null,
        image: "",
        hashedPassword: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        conversationIds: [],
        seenMessageIds: [],
      };
    }

    return otherUser[0];
  }, [conversation.users, session?.data?.user?.email]);

  return user;
};

export default useOtherUser;
