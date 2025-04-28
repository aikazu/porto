/**
 * Utility functions for image processing
 */

/**
 * Resize and process an image file
 * @param file The image file to process
 * @param maxWidth The maximum width for the processed image
 * @param maxHeight The maximum height for the processed image
 * @param quality The output quality (0-1) for JPEG images
 * @param format The output format (default: 'image/jpeg')
 * @returns A Promise that resolves to the processed image as a data URL
 */
export const processImage = (
  file: File,
  maxWidth: number = 400,
  maxHeight: number = 400,
  quality: number = 0.9,
  format: string = 'image/jpeg'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate the file type
    if (!file.type.match('image.*')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    // Create a FileReader to read the file
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (!event.target || !event.target.result) {
        reject(new Error('Failed to read image file'));
        return;
      }
      
      // Create an image element to load the file data
      const img = new Image();
      
      img.onload = () => {
        try {
          // Create a canvas element to draw and resize the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          // Calculate dimensions while maintaining aspect ratio
          const scale = Math.min(
            maxWidth / img.width, 
            maxHeight / img.height,
            1 // Don't upscale images that are already smaller than the max dimensions
          );
          
          const newWidth = Math.round(img.width * scale);
          const newHeight = Math.round(img.height * scale);
          
          // Set canvas size to the new dimensions
          canvas.width = maxWidth;
          canvas.height = maxHeight;
          
          // Fill with white background (important for transparent images)
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Center the image if it's smaller than the canvas
          const xOffset = Math.max(0, (maxWidth - newWidth) / 2);
          const yOffset = Math.max(0, (maxHeight - newHeight) / 2);
          
          // Draw the image centered on the canvas
          ctx.drawImage(img, 0, 0, img.width, img.height, xOffset, yOffset, newWidth, newHeight);
          
          // Convert canvas to data URL
          const dataUrl = canvas.toDataURL(format, quality);
          
          // Verify the data URL is valid
          if (!dataUrl || dataUrl === 'data:,') {
            reject(new Error('Failed to create valid data URL'));
            return;
          }
          
          resolve(dataUrl);
        } catch (error) {
          reject(error instanceof Error ? error : new Error('Error processing image'));
        }
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      // Set the image source to the file reader result
      if (typeof event.target.result === 'string') {
        img.src = event.target.result;
      } else {
        // For ArrayBuffer result, convert to data URL
        const blob = new Blob([event.target.result as ArrayBuffer]);
        img.src = URL.createObjectURL(blob);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
};

/**
 * Calculate the file size of a data URL in KB
 * @param dataUrl The data URL
 * @returns The file size in KB
 */
export const getDataUrlFileSize = (dataUrl: string): number => {
  // Remove the data URL prefix to get the base64 string
  const base64String = dataUrl.split(',')[1];
  if (!base64String) return 0;
  
  // Calculate the size in bytes (each Base64 digit represents 6 bits = 3/4 byte)
  const sizeInBytes = Math.ceil((base64String.length * 3) / 4);
  // Convert to KB
  return Math.round(sizeInBytes / 1024);
};

/**
 * Convert a Base64 data URL to a Blob
 * @param dataUrl The data URL to convert
 * @returns A Blob object
 */
export const dataUrlToBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}; 