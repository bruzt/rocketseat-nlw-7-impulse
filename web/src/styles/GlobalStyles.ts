import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    html {
        font-size: 16px;
    }
  
    @media (max-width: 1080px){
        html {
            font-size: 93.75%;
        }
    }

    @media (max-width: 720px){
        html {
            font-size: 87.5%;
        }
    }

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
    }

    body {
        background: #121214;
        color: #E1E1E6;
        font-family: Roboto, Arial, Helvetica, sans-serif;
        font-size: 16px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    input, select, textarea {
        background: #29292E;
        font-family: inherit;
        color: inherit;
    }

    button {
        cursor: pointer;
        font: inherit;
    }
`;
