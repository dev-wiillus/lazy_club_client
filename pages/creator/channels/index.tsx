import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Seo from '../../../components/Seo';
import Inform from '../../../services/channel/inform';
import ListUp from '../../../services/channel/list-up';
import useRole from '../../../utils/hooks/useRole';

const Channels: NextPage = () => {
	const [role] = useRole();
	return (
		<div className="grid grid-cols-1 p-6 gap-8">
			<Seo title="Channel" />
			<div>
				<h3 className="text-base mb-2 font-medium">clubber's lounge</h3>
				<div className="flex gap-4 justify-end">
					<Link href={`/${role}/contents/mutate`}>
						<button className="btn">새 콘텐츠</button>
					</Link>
					<Link href={`/${role}/contents/mutate`}>
						<button className="btn">임시 저장</button>
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-1">
				<div>
					<h3 className="text-base mb-2 font-medium">내 채널</h3>
					<div></div>
				</div>
				<div className="grid grid-cols-3">
					<div>
						<h3 className="text-base mb-2 font-medium">구독자 수</h3>
						<div></div>
					</div>
					<div>
						<h3 className="text-base mb-2 font-medium">조회 수</h3>
						<div></div>
					</div>
					<div>
						<h3 className="text-base mb-2 font-medium">좋아요 수</h3>
						<div></div>
					</div>
				</div>
				<div>
					<h3 className="text-base mb-2 font-medium">인기 콘텐츠</h3>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default Channels;
