import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1fr;
  min-height: 100vh;

  figure {
    position: relative;

    width: 17.5rem;
    height: 1.5rem;

    margin-top: 2rem;
  }

  .messages {
    margin-top: 10rem;
  }

  .messages div:nth-child(2) {
    padding-left: 5rem;

    margin: 2.5rem 0;
  }
`;
