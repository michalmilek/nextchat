import prisma from "@/libs/prismadb";

const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUser;
