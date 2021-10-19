import { Request, Response } from "express";

import { ProfileUSerService } from "../services/ProfileUSerService";

class ProfileUSerController {
  async handle(request: Request, response: Response) {
    const id = request.user_id;

    const createMessageService = new ProfileUSerService();

    const result = await createMessageService.execute(id);

    return response.json(result);
  }
}

export { ProfileUSerController };
