import { FormEvent, useState } from "react";
import Img from "next/image";
import { FaGithub } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";

import { api } from "../../services/api";
import { useUser } from "../../contexts/userContext";

import { Container } from "./styles";

export default function SendMessage() {
  const [text, setText] = useState("");

  const userContext = useUser();

  async function handleLogout() {
    userContext.logout();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      if (text.trim().length > 0) {
        await api.post("/messages", {
          message: text,
        });

        setText("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      alert("Erro ao enviar mensagem");
    }
  }

  if (userContext.user == null) return <div></div>;

  return (
    <Container>
      <div className="card">
        <header>
          <button title="Sair" onClick={handleLogout}>
            <VscSignOut color="#E1E1E6" size="2rem" />
          </button>
        </header>

        <div className="card-main">
          <figure>
            <Img
              src={userContext.user.avatar_url}
              alt="avatar"
              width="93.33"
              height="93.33"
            />
          </figure>

          <h2>{userContext.user.name}</h2>
          <div className="github-user">
            <FaGithub color="#E1E1E6" size="1rem" />
            &nbsp;{userContext.user.login}
          </div>

          <form className="message-input-container" onSubmit={handleSubmit}>
            <label htmlFor="message">Menssagem</label>
            <textarea
              id="message"
              placeholder="Qual sua expectativa para o evento?"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <div className="send-button-container">
              <button type="submit">ENVIAR MENSAGEM</button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
