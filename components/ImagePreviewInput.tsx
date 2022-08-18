import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Image, { noImagePath } from './Image';

type InputProps = Partial<UseFormRegisterReturn<string>> & {
	multiple?: boolean;
	imgSrc?: string | null;
};

const ImagePreviewInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ name = 'file_input', onChange, multiple, imgSrc, ...props }, ref) => {
		const [path, setPath] = useState(noImagePath);
		const encodeFileToBase64 = (file: File) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			return new Promise((resolve) => {
				reader.onload = () => {
					setPath(reader.result as string);
					resolve(true);
				};
			});
		};

		const fileUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
			try {
				const files = e.target.files;
				if (files && files.length === 1 && onChange) {
					const file = files[0];
					encodeFileToBase64(file);
					onChange(e);
				}
			} catch (error) {
				return error;
			}
		};

		useEffect(() => {
			if (imgSrc) setPath(imgSrc);
		}, [imgSrc]);
		return (
			<>
				<div className="avatar max-w-screen-sm">
					<label className="w-full rounded-xl cursor-pointer" htmlFor={name}>
						<Image src={path} alt="preview-img" />
					</label>
				</div>
				<input
					className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
					aria-describedby="file_input_help"
					id={name}
					name={name}
					type="file"
					accept="image/*"
					onChange={fileUpload}
					multiple={multiple}
					ref={ref}
					{...props}
				/>
				<p
					className="mt-1 text-sm text-gray-500 dark:text-gray-300"
					id="file_input_help"
				></p>
			</>
		);
	},
);

export default ImagePreviewInput;
