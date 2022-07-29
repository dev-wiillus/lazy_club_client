import Head from "next/head";

type InputProps = {
  title: string;
};

export default function Seo({ title }: InputProps) {
  return (
    <Head>
      <title>{title} | Lazy Club</title>
    </Head>
  );
}
