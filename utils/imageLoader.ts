import { ImageLoaderProps } from "next/image";

export const imageLoader = ({ src }: ImageLoaderProps) => {
  return `https://image.tmdb.org/${src}`;
};
