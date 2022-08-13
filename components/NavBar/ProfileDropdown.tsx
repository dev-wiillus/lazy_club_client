import { useMemo } from 'react';
import SignIn from '../../pages/sign-in';
import useMe from '../../utils/hooks/useMe';
import useRole from '../../utils/hooks/useRole';
import Avatar from './Avatar';
import RoleChanger from './RoleChanger';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import SignUpButton from './SignUpButton';

export default function ProfileDropdown() {
	const { data } = useMe();

	const items = useMemo(() => {
		if (data?.me.role) {
			return [
				<RoleChanger className="w-full h-full" />,
				<SignOutButton className="w-full h-full" />,
			];
		}
		return [
			<SignInButton className="w-full h-full" />,
			<SignUpButton className="w-full h-full" />,
		];
	}, [data?.me.role]);
	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn btn-ghost rounded-btn gap-2">
				<Avatar />
				<svg
					className="w-6 h-6 text-gray-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					></path>
				</svg>
			</label>
			<ul
				tabIndex={0}
				className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
			>
				{items.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
}
