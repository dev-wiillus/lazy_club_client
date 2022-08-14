import { gql, useMutation, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
// import Editor from '../../../components/QuillEditor';
import {
	EditContent,
	EditContentVariables,
} from '../../../__generated__/EditContent';
import {
	FindContent,
	FindContentVariables,
} from '../../../__generated__/FindContent';
import {
	EditContentInput,
	EditContentInput,
} from '../../../__generated__/globalTypes';
import dynamic from 'next/dynamic';
import useMe from '../../../utils/hooks/useMe';
import { channelVar } from '../../../apollo';
import { useRouter } from 'next/router';

const DynamicComponent = dynamic(
	() => import('../../../components/QuillEditor'),
	{ ssr: false },
);

const FIND_CONTENT_QUERY = gql`
	query FindContent($input: FindContentInput!) {
		findContent(input: $input) {
			ok
			error
			results {
				id
				title
				content
				status
			}
		}
	}
`;

const EDIT_CONTENT_MUTATION = gql`
	mutation EditContent($input: EditContentInput!) {
		editContent(input: $input) {
			ok
			error
			results {
				id
				title
				content
				status
			}
		}
	}
`;

type IForm = Pick<EditContentInput, 'title' | 'content'>;

const MutateContent: NextPage = () => {
	const {
		query: { status, channelId },
	} = useRouter();
	const { data: userData } = useMe();
	const { data, loading: queryLoading } = useQuery<
		FindContent,
		FindContentVariables
	>(FIND_CONTENT_QUERY);
	const onCompleted = () => {
		// TODO: 캐싱 처리, 알림 띄우기
	};
	const [editContent, { loading: mutationLoading }] = useMutation<
		EditContent,
		EditContentVariables
	>(EDIT_CONTENT_MUTATION, {
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

	const onSubmit = (values: IForm, event: any) => {
		console.log(event);
		console.log(getValues());
		if (userData?.me.email && channelId) {
			const { title, content } = getValues();
			editContent({
				variables: {
					input: {
						title,
						content,
						channelId: +channelId,
					},
				},
			});
		}
	};
	return (
		<div className="flex flex-col gap-4">
			<div>
				<form className="form space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex gap-4 justify-end">
						<button className="btn">발행</button>
						<button className="btn">임시 저장</button>
					</div>
					<div className="form-control w-full space-y-2">
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
				</form>
			</div>
		</div>
	);
};

export default MutateContent;
