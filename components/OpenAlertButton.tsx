import { useLazyQuery, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CHECK_OPEN_ALERT_QUERY } from 'services/user/gql';
import {
	CheckOpenAlertQuery,
	CheckOpenAlertQueryVariables,
} from '__generated__/CheckOpenAlertQuery';
import { modaleVar } from '../apollo';
import useMe from '../utils/hooks/useMe';
import { MailSVG } from './icons';

type InputProps = {
	channelId?: number | string;
};

export default function OpenAlertButton({ channelId }: InputProps) {
	const { data: userData } = useMe();
	const [request, { data }] = useLazyQuery<
		CheckOpenAlertQuery,
		CheckOpenAlertQueryVariables
	>(CHECK_OPEN_ALERT_QUERY);
	const router = useRouter();
	const onClick = () => {
		if (!userData?.me) {
			modaleVar(true);
		} else {
			router.push({ pathname: '/user/channels/reserve', query: { channelId } });
		}
	};
	useEffect(() => {
		if (channelId) {
			request({
				variables: {
					input: {
						channelId: +channelId,
					},
				},
			});
		}
	}, [channelId]);
	return (
		<>
			<button
				className="btn btn-primary gap-2"
				disabled={data?.checkOpenAlert}
				onClick={onClick}
			>
				<MailSVG />
				채널 오픈 알림 신청
			</button>
		</>
	);
}
