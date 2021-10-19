import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const service = new AuthenticateUserService();

    const code = request.body.code;

    try {
      const result = await service.execute(code as string);

      return response.json(result);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      return response.status(400).json({ message: "Erro ao autenticar" });
    }
  }
}

export { AuthenticateUserController };
