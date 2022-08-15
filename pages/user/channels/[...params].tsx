import type { NextPage } from 'next';
import Seo from '../../../components/Seo';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { FIND_CHANNEL_QUERY } from '../../../services/channel/gql';
import {
	FindChannel,
	FindChannelVariables,
} from '../../../__generated__/FindChannel';
import useMe from '../../../utils/hooks/useMe';
import OpenAlertButton from '../../../components/OpenAlertButton';
import LoginRequiredModal from '../../../components/LoginRequiredModal';
import { modaleVar } from '../../../apollo';

type ChannelDetailParams = string[] | undefined;

export function getServerSideProps({ params: { params } }: any) {
	return {
		props: {
			params,
		},
	};
}

type DetailProps = {
	params?: ChannelDetailParams;
};

const ChannelDetail: NextPage<DetailProps> = ({ params }) => {
	const channelId = useMemo(() => {
		if (params && params[1]) {
			return +params[1];
		}
		return undefined;
	}, [params]);
	const [tab, setTab] = useState(0);
	const [request, { data }] = useLazyQuery<FindChannel, FindChannelVariables>(
		FIND_CHANNEL_QUERY,
		{
			ssr: true,
		},
	);
	const { data: userData } = useMe();
	const router = useRouter();
	const onClick = (id: string, title: string) => {
		if (!userData?.me) {
			modaleVar(true);
		} else {
			router.push(`/user/contents/${title}/${id}`);
		}
	};
	useEffect(() => {
		if (channelId) {
			request({
				variables: {
					input: {
						channelId: +(channelId ?? ''),
					},
				},
			});
		}
	}, [channelId]);
	const { title, thumbnail, description, operators, contents, categories } =
		data?.findChannel.results ?? {};
	return (
		<>
			<Seo title={title ?? 'Channel'} />
			<div className="flex flex-col gap-8 pt-16">
				<div className="card bg-base-100 shadow-xl">
					<figure>
						<img src="https://placeimg.com/1000/800/arch" alt="channel-img" />
					</figure>
					<div className="card-body">
						<h2 className="card-title">
							{title}
							<div className="badge badge-secondary">
								{categories?.tag.name}
							</div>
						</h2>
						<p>{description}</p>
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
					<OpenAlertButton channelId={channelId} />
				</div>
				<div>
					<h2 className="font-medium text-xl">Clubbers</h2>
					<div className="grid grid-cols-2 gap-4">
						{operators?.map(({ user: { nickname } }, index) => (
							<div className="card shadow-lg" key={index}>
								<div className="card-body stat">
									<div className="stat-figure">
										<div className="avatar online">
											<svg
												className="w-16 h-16"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
													clipRule="evenodd"
												></path>
											</svg>
										</div>
									</div>
									<div className="stat-title">{nickname}</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="tabs">
					<a
						className={`tab tab-bordered w-1/2 ${tab === 0 && 'tab-active'}`}
						onClick={() => setTab(0)}
					>
						콘텐츠
					</a>
					<a
						className={`tab tab-bordered w-1/2 ${
							tab === 1 && 'tab-active'
						} hover:cursor-not-allowed`}
						// onClick={() => setTab(1)}
					>
						커뮤니티 (준비 중)
					</a>
				</div>
				<div className="grid grid-cols-1 p-6 gap-4" aria-label="tab container">
					{tab === 0 ? (
						<>
							{contents?.map((content) => (
								<div
									onClick={() => onClick(content.id + '', content.title)}
									className="card card-compact cursor-pointer bg-base-100 shadow-xl"
									key={content.id}
								>
									<figure>
										<img
											src="https://placeimg.com/1000/800/arch"
											alt="content-main-img"
										/>
									</figure>
									<div className="card-body flex-row">
										<div className="flex flex-col flex-1">
											<h4 className="card-title">{content.title}</h4>
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
			<LoginRequiredModal />
		</>
	);
};

export default ChannelDetail;
