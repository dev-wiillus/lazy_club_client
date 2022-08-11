import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useMe from '../utils/hooks/useMe';
import useRole from '../utils/hooks/useRole';

// TODO: 라우터(/ -> user: /user, creator: /creator), 인증
// TODO: url로 강제 이동하면 에러
const Home: NextPage = () => {
	const { data: userData } = useMe();
	const router = useRouter();
	const [role] = useRole();

	useEffect(() => {
		router.push(`/${role}`);
	}, [role, router]);
	return <></>;
};

export default Home;
