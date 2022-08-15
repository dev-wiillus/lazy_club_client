import React from 'react';

type InputProps = {
	html: string;
};

export default function HtmlModalButton({ html }: InputProps) {
	return (
		<>
			<label
				htmlFor="docs-modal"
				className="btn btn-outline btn-primary modal-button"
			>
				모두 보기
			</label>

			<input type="checkbox" id="docs-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						Congratulations random Internet user!
					</h3>
					<div className="py-4" dangerouslySetInnerHTML={{ __html: html }} />
					<div className="modal-action justify-center">
						<label htmlFor="docs-modal" className="btn">
							닫기
						</label>
					</div>
				</div>
			</div>
		</>
	);
}
