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
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
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
    if (file.fieldname === 'video') {
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Only video files are allowed for video field'));
      }
    } else if (file.fieldname === 'thumbnail') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for thumbnail field'));
      }
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
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
  app.post('/api/admin/upload-video', upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]), async (req, res) => {
    try {
      console.log('Video upload request received');
      console.log('Body:', req.body);
      console.log('Files:', req.files);

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
        fs.unlinkSync(videoFile.path);
        if (thumbnailFile) {
          fs.unlinkSync(thumbnailFile.path);
        }
      } else {
        console.log('Using local storage (temporary - files will be lost on redeploy)');
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
