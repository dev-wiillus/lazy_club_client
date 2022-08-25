import React, { useState } from 'react';
import { ControllerRenderProps, UseFormSetValue } from 'react-hook-form';

type CheckboxGroupProps = {
	label: string;
	items: {
		value: string;
		label: string;
		defaultChecked?: boolean;
	}[];
	formProps: any;
};

// TODO: list로 value를 저장할 수 있도록 하려면? 선택된 checkbox의 value들로
// TODO: checkbox -> checktag
export default function CheckboxGroup({
	label,
	items,
	formProps,
}: CheckboxGroupProps) {
	const [value, setValue] = useState();
	return (
		<>
			{items.map((item) => (
				<div className="form-control" key={item.value}>
					<label className="label cursor-pointer">
						<span className="label-text font-normal">{item.label}</span>
						<input
							type="checkbox"
							className="checkbox"
							defaultChecked={item.defaultChecked}
							value={item.value}
							checked={item.value === value}
							onClick={(event) => {
								// console.log(event.target.value);
								// setValue(event.target.value);
							}}
						/>
					</label>
				</div>
			))}
		</>
	);
}
