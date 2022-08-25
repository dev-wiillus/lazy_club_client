import Inform from './inform';
import ListUp from './list-up';

export default function FindAll() {
	return (
		<div className="max-h-full flex flex-col gap-4">
			<Inform />
			<div className="flex-1 overflow-auto space-y-4">
				<ListUp />
			</div>
		</div>
	);
}
