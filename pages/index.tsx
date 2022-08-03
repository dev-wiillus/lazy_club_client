import type { NextPage } from "next";
import Seo from "../components/Seo";
import { ApolloProvider}from "@apollo/client"
import { client } from "../apollo";

const Home: NextPage = () => {
  return (
    <ApolloProvider client={client}>
      <Seo title="Home" />
      <h1>HOME</h1>
    </ApolloProvider>
  );
};

export default Home;
