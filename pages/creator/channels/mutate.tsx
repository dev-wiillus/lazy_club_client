import { gql, useApolloClient, useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from '../../../components/Checkbox';
import CheckboxGroup from '../../../components/CheckboxGroup';
import ImageUpload from '../../../components/ImageUpload';
import {
	CreateChannel,
	CreateChannelVariables,
} from '../../../__generated__/CreateChannel';
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
		}
	}
`;

type IForm = CreateChannelInput & InviteChannelOperatorInput;

// TODO: creator만 가능
const MutateChannel: NextPage = () => {
	const client = useApolloClient();
	const onCompleted = useCallback(
		(data: CreateChannel) => {
			const {
				createChannel: { ok },
			} = data;
			if (ok) {
				// cache 잘바뀌는지 확인
				// id 가져오기
				client.writeFragment({
					id: `ChannelOutput:${1}`,
					fragment: gql`
						fragment MutateChannel on ChannelOutput {
							title
							subject
							description
							thumbnail
							category {
								tag {
									id
									name
								}
							}
						}
					`,
					data: {}, // TODO
				});
			}
		},
		[client],
	);
	const { register, handleSubmit, getFieldState, getValues } = useForm<IForm>();
	const [mutateChannel, { loading }] = useMutation<
		CreateChannel,
		CreateChannelVariables
	>(CREATE_CHANNEL_MUTATION, {
		onCompleted,
	});
	const onSubmit = useCallback(() => {
		console.log(getValues())
		// const {
		// 	title,
		// 	subject,
		// 	description,
		// 	tagId,
		// 	thumbnail,
		// 	emails,
		// 	agentNickname,
		// 	agentProfile,
		// 	agentIntroduction,
		// 	termsOfService,
		// 	agreements,
		// } = getValues();
		// mutateChannel({
		// 	variables: {
		// 		channelInput: {
		// 			title,
		// 			subject,
		// 			description,
		// 			tagId,
		// 			agentNickname,
		// 			agentIntroduction,
		// 			termsOfService,
		// 			agreements,
		// 			...(thumbnail !== '' && { thumbnail }),
		// 			...(agentProfile !== '' && { agentProfile }),
		// 		},
		// 		channelOperatorInput: {
		// 			emails,
		// 		},
		// 	},
		// });
	}, [getValues]);  
	return (
		<div className="py-4">
			<form className="form space-y-4" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-control w-full space-y-2">
							<label className="label" htmlFor="thumbnail">
								<span className="label-text">채널 썸네일</span>
							</label>
						<ImageUpload formProps={register('thumbnail')} /></div> 
					
						<div className="form-control w-full space-y-2">
							<label className="label" htmlFor="title">
								<span className="label-text">채널명</span>
							</label>
							<input
								id="title"
								type="text"
								className="input input-bordered w-full"
								{...register('title', {required: true})}
							/>
						</div>
						{/* TODO: component */}
						<CheckboxGroup
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
							{...register('tagId', { required: true})}
						/>
						<div className="form-control w-full space-y-2">
							<label className="label" htmlFor="description">
								<span className="label-text">채널 요약</span>
							</label>
							<textarea
								id="description"
								className="textarea textarea-bordered h-24"
								{...register('description', {required: true})}
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
							{/* <input
								id="agentProfile"
								className="input input-bordered w-full"
								{...register('agentProfile')}
							/> */}
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
										extra={<button className="btn btn-ghost">모두 보기</button>}
									/>
								</div>
								<div className="form-control">
									<Checkbox
										inputProps={register('agreements')}
										labelText="(필수) 개인정보처리방침에 동의합니다."
										extra={<button className="btn btn-ghost">모두 보기</button>}
									/>
								</div>
					</div>
				</div>
				<button className="btn btn-primary w-full">
					채널 생성
				</button>
			</form>
		</div>
	);
};

export default MutateChannel;
