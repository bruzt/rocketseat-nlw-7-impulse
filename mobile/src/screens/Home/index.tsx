import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";

import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { SendMessageForm } from "../../components/SendMessageForm";
import { SigninBox } from "../../components/SigninBox";
import { useUserContext } from "../../contexts/UserContext";

import { styles } from "./styles";

export function Home() {
  const userContext = useUserContext();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS == "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Header />

        <MessageList />

        {userContext.user ? <SendMessageForm /> : <SigninBox />}
      </View>
    </KeyboardAvoidingView>
  );
}
