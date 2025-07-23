import { useState, useEffect } from "react";
import { Upload, Video, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface VideoUpload {
  id: string;
  title: string;
  description: string;
  file: File | null;
  thumbnail: File | null;
  preview?: string;
  thumbnailPreview?: string;
}

export default function AdminPage() {
  const [videos, setVideos] = useState<VideoUpload[]>([]);
  const [uploading, setUploading] = useState(false);
  const [storageStatus, setStorageStatus] = useState<{cloudinaryConfigured: boolean, storageType: string} | null>(null);
  const { toast } = useToast();

  // Fetch storage status on component mount
  useEffect(() => {
    fetch('/api/admin/storage-status')
      .then(res => res.json())
      .then(setStorageStatus)
      .catch(console.error);
  }, []);

  const addNewVideo = () => {
    const newVideo: VideoUpload = {
      id: Date.now().toString(),
      title: "",
      description: "",
      file: null,
      thumbnail: null,
    };
    setVideos([...videos, newVideo]);
  };

  const removeVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const updateVideo = (id: string, field: keyof VideoUpload, value: any) => {
    setVideos(prevVideos => 
      prevVideos.map(video => 
        video.id === id ? { ...video, [field]: value } : video
      )
    );
  };

  const handleVideoFileChange = (id: string, file: File | null) => {
    if (file) {
      // Check file type
      const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/mkv', 'video/webm'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please select a valid video file (MP4, MOV, AVI, MKV, or WebM)",
          variant: "destructive",
        });
        return;
      }

      // Check file size (limit to 500MB)
      if (file.size > 500 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Video file must be smaller than 500MB",
          variant: "destructive",
        });
        return;
      }

      const preview = URL.createObjectURL(file);
      updateVideo(id, 'file', file);
      updateVideo(id, 'preview', preview);
      
      toast({
        title: "Video Added",
        description: `"${file.name}" is ready for upload`,
      });
    }
  };

  const handleThumbnailChange = (id: string, file: File | null) => {
    if (file) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid Image Type",
          description: "Please select a valid image file (JPG, PNG, or WebP)",
          variant: "destructive",
        });
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Image Too Large",
          description: "Thumbnail image must be smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const preview = URL.createObjectURL(file);
      updateVideo(id, 'thumbnail', file);
      updateVideo(id, 'thumbnailPreview', preview);
      
      toast({
        title: "Thumbnail Added",
        description: `"${file.name}" is ready for upload`,
      });
    }
  };

  const uploadVideos = async () => {
    // First, validate all videos before starting upload
    const invalidVideos = videos.filter(video => {
      const hasFile = !!video.file;
      const hasTitle = !!video.title && video.title.trim() !== '';
      return !hasFile || !hasTitle;
    });
    
    if (invalidVideos.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please provide title and video file for all videos",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      let uploadedCount = 0;
      
      for (const video of videos) {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('title', video.title.trim());
        formData.append('description', video.description.trim());
        formData.append('video', video.file as File);
        if (video.thumbnail) {
          formData.append('thumbnail', video.thumbnail);
        }

        // Upload to server
        const response = await fetch('/api/admin/upload-video', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          uploadedCount++;
          toast({
            title: "Video Uploaded",
            description: `"${video.title}" has been uploaded successfully`,
          });
        } else {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || 'Upload failed');
        }
      }

      // Clear the form after successful upload
      if (uploadedCount > 0) {
        setVideos([]);
        toast({
          title: "Upload Complete",
          description: `Successfully uploaded ${uploadedCount} video${uploadedCount > 1 ? 's' : ''}`,
        });
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Error",
        description: error instanceof Error ? error.message : "Failed to upload videos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-orbitron font-bold text-4xl mb-4 text-gradient">
              Admin Panel
            </h1>
            <p className="text-xl text-gray-400">
              Upload and manage your music videos
            </p>
          </div>

          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Video className="h-6 w-6" />
                <span>Video Upload</span>
              </CardTitle>
              
              {/* Storage Configuration Notice */}
              {storageStatus && (
                <div className={`${storageStatus.cloudinaryConfigured 
                  ? 'bg-green-900/20 border-green-600/30' 
                  : 'bg-amber-900/20 border-amber-600/30'} rounded-lg p-4 mt-4`}>
                  <div className="flex items-start space-x-3">
                    <div className={`${storageStatus.cloudinaryConfigured ? 'text-green-400' : 'text-amber-400'} text-xl`}>
                      {storageStatus.cloudinaryConfigured ? '✅' : '⚠️'}
                    </div>
                    <div>
                      <h4 className={`${storageStatus.cloudinaryConfigured ? 'text-green-400' : 'text-amber-400'} font-semibold mb-2`}>
                        Storage: {storageStatus.cloudinaryConfigured ? 'Cloud (Persistent)' : 'Local (Temporary)'}
                      </h4>
                      {storageStatus.cloudinaryConfigured ? (
                        <p className="text-gray-300 text-sm">
                          Videos will be permanently stored in Cloudinary and survive app redeploys.
                        </p>
                      ) : (
                        <>
                          <p className="text-gray-300 text-sm leading-relaxed mb-2">
                            Videos are stored locally and will be lost when the app redeploys. 
                            For permanent storage, add Cloudinary credentials in the Secrets tab.
                          </p>
                          <p className="text-gray-300 text-sm">
                            Get free credentials at <a href="https://cloudinary.com" target="_blank" rel="noopener" className="text-orange-400 hover:underline">cloudinary.com</a>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {videos.length === 0 ? (
                <div className="text-center py-12">
                  <Video className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No videos added yet</p>
                  <Button onClick={addNewVideo} className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Video
                  </Button>
                </div>
              ) : (
                <>
                  {videos.map((video) => (
                    <Card key={video.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-white">
                            Video {videos.indexOf(video) + 1}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeVideo(video.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`title-${video.id}`} className="text-white">
                                Title *
                              </Label>
                              <Input
                                id={`title-${video.id}`}
                                value={video.title}
                                onChange={(e) => updateVideo(video.id, 'title', e.target.value)}
                                placeholder="Enter video title"
                                className="bg-gray-600 border-gray-500 text-white"
                              />
                            </div>

                            <div>
                              <Label htmlFor={`description-${video.id}`} className="text-white">
                                Description
                              </Label>
                              <Textarea
                                id={`description-${video.id}`}
                                value={video.description}
                                onChange={(e) => updateVideo(video.id, 'description', e.target.value)}
                                placeholder="Enter video description"
                                className="bg-gray-600 border-gray-500 text-white"
                                rows={3}
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label className="text-white mb-2 block">Video File (MP4) *</Label>
                              <div className="relative border-2 border-dashed border-gray-500 rounded-lg p-4 text-center hover:border-orange-500 transition-colors">
                                {video.preview ? (
                                  <div className="space-y-2">
                                    <video 
                                      src={video.preview} 
                                      className="w-full h-32 object-cover rounded"
                                      controls
                                    />
                                    <p className="text-sm text-gray-400">{video.file?.name}</p>
                                  </div>
                                ) : (
                                  <div className="py-4">
                                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-400 text-sm mb-2">Click to upload MP4 video</p>
                                    <p className="text-gray-500 text-xs">or drag and drop here</p>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="video/mp4,video/mov,video/avi,video/mkv"
                                  onChange={(e) => handleVideoFileChange(video.id, e.target.files?.[0] || null)}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                              </div>
                            </div>

                            <div>
                              <Label className="text-white mb-2 block">Thumbnail Image</Label>
                              <div className="relative border-2 border-dashed border-gray-500 rounded-lg p-4 text-center hover:border-orange-500 transition-colors">
                                {video.thumbnailPreview ? (
                                  <div className="space-y-2">
                                    <img 
                                      src={video.thumbnailPreview} 
                                      className="w-full h-24 object-cover rounded"
                                      alt="Thumbnail preview"
                                    />
                                    <p className="text-sm text-gray-400">{video.thumbnail?.name}</p>
                                  </div>
                                ) : (
                                  <div className="py-3">
                                    <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-400 text-xs mb-1">Click to upload thumbnail</p>
                                    <p className="text-gray-500 text-xs">JPG, PNG, WebP (optional)</p>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="image/jpeg,image/jpg,image/png,image/webp"
                                  onChange={(e) => handleThumbnailChange(video.id, e.target.files?.[0] || null)}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-between">
                    <Button
                      onClick={addNewVideo}
                      variant="outline"
                      className="border-gray-500 text-gray-300 hover:bg-gray-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Video
                    </Button>

                    <Button
                      onClick={uploadVideos}
                      disabled={uploading || videos.length === 0}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      {uploading ? "Uploading..." : "Upload Videos"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}