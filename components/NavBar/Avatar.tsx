import { UserSVG } from 'components/icons';
import Image from 'components/Image';
import React from 'react';
import useMe from '../../utils/hooks/useMe';

export default function Avatar() {
	const { data } = useMe();

	return (
		<div className="avatar">
			<div className="w-8 rounded-full">
				{data?.me.role && data.me.profile ? (
					<Image src={data.me.profile} width={32} height={32} />
				) : (
					<UserSVG />
				)}
			</div>
		</div>
	);
}
