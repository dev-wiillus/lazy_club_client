import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

const kakao: NextPage = () => {
	const {
		query: { code },
		push,
	} = useRouter();
	[];

	const login = useCallback(async () => {
		// push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/kakao`);
		// const res = await fetch(
		// 	`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/kakao`,
		// 	{
		// 		method: 'GET',
		// 	},
		// );
		// console.log(res);
	}, [push]);
	useEffect(() => {
		if (code) {
			login();
		}
	}, [code]);
	return (
		<div className="mt-28">
			<span className="font-medium text-lg">로딩중...</span>
		</div>
	);
};

export default kakao;
