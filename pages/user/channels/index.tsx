import type { NextPage } from 'next';
import Seo from '../../../components/Seo';
import Inform from '../../../services/channel/inform';
import ListUp from '../../../services/channel/list-up';

// export async function getServerSideProps() {
// 	const { data, loading } = await useQuery<
// 		FindAllChannel,
// 		FindAllChannelVariables
// 	>(FIND_ALL_CHANNEL_QUERY, {
// 		variables: {
// 			input: {
// 				page: 1,
// 			},
// 		},
// 	});
// 	return {
// 		props: {
// 			data: data?.findAllChannel,
// 			loading,
// 		},
// 	};
// }

const Channels: NextPage = () => {
	return (
		<div className="grid grid-cols-1 p-6 gap-4">
			<Seo title="Channel" />
			<Inform />
			<ListUp />
		</div>
	);
};

export default Channels;
