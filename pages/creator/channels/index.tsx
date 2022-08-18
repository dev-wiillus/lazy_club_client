import { useLazyQuery, useMutation } from '@apollo/client';
import type { NextPage } from 'next';
import Image, { noImagePath } from 'components/Image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Seo from '../../../components/Seo';
import useMe from '../../../utils/hooks/useMe';
import useRole from '../../../utils/hooks/useRole';
import {
	FindChannel,
	FindChannelVariables,
} from '../../../__generated__/FindChannel';
import { FIND_CHANNEL_QUERY } from '../../../services/channel/gql';
import {
	CreateContent,
	CreateContentVariables,
} from '__generated__/CreateContent';
import { CREATE_CONTENT_MUTATION } from 'services/content/gql';
import { ContentStatusType } from '__generated__/globalTypes';
import MessageModal from 'components/Modal';
import FindAllContent from 'services/content/find-all';
import { AlertSVG } from 'components/icons';
import { AddComma } from 'utils/number';

const Channels: NextPage = () => {
	const [role] = useRole();
	const { data: userData } = useMe();
	const router = useRouter();
	const [request, { data, loading }] = useLazyQuery<
		FindChannel,
		FindChannelVariables
	>(FIND_CHANNEL_QUERY, {
		ssr: true,
		fetchPolicy: 'no-cache',
	});

	useEffect(() => {
		if (userData?.me.id) {
			request({
				variables: {
					input: {
						userId: userData?.me.id,
					},
				},
			});
		}
	}, [userData?.me.id]);
	const {
		id: channelId,
		thumbnail,
		hasDraftContent,
		alertsCount,
	} = data?.findChannel.results ?? {};
	const contentUrl = `/${role?.toLowerCase()}/contents`;
	const updateUrl = `${contentUrl}/update`;

	const onContentClick = (id: number) => {
		router.push({
			pathname: updateUrl,
			query: { contentId: id },
		});
	};

	const [createContentError, setCreateContentError] = useState(false);
	const onCompleted = (data: CreateContent) => {
		if (data.createContent.ok) {
			router.push({
				pathname: updateUrl,
				query: { contentId: data.createContent.results?.id },
			});
		} else {
			setCreateContentError(true);
		}
	};
	const [createContent] = useMutation<CreateContent, CreateContentVariables>(
		CREATE_CONTENT_MUTATION,
		{
			onCompleted,
		},
	);

	const onCreateContentClick = async () => {
		console.log(channelId);
		if (channelId) {
			await createContent({
				variables: {
					input: {
						channelId,
						status: ContentStatusType.PENDING,
					},
				},
			});
		}
	};
	return (
		<>
			<div className="grid grid-cols-1 p-6 gap-8 my-28">
				<Seo title="Channel" />
				<div>
					<h3 className="text-xl mb-2 font-bold">clubber's lounge</h3>
					<div className="flex gap-4 justify-end">
						<button className="btn" onClick={onCreateContentClick}>
							새 콘텐츠
						</button>
						<Link
							href={{
								pathname: updateUrl,
								query: { channelId },
							}}
						>
							<a>
								<button className="btn" disabled={!hasDraftContent}>
									임시 저장 불러오기
								</button>
							</a>
						</Link>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-8">
					<div>
						<h3 className="text-base mb-2 font-bold">내 채널</h3>
						<div>
							<Image
								src={thumbnail ?? noImagePath}
								alt="channel-image"
								width="500px"
								height="300px"
							/>
						</div>
						<div className="stat shadow-xl">
							<div className="stat-figure text-primary">
								<AlertSVG />
							</div>
							<div className="stat-title">채널 오픈 알림 예약</div>
							<div className="stat-value text-primary">
								{AddComma(alertsCount ?? 0)}
							</div>
							<div className="stat-desc">사전 신청자 수</div>
						</div>
					</div>
					<div>
						<h3 className="text-base mb-2 font-bold">인기 콘텐츠</h3>
						<FindAllContent channelId={channelId} onContentClick={onContentClick} />
					</div>
				</div>
			</div>
			<MessageModal
				title="에러"
				description="콘텐츠 페이지 이동 에러"
				state={createContentError}
				setState={setCreateContentError}
			/>
		</>
	);
};

export default Channels;
