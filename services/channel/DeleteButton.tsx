import { gql, useApolloClient, useMutation } from '@apollo/client';
import { DELETE_CHANNEL_MUTATION } from 'services/channel/gql';
import {
	DeleteChannel,
	DeleteChannelVariables,
} from '__generated__/DeleteChannel';
import { useState } from 'react';
import useRole from 'utils/hooks/useRole';
import { useRouter } from 'next/router';
import useMe from 'utils/hooks/useMe';

type InputProps = {
	channelId: number;
};

export default function DeleteButton({ channelId }: InputProps) {
	const [role] = useRole();
	const router = useRouter();
	const { data: userData } = useMe();
	const client = useApolloClient();
	const onCompleted = (data: DeleteChannel) => {
		const { ok } = data?.deleteChannel ?? {};
		if (ok && userData?.me?.id) {
			client.writeFragment({
				id: `UserOutput:${userData.me.id}`,
				fragment: gql`
					fragment EditedUser on UserOutput {
						hasChannel
					}
				`,
				data: {
					hasChannel: false,
				},
			});
			setModal(false);
			router.push(`/${role.toLocaleLowerCase()}`);
		}
	};
	const [request] = useMutation<DeleteChannel, DeleteChannelVariables>(
		DELETE_CHANNEL_MUTATION,
		{
			refetchQueries: ['findChannel'],
			onCompleted,
		},
	);

	const [modal, setModal] = useState(false);
	const onClick = () => {
		setModal(true);
	};

	const additionalAction = () => {
		request({ variables: { channelInput: { channelId } } });
	};

	return (
		<>
			<button className="btn btn-error" onClick={onClick}>
				채널 삭제
			</button>
			<input
				type="checkbox"
				id="delete-channel"
				className="modal-toggle"
				checked={modal}
				readOnly
			/>
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">채널 삭제</h3>
					<p className="py-4">채널을 삭제하시겠습니까?</p>
					<div className="modal-action">
						<label
							htmlFor="delete-channel"
							className="btn btn-primary w-20"
							onClick={additionalAction}
						>
							예
						</label>
						<label
							htmlFor="delete-channel"
							className="btn w-20"
							onClick={() => setModal(false)}
						>
							취소
						</label>
					</div>
				</div>
			</div>
		</>
	);
}
