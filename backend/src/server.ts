import { httpServer } from "./app";

httpServer.listen(process.env.PORT || 3001, () =>
  console.log(`Running on port ${process.env.PORT || 3001}`)
);
