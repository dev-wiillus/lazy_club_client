import { useRouter } from 'next/router';
import { useCallback } from 'react';

type InputProps = {
	className?: string;
};

export default function SignUpButton({ className }: InputProps) {
	const router = useRouter();

	const onClick = useCallback(() => {
		router.push('/sign-up');
	}, [router]);
	return (
		<div className={`btn btn-ghost ${className}`} onClick={onClick}>
				회원가입
			</div>
	);
}
