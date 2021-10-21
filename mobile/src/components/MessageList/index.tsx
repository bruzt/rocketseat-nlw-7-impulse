import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import io from "socket.io-client";

import { api } from "../../services/api";
import { Message, IMessage } from "../Message";

import { styles } from "./styles";

const messagesQueue: IMessage[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (message) => {
  messagesQueue.push(message);
});

let timer: NodeJS.Timer;

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    fetchMessages();

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
      clearInterval(timer);
      socket.disconnect();
    };
  }, []);

  async function fetchMessages() {
    try {
      const response = await api.get<IMessage[]>("/messages");

      setMessages(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        console.log(error);
      }
      Alert.alert("Erro", "Erro ao buscar mensagens");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {messages.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
}
