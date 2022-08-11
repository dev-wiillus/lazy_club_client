import React from 'react';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../apollo';

// const IS_LOGGED_IN = gql`
// 	query isLoggedIn {
// 		isLoggedIn @client
// 	}
// `;

type InputProps = {
	children: React.ReactElement;
};

export default function Auth({ children }: InputProps) {
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	return <>{children}</>;
}
