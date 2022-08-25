import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	EditContent,
	EditContentVariables,
} from '../../../__generated__/EditContent';
import {
	FindContent,
	FindContentVariables,
} from '../../../__generated__/FindContent';
import {
	ContentStatusType,
	EditContentInput,
} from '../../../__generated__/globalTypes';
import dynamic from 'next/dynamic';
import useMe from '../../../utils/hooks/useMe';
import { useRouter } from 'next/router';
import {
	EDIT_CONTENT_MUTATION,
	FIND_CONTENT_QUERY,
} from '../../../services/content/gql';
import MessageModal from 'components/Modal';
import ImagePreviewInput from 'components/ImagePreviewInput';

const DynamicComponent = dynamic(
	() => import('../../../components/QuillEditor'),
	{ ssr: false },
);

type IForm = Pick<
	EditContentInput,
	'id' | 'title' | 'content' | 'previewImage'
>;

const UpdateContent: NextPage = () => {
	const {
		query: { contentId, channelId },
		push,
	} = useRouter();
	const { data: userData } = useMe();
	// contentId 없으면 임시저장 불러오기
	const [findContent, { data, loading: queryLoading }] = useLazyQuery<
		FindContent,
		FindContentVariables
	>(FIND_CONTENT_QUERY, { ssr: true });
	const { ok, results } = data?.findContent ?? {};
	const { register, handleSubmit, watch, setValue, getValues } =
		useForm<IForm>();
	useEffect(() => {
		if (results) {
			Object.entries(results).forEach(([name, value]: any) =>
				setValue(name, value),
			);
		}
	}, [setValue, results]);
	useEffect(() => {
		if (contentId || channelId) {
			findContent({
				variables: {
					input: {
						...(contentId && { contentId: +contentId }),
						...(channelId && { channelId: +channelId }),
					},
				},
			});
		}
	}, [contentId, channelId]);

	const client = useApolloClient();
	const [createContentError, setCreateContentError] = useState(false);
	// TODO: write cache & channel contents에 추가
	const onCompleted = (data: EditContent) => {
		if (data.editContent.ok) {
			const { editContent } = data;
			if (editContent.ok && editContent.results) {
				// const { __typename, id, ...data } = editContent.results;
				// client.writeFragment({
				// 	id: `ContentOutput:${id}`,
				// 	fragment: gql`
				// 		fragment ContentFragment on ContentOutput {
				// 			title
				// 			content
				// 			status
				// 			contentFiles {
				// 				id
				// 				file
				// 				isPreview
				// 			}
				// 		}
				// 	`,
				// 	data,
				// });
				// TODO: move to content read page
				push(`/creator/channels`);
			}
		} else {
			setCreateContentError(true);
		}
	};
	const [editContent, { loading: mutationLoading }] = useMutation<
		EditContent,
		EditContentVariables
	>(EDIT_CONTENT_MUTATION, {
		onCompleted,
		refetchQueries: ['findChannel'],
	});

	useEffect(() => {
		register('content');
	}, [register]);

	const onEditorStateChange = (editorState: any) => {
		setValue('content', editorState);
	};

	const editorContent = watch('content');

	const [status, setStatus] = useState<ContentStatusType>();

	const onSubmit = async () => {
		if (userData?.me.email && results?.id) {
			const { id, title, content, previewImage } = getValues();
			const htmlContent = new File([content], 'content.html', {
				type: 'text/html',
			});
			editContent({
				variables: {
					input: {
						id: results.id,
						title,
						content: htmlContent,
						status,
						...(previewImage &&
							typeof previewImage === 'object' && {
								previewImage: previewImage[0],
							}),
					},
				},
			});
		}
	};
	return (
		<>
			<div className="flex flex-col gap-4 my-28">
				<div>
					<form className="form space-y-4" onSubmit={handleSubmit(onSubmit)}>
						<input hidden {...register('id')} />
						<div className="flex gap-4 justify-end">
							<button
								className="btn"
								type="submit"
								onClick={() => setStatus(ContentStatusType.NORMAL)}
							>
								발행
							</button>
							<button
								className="btn"
								type="submit"
								onClick={() => setStatus(ContentStatusType.DRAFT)}
							>
								임시 저장
							</button>
						</div>
						<div className="form-control w-full space-y-2">
							<textarea
								id="title"
								className="textarea textarea-bordered w-full text-3xl placeholder:text-gray-300"
								placeholder="제목을 입력하세요"
								{...register('title', { required: true })}
							/>
						</div>
						<DynamicComponent
							value={editorContent ?? ''}
							onChange={onEditorStateChange}
							contentId={results?.id}
						/>
						<div className="form-control w-1/2 mx-auto mt-8 gap-2">
							<label className="label">
								<span className="label-text">대표 이미지</span>
							</label>
							<ImagePreviewInput
								imgSrc={results?.previewImageUrl}
								{...register('previewImage')}
							/>
						</div>
					</form>
				</div>
			</div>
			<MessageModal
				title="에러"
				description="콘텐츠 수정 에러"
				state={createContentError}
				setState={setCreateContentError}
			/>
		</>
	);
};

export default UpdateContent;
