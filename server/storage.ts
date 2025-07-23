import { users, type User, type InsertUser, type MusicTrack, type Video, type InsertVideo, type GalleryImage } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMusicTracks(): Promise<MusicTrack[]>;
  getVideos(): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  getGalleryImages(): Promise<GalleryImage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private musicTracks: Map<number, MusicTrack>;
  private videos: Map<number, Video>;
  private galleryImages: Map<number, GalleryImage>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.musicTracks = new Map();
    this.videos = new Map();
    this.galleryImages = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getMusicTracks(): Promise<MusicTrack[]> {
    // Return empty array for now - will be populated when admin uploads tracks
    return [];
  }

  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values());
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentId++;
    const video: Video = { 
      id,
      title: insertVideo.title,
      description: insertVideo.description as string | null,
      thumbnailUrl: insertVideo.thumbnailUrl,
      videoUrl: insertVideo.videoUrl as string | null,
      isPublished: insertVideo.isPublished as boolean | null,
      createdAt: new Date()
    };
    this.videos.set(id, video);
    return video;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values());
  }
}

export const storage = new MemStorage();
