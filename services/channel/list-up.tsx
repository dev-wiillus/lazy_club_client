import { useRouter } from 'next/router';
import {
	FindAllChannel,
	FindAllChannelVariables,
} from '../../__generated__/FindAllChannel';
import { useQuery } from '@apollo/client';
import { FIND_ALL_CHANNEL_QUERY } from './gql';
import Image, { noImagePath } from 'components/Image';
import { useState } from 'react';
import { AlertSVG } from 'components/icons';
import { AddComma } from 'utils/number';

export default function ListUp() {
	const router = useRouter();
	const onClick = (id: number, title: string) => {
		router.push(`${router.pathname}/channels/${title}/${id}`);
	};

	const [page, setPage] = useState(1);
	const { data, loading } = useQuery<FindAllChannel, FindAllChannelVariables>(
		FIND_ALL_CHANNEL_QUERY,
		{
			variables: {
				input: {
					page,
				},
			},
			ssr: true,
		},
	);

	const { results } = data?.findAllChannel ?? {};
	return (
		<>
			{results?.map(
				({
					id,
					title,
					thumbnail,
					operators,
					categories,
					description,
					alertsCount,
				}) => (
					<div
						onClick={() => onClick(id, title)}
						className="card card-side cursor-pointer bg-base-100 shadow-xl"
						key={id}
					>
						<figure>
							<Image
								src={thumbnail ?? noImagePath}
								alt="channel-image"
								width="200px"
								height="200px"
							/>
						</figure>
						<div className="card-body flex-row">
							<div className="flex flex-col flex-1">
								<h3 className="card-title mb-3">{title}</h3>
								<p>
									<span
										className="font-semibold"
										style={{ marginRight: '1rem' }}
									>
										채널 설명 요약
									</span>
									{description}
								</p>
								<p>
									<span
										className="font-semibold"
										style={{ marginRight: '1rem' }}
									>
										채널 카테고리
									</span>
									<span className="badge badge-secondary">
										{categories?.tag.name}
									</span>
								</p>
								<p>
									<span
										className="font-semibold"
										style={{ marginRight: '1rem' }}
									>
										채널 운영진
									</span>
									{operators?.map((operator, index) => (
										<span key={index} className="badge badge-outline">
											{operator.user.nickname}
										</span>
									))}
								</p>
							</div>
							<div className="card-actions flex items-center gap-2">
								<AlertSVG />
								<div className="badge badge-sm">{AddComma(alertsCount)}</div>
							</div>
						</div>
					</div>
				),
			)}
			{results?.length > 20 && (
				<button
					className="btn btn-primary"
					disabled={page !== 1}
					onClick={() => setPage(2)}
				>
					더보기
				</button>
			)}
		</>
	);
}
