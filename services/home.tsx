import React, { useState } from 'react';
import useRole from 'utils/hooks/useRole';
import Logo from '../components/Logo';

export default function Home() {
	const [page, setPage] = useState(0);
	const [role] = useRole();
	return (
		<div
			className="hero h-full"
			style={{
				backgroundImage: `url(${
					process.env.NEXT_PUBLIC_BACKEND_URL
				}/images/${role?.toLocaleLowerCase()}.png)`,
			}}
		>
			<div className="hero-overlay bg-opacity-60" />
			<div className="hero-content text-white font-medium">
				<div className="max-w-md">
					{page === 0 ? (
						<>
							<h2 className="mb-3 text-3xl text-center">
								성장하는 사람들의 지식 노트
							</h2>
							<p className="flex">
								<Logo color="white" />
								<button
									className="btn btn-primary ml-5 w-32"
									onClick={() => setPage(1)}
								>
									더 알아보기
								</button>
							</p>
						</>
					) : (
						<div className="flex flex-col gap-12">
							<div className="text-2xl text-center">
								<p>성장하는 사람들의 일상, 지식, 노하우,</p>
								<p>
									<span style={{ verticalAlign: 'middle' }}>
										<Logo color="white" height="36px" width="200px" />
									</span>
									에 다있다!
								</p>
							</div>
							<p className="w-3/4">
								다양한 산업의 현업 전문가, 지식인들이 발행하는 노트를 통해
								그들의 관점, 일상, 지식과 노하우를 얻을 수 있어요
							</p>
							<p className="w-3/4 place-self-end">
								구독 중인 노트의 최근 콘텐츠는 언제나 무료! 조금만 부지런하다면,
								Clubber들의 최신 소식을 항상 무료로 읽을 수 있어요.
							</p>
							<p className="w-3/4">
								Clubber들의 노트를 구독하면 커뮤니티에서 소통하고, 특별한
								이벤트에 참여할 수 있어요
							</p>
							<p className="w-3/4 place-self-end">
								성공을 향해 달리고 있는 Clubber들과 함께 개인의 성장도 습관으로
								만드세요
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
