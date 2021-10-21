import React, { useState } from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";

import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SendMessageForm() {
  const [text, setText] = useState("");
  const [SendingMessage, setSendingMessage] = useState(false);

  async function sendMessage() {
    setSendingMessage(true);

    try {
      if (text.trim().length > 0) {
        await api.post("/messages", {
          message: text,
        });

        Keyboard.dismiss();
        setText("");
      } else {
        Alert.alert("Mensagem", "Escreva a sua mensagem antes de enviar");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
      Alert.alert("Erro", "Erro ao enviar mensagem");
    }

    setSendingMessage(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        editable={SendingMessage == false}
        value={text}
        onChangeText={(value) => setText(value)}
        style={styles.textInput}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={SendingMessage}
        onPress={sendMessage}
      />
    </View>
  );
}
