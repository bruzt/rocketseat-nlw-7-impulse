import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

import { api } from "../services/api";

interface IProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  github_id: number;
  avatar_url: string;
  login: string;
}

interface IUserContext {
  user: IUser | undefined;
  redirectToGithubOauth: () => void;
  logout: () => void;
}

const Context = createContext({} as IUserContext);

export function UserContextProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser>();

  const router = useRouter();

  const code = router.query.code;

  useEffect(() => {
    loginWithJwt();
  }, []);

  useEffect(() => {
    if (code && typeof code == "string") {
      login(code);
    }
  }, [code]);

  function redirectToGithubOauth() {
    if (process.browser) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user&client_id=01a9134425ca1ec8e789`
      );
    }
  }

  async function login(code: string) {
    try {
      const response = await api.post<{ user: IUser; token: string }>(
        "/authenticate",
        {
          code,
        }
      );

      api.defaults.headers.common.authorization = `Bearer ${response.data.token}`;

      sessionStorage.setItem("nlw7:token", response.data.token);

      setUser(response.data.user);

      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
      alert("Erro ao logar");
    }
  }

  function logout() {
    api.defaults.headers.common.authorization = "";

    setUser(undefined);

    sessionStorage.removeItem("nlw7:token");
  }

  async function loginWithJwt() {
    const token = sessionStorage.getItem("nlw7:token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      try {
        const response = await api.get<IUser>("/profile");

        setUser(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        alert("Erro ao logar automatico");
      }
    }
  }

  return (
    <Context.Provider value={{ user, logout, redirectToGithubOauth }}>
      {children}
    </Context.Provider>
  );
}

export function useUser() {
  const context = useContext(Context);

  return context;
}
