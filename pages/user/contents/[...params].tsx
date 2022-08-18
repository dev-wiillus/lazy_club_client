import type { NextPage } from 'next';
import Seo from '../../../components/Seo';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(
	() => import('../../../components/QuillEditor'),
	{ ssr: false },
);

type DataType = {
	params: [string, string] | undefined;
};

const Content: NextPage<DataType> = ({ params }) => {
	const {
		query: { contentId, channelId },
		push,
	} = useRouter();
	const [title, id] = params || [];
	return (
		<div className="flex flex-col gap-4 my-28">
			<Seo title={title ?? ''} />
			<DynamicComponent />
		</div>
	);
};

export default Content;
