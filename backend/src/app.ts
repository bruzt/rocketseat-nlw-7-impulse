import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

import { router } from "./routes";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CORS_ORIGIN },
});

/*io.on("connection", (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});*/

app.use(express.json());

app.use(router);

app.get("/github", (req, res) => {
  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (req, res) => {
  const code = req.query.code;

  return res.json({ code });
});

export { httpServer, io };
