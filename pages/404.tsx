import Link from 'next/link';

const NotFound = () => (
	<div className="h-screen flex flex-col items-center justify-center">
		<h2 className="font-semibold text-2xl mb-3">Page Not Found.</h2>
		<h4 className="font-medium text-base mb-5">
			The page you're looking for does not exist or has moved.
		</h4>
		<Link href="/">
			<a className="text-sky-500 hover:underline ">Go back home &rarr;</a>
		</Link>
	</div>
);

export default NotFound;
