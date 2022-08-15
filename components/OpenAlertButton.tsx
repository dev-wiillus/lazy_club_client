import { useRouter } from 'next/router';
import { modaleVar } from '../apollo';
import useMe from '../utils/hooks/useMe';

type InputProps = {
	channelId?: number | string;
};

export default function OpenAlertButton({ channelId }: InputProps) {
	const { data: userData } = useMe();
	const router = useRouter();
	const onClick = () => {
		if (!userData?.me) {
			modaleVar(true);
		} else {
			router.push({ pathname: '/user/channels/reserve', query: { channelId } });
		}
	};
	return (
		<button className="btn btn-primary gap-2" onClick={onClick}>
			<svg
				className="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z"
					clipRule="evenodd"
				></path>
			</svg>
			채널 오픈 알림 신청
		</button>
	);
}
