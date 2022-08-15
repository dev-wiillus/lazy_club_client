import type { NextPage } from 'next';
import Seo from '../../../components/Seo';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from '../../../components/Checkbox';
import useMe from '../../../utils/hooks/useMe';
import HtmlModalButton from '../../../components/HtmlModalButton';
import { useMutation } from '@apollo/client';
import { OPEN_ALERT_MUTATION } from '../../../services/channel/gql';
import {
	OpenAlert,
	OpenAlertVariables,
} from '../../../__generated__/OpenAlert';
import { useRouter } from 'next/router';
import MessageModal from '../../../components/Modal';
import { useState } from 'react';

interface IForm {
	name: string;
	phone: string;
	termsOfService: boolean;
	privacyPolicy: boolean;
}

const ChannelReserve: NextPage = () => {
	const {
		query: { channelId },
		back,
	} = useRouter();
	const { data: userData } = useMe();
	const { name, phone } = userData?.me ?? {};
	const { handleSubmit, control, getValues } = useForm<IForm>({
		defaultValues: {
			name,
			phone,
		},
	});

	const [state, setState] = useState(false);
	const onCompleted = () => {
		setState(true);
		back();
	};

	const [request] = useMutation<OpenAlert, OpenAlertVariables>(
		OPEN_ALERT_MUTATION,
		{
			onCompleted,
		},
	);

	const onSubmit = () => {
		if (channelId) {
			const { name, phone } = getValues();

			request({
				variables: {
					input: {
						name,
						phone,
						channelId: +channelId,
					},
				},
			});
		}
	};

	// TODO: 이용약관 html 문서 로드
	// const html = serverPath('/public/docs/privacyPolicy.html');
	return (
		<>
			<div className="grid grid-cols-1 p-16 gap-4">
				<Seo title="Channel" />
				<div className="hero h-auto bg-base-200 py-8">
					<div className="hero-content text-center">
						<div className="space-y-4">
							<h2 className="text-3xl font-bold">
								다양한 채널에 알림 신청하셨나요?
							</h2>
							<h2 className="text-3xl font-bold">
								연락처 정보를 남겨주시면 런칭 시 알림을 드려요!
							</h2>
							<h3 className="text-2xl text-gray-400">
								(1개 이상 채널 알림 신청자 대상)
							</h3>
						</div>
					</div>
				</div>
				<form className="form space-y-8" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="name"
						control={control}
						rules={{ required: '이름을 입력하세요.' }}
						render={({ field, fieldState }) => (
							<div className="form-control w-full space-y-2">
								<label className="label" htmlFor="name">
									<span className="label-text font-bold">이름</span>
								</label>
								<input
									id="name"
									type="text"
									className="input input-bordered w-full"
									placeholder="이름 입력"
									autoFocus
									{...field}
								/>
								{fieldState.error && (
									<span className="text-error">{fieldState.error.message}</span>
								)}
							</div>
						)}
					/>
					<Controller
						name="phone"
						control={control}
						rules={{ required: '휴대폰 번호를 입력하세요.' }}
						render={({ field, fieldState }) => (
							<div className="form-control w-full space-y-2">
								<label className="label" htmlFor="phone">
									<span className="label-text font-bold">휴대폰 번호</span>
								</label>
								<input
									id="phone"
									type="text"
									className="input input-bordered w-full"
									placeholder="휴대폰 번호 입력(-제외)"
									{...field}
								/>
								{fieldState.error && (
									<span className="text-error">{fieldState.error.message}</span>
								)}
							</div>
						)}
					/>
					<div className="w-full space-y-2">
						<label className="label">
							<span className="label-text font-bold">이용약관</span>
						</label>
						<div className="pl-2">
							<Controller
								name="termsOfService"
								control={control}
								rules={{ required: '이용약관을 체크하세요.' }}
								render={({ field, fieldState }) => (
									<div className="form-control">
										<Checkbox
											inputProps={field}
											labelText="(필수) 이용약관에 동의합니다."
											extra={<HtmlModalButton html={''} />}
										/>
										{fieldState.error && (
											<span className="text-error">
												{fieldState.error.message}
											</span>
										)}
									</div>
								)}
							/>
							<Controller
								name="privacyPolicy"
								control={control}
								rules={{ required: '개인정보처리방침을 체크하세요.' }}
								render={({ field, fieldState }) => (
									<div className="form-control">
										<Checkbox
											inputProps={field}
											labelText="(필수) 개인정보처리방침에 동의합니다."
											extra={<HtmlModalButton html={''} />}
										/>
										{fieldState.error && (
											<span className="text-error">
												{fieldState.error.message}
											</span>
										)}
									</div>
								)}
							/>
						</div>
					</div>
					<button type="submit" className="btn btn-primary w-full">
						알림 신청하기
					</button>
				</form>
			</div>
			<MessageModal
				title="알림 신청"
				description="알림 신청이 완료됐습니다."
				state={state}
				setState={setState}
			/>
		</>
	);
};

export default ChannelReserve;
