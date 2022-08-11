import React from 'react';
import RoleChanger from './RoleChanger';
import Logo from './Logo';
import Menu from './Menu';
import Avatar from './Avatar';
import Link from 'next/link';
import useMe from '../../utils/hooks/useMe';

export default function NavBar() {
	const { data } = useMe();
	return (
		<>
			{data?.me && !data?.me.verified && (
				<div className="bg-red-500 p-3 text-center text-base text-white">
					<span>이메일에서 인증 메시지를 확인하세요.</span>
				</div>
			)}
			<div className="navbar bg-base-100">
				<div className="navbar-start gap-2">
					<Menu />
					<Link href="/">
						<div className="cursor-pointer">
							<Logo />
						</div>
					</Link>
				</div>
				<div className="navbar-end gap-2">
					<RoleChanger />
					<Link href="/my-profile">
						<div className="cursor-pointer">
							<Avatar />
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}
