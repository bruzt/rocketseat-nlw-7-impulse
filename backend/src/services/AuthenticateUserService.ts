import axios from "axios";
import jwt from "jsonwebtoken";

import { prismaClient } from "../databases/prisma/client";

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = `https://github.com/login/oauth/access_token`;

    const response = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    const response2 = await axios.get<IUserResponse>(
      `https://api.github.com/user`,
      {
        headers: {
          authorization: `Bearer ${response.data.access_token}`,
        },
      }
    );

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: response2.data.id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: response2.data.id,
          name: response2.data.name,
          login: response2.data.login,
          avatar_url: response2.data.avatar_url,
        },
      });
    }

    const token = jwt.sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      String(process.env.JWT_SECRET),
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { user, token };
  }
}

export { AuthenticateUserService };
