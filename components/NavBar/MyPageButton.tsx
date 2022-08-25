import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useRole from 'utils/hooks/useRole';

type InputProps = {
	className?: string;
};

export default function MyPageButton({ className = '' }: InputProps) {
	const router = useRouter();
	const [role] = useRole();

	const onClick = useCallback(async () => {
		await router.push(`/${role?.toLowerCase()}/my-page`);
	}, [router]);
	return (
		<div className={`btn btn-ghost ${className}`} onClick={onClick}>
			내정보 수정
		</div>
	);
}
