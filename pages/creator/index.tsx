import type { NextPage } from 'next';
import Seo from '../../components/Seo';
import Home from '../../services/home';

const Creator: NextPage = () => {
	return (
		<>
			<Seo title="Clubber" />
			<Home />
		</>
	);
};

export default Creator;
