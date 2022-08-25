import { useMutation } from '@apollo/client';
import { DELETE_CHANNEL_MUTATION } from 'services/channel/gql';
import { useState } from 'react';
import useRole from 'utils/hooks/useRole';
import { useRouter } from 'next/router';
import {
	DeleteContent,
	DeleteContentVariables,
} from '__generated__/DeleteContent';

type InputProps = {
	contentId: number;
};

export default function DeleteButton({ contentId }: InputProps) {
	const [role] = useRole();
	const router = useRouter();
	const onCompleted = (data: DeleteContent) => {
		const { ok } = data?.deleteContent ?? {};
		if (ok) {
			setModal(false);
			router.push(`/${role.toLocaleLowerCase()}/channels`);
		}
	};
	const [request] = useMutation<DeleteContent, DeleteContentVariables>(
		DELETE_CHANNEL_MUTATION,
		{
			refetchQueries: ['findChannel', 'findContent'],
			onCompleted,
		},
	);

	const [modal, setModal] = useState(false);
	const onClick = () => {
		setModal(true);
	};

	const additionalAction = () => {
		request({ variables: { input: { contentId } } });
	};

	return (
		<>
			<button className="btn btn-error" onClick={onClick}>
				삭제
			</button>
			<input
				type="checkbox"
				id="delete-content"
				className="modal-toggle"
				checked={modal}
				readOnly
			/>
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">콘텐츠 삭제</h3>
					<p className="py-4">콘텐츠를 삭제하시겠습니까?</p>
					<div className="modal-action">
						<label
							htmlFor="delete-content"
							className="btn btn-primary w-20"
							onClick={additionalAction}
						>
							예
						</label>
						<label
							htmlFor="delete-content"
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
