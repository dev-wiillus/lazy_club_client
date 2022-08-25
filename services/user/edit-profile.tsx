import { gql, useApolloClient, useMutation } from '@apollo/client';
import ImagePreviewInput from 'components/ImagePreviewInput';
import { NextPage } from 'next';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { EDIT_USER_MUTATION } from 'services/user/gql';
import {
	EditUserMutaion,
	EditUserMutaionVariables,
} from '__generated__/EditUserMutaion';
import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import Seo from '../../components/Seo';
import useMe from '../../utils/hooks/useMe';

interface IForm {
	name?: string;
	password?: string;
	validPassword?: string;
	nickname?: string;
	profile?: string | null;
}

const EditProfile = () => {
	const { data: userData } = useMe();
	const client = useApolloClient();
	const onCompleted = useCallback(
		(data: EditUserMutaion) => {
			const {
				editProfile: { ok, result },
			} = data;
			if (ok && result) {
				client.writeFragment({
					id: `UserOutput:${result.id}`,
					fragment: gql`
						fragment EditedUser on UserOutput {
							name
							nickname
							profile
						}
					`,
					data: {
						name: result.name,
						nickname: result.nickname,
						profile: result.profile,
					},
				});
			}
			// if (ok && userData) {
			// const {
			// 	me: { email: prevEmail, id },
			// } = userData;
			// const { email: newEmail } = getValues();
			// if (prevEmail !== newEmail) {
			// 	// TODO: 나머지 필드들도 반영되도록
			// 	client.writeFragment({
			// 		id: `UserOutput:${id}`,
			// 		fragment: gql`
			// 			fragment EditedUser on UserOutput {
			// 				verified
			// 				email
			// 			}
			// 		`,
			// 		data: {
			// 			verified: false,
			// 			email: newEmail,
			// 		},
			// 	});
			// }
			// }
		},
		[userData, client],
	);
	const [editProfile, { loading, data }] = useMutation<
		EditUserMutaion,
		EditUserMutaionVariables
	>(EDIT_USER_MUTATION, {
		onCompleted,
	});
	const { register, getValues, getFieldState, handleSubmit, formState, watch } =
		useForm<IForm>({
			mode: 'onChange',
			defaultValues: {
				name: userData?.me.name,
				nickname: userData?.me.nickname,
			},
		});

	const watchPassword = watch('password');

	const onSubmit = useCallback(() => {
		const { password, profile, name, nickname } = getValues();
		editProfile({
			variables: {
				input: {
					name,
					nickname,
					...(password !== '' && { password }),
					...(profile && { profile: profile[0] }),
				},
			},
		});
	}, [getValues]);
	return (
		<>
			<Seo title="Edit Profile" />
			<div className="min-h-screen my-28">
				<form className="form space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-control w-full space-y-2">
						<label className="label" htmlFor="name">
							<span className="label-text">이름</span>
						</label>
						<input
							className="input input-bordered w-full"
							placeholder="이름"
							{...register('name')}
						/>
						{getFieldState('name').error && (
							<FormError errorMessage={getFieldState('name').error?.message} />
						)}
					</div>
					{/* <input
							type="email"
							className="input input-bordered w-full"
							placeholder="Email"
							required
							{...register('email', {
								pattern: emailPattern,
							})}
						/>
						{getFieldState('email').error && (
							<FormError errorMessage={getFieldState('email').error?.message} />
						)}
						{getFieldState('email').error?.type === 'pattern' && (
							<FormError errorMessage={'올바른 이메일 형식을 입력하세요.'} />
						)} */}
					<div className="form-control w-full space-y-2">
						<label className="label" htmlFor="password">
							<span className="label-text">비밀번호</span>
						</label>
						<input
							type="password"
							className="input input-bordered w-full"
							placeholder="비밀번호"
							{...register('password', {
								validate: (value) => !value,
							})}
						/>
						{getFieldState('password').error && (
							<FormError
								errorMessage={getFieldState('password').error?.message}
							/>
						)}
						{watchPassword && (
							<>
								<input
									type="password"
									className="input input-bordered w-full"
									placeholder="비밀번호 확인"
									{...register('validPassword', {
										validate: (value) => watchPassword === value,
									})}
								/>
								{getFieldState('validPassword').error && (
									<FormError
										errorMessage={getFieldState('validPassword').error?.message}
									/>
								)}
							</>
						)}
					</div>
					<div className="form-control w-full space-y-2">
						<label className="label" htmlFor="nickname">
							<span className="label-text">닉네임</span>
						</label>
						<input
							className="input input-bordered w-full"
							placeholder="닉네임"
							{...register('nickname')}
						/>
						{getFieldState('nickname').error && (
							<FormError
								errorMessage={getFieldState('nickname').error?.message}
							/>
						)}
					</div>
					<div className="form-control w-full space-y-2">
						<label className="label" htmlFor="profile">
							<span className="label-text">프로필</span>
						</label>
						<ImagePreviewInput
							imgSrc={userData?.me.profile}
							{...register('profile')}
						/>
					</div>

					<Button
						canClick={formState.isValid}
						loading={loading}
						actionText="수정"
					/>
					{data?.editProfile?.error && (
						<FormError errorMessage={data.editProfile.error} />
					)}
				</form>
			</div>
		</>
	);
};

export default EditProfile;
