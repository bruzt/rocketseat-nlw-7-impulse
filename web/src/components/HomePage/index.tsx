import { useEffect, useState } from "react";
import Img from "next/image";
import { FaGithub } from "react-icons/fa";
import io from "socket.io-client";

import Message from "../Message";
import SendMessage from "../SendMessage";
import { api } from "../../services/api";
import { useUser } from "../../contexts/userContext";

import { Container } from "./styles";

interface IMessages {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const messagesQueue: IMessages[] = [];

const socket = io("http://localhost:3001");

socket.on("new_message", (message) => {
  messagesQueue.push(message);
});

let timer: NodeJS.Timer;

export default function HomePage() {
  const [messages, setMessages] = useState<IMessages[]>([]);

  const userContext = useUser();

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    clearInterval(timer);

    timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  async function fetchMessages() {
    try {
      const response = await api.get<IMessages[]>("/messages");

      setMessages(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      alert("Erro ao buscar mensagens");
    }
  }

  async function handleLoginWithGithub() {
    userContext.redirectToGithubOauth();
  }

  return (
    <Container>
      <main>
        <div className="messages-container">
          <figure>
            <Img src="/logo.png" alt="logo" layout="fill" objectFit="contain" />
          </figure>

          <div className="messages">
            {messages.map((message) => (
              <Message
                key={message.id}
                text={message.text}
                avatarUrl={message.user.avatar_url}
                username={message.user.name}
              />
            ))}
          </div>
        </div>

        {userContext.user == null ? (
          <div className="login-container">
            <h1>Envie e compartilhe sua mensagem</h1>

            <button onClick={handleLoginWithGithub}>
              <FaGithub color="#090909" size="1.5rem" />
              &nbsp;Entrar com Github
            </button>
          </div>
        ) : (
          <SendMessage />
        )}
      </main>
    </Container>
  );
}
