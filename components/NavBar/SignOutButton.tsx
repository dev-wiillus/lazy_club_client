import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { authToken } from '../../apollo';
import { LOCALSTORAGE_TOKEN } from '../../utils/constants';

type InputProps = {
	className?: string;
};

export default function SignOutButton({ className }: InputProps) {
	const router = useRouter();
	const client = useApolloClient();

	const onClick = useCallback(() => {
		localStorage.removeItem(LOCALSTORAGE_TOKEN);
		authToken(null);
		// TODO: cache clear 제대로 되는지 확인
		client.clearStore();
		router.push('/sign-in');
	}, [router]);
	return (
		<div className={`btn btn-ghost ${className}`} onClick={onClick}>
			로그아웃
		</div>
	);
}
