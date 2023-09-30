import axios from "axios";

export const postMessage = async (data: {
  message: string;
  image: string;
  conversationId: string;
}) => {
  try {
    const response = await axios.post("/api/messages", data);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
