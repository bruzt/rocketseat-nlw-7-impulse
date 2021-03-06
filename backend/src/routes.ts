import { Router } from "express";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUSerController } from "./controllers/ProfileUSerController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.get("/messages", new GetLast3MessagesController().handle);
router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

router.get("/profile", ensureAuthenticated, new ProfileUSerController().handle);

export { router };
