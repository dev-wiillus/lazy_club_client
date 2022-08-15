import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useRole from '../../utils/hooks/useRole';
import { UserRoleType } from '../../__generated__/globalTypes';

export type NavItemType = {
	href: string;
	text: string;
};

function NavItem({ href, text }: NavItemType) {
	const router = useRouter();
	return (
		<li>
			<Link href={href}>
				<a
					className={`${
						router.pathname === href ? 'text-red-500' : ''
					} font-semibold text-sm`}
				>
					{text}
				</a>
			</Link>
		</li>
	);
}

export default function Menu() {
	const [role] = useRole();
	const navItems: NavItemType[] = [
		{
			href: `/${role?.toLowerCase()}`,
			text: 'Home',
		},
	];

	if (role === UserRoleType.Creator) {
		navItems.splice(1, 0, {
			href: `/creator/channels`,
			text: 'Channel',
		});
	}
	return (
		<div className="dropdown">
			<label tabIndex={0} className="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</label>
			<ul
				tabIndex={0}
				className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				{navItems.map((item) => (
					<NavItem key={item.href} {...item} />
				))}
			</ul>
		</div>
	);
}
