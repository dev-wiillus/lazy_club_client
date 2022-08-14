import type { NextPage } from 'next';
import { useCallback } from 'react';
import { isLoggedInVar } from '../../apollo';
import Logo from '../../components/Logo';
import { Controller, useForm } from 'react-hook-form';
import { FormError } from '../../components/FormError';
import { gql, useMutation } from '@apollo/client';
import { Button } from '../../components/Button';
import Link from 'next/link';
import Seo from '../../components/Seo';
import {
	RegisterMutation,
	RegisterMutationVariables,
} from '../../__generated__/RegisterMutation';
import { emailPattern } from '../../utils/patterns';
import { useRouter } from 'next/router';

const REGISTER_MUTATION = gql`
	mutation RegisterMutation($input: RegisterInput!) {
		register(input: $input) {
			ok
			error
		}
	}
`;

interface IForm {
	name: string;
	phone: string;
	email: string;
	password: string;
	nickname: string;
}

const SignUp: NextPage = () => {
	const { register, getValues, getFieldState, handleSubmit, formState } =
		useForm<IForm>({ mode: 'onBlur' });
	const router = useRouter();
	const onCompleted = useCallback((data: RegisterMutation) => {
		const { ok } = data.register;
		if (ok) {
			router.push('/sign-in');
		}
	}, []);
	const [regitserMutation, { data: registerMutationResult, loading }] =
		useMutation<RegisterMutation, RegisterMutationVariables>(REGISTER_MUTATION);
	const onSubmit = useCallback(() => {
		if (!loading) {
			const { email, password, name, nickname, phone } = getValues();
			regitserMutation({
				variables: {
					input: {
						email,
						password,
						name,
						nickname,
						phone,
					},
				},
				onCompleted,
			});
		}
	}, []);
	return (
		<>
			<Seo title="Sign Up" />
			<div className="hero min-h-screen">
				<div className="hero-content flex-col">
					<div className="text-center">
						<h2 className="text-xl">성공하는 사람들의 성장 습관</h2>
						<Logo />
						<h3 className="text-2xl font-bold">회원가입</h3>
					</div>
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
							required
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
							actionText="회원가입"
						/>
						{registerMutationResult?.register.error && (
							<FormError errorMessage={registerMutationResult.register.error} />
						)}
					</form>
					<div>
						Already joined to Lazy Club?{' '}
						<Link href="/sign-in">
							<span className="text-sky-500 cursor-pointer hover:underline">
								로그인
							</span>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
