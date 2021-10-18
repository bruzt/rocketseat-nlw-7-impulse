import { FormEvent, useState } from "react";
import Img from "next/image";
import { FaGithub } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

import { Container } from "./styles";

export default function SendMessage() {
  const [text, setText] = useState("");

  async function handleLogout() {
    console.log("logout");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    console.log(text);
  }

  return (
    <Container>
      <div className="card">
        <header>
          <button title="Sair" onClick={handleLogout}>
            <RiLogoutBoxLine color="#E1E1E6" size="2rem" />
          </button>
        </header>

        <div className="card-main">
          <figure>
            <Img
              src={"https://avatars.githubusercontent.com/u/12144828?v=4"}
              alt="avatar"
              width="93.33"
              height="93.33"
            />
          </figure>

          <h2>Bruno Zutim</h2>
          <div className="github-user">
            <FaGithub color="#E1E1E6" size="1rem" />
            &nbsp;bruzt
          </div>

          <form className="message-input-container" onSubmit={handleSubmit}>
            <h3>Menssagem</h3>
            <textarea
              placeholder="Qual sua expectativa para o evento?"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <div className="send-button-container">
              <button>ENVIAR MENSAGEM</button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
