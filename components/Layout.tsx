import NavBar from './NavBar';
import useRole from '../utils/hooks/useRole';
import { useRouter } from 'next/router';

const onlyChildrenPath = ['/sign-in', '/sign-up'];

export default function Layout({ children }: any) {
	const router = useRouter();

	if (onlyChildrenPath.includes(router.pathname)) {
		return <>{children}</>;
	}
	return (
		<>
			<NavBar />
			<>{children}</>
		</>
	);
}
