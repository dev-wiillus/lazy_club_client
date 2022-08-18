import { useLazyQuery } from '@apollo/client';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FIND_CONTENT_QUERY } from 'services/content/gql';
import { FindContent, FindContentVariables } from '__generated__/FindContent';
import Seo from '../../../components/Seo';

const DynamicComponent = dynamic(
	() => import('../../../components/QuillEditor'),
	{ ssr: false },
);

const Index: NextPage = () => {
	const {
		query: { contentId },
		push,
	} = useRouter();

	const [findContent, { data, loading: queryLoading }] = useLazyQuery<
		FindContent,
		FindContentVariables
	>(FIND_CONTENT_QUERY, { ssr: true });
	const { ok, results } = data?.findContent ?? {};

	useEffect(() => {
		if (contentId) {
			findContent({
				variables: {
					input: { contentId: +contentId },
				},
			});
		}
	}, [contentId]);
	return (
		<div className="flex flex-col gap-4 my-28">
			<Seo title="Content" />
			<div className="form-control w-full space-y-2">
				<input
					id="title"
					type="text"
					className="input input-bordered w-full text-xl placeholder:text-gray-300 border-none"
					value={results?.title ?? ''}
					readOnly
				/>
			</div>
			<DynamicComponent
				value={results?.content ?? ''}
				readOnly
				modules={{ toolbar: false }}
			/>
		</div>
	);
};

export default Index;
