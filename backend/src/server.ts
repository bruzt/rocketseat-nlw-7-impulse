import { httpServer } from "./app";

httpServer.listen(process.env.port || 3000, () =>
  console.log(`Running on port ${process.env.port || 3000}`)
);
