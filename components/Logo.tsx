import Image, { ImageProps } from 'next/image';
import React from 'react';
import blackLogo from '../public/LAZYBLUB_blk.png';
import whiteLogo from '../public/LAZYBLUB_white.png';

type InputProps = Omit<ImageProps, 'src'> & {
	color?: 'black' | 'white';
};

export default function Logo({ color, ...props }: InputProps) {
	return (
		<Image
			src={color === 'white' ? whiteLogo : blackLogo}
			alt="logo"
			style={{ verticalAlign: 'bottom' }}
			{...props}
		/>
	);
}
