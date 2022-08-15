import React, { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

type CheckboxProps = {
	inputProps: any;
	labelText?: string;
	defaultChecked?: boolean;
	extra?: React.ReactElement;
};

export default function Checkbox({
	inputProps,
	labelText,
	defaultChecked,
	extra,
}: CheckboxProps) {
	const [checked, check] = useState(defaultChecked);
	return (
		<label className="label cursor-pointer justify-start space-x-2">
			<input
				type="checkbox"
				checked={checked}
				onClick={() => check(!checked)}
				className="checkbox checkbox-primary"
				{...inputProps}
			/>
			<span className="label-text">{labelText}</span>
			{extra}
		</label>
	);
}
