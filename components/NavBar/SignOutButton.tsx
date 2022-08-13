import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { authToken, isLoggedInVar } from '../../apollo';
import { LOCALSTORAGE_TOKEN } from '../../utils/constants';

type InputProps = {
	className?: string;
};

export default function SignOutButton({ className }: InputProps) {
	const router = useRouter();

	const onClick = useCallback(() => {
		localStorage.removeItem(LOCALSTORAGE_TOKEN);
		authToken(null);
		isLoggedInVar(false);
		router.push('/sign-in');
	}, [router]);
	return (
		<div className={`btn btn-ghost ${className}`} onClick={onClick}>
			로그아웃
		</div>
	);
}
