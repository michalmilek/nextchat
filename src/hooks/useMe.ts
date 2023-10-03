import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useMe = (conversation: FullConversationType | { users: User[] }) => {
  const session = useSession();
  const user = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const me = conversation.users.filter(
      (user) => user.email === currentUserEmail
    );

    return me[0];
  }, [conversation.users, session?.data?.user?.email]);

  return user;
};

export default useMe;
