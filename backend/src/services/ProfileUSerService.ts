import { prismaClient } from "../databases/prisma/client";

class ProfileUSerService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
    });

    return user;
  }
}

export { ProfileUSerService };
