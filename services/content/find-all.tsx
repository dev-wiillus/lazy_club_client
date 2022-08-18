import { useLazyQuery, useQuery } from '@apollo/client';
import { AlertSVG, EyeSVG } from 'components/icons';
import Image, { noImagePath } from 'components/Image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AddComma } from 'utils/number';
import {
	FindAllContent,
	FindAllContentVariables,
} from '__generated__/FindAllContent';
import { FIND_ALL_CONTENT_QUERY } from './gql';

type InputProps = {
	channelId?: number;
	onContentClick: (value: number) => void;
};

// TODO: 스크롤에 따라 페이징 추가
export default function FindAll({ channelId, onContentClick }: InputProps) {
	const router = useRouter();

	const [request, { data }] = useLazyQuery<
		FindAllContent,
		FindAllContentVariables
	>(FIND_ALL_CONTENT_QUERY);
	useEffect(() => {
		if (channelId) {
			request({
				variables: {
					input: {
						channelId,
					},
				},
			});
		}
	}, [channelId]);
	const contents = data?.findAllContent.results;
	return (
		<div>
			{contents?.map(({ id, title, category, hit, contentFiles }) => {
				const { file: mainImageUrl } =
					contentFiles?.find((content) => content.isPreview) ?? {};
				return (
					<div
						onClick={() => onContentClick(id)}
						className="card card-side cursor-pointer shadow-xl"
						key={id}
					>
						<Image
							src={mainImageUrl ?? noImagePath}
							alt="content-main-image"
							width={200}
							height={200}
						/>
						<div className="card-body flex-row">
							<div className="flex flex-col flex-1">
								<h4 className="card-title mb-3">{title}</h4>
								<div className="badge badge-secondary">{category}</div>
							</div>
							<div className="card-actions flex items-center gap-2">
								<EyeSVG />
								<div className="badge badge-sm">{AddComma(hit)}</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
