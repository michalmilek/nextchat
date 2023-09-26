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
