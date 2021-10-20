import { FaGithub } from "react-icons/fa";

import MessageList from "../MessageList";
import SendMessage from "../SendMessage";
import { useUser } from "../../contexts/userContext";

import { Container } from "./styles";

export default function HomePage() {
  const userContext = useUser();

  async function handleLoginWithGithub() {
    userContext.redirectToGithubOauth();
  }

  return (
    <Container>
      <main>
        <MessageList />

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
