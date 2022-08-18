import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useMe from '../utils/hooks/useMe';
import useRole from '../utils/hooks/useRole';
import { UserRoleType } from '../__generated__/globalTypes';

// TODO: 인증
// TODO: url로 강제 이동하면 role과 꼬임
const Home: NextPage = () => {
	const { data } = useMe();
	const router = useRouter();
	const [role] = useRole();

	useEffect(() => {
		if (data?.me.role !== UserRoleType.Creator) {
			router.push('/user');
		} else {
			router.push(`/${role?.toLowerCase()}`);
		}
	}, [role, router, data?.me.role]);
	return <></>;
};

export default Home;
