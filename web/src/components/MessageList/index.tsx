import { useEffect, useState } from "react";
import Img from "next/image";
import io from "socket.io-client";

import { api } from "../../services/api";
import Message from "../Message";

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

export default function MessageList() {
  const [messages, setMessages] = useState<IMessages[]>([]);

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
    }, 2000);

    return () => {
      socket.disconnect();
    };
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

  return (
    <Container>
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
    </Container>
  );
}
