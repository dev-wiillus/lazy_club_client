import type { NextPage } from "next";
import Seo from "../../../components/Seo";
import Image from "next/image";
import { imageLoader } from "../../../utils/imageLoader";

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

type DetailProps = {
  params?: ChannelDetailParams;
  movie: MovieType;
};

const ChannelDetail: NextPage<DetailProps> = ({ params, movie }) => {
  return (
    <>
      <Seo title={movie?.title} />
      <h1>{movie?.title}</h1>
      <div className="flex flex-col w-full">
        <Image
          loader={imageLoader}
          src={`/t/p/w500${movie?.poster_path}`}
          alt="channel-image"
          width="100%"
          height="100%"
        />
        <div>클럽 버튼</div>
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
          <a className="tab tab-bordered">콘텐츠</a>
          <a className="tab tab-bordered">커뮤니티</a>
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
  return {
    props: {
      params,
      movie,
    },
  };
}
