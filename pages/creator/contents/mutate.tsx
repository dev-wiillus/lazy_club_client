import { NextPage } from 'next';
import Editor from '../../../components/Editor';

const MutateContent: NextPage = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4 justify-end">
				<button className="btn">발행</button>
				<button className="btn">임시 저장</button>
			</div>
			<div>
				<Editor />
			</div>
		</div>
	);
};

export default MutateContent;
