import Link from 'next/link';

export default function TermsOfServiceButton() {
	return (
		<Link
			href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/docs/termsOfService.html`}
		>
			<a target="_blank" rel="noreferrer">
				<button type="button" className="btn btn-outline btn-primary">
					모두보기
				</button>
			</a>
		</Link>
	);
}
