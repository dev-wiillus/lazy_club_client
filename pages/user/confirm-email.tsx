import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import useMe from '../../utils/hooks/useMe';
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
	const { data: userData } = useMe();
	const client = useApolloClient();
	const router = useRouter();
	const onCompleted = useCallback((data: VerifyEmail) => {
		const {
			verifyEmail: { ok },
		} = data;
		if (ok && userData?.me.id) {
			client.writeFragment({
				id: `UserOutput:${userData.me.id}`,
				fragment: gql`
					fragment VerifiedUser on UserOutput {
						verified
					}
				`,
				data: {
					verified: true,
				},
			});
			router.push('/');
		}
	}, []);
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
		<div className="mt-52 flex flex-col items-center justify-center">
			<h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
			<h4 className="text-gray-700 text-sm">잠시만 기다려주십시오.</h4>
		</div>
	);
};

export default ConfirmEmail;
