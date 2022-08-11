import Image from 'next/image';
import React from 'react';
import lazyClubLogo from '../../public/LAZYBLUB_blk.png';

type InputProps = {
	fontSize?: string;
};

export default function Logo({ fontSize = 'text-xl' }: InputProps) {
	return <Image src={lazyClubLogo} alt="logo" />;
}
