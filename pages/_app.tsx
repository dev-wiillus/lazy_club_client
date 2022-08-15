import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import { client, roleModeVar } from '../apollo';
import Auth from '../services/Auth';
import { useEffect } from 'react';
import { LOCALSTORAGE_ROLE_MODE } from '../utils/constants';
import { UserRoleType } from '../__generated__/globalTypes';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	useEffect(() => {
		roleModeVar(
			localStorage.getItem(LOCALSTORAGE_ROLE_MODE) as UserRoleType | null,
		);
	}, []);
	return (
		<ApolloProvider client={client}>
			<SessionProvider session={session}>
				<Auth>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Auth>
			</SessionProvider>
		</ApolloProvider>
	);
}

export default App;
