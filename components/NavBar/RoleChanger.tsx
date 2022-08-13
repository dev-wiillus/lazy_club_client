import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import useRole from '../../utils/hooks/useRole';

type InputProps = {
	className?: string;
};

export default function RoleChanger({ className }: InputProps) {
	const router = useRouter();
	const [role, setRole] = useRole();

	const onRoleChange = useCallback(() => {
		const newRole = role === 'creator' ? 'user' : 'creator';
		setRole(newRole);
		router.replace('/');
	}, [role, setRole]);

	const [roleText, anotherRoleText] = useMemo(() => {
		const user = '유저';
		const clubber = '클러버';
		return role === 'creator' ? [user, clubber] : [clubber, user];
	}, [role]);

	return (
		<div className={`btn btn-ghost gap-1 ${className}`} onClick={onRoleChange}>
			<svg
				className="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
				/>
			</svg>
			<span className="font-medium">{roleText}</span>
		</div>
	);
}
