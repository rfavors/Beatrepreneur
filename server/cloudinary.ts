import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo', 
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo'
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  bytes: number;
}

export async function uploadVideo(filePath: string, fileName: string): Promise<CloudinaryUploadResult> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      public_id: `videos/${fileName}`,
      folder: "beatrepreneur/videos",
      overwrite: true,
      quality: "auto"
    });
    
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      resource_type: result.resource_type,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary video upload error:', error);
    throw new Error(`Failed to upload video: ${error}`);
  }
}

export async function uploadImage(filePath: string, fileName: string): Promise<CloudinaryUploadResult> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      public_id: `thumbnails/${fileName}`,
      folder: "beatrepreneur/thumbnails", 
      overwrite: true,
      quality: "auto",
      format: "webp"
    });
    
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      resource_type: result.resource_type,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary image upload error:', error);
    throw new Error(`Failed to upload image: ${error}`);
  }
}

export async function deleteFile(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error(`Failed to delete file: ${error}`);
  }
}

// Fallback for development - store files locally if Cloudinary not configured
export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_CLOUD_NAME !== 'demo' &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_KEY !== 'demo' &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_API_SECRET !== 'demo'
  );
}