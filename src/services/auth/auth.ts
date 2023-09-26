import axios from "axios";

export interface Register {
  email: string;
  name: string;
  password: string;
}

export const register = async (data: Register) => {
  try {
    const response = await axios.post("/api/register", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
