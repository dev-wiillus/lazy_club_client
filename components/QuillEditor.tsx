import React, { useMemo, useCallback, memo, useRef, useState } from 'react';
import styles from './quillEditor.module.css';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // react-quill과 css파일 import 하기
import { useMutation } from '@apollo/client';
import { CREATE_CONTENT_FILE_MUTATION } from '../services/common/gql';
import {
	CreateContentFile,
	CreateContentFileVariables,
} from '../__generated__/CreateContentFile';
import MessageModal from './Modal';

type InputProps = ReactQuillProps & {
	contentId?: number;
};

const QuillEditor = ({ contentId, ...props }: InputProps) => {
	const [request] = useMutation<CreateContentFile, CreateContentFileVariables>(
		CREATE_CONTENT_FILE_MUTATION,
	);
	const QuillRef = useRef<ReactQuill>();
	const [error, setError] = useState(false);

	const imageHandler = useCallback(async () => {
		const input = document.createElement('input');

		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = async () => {
			const files: FileList | null = input.files;
			if (files !== null && contentId) {
				try {
					const file = files[0];
					const { data } = await request({
						variables: {
							input: { file, isPreview: false, contentId },
						},
					});

					const { ok, result } = data?.createContentFile ?? {};

					if (ok) {
						// 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드
						const range = QuillRef.current?.getEditor().getSelection()?.index;
						if (range !== null && range !== undefined) {
							let quill = QuillRef.current?.getEditor();

							quill?.setSelection(range, 1);

							quill?.clipboard.dangerouslyPasteHTML(
								range,
								`<img src=${process.env.NEXT_PUBLIC_BACKEND_URL}/${result?.file} alt="image-tag" />`,
							);
						}

						// return { ...res, success: true };
					} else {
						setError(true);
					}
				} catch (error) {
					return error;
				}
			}
		};
	}, [request]);

	const module: ReactQuillProps['modules'] = {
		toolbar: {
			container: [
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
				[
					{ list: 'ordered' },
					{ list: 'bullet' },
					{ indent: '-1' },
					{ indent: '+1' },
					{ align: [] },
				],
				['image', 'video'],
			],
			handlers: {
				image: imageHandler,
			},
		},
	};
	return (
		<>
			<ReactQuill
				ref={(element) => {
					if (element !== null) {
						QuillRef.current = element;
					}
				}}
				modules={module}
				theme="snow"
				placeholder="내용을 입력해주세요."
				{...props}
			/>
			<MessageModal
				title="에러"
				description="파일 업로드를 실패하였습니다."
				state={error}
				setState={setError}
			/>
		</>
	);
};

export default QuillEditor;
