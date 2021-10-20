import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  main {
    width: 100%;
    max-width: 84.375rem;

    margin: 0 auto;

    display: flex;
  }

  main .login-container {
    width: 100%;
    max-width: 28.3125rem;
    min-height: 100vh;

    background-image: url("login-background2.png");
    background-position: top center;
    background-repeat: no-repeat;
    background-color: #171719;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 34rem 5rem 5rem 5rem;
  }

  .login-container h1 {
    text-align: center;
    font-size: 2rem;
  }

  .login-container button {
    width: 16.125rem;
    height: 3.5rem;

    margin-top: 2rem;

    border: 0;
    background-color: #ffcd1f;

    font-weight: bold;
    font-size: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.2s;

    &:hover {
      filter: brightness(0.9);
    }

    &:active {
      filter: brightness(0.8);
    }
  }

  @media (max-width: 1400px) {
    main .messages-container {
      padding-left: 1rem;
    }
  }

  @media (max-width: 900px) {
    main {
      flex-direction: column;
      align-items: center;
    }

    main .messages-container {
      min-height: fit-content;

      display: flex;
      flex-direction: column;
      align-items: center;

      margin-bottom: 2rem;
    }

    main .login-container {
      max-width: 100%;
    }
  }
`;
