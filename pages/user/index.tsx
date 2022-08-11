import type { NextPage } from 'next';
import Seo from '../../components/Seo';
import { useState } from 'react';

const User: NextPage = () => {
	const [page, setPage] = useState(0);
	return (
		<>
			<Seo title="유저 라운지" />
			<div
				className="hero min-h-screen"
				// style={{ backgroundImage: "url(https://placeimg.com/1000/800/arch)" }}
			>
				<div className="hero-overlay bg-opacity-60" />
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h2 className="mb-5 text-4xl">성장하는 사람들의 지식 노트</h2>
						{page === 0 ? (
							<>
								<h1 className="mb-5 text-5xl font-bold">LAZY CLUB</h1>
								<button className="btn btn-primary" onClick={() => setPage(1)}>
									더 알아보기
								</button>
							</>
						) : (
							<>
								<p className="mb-5">
									다양한 산업의 현업 전문가, 지식인들이 발행하는 노트를 통해
									그들의 관점, 일상, 지식과 노하우를 얻을 수 있어요
								</p>
								<p className="mb-5">
									구독 중인 노트의 최근 콘텐츠는 언제나 무료! 조금만
									부지런하다면, Clubber들의 최신 소식을 항상 무료로 읽을 수
									있어요.
								</p>
								<p className="mb-5">
									Clubber들의 노트를 구독하면 커뮤니티에서 소통하고, 특별한
									이벤트에 참여할 수 있어요
								</p>
								<p className="mb-5">
									성공을 향해 달리고 있는 Clubber들과 함께 개인의 성장도
									습관으로 만드세요
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default User;
