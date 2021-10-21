import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

interface IProps {
  children: React.ReactNode;
}

interface IContext {
  user: IUser | null;
  isSigningIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

interface IUser {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface IAuthResponse {
  token: string;
  user: IUser;
}

interface IAuthorizationResponse {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
}

const tokenStorageKey = "nlw7:token";
const userStorageKey = "nlw7:user";

const Context = createContext({} as IContext);

export function UserContextProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    automaticLogin();
  }, []);

  async function automaticLogin() {
    setIsSigningIn(true);

    try {
      const token = await AsyncStorage.getItem(tokenStorageKey);
      const user = await AsyncStorage.getItem(userStorageKey);

      if (token && user) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(JSON.parse(user));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        console.log(error);
      }
      Alert.alert("Erro", "Erro ao logar");
    }

    setIsSigningIn(false);
  }

  async function login() {
    setIsSigningIn(true);

    const authUrl = `http://github.com/login/oauth/authorize?client_id=01a9134425ca1ec8e789&scope=user`;
    // &redirect_uri=https://auth.expo.io/@brunozutim/mobile

    try {
      const authSessionResponse = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationResponse;

      if (
        authSessionResponse.type === "success" &&
        authSessionResponse.params.error != "access_denied" &&
        authSessionResponse.params.code
      ) {
        const response = await api.post<IAuthResponse>("/authenticate", {
          code: authSessionResponse.params.code,
        });

        api.defaults.headers.common.authorization = `Bearer ${response.data.token}`;

        await AsyncStorage.setItem(tokenStorageKey, response.data.token);
        await AsyncStorage.setItem(
          userStorageKey,
          JSON.stringify(response.data.user)
        );

        setUser(response.data.user);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        console.log(error);
      }
      Alert.alert("Erro", "Erro ao logar");
    }

    setIsSigningIn(false);
  }

  async function logout() {
    api.defaults.headers.common.authorization = "";

    await AsyncStorage.removeItem(tokenStorageKey);
    await AsyncStorage.removeItem(userStorageKey);

    setUser(null);
  }

  return (
    <Context.Provider value={{ user, isSigningIn, login, logout }}>
      {children}
    </Context.Provider>
  );
}

export function useUserContext() {
  const context = useContext(Context);

  return context;
}
