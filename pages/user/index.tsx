import type { NextPage } from 'next';
import Seo from '../../components/Seo';
import Home from '../../services/home';
import Channels from '../../services/channel/find-all';

const User: NextPage = () => {
	return (
		<>
			<Seo title="User Home" />
			<div className="h-screen py-28">
				<Home />
			</div>
			<div className="h-screen py-28">
				<Channels />
			</div>
		</>
	);
};

export default User;
