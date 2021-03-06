import { HTMLAttributes } from "react";
import Img from "next/image";

import { Container } from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  avatarUrl: string;
  username: string;
}

export default function Message({
  text,
  avatarUrl,
  username,
  ...rest
}: IProps) {
  return (
    <Container {...rest}>
      <p>{text}</p>

      <div className="user">
        <figure>
          <Img
            src={avatarUrl}
            alt={username + " avatar"}
            width={30}
            height={30}
          />
        </figure>
        <span>&nbsp;&nbsp;{username}</span>
      </div>
    </Container>
  );
}
