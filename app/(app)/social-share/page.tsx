// 'use client'
// import React, { useEffect, useState, useRef } from 'react'
// import { CldImage } from 'next-cloudinary';
// import axios from 'axios';
// import toast from 'react-hot-toast';


// const socialFormats = {
//   "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
//   "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
//   "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
//   "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
//   "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
// } as const;

// type SocialFormat = keyof typeof socialFormats;

// const page = () => {
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
//   const [isUploading, setIsUploading] = useState(false);
//   const [isTransforming, setIsTransforming] = useState(false);
//   const imageRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     if (uploadedImage) {
//       setIsTransforming(true);
//     }
//   }, [selectedFormat, uploadedImage])


//   type UploadResponse = {
//     publicId: string;
//     url: string;
//   };

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post<UploadResponse>("/api/image-upload", formData);
//       if (!response.data) throw new Error("No response from server");

//       setUploadedImage(response.data.publicId);
//       toast.success("Image uploaded successfully");

//     } catch (error) {
//       const axiosError = error as { response: { data: { message: string } } };
//       console.error("Image upload failed:", error);
//       if (axiosError?.response?.data?.message) {
//         toast.error(axiosError.response.data.message);
//       } else {
//         toast.error("Image upload failed");
//       }
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDownload = async () => {
//     if (!imageRef.current?.src) return;

//     try {
//       const response = await axios.get(imageRef.current.src, {
//         responseType: "blob", 
//       });

//       const blob = response.data;
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${selectedFormat
//         .replace(/\s+/g, "_")
//         .toLowerCase()}.png`;

//       document.body.appendChild(link);
//       link.click();

//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed:", error);
//     }
//   };


//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Social Media Image Creator
//       </h1>

//       <div className="card">
//         <div className="card-body">
//           <h2 className="card-title mb-4">Upload an Image</h2>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Choose an image file</span>
//             </label>
//             <input
//               type="file"
//               onChange={handleFileUpload}
//               className="file-input file-input-bordered file-input-primary w-full"
//             />
//           </div>

//           {isUploading && (
//             <div className="mt-4">
//               <progress className="progress progress-primary w-full"></progress>
//             </div>
//           )}

//           {uploadedImage && (
//             <div className="mt-6">
//               <h2 className="card-title mb-4">Select Social Media Format</h2>
//               <div className="form-control">
//                 <select
//                   className="select select-bordered w-full"
//                   value={selectedFormat}
//                   onChange={(e) =>
//                     setSelectedFormat(e.target.value as SocialFormat)
//                   }
//                 >
//                   {Object.keys(socialFormats).map((format) => (
//                     <option key={format} value={format}>
//                       {format}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mt-6 relative">
//                 <h3 className="text-lg font-semibold mb-2">Preview:</h3>
//                 <div className="flex justify-center">
//                   {isTransforming && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
//                       <span className="loading loading-spinner loading-lg"></span>
//                     </div>
//                   )}
//                   <CldImage
//                     width={socialFormats[selectedFormat].width}
//                     height={socialFormats[selectedFormat].height}
//                     src={uploadedImage}
//                     sizes="100vw"
//                     alt="transformed image"
//                     crop="fill"
//                     aspectRatio={socialFormats[selectedFormat].aspectRatio}
//                     gravity='auto'
//                     ref={imageRef}
//                     onLoad={() => setIsTransforming(false)}
//                   />
//                 </div>
//               </div>

//               <div className="card-actions justify-end mt-6">
//                 <button className="btn btn-primary" onClick={handleDownload}>
//                   Download for {selectedFormat}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default page

'use client'
import React, { useEffect, useState, useRef } from 'react'
import { CldImage } from 'next-cloudinary';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Upload, 
  Download, 
  Instagram, 
  Twitter, 
  Facebook, 
  Image as ImageIcon, 
  Loader2, 
  Smartphone, 
  Monitor,
  Crop,
  Share2,
  Sparkles,
  Check,
  X,
  RefreshCw
} from 'lucide-react';

const socialFormats = {
  "Instagram Square (1:1)": { 
    width: 1080, 
    height: 1080, 
    aspectRatio: "1:1",
    icon: Instagram,
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    platform: "Instagram"
  },
  "Instagram Portrait (4:5)": { 
    width: 1080, 
    height: 1350, 
    aspectRatio: "4:5",
    icon: Instagram,
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    platform: "Instagram"
  },
  "Twitter Post (16:9)": { 
    width: 1200, 
    height: 675, 
    aspectRatio: "16:9",
    icon: Twitter,
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    platform: "Twitter"
  },
  "Twitter Header (3:1)": { 
    width: 1500, 
    height: 500, 
    aspectRatio: "3:1",
    icon: Twitter,
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    platform: "Twitter"
  },
  "Facebook Cover (205:78)": { 
    width: 820, 
    height: 312, 
    aspectRatio: "205:78",
    icon: Facebook,
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
    platform: "Facebook"
  },
} as const;

type SocialFormat = keyof typeof socialFormats;

const Page = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showDimensions, setShowDimensions] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadedImage]);

  type UploadResponse = {
    publicId: string;
    url: string;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<UploadResponse>("/api/image-upload", formData);
      if (!response.data) throw new Error("No response from server");

      setUploadedImage(response.data.publicId);
      toast.success("Image uploaded successfully");

    } catch (error) {
      const axiosError = error as { response: { data: { message: string } } };
      console.error("Image upload failed:", error);
      if (axiosError?.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("Image upload failed");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      
      const event = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
  };

  const handleDownload = async () => {
    if (!imageRef.current?.src) return;

    try {
      const response = await axios.get(imageRef.current.src, {
        responseType: "blob", 
      });

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedFormat
        .replace(/\s+/g, "_")
        .toLowerCase()}.png`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Download started!');
    } catch (error) {
      console.error("Download failed:", error);
      toast.error('Download failed. Please try again.');
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const currentFormat = socialFormats[selectedFormat];
  const IconComponent = currentFormat.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Social Media Image Creator</h1>
          <p className="text-base-content/70 max-w-md mx-auto">
            Transform your images into perfectly sized social media posts with one click
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload & Controls */}
          <div className="space-y-6">
            {/* Upload Card */}
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5" />
                  Upload Your Image
                </h2>
                
                <div 
                  className={`border-3 border-dashed rounded-2xl transition-all duration-300 ${uploadedImage ? 'border-success bg-success/5' : 'border-base-300 bg-base-200 hover:bg-base-300'} p-8 text-center cursor-pointer`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer block">
                    <div className="flex flex-col items-center justify-center gap-4">
                      {uploadedImage ? (
                        <>
                          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
                            <Check className="w-8 h-8 text-success" />
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-lg">Image Uploaded!</p>
                            <p className="text-sm opacity-70 mt-1">
                              Ready for transformation
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleReset}
                            className="btn btn-xs btn-ghost"
                          >
                            Upload Different Image
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-primary" />
                          </div>
                          <div className="text-center">
                            <p className="font-semibold">Click or drag to upload</p>
                            <p className="text-sm opacity-70 mt-1">
                              Supports JPG, PNG, WebP (max 5MB)
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {isUploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span>Uploading image...</span>
                    </div>
                    <progress className="progress progress-primary w-full mt-2"></progress>
                  </div>
                )}
              </div>
            </div>

            {/* Format Selection */}
            {uploadedImage && (
              <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                  <h2 className="card-title flex items-center gap-2 mb-4">
                    <Crop className="w-5 h-5" />
                    Select Platform & Format
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(socialFormats).map(([format, details]) => {
                      const Icon = details.icon;
                      return (
                        <button
                          key={format}
                          onClick={() => setSelectedFormat(format as SocialFormat)}
                          className={`btn btn-outline flex-col h-auto py-4 gap-2 ${selectedFormat === format ? 'border-2 border-primary bg-primary/10' : ''}`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${details.color}`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-xs font-medium">{details.platform}</span>
                          <span className="text-xs opacity-70">{details.aspectRatio}</span>
                          {selectedFormat === format && (
                            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Preview Mode:</span>
                      </div>
                      <div className="btn-group">
                        <button 
                          className={`btn btn-sm ${previewMode === 'mobile' ? 'btn-active' : ''}`}
                          onClick={() => setPreviewMode('mobile')}
                        >
                          <Smartphone className="w-4 h-4" />
                          Mobile
                        </button>
                        <button 
                          className={`btn btn-sm ${previewMode === 'desktop' ? 'btn-active' : ''}`}
                          onClick={() => setPreviewMode('desktop')}
                        >
                          <Monitor className="w-4 h-4" />
                          Desktop
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Show Dimensions:</span>
                      </div>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={showDimensions}
                        onChange={(e) => setShowDimensions(e.target.checked)}
                      />
                    </div>
                  </div>

                  <div className="divider"></div>

                  {/* Platform Info */}
                  <div className="bg-base-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentFormat.color}`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{currentFormat.platform}</h4>
                        <p className="text-sm opacity-70">{selectedFormat}</p>
                      </div>
                    </div>
                    {showDimensions && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center bg-base-300 rounded p-2">
                          <div className="text-sm font-semibold">Width</div>
                          <div className="text-lg">{currentFormat.width}px</div>
                        </div>
                        <div className="text-center bg-base-300 rounded p-2">
                          <div className="text-sm font-semibold">Height</div>
                          <div className="text-lg">{currentFormat.height}px</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Preview & Download */}
          {uploadedImage && (
            <div className="space-y-6">
              <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Preview
                    </h2>
                    <div className="badge badge-primary">
                      {currentFormat.aspectRatio}
                    </div>
                  </div>

                  <div className={`relative ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'}`}>
                    {isTransforming && (
                      <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-80 z-10 rounded-xl">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                          <p className="text-sm">Transforming image...</p>
                        </div>
                      </div>
                    )}
                    
                    <div className={`border-4 border-base-300 rounded-xl overflow-hidden ${previewMode === 'mobile' ? 'aspect-[9/16]' : 'aspect-video'}`}>
                      <CldImage
                        width={currentFormat.width}
                        height={currentFormat.height}
                        src={uploadedImage}
                        sizes="100vw"
                        alt="transformed image"
                        crop="fill"
                        aspectRatio={currentFormat.aspectRatio}
                        gravity='auto'
                        ref={imageRef}
                        onLoad={() => setIsTransforming(false)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-6">
                    <button 
                      className="btn btn-primary btn-lg w-full gap-2"
                      onClick={handleDownload}
                      disabled={isTransforming}
                    >
                      <Download className="w-5 h-5" />
                      Download for {currentFormat.platform}
                    </button>
                    <p className="text-center text-sm opacity-70 mt-2">
                      {currentFormat.width} × {currentFormat.height}px • {currentFormat.aspectRatio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5" />
                    Pro Tips
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5" />
                      <span>For best results, upload high-resolution images (2000px+ on the shortest side)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5" />
                      <span>Instagram Square is perfect for feed posts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5" />
                      <span>Twitter Header works best with wide landscape images</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {!uploadedImage && (
          <div className="text-center mt-12">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg opacity-70">Upload an image to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page;
