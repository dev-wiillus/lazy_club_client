import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from '../../../components/Checkbox';
import ImageUpload from '../../../components/ImageUpload';
import { FIND_ALL_TAG_OPTIONS } from '../../../services/channel/gql';
import useMe from '../../../utils/hooks/useMe';
import useRole from '../../../utils/hooks/useRole';
import {
	CreateChannel,
	CreateChannelVariables,
} from '../../../__generated__/CreateChannel';
import { FindAllTagOptions } from '../../../__generated__/FindAllTagOptions';
import {
	CreateChannelInput,
	InviteChannelOperatorInput,
} from '../../../__generated__/globalTypes';

const CREATE_CHANNEL_MUTATION = gql`
	mutation CreateChannel(
		$channelInput: CreateChannelInput!
		$channelOperatorInput: InviteChannelOperatorInput!
	) {
		createChannel(
			channelInput: $channelInput
			channelOperatorInput: $channelOperatorInput
		) {
			ok
			error
			result {
				id
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
				agentNickname
				agentProfile
				agentIntroduction
				termsOfService
				agreements
			}
		}
	}
`;

type IForm = CreateChannelInput & InviteChannelOperatorInput;

// TODO: creator만 가능
// TODO: checkbox, image upload, form list
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
		console.log(data);
		if (ok && result) {
			const { __typename, id, ...data } = result;
			// cache 잘바뀌는지 확인
			// id 가져오기
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
						agentNickname
						agentProfile
						agentIntroduction
						termsOfService
						agreements
					}
				`,
				data,
			});
			router.push(`/${role}/channels`);
		}
	};
	const [mutateChannel, { loading }] = useMutation<
		CreateChannel,
		CreateChannelVariables
	>(CREATE_CHANNEL_MUTATION, {
		onCompleted,
	});

	const { register, handleSubmit, getValues, control } = useForm<IForm>({
		defaultValues: {
			tagId: undefined,
		},
	});
	const onSubmit = () => {
		if (userData?.me.email) {
			const {
				title,
				description,
				tagId,
				thumbnail,
				emails,
				agentNickname,
				agentProfile,
				agentIntroduction,
				termsOfService,
				agreements,
			} = getValues();
			mutateChannel({
				variables: {
					channelInput: {
						title,
						description,
						tagId,
						agentNickname,
						agentIntroduction,
						termsOfService,
						agreements,
						...(!thumbnail && { thumbnail }),
						...(!agentProfile && { agentProfile }),
					},
					channelOperatorInput: {
						emails: [userData?.me.email],
					},
				},
			});
		}
	};

	const { data: tagOptionsData, loading: tagOptionsLoading } =
		useQuery<FindAllTagOptions>(FIND_ALL_TAG_OPTIONS);
	return (
		<div className="py-4">
			<form className="form space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="thumbnail">
						<span className="label-text">채널 썸네일</span>
					</label>
					<ImageUpload formProps={register('thumbnail')} />
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
						placeholder="채널 태그를 선택하세요."
						{...register('tagId', { required: true })}
					>
						{tagOptionsData?.findAllTagOptions.results?.map(
							({ value, label }) => (
								<option value={+value}>{label}</option>
							),
						)}
					</select>
				</div>
				{/* <CheckboxGroup
					label="채널 태그"
					items={[
						{
							value: '재테크',
							label: '재테크',
						},
						{
							value: '창업/부업',
							label: '창업/부업',
						},
						{
							value: '직무',
							label: '직무',
						},
						{
							value: '습관형성',
							label: '습관형성',
						},
						{
							value: '건강',
							label: '건강',
						},
						{
							value: '어학',
							label: '어학',
						},
						{
							value: '취미',
							label: '취미',
						},
						{
							value: '기타',
							label: '기타',
						},
					]}
					formProps={register('tagId', { required: true })}
				/> */}
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="description">
						<span className="label-text">채널 요약</span>
					</label>
					<textarea
						id="description"
						className="textarea textarea-bordered h-24"
						{...register('description', { required: true })}
					/>
				</div>
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="agentNickname">
						<span className="label-text">대표 운영자 닉네임(이름)</span>
					</label>
					<input
						id="agentNickname"
						type="text"
						className="input input-bordered w-full"
						{...register('agentNickname')}
					/>
				</div>
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="agentProfile">
						<span className="label-text">대표 운영자 프로필</span>
					</label>
					<ImageUpload formProps={register('agentProfile')} />
				</div>
				<div className="form-control w-full space-y-2">
					<label className="label" htmlFor="agentIntroduction">
						<span className="label-text">대표 운영자 소개</span>
					</label>
					<input
						id="agentIntroduction"
						type="text"
						className="input input-bordered w-full"
						{...register('agentIntroduction')}
					/>
				</div>
				<div>공동 운영자 초대</div>
				<div className="w-full space-y-2">
					<label className="label">
						<span className="label-text font-bold">정책 동의</span>
					</label>
					<div className="pl-2">
						<div className="form-control">
							<Checkbox
								inputProps={register('termsOfService')}
								labelText="(필수) 이용 약관에 동의합니다."
								extra={
									<label
										htmlFor="termsOfService-modal"
										className="btn btn-ghost btn-modal"
									>
										모두 보기
									</label>
								}
							/>
							<input
								type="checkbox"
								id="termsOfService-modal"
								className="modal-toggle"
							/>
							<div className="modal">
								<div className="modal-box">
									<h3 className="font-bold text-lg">
										Congratulations random Internet user!
									</h3>
									<p className="py-4">
										You've been selected for a chance to get one year of
										subscription to use Wikipedia for free!
									</p>
									<div className="modal-action">
										<label htmlFor="termsOfService-modal" className="btn">
											Yay!
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="form-control">
							<Checkbox
								inputProps={register('agreements')}
								labelText="(필수) 개인정보처리방침에 동의합니다."
								extra={
									<label
										htmlFor="agreements-modal"
										className="btn btn-ghost btn-modal"
									>
										모두 보기
									</label>
								}
							/>
							<input
								type="checkbox"
								id="agreements-modal"
								className="modal-toggle"
							/>
							<div className="modal">
								<div className="modal-box">
									<h3 className="font-bold text-lg">
										Congratulations random Internet user!
									</h3>
									<p className="py-4">
										You've been selected for a chance to get one year of
										subscription to use Wikipedia for free!
									</p>
									<div className="modal-action">
										<label htmlFor="agreements-modal" className="btn">
											Yay!
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button type="submit" className="btn btn-primary w-full">
					채널 생성
				</button>
			</form>
		</div>
	);
};

export default MutateChannel;
