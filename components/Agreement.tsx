import { Controller } from 'react-hook-form';
import PrivacyPolicyButton from 'services/common/PrivacyPolicyButton';
import TermsOfServiceButton from 'services/common/TermsOfServiceButton';
import Checkbox from './Checkbox';

type InputProps = {
	control?: any;
};

export default function Agreement({ control }: InputProps) {
	return (
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
								extra={<TermsOfServiceButton />}
							/>
							{fieldState.error && (
								<span className="text-error">{fieldState.error.message}</span>
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
								extra={<PrivacyPolicyButton />}
							/>
							{fieldState.error && (
								<span className="text-error">{fieldState.error.message}</span>
							)}
						</div>
					)}
				/>
			</div>
		</div>
	);
}
