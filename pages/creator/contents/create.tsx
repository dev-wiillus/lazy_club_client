import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	CreateContent,
	CreateContentVariables,
} from '../../../__generated__/CreateContent';
import {
	ContentStatusType,
	CreateContentInput,
} from '../../../__generated__/globalTypes';
import dynamic from 'next/dynamic';
import useMe from '../../../utils/hooks/useMe';
import { useRouter } from 'next/router';
import ImageUpload from '../../../components/ImageUpload';
import { CREATE_CONTENT_MUTATION } from '../../../services/content/gql';

const DynamicComponent = dynamic(
	() => import('../../../components/QuillEditor'),
	{ ssr: false },
);

type IForm = Pick<CreateContentInput, 'title' | 'content'> & {
	previewImage?: string;
};

const CreateContent: NextPage = () => {
	const {
		query: { channelId },
	} = useRouter();
	console.log(channelId);
	const { data: userData } = useMe();
	const onCompleted = () => {
		// TODO: 캐싱 처리, 알림 띄우기
	};
	const [createContent, { loading }] = useMutation<
		CreateContent,
		CreateContentVariables
	>(CREATE_CONTENT_MUTATION, {
		onCompleted,
	});

	const { register, handleSubmit, watch, setValue, getValues } =
		useForm<IForm>();

	useEffect(() => {
		register('content');
	}, [register]);

	const onEditorStateChange = (editorState: any) => {
		setValue('content', editorState);
	};

	const editorContent = watch('content');

	const [status, setStatus] = useState<ContentStatusType>();

	const onSubmit = (values: IForm, event: any) => {
		if (userData?.me.email && channelId) {
			const { title, content } = getValues();
			createContent({
				variables: {
					input: {
						title,
						content,
						channelId: +channelId,
						status,
					},
				},
			});
		}
	};
	return (
		<div className="flex flex-col gap-4">
			<div>
				<form className="form space-y-8" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex gap-4 justify-end">
						<button
							className="btn"
							onClick={() => setStatus(ContentStatusType.NORMAL)}
						>
							발행
						</button>
						<button
							className="btn"
							onClick={() => setStatus(ContentStatusType.DRAFT)}
						>
							임시 저장
						</button>
					</div>
					<div className="form-control w-full">
						<input
							id="title"
							type="text"
							className="input input-bordered w-full text-xl placeholder:text-gray-300"
							placeholder="제목을 입력하세요"
							{...register('title', { required: true })}
						/>
					</div>
					<DynamicComponent
						value={editorContent}
						onChange={onEditorStateChange}
					/>
					<div className="form-control w-full space-y-2">
						<label className="label" htmlFor="previewImage">
							<span className="label-text">대표 이미지</span>
						</label>Mutation
						<ImageUpload formProps={register('previewImage')} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateContent;
