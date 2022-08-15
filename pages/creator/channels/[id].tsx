import { gql } from '@apollo/client';
import type { NextPage } from 'next';
import Seo from '../../../components/Seo';

// const CHANNEL_TAG_QUERY = gql`
// 	query ChannelTags(
// 		$channelInput: CreateChannelInput!
// 		$channelOperatorInput: InviteChannelOperatorInput!
// 	) {
// 		createChannel(
// 			channelInput: $channelInput
// 			channelOperatorInput: $channelOperatorInput
// 		) {
// 			ok
// 			error
// 			result {
// 				...ChannelOutput
// 			}
// 		}
// 	}
// `;

const Id: NextPage = () => {
	return (
		<>
			<Seo title="Channel Detail" />
			<h1>Detail</h1>
		</>
	);
};

export default Id;
