import axios from "axios";

export const postConversation = async (userId: string) => {
  try {
    const response = await axios.post("/api/conversations", {
      userId,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface PostConversationGroup {
  name: string;
  members: SelectedOption[];
}

interface SelectedOption {
  value: string;
  label: string;
}

export const postConversationGroup = async ({
  name,
  members,
}: PostConversationGroup) => {
  try {
    const response = await axios.post("/api/conversations", {
      isGroup: true,
      name,
      members,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
