import { gql, useApolloClient, useMutation } from '@apollo/client';
import { NextPage } from 'next';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import Seo from '../../components/Seo';
import useMe from '../../utils/hooks/useMe';
import { emailPattern } from '../../utils/patterns';
import {
	EditProfile,
	EditProfileVariables,
} from '../../__generated__/EditProfile';

const EDIT_PROFILE_MUTATION = gql`
	mutation EditProfile($input: EditProfileInput!) {
		editProfile(input: $input) {
			ok
			error
		}
	}
`;

interface IForm {
	name?: string;
	phone?: string;
	email?: string;
	password?: string;
	nickname?: string;
}

const EditProfile: NextPage = () => {
	const { data: userData } = useMe();
	const client = useApolloClient();
	const onCompleted = useCallback(
		(data: EditProfile) => {
			const {
				editProfile: { ok },
			} = data;
			if (ok && userData) {
				const {
					me: { email: prevEmail, id },
				} = userData;
				const { email: newEmail } = getValues();
				if (prevEmail !== newEmail) {
					// TODO: 나머지 필드들도 반영되도록
					client.writeFragment({
						id: `UserOutput:${id}`,
						fragment: gql`
							fragment EditedUser on UserOutput {
								verified
								email
							}
						`,
						data: {
							verified: false,
							email: newEmail,
						},
					});
				}
			}
		},
		[userData, client],
	);
	const [editProfile, { loading }] = useMutation<
		EditProfile,
		EditProfileVariables
	>(EDIT_PROFILE_MUTATION, {
		onCompleted,
	});
	const { register, getValues, getFieldState, handleSubmit, formState } =
		useForm<IForm>({
			mode: 'onChange',
			defaultValues: {
				...userData?.me,
				name: userData?.me.name,
			},
		});

	const onSubmit = useCallback(() => {
		const { password, email, name, nickname, phone } = getValues();
		editProfile({
			variables: {
				input: {
					email,
					name,
					nickname,
					phone,
					...(password !== '' && { password }),
				},
			},
		});
	}, [getValues]);
	return (
		<>
			<Seo title="Edit Profile" />
			<div className="hero min-h-screen">
				<div className="hero-content flex-col">
					<form className="form space-y-4" onSubmit={handleSubmit(onSubmit)}>
						<input
							className="input input-bordered w-full"
							placeholder="Name"
							required
							{...register('name')}
						/>
						{getFieldState('name').error && (
							<FormError errorMessage={getFieldState('name').error?.message} />
						)}
						<input
							className="input input-bordered w-full"
							placeholder="Phone"
							required
							{...register('phone')}
						/>
						{getFieldState('phone').error && (
							<FormError errorMessage={getFieldState('phone').error?.message} />
						)}
						<input
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
						)}
						<input
							type="password"
							className="input input-bordered w-full"
							placeholder="비밀번호"
							{...register('password')}
						/>
						{getFieldState('password').error && (
							<FormError
								errorMessage={getFieldState('password').error?.message}
							/>
						)}
						<input
							className="input input-bordered w-full"
							placeholder="닉네임"
							required
							{...register('nickname')}
						/>
						{getFieldState('nickname').error && (
							<FormError
								errorMessage={getFieldState('nickname').error?.message}
							/>
						)}
						<Button
							canClick={formState.isValid}
							loading={loading}
							actionText="수정"
						/>
						{/* {registerMutationResult?.register.error && (
							<FormError errorMessage={registerMutationResult.register.error} />
						)} */}
					</form>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
