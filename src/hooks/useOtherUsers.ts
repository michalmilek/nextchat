import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

const useOtherUsers = (
  conversation: FullConversationType | { users: User[] }
) => {
  const session = useSession();
  const otherUsers = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const remainingUsers = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return remainingUsers;
  }, [conversation.users, session?.data?.user?.email]);

  return otherUsers;
};

export default useOtherUsers;
