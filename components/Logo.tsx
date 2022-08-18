import Image, { ImageProps } from 'next/image';
import React from 'react';

export const whiteLogoUrl = `/images/LAZYBLUB_white.png`;
export const blackLogoUrl = `/images/LAZYBLUB_blk.png`;

type InputProps = Omit<ImageProps, 'src'> & {
	color?: 'black' | 'white';
};

export default function Logo({ color, ...props }: InputProps) {
	return (
		<Image
			src={color === 'white' ? whiteLogoUrl : blackLogoUrl}
			alt="logo"
			style={{ verticalAlign: 'bottom' }}
			width={200}
			height={50}
			{...props}
		/>
	);
}
