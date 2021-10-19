import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 61rem;
  min-height: 100vh;

  background-image: url("send-message-background.png");
  background-position: center;
  background-size: auto 100%;
  background-repeat: no-repeat;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  .card {
    width: 28.3125rem;
    height: 36.125rem;

    background: #1b1b1f;

    margin-left: -7rem;
  }

  .card header {
    padding: 1rem 0 0 1rem;
  }

  header button {
    border: 0;
    background: transparent;

    transition: 0.2s;

    &:hover {
      filter: brightness(1.1);
    }

    &:active {
      filter: brightness(1.2);
    }
  }

  .card-main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-main figure {
    width: 7rem;
    height: 7rem;

    display: flex;
    justify-content: center;
    align-items: center;

    background: linear-gradient(
      to right,
      rgba(253, 25, 131, 1),
      rgba(254, 181, 44, 1)
    );

    border-radius: 50%;
  }

  figure img {
    border-radius: 50%;

    padding: 0.4rem !important;

    background: #1b1b1f;
  }

  .card-main h2 {
    margin-top: 1rem;
  }

  .card-main .github-user {
    margin-top: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-main .message-input-container {
    width: 25.3125rem;

    margin-top: 2rem;
  }

  .message-input-container h3 {
    padding: 1.5rem;

    background: #29292e;
  }

  .message-input-container textarea {
    width: 100%;
    height: 10rem;

    border-style: none;
    border-color: Transparent;
    overflow: hidden;
    resize: none;

    background: #202024;

    padding: 1rem;
  }

  .message-input-container .send-button-container {
    background: #202024;

    margin-top: -0.5rem;
    padding: 1rem;

    display: flex;
    justify-content: flex-end;
  }

  .send-button-container button {
    width: 12.1875rem;
    height: 2.5rem;

    border: 0;
    background: #ff008e;
    color: #ffffff;
    font-weight: bold;

    transition: 0.2s;

    &:hover {
      filter: brightness(0.9);
    }

    &:active {
      filter: brightness(0.8);
    }
  }

  @media (max-width: 1300px) {
    .card {
      margin-left: -5rem;
    }
  }

  @media (max-width: 1200px) {
    .card {
      margin-left: -3rem;
    }
  }

  @media (max-width: 1100px) {
    .card {
      margin-left: -1rem;
    }
  }

  @media (max-width: 1000px) {
    .card {
      margin-left: 0;
    }
  }

  @media (max-width: 900px) {
    justify-content: center;
    align-items: flex-start;
  }
`;
