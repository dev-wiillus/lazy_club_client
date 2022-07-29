import type { NextPage } from "next";
import Seo from "../../../components/Seo";
import { useRouter } from "next/router";
import Image from "next/image";
import { imageLoader } from "../../../utils/imageLoader";

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
    router.push(`${router.pathname}/${title}/${id}`);
  };
  return (
    <div className="grid grid-cols-1 p-6 gap-4">
      <Seo title="Channel" />
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="card card-side cursor-pointer shadow-xl"
          key={movie.id}
        >
          <Image
            loader={imageLoader}
            src={`/t/p/w500${movie.poster_path}`}
            alt="channel-image"
            width={200}
            height={200}
          />
          <div className="card-body flex-row">
            <div className="flex flex-col flex-1">
              <h4 className="card-title">{movie.original_title}</h4>
              <p>채널 설명 요약</p>
              <p>채널 카테고리</p>
              <p>채널 운영자들</p>
            </div>
            <div className="card-actions items-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <div className="badge badge-sm">987,654</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Channels;
