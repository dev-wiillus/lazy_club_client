import React, { useMemo } from 'react';
import useRole from '../../utils/hooks/useRole';
import Link from 'next/link';
import useMe from '../../utils/hooks/useMe';
import { UserRoleType } from '../../__generated__/globalTypes';

export default function Lounge() {
	const { data } = useMe();
	const [linkUrl, btnText] = useMemo(() => {
		if (data?.me.role === UserRoleType.Creator) {
			return ['/creator/channels', '내 채널로 이동하기'];
		} else {
			return ['/creator/channels/mutate', '채널 만들기'];
		}
	}, []);
	return (
		<>
			<div className="snap-start h-screen flex flex-col gap-4">
				<h1 className="text-5xl font-bold mt-32">Clubber's lounge</h1>
				<h2 className="text-2xl">
					성장을 위한 지식, 노하우, 일상을 기록하고, 당신만의 팬과 수익을
					만드세요
				</h2>
				<Link href={linkUrl}>
					<button className="btn btn-primary mt-4 w-40">{btnText}</button>
				</Link>
			</div>
			<div className="snap-start h-screen flex flex-col justify-evenly">
				<div className="text-2xl text-center font-medium">
					<p>머릿 속 지식과 경험으로 경제적 안정과 사회적 인정을 동시에</p>
				</div>
				<p className="w-3/4">
					당신의 지식과 경험, 노하우를 나눌 채널을 만들어 성장에 목마른 사람들과
					함께해 보세요
				</p>
				<p className="w-3/4 place-self-end">
					채널 주제에 어울리는 공동 운영자를 초대해 함께 운영해 보세요, 다양한
					콘텐츠와 관점이 구독자를 설레게 할 거에요.
				</p>
				<p className="w-3/4">
					유저들은 1건의 최신 콘텐츠를 언제나 무료로 볼 수 있어요, 하지만 지난
					콘텐츠를 보려면 유료 구독 옵션을 선택할 거에요.
				</p>
				<p className="w-3/4 place-self-end">
					유료 구독자는 커뮤니티를 통해 당신과 소통할 수 있어요. 유저들의 질문과
					피드백으로 콘텐츠 주제도 잡아보세요.
				</p>
			</div>
			<div className="snap-start h-screen flex flex-col gap-12 py-20">
				<h2 className="text-2xl font-medium mb-20 text-center mt-32">
					클러버 활동은 우리의 사회적 실패를 줄이는 데 기여하는 활동의
					시작입니다.
				</h2>
				<p className="w-3/4">
					실리콘밸리의 벤처 사업가, 에릭 리스의 &apos;린스타트업&apos;은 불과 책
					1권으로 미국 전역의 창업 실패율을 300%나 줄인 것으로 유명합니다.
				</p>
				<p className="w-3/4">
					당신의 지혜를 나누는 활동이 이 사회에서도 좋은 영향력을 발휘하게 될
					것이에요.
				</p>
				<Link href={linkUrl}>
					<button className="btn btn-primary mt-12">{btnText}</button>
				</Link>
			</div>
		</>
	);
}
