import type { NextPage } from "next";
import Seo from "../../../components/Seo";
import Image from "next/image";
import { imageLoader } from "../../../utils/imageLoader";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

type ChannelDetailParams = string[] | undefined;

type MovieType = {
  title: string;
  overview: string;
  poster_path?: string;
  production_companies: {
    logo_path?: string;
    name: string;
    origin_country: string;
  }[];
  genres: { name: string }[];
};

type MovieListType = {
  id: string;
  name: string;
  description: string;
  poster_path: string;
};

type DetailProps = {
  params?: ChannelDetailParams;
  movie: MovieType;
  movieList: MovieListType[];
};

const ChannelDetail: NextPage<DetailProps> = ({ params, movie, movieList }) => {
  const [tab, setTab] = useState(0);

  const router = useRouter();
  const onClick = (id: string, title: string) => {
    // TODO: session이 없을 경우 signIn 연결되는 hook이나 함수 만들기
    signIn("kakao");
    // router.push(`${router.pathname}/${title}/${id}`);
  };
  return (
    <>
      <Seo title={movie?.title} />
      <div className="flex flex-col w-full gap-4">
        <div className="hero bg-base-200">
          <div className="hero-content flex-col">
            <Image
              loader={imageLoader}
              src={`/t/p/w500${movie?.poster_path}`}
              alt="channel-image"
              width="500px"
              height="500px"
            />
            <div>
              <h1 className="text-5xl font-bold">{movie?.title}</h1>
              <p className="py-6">{movie?.overview}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly">
          <button className="btn btn-ghost gap-2">
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
            110,222
          </button>
          <button className="btn btn-ghost gap-2">
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            공유
          </button>
        </div>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Clubbers</h2>
            <div className="grid grid-cols-2 gap-4">
              {movie?.production_companies.map(
                ({ name, logo_path, origin_country }, index) => (
                  <div className="stat" key={index}>
                    <div className="stat-figure">
                      <div className="avatar online">
                        <div className="w-16 rounded-full">
                          <Image
                            loader={imageLoader}
                            src={`/t/p/w500${logo_path}`}
                            alt="company-image"
                            layout="fill"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="stat-title">{name}</div>
                    <div className="stat-desc text-secondary">
                      {origin_country}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="tabs">
          <a
            className={`tab tab-bordered w-1/2 ${tab === 0 && "tab-active"}`}
            onClick={() => setTab(0)}
          >
            콘텐츠
          </a>
          <a
            className={`tab tab-bordered w-1/2 ${
              tab === 1 && "tab-active"
            } hover:cursor-not-allowed`}
            // onClick={() => setTab(1)}
          >
            커뮤니티
          </a>
        </div>
        <div className="grid grid-cols-1 p-6 gap-4" aria-label="tab container">
          {tab === 0 ? (
            <>
              {movieList?.map((movie) => (
                <div
                  onClick={() => onClick(movie.id, movie.name)}
                  className="card card-side cursor-pointer shadow-xl"
                  key={movie.id}
                >
                  <Image
                    loader={imageLoader}
                    src={`/t/p/w500${movie.poster_path}`}
                    alt="channel-image"
                    width="100%"
                    height={200}
                  />
                  <div className="card-body flex-row">
                    <div className="flex flex-col flex-1">
                      <h4 className="card-title">{movie.name}</h4>
                      <p>{movie.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ChannelDetail;

export async function getServerSideProps({ params: { params } }: any) {
  const movie = await (
    await fetch(`http://localhost:3000/api/movies/${params[1]}`)
  ).json();
  const { results: movieList } = await (
    await fetch(`http://localhost:3000/api/movies/${params[1]}/lists`)
  ).json();
  return {
    props: {
      params,
      movie,
      movieList,
    },
  };
}
