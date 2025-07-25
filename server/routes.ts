import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { insertVideoSchema } from "@shared/schema";
import { uploadVideo, uploadImage, isCloudinaryConfigured } from "./cloudinary";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
const videosDir = path.join(uploadDir, 'videos');
const thumbnailsDir = path.join(uploadDir, 'thumbnails');

// Ensure upload directories exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created uploads directory:', uploadDir);
}
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
  console.log('Created videos directory:', videosDir);
}
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
  console.log('Created thumbnails directory:', thumbnailsDir);
}

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subDir = file.fieldname === 'video' ? 'videos' : 'thumbnails';
    const fullPath = path.join(uploadDir, subDir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: videoStorage,
  fileFilter: (req, file, cb) => {
    console.log('File filter check:', file.fieldname, file.mimetype, file.originalname);
    
    if (file.fieldname === 'video') {
      const allowedVideoTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/mkv', 'video/webm', 'video/quicktime'];
      if (allowedVideoTypes.includes(file.mimetype) || file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error(`Invalid video file type: ${file.mimetype}. Allowed types: MP4, MOV, AVI, MKV, WebM`));
      }
    } else if (file.fieldname === 'thumbnail') {
      const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (allowedImageTypes.includes(file.mimetype) || file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error(`Invalid image file type: ${file.mimetype}. Allowed types: JPG, PNG, WebP`));
      }
    } else {
      cb(new Error(`Unexpected field: ${file.fieldname}`));
    }
  },
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
    files: 2, // Maximum 2 files (video + thumbnail)
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files statically
  app.use('/uploads', express.static(uploadDir));

  // Get all published videos
  app.get('/api/videos', async (req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json(videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
      res.status(500).json({ error: 'Failed to fetch videos' });
    }
  });

  // Check storage configuration
  app.get('/api/admin/storage-status', (req, res) => {
    res.json({
      cloudinaryConfigured: isCloudinaryConfigured(),
      storageType: isCloudinaryConfigured() ? 'cloud' : 'local'
    });
  });

  // Admin video upload endpoint
  app.post('/api/admin/upload-video', (req, res, next) => {
    upload.fields([
      { name: 'video', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 }
    ])(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File too large. Maximum size is 500MB.' });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({ error: 'Unexpected file field.' });
        }
        return res.status(400).json({ error: err.message || 'File upload error' });
      }
      next();
    });
  }, async (req, res) => {
    try {
      console.log('Video upload request received');
      console.log('Body:', req.body);
      console.log('Files:', req.files);
      console.log('Cloudinary configured:', isCloudinaryConfigured());

      const { title, description } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // Validate title
      if (!title || title.trim() === '') {
        console.log('Missing title');
        return res.status(400).json({ error: 'Title is required' });
      }

      if (!files || !files.video || !files.video[0]) {
        console.log('Missing video file');
        return res.status(400).json({ error: 'Video file is required' });
      }

      const videoFile = files.video[0];
      const thumbnailFile = files.thumbnail?.[0];

      console.log('Video file:', videoFile.filename, videoFile.size);
      if (thumbnailFile) {
        console.log('Thumbnail file:', thumbnailFile.filename, thumbnailFile.size);
      }

      let videoUrl: string;
      let thumbnailUrl: string = '';

      if (isCloudinaryConfigured()) {
        console.log('Using Cloudinary for persistent storage');
        
        try {
          // Upload video to Cloudinary
          const videoResult = await uploadVideo(videoFile.path, videoFile.filename);
          videoUrl = videoResult.secure_url;
          console.log('Video uploaded to Cloudinary:', videoUrl);

          // Upload thumbnail to Cloudinary if provided
          if (thumbnailFile) {
            const thumbnailResult = await uploadImage(thumbnailFile.path, thumbnailFile.filename);
            thumbnailUrl = thumbnailResult.secure_url;
            console.log('Thumbnail uploaded to Cloudinary:', thumbnailUrl);
          }

          // Clean up local files after upload
          try {
            fs.unlinkSync(videoFile.path);
            if (thumbnailFile) {
              fs.unlinkSync(thumbnailFile.path);
            }
          } catch (cleanupError) {
            console.warn('Failed to clean up local files:', cleanupError);
          }
        } catch (cloudinaryError) {
          console.error('Cloudinary upload failed, falling back to local storage:', cloudinaryError);
          // Fallback to local storage if Cloudinary fails
          videoUrl = `/uploads/videos/${videoFile.filename}`;
          thumbnailUrl = thumbnailFile ? `/uploads/thumbnails/${thumbnailFile.filename}` : '';
        }
      } else {
        console.log('Using local storage (Cloudinary not configured)');
        // Fallback to local storage for development
        videoUrl = `/uploads/videos/${videoFile.filename}`;
        thumbnailUrl = thumbnailFile ? `/uploads/thumbnails/${thumbnailFile.filename}` : '';
      }

      // Validate input data
      const videoData = {
        title: title.trim(),
        description: description?.trim() || '',
        videoUrl,
        thumbnailUrl,
        isPublished: true
      };

      console.log('Video data to save:', videoData);

      const validatedData = insertVideoSchema.parse(videoData);
      
      // Save to storage
      const newVideo = await storage.createVideo(validatedData);
      
      console.log('Video saved successfully:', newVideo.id);
      
      res.json({
        success: true,
        video: newVideo
      });

    } catch (error) {
      console.error('Video upload error:', error);
      res.status(500).json({ 
        error: 'Failed to upload video',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
