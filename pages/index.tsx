import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useMe from '../utils/hooks/useMe';
import useRole from '../utils/hooks/useRole';
import { UserRoleType } from '../__generated__/globalTypes';

// TODO: 라우터(/ -> user: /user, creator: /creator), 인증
// TODO: url로 강제 이동하면 에러
const Home: NextPage = () => {
	const { data } = useMe();
	const router = useRouter();
	const [role] = useRole();

	// TODO: 로그인시 useMe 제대로 못받아옴
	useEffect(() => {
		console.log(data?.me.role);
		console.log(role);
		if (data?.me.role !== UserRoleType.Creator) {
			console.log('---------------------');
			router.push('/user');
		} else {
			router.push(`/${role?.toLowerCase()}`);
		}
	}, [role, router, data?.me.role]);
	return <></>;
};

export default Home;
