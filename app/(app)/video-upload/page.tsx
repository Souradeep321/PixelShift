// 'use client'
// import React, { useState } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'

// const MAX_SIZE = 70 * 1024 * 1024;  // 70MB

// const Page = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isUploading, setIsUploading] = useState(false);

//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!file) return;

//     if (file.size > MAX_SIZE) {
//       toast.error("Video too large (max 70MB)");
//       return;
//     }

//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("originalSize", file.size.toString());

//     try {
//       const response = await axios.post("/api/video-upload", formData);
//       if (response.status === 200) {
//         toast.success("Video uploaded successfully");
//         router.push("/");
//       } else {
//         toast.error("Failed to upload video");
//       }
//     } catch (error) {
//       toast.error("Upload failed");
//     } finally {
//       setIsUploading(false);
//       setTitle("");
//       setDescription("");
//       setFile(null);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="label">
//             <span className="label-text">Title</span>
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="label">
//             <span className="label-text">Description</span>
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="textarea textarea-bordered w-full"
//           />
//         </div>
//         <div>
//           <label className="label">
//             <span className="label-text">Video File</span>
//           </label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="file-input file-input-bordered w-full"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           disabled={isUploading}
//         >
//           {isUploading ? "Uploading..." : "Upload Video"}
//         </button>
//       </form>
//     </div>
//   )
// };

// export default Page;

'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Upload, Video, FileText, Edit, Loader, AlertCircle, CheckCircle, Cloud, FileIcon } from 'lucide-react'

const MAX_SIZE = 70 * 1024 * 1024;  // 70MB

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      if (selectedFile.size > MAX_SIZE) {
        toast.error("Video too large (max 70MB)");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a video file");
      return;
    }

    if (file.size > MAX_SIZE) {
      toast.error("Video too large (max 70MB)");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      const response = await axios.post("/api/video-upload", formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      });
      
      if (response.status === 200) {
        toast.success("Video uploaded successfully!");
        // Small delay to show completion
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        toast.error("Failed to upload video");
      }
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-2xl mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Upload Your Video</h1>
            <p className="text-base-content/70 max-w-md mx-auto">
              Share your videos with the world. We'll optimize them for the best viewing experience.
            </p>
          </div>

          {/* Upload Card */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload Area */}
                <div className="space-y-4">
                  <label className="block">
                    <span className="label-text font-semibold text-lg mb-2 flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Video File
                    </span>
                    <div className={`border-3 border-dashed rounded-2xl transition-all duration-300 ${file ? 'border-success bg-success/5' : 'border-base-300 bg-base-200 hover:bg-base-300'} p-8 text-center cursor-pointer`}>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="video-upload"
                        disabled={isUploading}
                      />
                      <label htmlFor="video-upload" className="cursor-pointer block">
                        <div className="flex flex-col items-center justify-center gap-4">
                          {file ? (
                            <>
                              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-success" />
                              </div>
                              <div className="text-center">
                                <p className="font-semibold text-lg">{file.name}</p>
                                <p className="text-sm opacity-70 mt-1">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setFile(null)}
                                className="btn btn-xs btn-ghost"
                                disabled={isUploading}
                              >
                                Change File
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <Cloud className="w-8 h-8 text-primary" />
                              </div>
                              <div className="text-center">
                                <p className="font-semibold">Click to select video</p>
                                <p className="text-sm opacity-70 mt-1">
                                  Supports MP4, MOV, AVI, MKV (max 70MB)
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                  </label>

                  {/* File Info */}
                  {file && (
                    <div className="bg-base-200 rounded-xl p-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <FileIcon className="w-4 h-4" />
                          <span>File selected</span>
                        </div>
                        <span className="font-medium">{formatFileSize(file.size)}</span>
                      </div>
                      <div className="mt-2 text-xs opacity-70">
                        Ready for upload. Fill in details below.
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <progress
                      className="progress progress-primary w-full h-2"
                      value={uploadProgress}
                      max="100"
                    />
                  </div>
                )}

                {/* Video Details */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Title Input */}
                    <div className="space-y-2">
                      <label className="label">
                        <span className="label-text font-semibold flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          Video Title
                        </span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="Enter a compelling title"
                        required
                        disabled={isUploading}
                      />
                      <div className="text-xs opacity-70">
                        Choose a title that describes your video
                      </div>
                    </div>

                    {/* File Size Display */}
                    {file && (
                      <div className="space-y-2">
                        <label className="label">
                          <span className="label-text font-semibold">
                            File Size
                          </span>
                        </label>
                        <div className="input input-bordered w-full bg-base-200">
                          <div className="flex justify-between items-center">
                            <span>{formatFileSize(file.size)}</span>
                            <div className={`badge ${file.size > MAX_SIZE ? 'badge-error' : 'badge-success'}`}>
                              {file.size > MAX_SIZE ? 'Too Large' : 'Valid'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs opacity-70">
                          Maximum file size: {formatFileSize(MAX_SIZE)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description Input */}
                  <div className="space-y-2">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Description
                      </span>
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="textarea textarea-bordered w-full h-32 focus:textarea-primary"
                      placeholder="Describe your video content..."
                      disabled={isUploading}
                    />
                    <div className="text-xs opacity-70">
                      Optional. Add details about your video content.
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="alert alert-info bg-info/10 border-info/20">
                  <AlertCircle className="w-5 h-5" />
                  <div className="text-sm">
                    <span className="font-semibold">Note:</span> Your video will be automatically optimized for web viewing and stored securely in our cloud.
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn btn-outline btn-lg flex-1"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary btn-lg flex-1 ${isUploading ? 'btn-disabled' : ''}`}
                    disabled={isUploading || !file}
                  >
                    {isUploading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin mr-2" />
                        Uploading... {uploadProgress}%
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Video
                      </>
                    )}
                  </button>
                </div>

                {/* Requirements */}
                <div className="border-t border-base-300 pt-6">
                  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">
                    Requirements
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Maximum file size: 70MB</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Supported formats: MP4, MOV, AVI, MKV</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Title is required for all uploads</span>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4 text-center">
                <div className="text-2xl font-bold text-primary">70MB</div>
                <div className="text-sm opacity-70">Max File Size</div>
              </div>
            </div>
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4 text-center">
                <div className="text-2xl font-bold text-secondary">HD Ready</div>
                <div className="text-sm opacity-70">Quality Optimization</div>
              </div>
            </div>
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4 text-center">
                <div className="text-2xl font-bold text-accent">Secure</div>
                <div className="text-sm opacity-70">Cloud Storage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Page;
