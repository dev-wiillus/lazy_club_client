import { useRouter } from 'next/router';
import Image from 'next/image';
import { imageLoader } from '../../utils/imageLoader';
import {
	FindAllChannel,
	FindAllChannelVariables,
} from '../../__generated__/FindAllChannel';
import { gql, useQuery } from '@apollo/client';
import { FIND_ALL_CHANNEL_QUERY } from './gql';

export default function ListUp() {
	const router = useRouter();
	const onClick = (id: string, title: string) => {
		router.push(`${router.pathname}/${title}/${id}`);
	};

	const { data, loading } = useQuery<FindAllChannel, FindAllChannelVariables>(
		FIND_ALL_CHANNEL_QUERY,
		{
			variables: {
				input: {
					page: 1,
				},
			},
		},
	);

	const { results } = data?.findAllChannel ?? {};
	return (
		<>
			{results?.map(({ id, title, thumbnail, operators }) => (
				<div
					// onClick={() => onClick(movie.id, movie.original_title)}
					className="card card-side cursor-pointer shadow-xl"
					key={id}
				>
					<Image
						loader={imageLoader}
						src={`${thumbnail}`}
						alt="channel-image"
						width={200}
						height={200}
					/>
					<div className="card-body flex-row">
						<div className="flex flex-col flex-1">
							<h3 className="card-title">{title}</h3>
							<p>채널 설명 요약</p>
							<p>채널 카테고리</p>
							<p>
								{operators?.map((operator) =>
									operator.user.nickname.split(','),
								)}
							</p>
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
		</>
	);
}
