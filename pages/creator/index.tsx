import type { NextPage } from 'next';
import Seo from '../../components/Seo';
import Lounge from '../../services/channel/lounge';
import Home from '../../services/home';

const Creator: NextPage = () => {
	return (
		<>
			<Seo title="Clubber Home" />
			<div className="snap-start h-screen py-28 pb-4">
				<Home />
			</div>
			<div className="snap-start h-screen py-28 pb-4">
				<Lounge />
			</div>
		</>
	);
};

export default Creator;
