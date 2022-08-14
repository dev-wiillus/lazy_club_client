import type { NextPage } from 'next';
import Seo from '../../components/Seo';
import Home from '../../services/home';

const User: NextPage = () => {
	return (
		<>
			<Seo title="유저 라운지" />
			<Home />
		</>
	);
};

export default User;
