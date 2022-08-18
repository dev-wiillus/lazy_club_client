import type { NextPage } from 'next';
import Seo from '../../../components/Seo';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { AlertSVG, ShareSVG } from 'components/icons';
import { AddComma } from 'utils/number';
import Image, { noImagePath } from 'components/Image';
import FindAllContent from 'services/content/find-all';

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
	const onContentClick = useCallback(
		(id: number) => {
			if (!userData?.me) {
				modaleVar(true);
			} else {
				router.push({ pathname: '/user/contents', query: { contentId: id } });
			}
		},
		[userData?.me],
	);
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
	}, [request, channelId]);
	const { title, thumbnail, description, operators, categories, alertsCount } =
		data?.findChannel.results ?? {};
	return (
		<>
			<Seo title={title ?? 'Channel'} />
			<div className="flex flex-col gap-8 my-28">
				<div className="card bg-base-100 shadow-xl">
					<figure>
						<Image
							src={thumbnail ?? noImagePath}
							alt="channel-img"
							width={640}
							height={480}
						/>
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
						<AlertSVG />
						{AddComma(alertsCount ?? 0)}
					</button>
					<button className="btn btn-ghost gap-2">
						<ShareSVG />
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
						<FindAllContent
							channelId={channelId}
							onContentClick={onContentClick}
						/>
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
