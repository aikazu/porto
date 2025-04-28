import { CSSProperties } from 'react';
import { getResponsiveImageProps } from '../../utils/imageOptimizer';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  quality?: number;
}

/**
 * A responsive image component that automatically optimizes images
 * and implements best practices for performance
 */
const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  objectFit = 'cover',
  priority = false,
  quality = 80,
}: ResponsiveImageProps) => {
  // Get responsive image props
  const imageProps = getResponsiveImageProps(src, alt, {
    width,
    height,
    quality
  });

  // Define combined styles
  const combinedStyle: CSSProperties = {
    objectFit,
    ...style
  };

  return (
    <img
      src={imageProps.src}
      srcSet={imageProps.srcSet}
      sizes={imageProps.sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={combinedStyle}
      loading={priority ? undefined : 'lazy'}
    />
  );
};

export default ResponsiveImage; 