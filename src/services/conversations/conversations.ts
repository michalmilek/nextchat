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


  
export const deleteConversation = async (conversationId: string) => {
  try {
    const response = await axios.delete(`/api/conversations/${conversationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserFromConversation = async ({
  userId,
  conversationId,
}: {
  userId: string;
  conversationId: string;
}) => {
  try {
    const response = await axios.delete(
      `/api/conversations/deleteUser?userId=${userId}&conversationId=${conversationId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addUserToConversation = async ({
  userId,
  conversationId,
}: {
  userId: string;
  conversationId: string;
}) => {
  try {
    const response = await axios.patch(
      `/api/conversations/addUser?userId=${userId}&conversationId=${conversationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user to conversation:", error);
    throw error;
  }
};