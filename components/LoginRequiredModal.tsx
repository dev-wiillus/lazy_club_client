import { useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { modaleVar } from '../apollo';

export default function LoginRequiredModal() {
	const router = useRouter();

	const modalState = useReactiveVar(modaleVar);
	const onClick = () => {
		modaleVar(false);
		router.push({ pathname: '/sign-in', query: { back: true } }, '/sign-in');
	};

	const onCancel = () => {
		modaleVar(false);
	};

	return (
		<>
			<input
				type="checkbox"
				id="to-login"
				className="modal-toggle"
				checked={modalState}
				readOnly
			/>
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">로그인 필요</h3>
					<p className="py-4">로그인 페이지로 이동합니다.</p>
					<div className="modal-action">
						<label
							htmlFor="to-login"
							className="btn btn-primary w-20"
							onClick={onClick}
						>
							예
						</label>
						<label htmlFor="to-login" className="btn w-20" onClick={onCancel}>
							취소
						</label>
					</div>
				</div>
			</div>
		</>
	);
}
