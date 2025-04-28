interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'original';
}

/**
 * Optimizes an image URL by passing it through a processing service
 * For production, this would connect to an image processing service like Cloudinary, Imgix, etc.
 * For development/demo, we'll use a placeholder image with sizing parameters
 */
export function optimizeImage(url: string, options: ImageOptions = {}): string {
  // Skip optimization if the URL is already optimized or is a data URL
  if (
    url.startsWith('data:') || 
    url.includes('imagedelivery.net') || 
    url.includes('imageoptim.com') ||
    url.includes('cloudinary.com') ||
    url.includes('imgix.net')
  ) {
    return url;
  }

  // If it's a placeholder URL, add size parameters
  if (url.includes('placehold.co')) {
    const width = options.width || 600;
    const height = options.height || 400;
    
    // Extract existing text parameter if present
    const textMatch = url.match(/text=([^&]+)/);
    const textParam = textMatch ? textMatch[1] : 'Image';
    
    // Format as placehold.co URL with size
    return `https://placehold.co/${width}x${height}/eee/333?text=${textParam}`;
  }

  // For production, we would have logic here to transform URLs for image services
  // For example with Cloudinary:
  // return `https://res.cloudinary.com/your-account/image/fetch/q_${options.quality || 90},w_${options.width || 'auto'}/f_${options.format || 'auto'}/${encodeURIComponent(url)}`;
  
  // For demo purposes, we'll just return the original URL
  return url;
}

/**
 * Generates a set of image URLs at different sizes for responsive images
 */
export function generateSrcSet(url: string, sizes: number[] = [320, 640, 960, 1280]): string {
  return sizes
    .map(size => {
      const optimizedUrl = optimizeImage(url, { width: size });
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
}

/**
 * Creates an object with all properties needed for a responsive image
 */
export function getResponsiveImageProps(url: string, alt: string, options: ImageOptions = {}) {
  return {
    src: optimizeImage(url, options),
    srcSet: generateSrcSet(url),
    alt,
    width: options.width,
    height: options.height,
    loading: 'lazy',
    // Default sizes attribute covers most use cases
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  };
} 