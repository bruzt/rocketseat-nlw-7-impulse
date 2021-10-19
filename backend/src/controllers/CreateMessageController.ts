import { Request, Response } from "express";

import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(request: Request, response: Response) {
    const message = request.body.message;
    const user_id = request.user_id;

    const createMessageService = new CreateMessageService();

    const result = await createMessageService.execute(message, user_id);

    return response.json(result);
  }
}

export { CreateMessageController };
