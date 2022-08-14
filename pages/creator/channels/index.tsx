import { gql, useLazyQuery, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Seo from '../../../components/Seo';
import useMe from '../../../utils/hooks/useMe';
import useRole from '../../../utils/hooks/useRole';
import {
	FindChannel,
	FindChannelVariables,
} from '../../../__generated__/FindChannel';
import lazyClubLogo from '../../../public/LAZYBLUB_blk.png';
import { FIND_CHANNEL_QUERY } from '../../../services/channel/gql';

const Channels: NextPage = () => {
	const [role] = useRole();
	const { data: userData } = useMe();
	const router = useRouter();
	const [request, { data, loading }] = useLazyQuery<
		FindChannel,
		FindChannelVariables
	>(FIND_CHANNEL_QUERY);

	useEffect(() => {
		if (userData?.me.id) {
			request({
				variables: {
					input: {
						operatorId: userData?.me.id,
					},
				},
			});
		}
	}, [userData?.me.id]);
	const {
		id: channelId,
		thumbnail,
		contents,
	} = data?.findChannel.results ?? {};
	const contentUrl = `/${role}/contents`;
	const createUrl = `${contentUrl}/create`;
	const updateUrl = `${contentUrl}/update`;

	const onContentClick = () => {
		router.push(
			{
				pathname: updateUrl,
				query: { status: 'NORMAL', channelId },
			},
			updateUrl,
		);
	};
	return (
		<div className="grid grid-cols-1 p-6 gap-8">
			<Seo title="Channel" />
			<div>
				<h3 className="text-base mb-2 font-medium">clubber's lounge</h3>
				<div className="flex gap-4 justify-end">
					<Link
						href={{
							pathname: createUrl,
							query: { status: 'NORMAL', channelId },
						}}
						as={createUrl}
					>
						<button className="btn">새 콘텐츠</button>
					</Link>
					<Link
						href={{
							pathname: updateUrl,
							query: { status: 'DRAFT', channelId },
						}}
						as={updateUrl}
					>
						<button className="btn">임시 저장</button>
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-8">
				<div>
					<h3 className="text-base mb-2 font-medium">내 채널</h3>
					<div>
						<Image
							src={lazyClubLogo}
							alt="channel-image"
							width="500px"
							height="96rem"
						/>
					</div>
				</div>
				{/* <div className="grid grid-cols-3">
					<div>
						<h3 className="text-base mb-2 font-medium">구독자 수</h3>
						<div></div>
					</div>
					<div>
						<h3 className="text-base mb-2 font-medium">조회 수</h3>
						<div></div>
					</div>
					<div>
						<h3 className="text-base mb-2 font-medium">좋아요 수</h3>
						<div></div>
					</div>
				</div> */}
				<div>
					<h3 className="text-base mb-2 font-medium">인기 콘텐츠</h3>
					<div>
						{contents?.map(({ id, title, category, hit, contentFiles }) => {
							const { file: mainImageUrl = '' } =
								contentFiles?.find((content) => content.isPreview) ?? {};
							return (
								<div
									onClick={onContentClick}
									className="card card-side cursor-pointer shadow-xl"
									key={id}
								>
									<Image
										src={mainImageUrl}
										alt="content-main-image"
										width={200}
										height={200}
									/>
									<div className="card-body flex-row">
										<div className="flex flex-col flex-1">
											<h4 className="card-title">{title}</h4>
											<p>{category}</p>
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
											<div className="badge badge-sm">{hit}</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Channels;
