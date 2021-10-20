import type { AppProps } from "next/app";

import GlobalStyles from "../styles/GlobalStyles";
import { UserContextProvider } from "../contexts/userContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
