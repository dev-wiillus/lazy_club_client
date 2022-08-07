import type { NextPage } from 'next';
import { useCallback } from 'react';
import { isLoggedInVar } from '../../apollo';
import Logo from '../../components/NavBar/Logo';
import { useForm } from 'react-hook-form';
import { FormError } from '../../components/FormError';
import { gql, useMutation } from '@apollo/client';

// TODO: access token으로 로그인 여부 판단

const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(input: { email: $email, password: $password }) {
			ok
			token
			error
		}
	}
`;

interface IForm {
	email: string;
	password: string;
}

const SignIn: NextPage = () => {
	const { register, getValues, getFieldState, handleSubmit } = useForm<IForm>();
	// const [loginMutation] = useMutation<LoginMutation, LoginMutationVariables>(
	// 	LOGIN_MUTATION,
	// );
	const onSubmit = useCallback(() => {
		const { email, password } = getValues();
		// loginMutation({
		// 	variables: {
		// 		email,
		// 		password,
		// 	},
		// });
	}, []);
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col items-center justify-center">
				<div className="text-center">
					<h2>성공하는 사람들의 성장 습관</h2>
					<Logo fontSize="text-5xl" />
					<h3 className="text-2xl font-bold">로그인</h3>
				</div>
				<form className="form space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<input
						ref={register('email', { required: 'Email을 입력하세요.' }).ref}
						name="email"
						type="email"
						className="input input-bordered w-full"
						placeholder="Email"
					/>
					{getFieldState('email').error && (
						<FormError errorMessage={getFieldState('email').error?.message} />
					)}
					<input
						ref={
							register('password', { required: '비밀번호를 입력하세요.' }).ref
						}
						name="password"
						type="password"
						className="input input-bordered w-full"
						placeholder="비밀번호"
					/>
					{getFieldState('password').error && (
						<FormError
							errorMessage={getFieldState('password').error?.message}
						/>
					)}
					<button type="submit" className="btn btn-primary w-full">
						Log In
					</button>
				</form>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div className="card-body">
						<h4>카카오 계정으로 로그인</h4>
						<a id="custom-login-btn" href="javascript:loginWithKakao()">
							<img
								src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
								width="222"
								alt="카카오 로그인 버튼"
							/>
						</a>
						<h4 onSubmit={onSubmit}>네이버 계정으로 로그인</h4>
						<h4>Google 계정으로 로그인</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
