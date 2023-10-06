import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { FullConversationType } from "@/types";

const useSearchForUser = (conversations: FullConversationType[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredConversations, setFilteredConversations] =
    useState(conversations);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const filtered = conversations.filter((conversation) => {
      const matchingUsers = conversation.users?.filter((user) => {
        const { name, email } = user;
        return (
          (name &&
            name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
          (email &&
            email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        );
      });
      if (!matchingUsers) {
        return [];
      }

      return matchingUsers.length > 0;
    });
    setFilteredConversations(filtered);
  }, [conversations, debouncedSearchTerm]);

  return { searchTerm, setSearchTerm, filteredConversations };
};

export default useSearchForUser;
