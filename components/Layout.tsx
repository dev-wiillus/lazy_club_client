import NavBar from './NavBar';
import useRole from '../utils/hooks/useRole';

export default function Layout({ children }: any) {
	const [role] = useRole();

	return (
		<>
			<NavBar />
			<>{children}</>
		</>
	);
}
