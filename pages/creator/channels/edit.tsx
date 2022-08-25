import {
	gql,
	useApolloClient,
	useLazyQuery,
	useMutation,
} from '@apollo/client';
import { FormError } from 'components/FormError';
import ImagePreviewInput from 'components/ImagePreviewInput';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { EditChannel, EditChannelVariables } from '__generated__/EditChannel';
import { FindChannel, FindChannelVariables } from '__generated__/FindChannel';
import {
	EDIT_CHANNEL_MUTATION,
	FIND_CHANNEL_QUERY,
} from '../../../services/channel/gql';
import useMe from '../../../utils/hooks/useMe';
import useRole from '../../../utils/hooks/useRole';
import { EditChannelInput } from '../../../__generated__/globalTypes';

type IForm = Omit<EditChannelInput, 'thumbnail'> & {
	thumbnail?: File[];
};

const EditChannel: NextPage = () => {
	const {
		push,
		query: { channelId },
	} = useRouter();
	const [request, { data }] = useLazyQuery<FindChannel, FindChannelVariables>(
		FIND_CHANNEL_QUERY,
		{
			ssr: true,
		},
	);
	const [role] = useRole();
	const toChannelUrl = `/${role?.toLowerCase()}/channels`;
	const { data: userData } = useMe();
	const client = useApolloClient();
	const onCompleted = (data: EditChannel) => {
		const {
			editChannel: { ok, result },
		} = data;
		if (ok && result) {
			const { __typename, id, ...data } = result;
			client.writeFragment({
				id: `ChannelOutput:${id}`,
				fragment: gql`
					fragment MutateChannel on ChannelOutput {
						title
						description
						thumbnail
					}
				`,
				data,
			});
			push(toChannelUrl);
		}
	};
	const [mutateChannel, { data: mutationResult }] = useMutation<
		EditChannel,
		EditChannelVariables
	>(EDIT_CHANNEL_MUTATION, {
		onCompleted,
	});

	const { register, handleSubmit, getValues, setValue, control } =
		useForm<IForm>();
	const onSubmit = () => {
		const { title, description, thumbnail } = getValues();
		if (userData?.me.email && channelId) {
			mutateChannel({
				variables: {
					channelInput: {
						channelId: +channelId,
						title,
						description,
						...(thumbnail && { thumbnail: thumbnail[0] }),
					},
				},
			});
		}
	};

	useEffect(() => {
		if (channelId) {
			request({
				variables: {
					input: {
						channelId: +(channelId ?? ''),
					},
				},
			});
		}
	}, [request, channelId]);
	const { title, thumbnail, description } = data?.findChannel.results ?? {};
	useEffect(() => {
		const defaultValues: Partial<IForm> = { title, description };
		if (defaultValues) {
			Object.entries(defaultValues).forEach(([name, value]: any) =>
				setValue(name, value),
			);
		}
	}, [setValue, title, description]);
	return (
		<div className="my-28">
			<form className="form space-y-8" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="thumbnail">
						<span className="label-text">채널 썸네일</span>
					</label>
					<ImagePreviewInput imgSrc={thumbnail} {...register('thumbnail')} />
				</div>

				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="title">
						<span className="label-text">채널명</span>
					</label>
					<input
						id="title"
						type="text"
						className="input input-bordered w-full"
						{...register('title')}
					/>
				</div>

				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="description">
						<span className="label-text">채널 요약</span>
					</label>
					<textarea
						id="description"
						className="textarea textarea-bordered"
						{...register('description')}
					/>
				</div>
				<div className="w-full flex gap-2">
					<button
						type="button"
						className="btn flex-1"
						onClick={() => push(toChannelUrl)}
					>
						취소
					</button>
					<button type="submit" className="btn btn-primary flex-1">
						저장
					</button>
				</div>
				{!mutationResult?.editChannel.ok && (
					<FormError errorMessage={mutationResult?.editChannel.error} />
				)}
			</form>
		</div>
	);
};

export default EditChannel;
