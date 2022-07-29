import type { NextPage } from "next";
import Seo from "../../../components/Seo";
import { useRouter } from "next/router";
import Link from "next/link";

type ContentType = {
  id: string;
  original_title: string;
  poster_path: string;
};

type DataType = {
  results: ContentType[];
};

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}

const Channels: NextPage<DataType> = ({ results }) => {
  const router = useRouter();
  const onClick = (id: string, title: string) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div className="grid grid-cols-1 p-6 g-4">
      <Seo title="Channel" />
      <h1>Channel</h1>
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="cursor-pointer"
          key={movie.id}
        >
          <img
            className="max-w-full rounded-xl transition-transform shadow hover:scale-100"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
          <h4 className="text-center text-base">
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Channels;
