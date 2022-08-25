import { gql, useMutation } from '@apollo/client';
import MessageModal from 'components/Modal';
import { useRouter } from 'next/router';
import {  useEffect, useState } from 'react';
import {
	VerifyEmail,
	VerifyEmailVariables,
} from '../../__generated__/VerifyEmail';

const VERIFY_EMAIL_MUTATION = gql`
	mutation VerifyEmail($input: VerifyEmailInput!) {
		verifyEmail(input: $input) {
			ok
			error
		}
	}
`;

const ConfirmEmail = () => {
	const router = useRouter();

	const [modalState, setModalState] = useState(false);
	const additionalAction = () => {
		router.push('/sign-in');
	};
	const onCompleted = (data: VerifyEmail) => {
		const {
			verifyEmail: { ok },
		} = data;
		if (ok ) {
			setModalState(true);
		}
	};
	const [verifyEmail] = useMutation<VerifyEmail, VerifyEmailVariables>(
		VERIFY_EMAIL_MUTATION,
		{ onCompleted },
	);

	useEffect(() => {
		if (router.query.token) {
			verifyEmail({
				variables: {
					input: {
						code: router.query.token as string,
					},
				},
			});
		}
	}, [router.query.token]);
	return (
		<>
			<div className="mt-52 flex flex-col items-center justify-center">
				<h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
				<h4 className="text-gray-700 text-sm">잠시만 기다려주십시오.</h4>
			</div>
			<MessageModal
				title="이메일 인증"
				description="이메일 인증이 완료됐습니다."
				state={modalState}
				setState={setModalState}
				additionalAction={additionalAction}
			/>
		</>
	);
};

export default ConfirmEmail;
