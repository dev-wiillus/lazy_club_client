import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { authToken, roleModeVar } from '../../apollo';
import {
	LOCALSTORAGE_TOKEN,
	LOCALSTORAGE_ROLE_MODE,
} from '../../utils/constants';

type InputProps = {
	className?: string;
};

export default function SignOutButton({ className }: InputProps) {
	const router = useRouter();
	const client = useApolloClient();

	const onClick = useCallback(() => {
		localStorage.removeItem(LOCALSTORAGE_TOKEN);
		localStorage.removeItem(LOCALSTORAGE_ROLE_MODE);
		authToken(null);
		roleModeVar(null);
		client.clearStore();
		router.push('/sign-in');
	}, [router]);
	return (
		<div className={`btn btn-ghost ${className}`} onClick={onClick}>
			로그아웃
		</div>
	);
}
