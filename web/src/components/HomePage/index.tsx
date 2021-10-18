import Img from "next/image";
import { FaGithub } from "react-icons/fa";

import Message from "../Message";
import SendMessage from "../SendMessage";
import { Container } from "./styles";

export default function HomePage() {
  return (
    <Container>
      <main>
        <div className="messages-container">
          <figure>
            <Img src="/logo.png" alt="logo" layout="fill" objectFit="contain" />
          </figure>

          <div className="messages">
            <Message
              text={
                "Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥"
              }
              avatarUrl={"https://avatars.githubusercontent.com/u/12144828?v=4"}
              username={"Bruno Zutim"}
            />

            <Message
              text={
                "Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥"
              }
              avatarUrl={"https://avatars.githubusercontent.com/u/12144828?v=4"}
              username={"Bruno Zutim"}
            />

            <Message
              text={
                "Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥"
              }
              avatarUrl={"https://avatars.githubusercontent.com/u/12144828?v=4"}
              username={"Bruno Zutim"}
            />
          </div>
        </div>

        <div className="login-container">
          <h1>Envie e compartilhe sua mensagem</h1>

          <button>
            <FaGithub color="#090909" size="1.5rem" />
            &nbsp;Entrar com Github
          </button>
        </div>

        {/*<SendMessage />*/}
      </main>
    </Container>
  );
}
