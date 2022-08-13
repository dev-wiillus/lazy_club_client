import { useRouter } from 'next/router';
import { useCallback } from 'react';

type InputProps = {
	className?: string;
};

export default function SignInButton({ className='' }: InputProps) {
	const router = useRouter();

	const onClick = useCallback(async () => {
		await router.push('/sign-in');
	}, [router]);
	return (
		<div className={`btn btn-ghost ${className}`} onClick={onClick}>
			로그인
		</div>
	);
}
