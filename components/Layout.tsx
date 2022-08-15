import NavBar from './NavBar';
import { useRouter } from 'next/router';
import useMe from '../utils/hooks/useMe';

const onlyChildrenPath = ['/sign-in', '/sign-up'];

export default function Layout({ children }: any) {
	const router = useRouter();

	if (onlyChildrenPath.includes(router.pathname)) {
		return <>{children}</>;
	}
	const { data } = useMe();
	return (
		<>
			{data?.me && !data?.me.verified && (
				<div className="max-w-screen-sm mx-auto bg-red-500 p-3 text-center text-base">
					<span>이메일에서 계정 인증을 하세요.</span>
				</div>
			)}
			<div className="layout">
				<div className="navbar">
					<NavBar />
				</div>
				<div className="page">{children}</div>
			</div>
		</>
	);
}
