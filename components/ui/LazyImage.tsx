"use client";

import { memo } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const LazyImage = memo(function LazyImage({
  src,
  alt,
  className,
  width,
  height,
}: LazyImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
});

export default LazyImage;
