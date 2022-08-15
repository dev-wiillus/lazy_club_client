import React from 'react';
import Logo from '../Logo';
import Menu from './Menu';
import Link from 'next/link';
import useMe from '../../utils/hooks/useMe';
import ProfileDropdown from './ProfileDropdown';

export default function NavBar() {
	return (
			<div className="navbar bg-white">
				<div className="navbar-start gap-2">
					<Menu />
					<Link href="/">
						<div className="cursor-pointer">
							<Logo />
						</div>
					</Link>
				</div>
				<div className="navbar-end gap-2">
					<ProfileDropdown />
				</div>
			</div>
	);
}
