import type { NextPage } from 'next';
import Seo from '../../components/Seo';
import Home from '../../services/home';
import Channels from '../../services/channel/find-all';

const User: NextPage = () => {
	return (
		<>
			<Seo title="User Home" />
			<div className="snap-start h-screen pt-16">
				<Home />
			</div>
			<div className="snap-start h-screen pt-16">
				<Channels />
			</div>
		</>
	);
};

export default User;
