import styled from "styled-components";

export const Container = styled.div`
  animation: fade-in 1s ease forwards;

  p {
    max-width: 27.5rem;

    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .user {
    display: flex;
    align-items: center;

    padding: 0 !important;
    margin: 1.5rem 0 0 0 !important;
  }

  .user figure {
    width: 3rem !important;
    height: 3rem !important;

    margin: 0 !important;

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

  .user figure img {
    border-radius: 50%;

    padding: 0.35rem !important;
    background: #121214;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
