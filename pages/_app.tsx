import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider}from "@apollo/client"
import { client } from "../apollo";
import Auth from "../services/Auth";


function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
    <SessionProvider session={session}>
      <Auth>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </Auth>
    </SessionProvider>
    </ApolloProvider>
  );
}

export default App;
