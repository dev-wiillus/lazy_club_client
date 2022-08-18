import { default as NextImage, ImageProps as NextImageProps } from 'next/image';

export const noImagePath = 'images/no-img.png';
type InputProps = Omit<NextImageProps, 'src'> &
	Partial<Pick<NextImageProps, 'src'>>;

export default function Image({
	src = noImagePath,
	width,
	height,
	layout,
	...props
}: InputProps) {
	const sizeProps: Pick<InputProps, 'width' | 'height' | 'layout'> = !(
		width ||
		height ||
		layout
	)
		? {
				width: '100%',
				height: `100%`,
				layout: 'responsive',
		  }
		: { width, height, layout };
	return <NextImage src={src} {...props} {...sizeProps} />;
}
