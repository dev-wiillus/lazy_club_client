import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { FormError } from 'components/FormError';
import ImagePreviewInput from 'components/ImagePreviewInput';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import PrivacyPolicyButton from 'services/common/PrivacyPolicyButton';
import TermsOfServiceButton from 'services/common/TermsOfServiceButton';
import Checkbox from '../../../components/Checkbox';
import {
	CREATE_CHANNEL_MUTATION,
	FIND_ALL_TAG_OPTIONS,
} from '../../../services/channel/gql';
import useMe from '../../../utils/hooks/useMe';
import useRole from '../../../utils/hooks/useRole';
import {
	CreateChannel,
	CreateChannelVariables,
} from '../../../__generated__/CreateChannel';
import { FindAllTagOptions } from '../../../__generated__/FindAllTagOptions';
import { CreateChannelInput } from '../../../__generated__/globalTypes';

type EmailFieldValues = {
	value: string;
};

type IForm = Omit<CreateChannelInput, 'thumbnail' | 'tagId'> & {
	emails: EmailFieldValues[];
	userNickname: string;
	thumbnail?: File[];
	tagId?: number | string;
};

// TODO: creator만 가능
// TODO: validation
const MutateChannel: NextPage = () => {
	const router = useRouter();
	const [role] = useRole();
	const { data: userData } = useMe();
	const client = useApolloClient();
	const onCompleted = (data: CreateChannel) => {
		const {
			createChannel: { ok, result },
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
						operators {
							user {
								name
								nickname
							}
						}
						categories {
							tag {
								id
								name
							}
						}
						hasDraftContent
						alertsCount
						agentIntroduction
						termsOfService
						agreements
					}
				`,
				data,
			});
			router.push(`/${role?.toLowerCase()}/channels`);
		}
	};
	const [mutateChannel, { data: mutationResult }] = useMutation<
		CreateChannel,
		CreateChannelVariables
	>(CREATE_CHANNEL_MUTATION, {
		onCompleted,
	});

	const { register, handleSubmit, getValues, setValue, control } =
		useForm<IForm>({
			defaultValues: {
				tagId: '',
			},
		});
	const { fields, append } = useFieldArray<IForm>({
		control,
		name: 'emails',
	});
	const onSubmit = () => {
		const {
			title,
			description,
			tagId,
			thumbnail,
			emails,
			agentIntroduction,
			termsOfService,
			agreements,
		} = getValues();
		if (userData?.me.email && tagId) {
			mutateChannel({
				variables: {
					channelInput: {
						title,
						description,
						tagId: +tagId,
						agentIntroduction,
						termsOfService,
						agreements,
						...(thumbnail && { thumbnail: thumbnail[0] }),
					},
					channelOperatorInput: {
						emails:
							emails
								?.filter((email) => !!email.value)
								.map((email) => email.value) ?? [],
					},
				},
			});
		}
	};

	useEffect(() => {
		const defaultValues: Partial<IForm> = {
			userNickname: userData?.me.nickname,
		};
		if (defaultValues) {
			Object.entries(defaultValues).forEach(([name, value]: any) =>
				setValue(name, value),
			);
		}
	}, [setValue, userData]);

	const { data: tagOptionsData, loading: tagOptionsLoading } =
		useQuery<FindAllTagOptions>(FIND_ALL_TAG_OPTIONS, { ssr: true });
	return (
		<div className="my-28">
			<form className="form space-y-8" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="thumbnail">
						<span className="label-text">채널 썸네일</span>
					</label>
					<ImagePreviewInput {...register('thumbnail')} />
				</div>

				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="title">
						<span className="label-text">채널명</span>
					</label>
					<input
						id="title"
						type="text"
						className="input input-bordered w-full"
						{...register('title', { required: true })}
					/>
				</div>

				<div className="w-full space-y-2">
					<label className="label" htmlFor="tagId">
						<span className="label-text">채널 태그</span>
					</label>
					<select
						className="select select-bordered w-full"
						{...register('tagId', { required: true })}
					>
						<option disabled value="">
							채널 태그를 선택하세요.
						</option>
						{tagOptionsData?.findAllTagOptions.results?.map(
							({ value, label }) => (
								<option key={value} value={+value}>
									{label}
								</option>
							),
						)}
					</select>
				</div>
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="description">
						<span className="label-text">채널 요약</span>
					</label>
					<textarea
						id="description"
						className="textarea textarea-bordered"
						{...register('description', { required: true })}
					/>
				</div>
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="userNickname">
						<span className="label-text">대표 운영자 닉네임(이름)</span>
					</label>
					<input
						id="userNickname"
						type="text"
						className="input input-bordered w-full"
						disabled
						{...register('userNickname')}
					/>
				</div>
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="userProfile">
						<span className="label-text">대표 운영자 프로필</span>
					</label>
					<ImagePreviewInput imgSrc={userData?.me.profile} disabled />
				</div>
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="agentIntroduction">
						<span className="label-text">대표 운영자 소개</span>
					</label>
					<textarea
						id="agentIntroduction"
						className="textarea textarea-bordered"
						{...register('agentIntroduction')}
					/>
				</div>
				<div className="form-control w-full space-y-2">
					<label className="label">
						<span className="label-text">공동 운영자 초대</span>
					</label>
					{fields.map((item, index) => (
						<div key={index}>
							<input
								id="agentIntroduction"
								type="email"
								className="input input-bordered w-full"
								style={{ margin: 'dense' }}
								placeholder="이메일을 입력하세요."
								{...register(`emails.${index}.value` as const)}
							/>
						</div>
					))}
					<button
						className="btn btn-secondary"
						type="button"
						onClick={() => {
							append({ value: '' });
						}}
					>
						공동 운영자 추가
					</button>
				</div>
				<div className="w-full space-y-2">
					<label className="label">
						<span className="label-text font-bold">이용약관</span>
					</label>
					<div className="pl-2">
						<div className="form-control">
							<Checkbox
								inputProps={{
									...register('termsOfService', {
										required: '이용약관을 체크하세요.',
									}),
									required: true,
								}}
								labelText="(필수) 이용약관에 동의합니다."
								extra={<TermsOfServiceButton />}
							/>
						</div>
						<div className="form-control">
							<Checkbox
								inputProps={{
									...register('agreements', {
										required: '개인정보처리방침을 체크하세요.',
									}),
									required: true,
								}}
								labelText="(필수) 개인정보처리방침에 동의합니다."
								extra={<PrivacyPolicyButton />}
							/>
						</div>
					</div>
				</div>
				<button type="submit" className="btn btn-primary w-full">
					채널 생성
				</button>
				{!mutationResult?.createChannel.ok && (
					<FormError errorMessage={mutationResult.createChannel.error} />
				)}
			</form>
		</div>
	);
};

export default MutateChannel;
