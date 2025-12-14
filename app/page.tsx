// 'use client'
// import { Upload, Video, Image, Sparkles, LogIn, UserPlus, Menu, X } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function HomePage() {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//   const sendToSignup = () => {
//     router.push('/signup');
//   };

//   const sendToLogin = () => {
//     router.push('/login');
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="min-h-screen bg-base-100 text-base-content">
//       {/* Navigation */}
//       <nav className="navbar bg-base-200 px-4 md:px-8 py-4">
//         <div className="navbar-start">
//           <div className="flex items-center gap-2">
//             <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
//             <span className="text-lg md:text-xl font-bold">PixelShift</span>
//           </div>
//         </div>
        
//         {/* Mobile Menu Button */}
//         <div className="navbar-center hidden md:flex">
//           {/* Center content if needed */}
//         </div>
        
//         <div className="navbar-end">
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-4">
//             <button className="btn btn-ghost"
//               onClick={sendToLogin}
//             >
//               <LogIn className="w-5 h-5" />
//               Login
//             </button>
//             <button className="btn btn-primary"
//               onClick={sendToSignup}
//             >
//               <UserPlus className="w-5 h-5" />
//               Sign Up
//             </button>
//           </div>
          
//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button 
//               className="btn btn-square btn-ghost"
//               onClick={toggleMenu}
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
        
//         {/* Mobile Dropdown Menu */}
//         {isMenuOpen && (
//           <div className="absolute top-full left-0 right-0 bg-base-200 border-t border-base-300 z-50 md:hidden">
//             <div className="flex flex-col p-4 gap-2">
//               <button 
//                 className="btn btn-ghost justify-start w-full"
//                 onClick={() => {
//                   sendToLogin();
//                   setIsMenuOpen(false);
//                 }}
//               >
//                 <LogIn className="w-5 h-5 mr-2" />
//                 Login
//               </button>
//               <button 
//                 className="btn btn-primary w-full"
//                 onClick={() => {
//                   sendToSignup();
//                   setIsMenuOpen(false);
//                 }}
//               >
//                 <UserPlus className="w-5 h-5 mr-2" />
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <main className="container mx-auto px-4 md:px-8 py-8 md:py-16">
//         <div className="text-center max-w-4xl mx-auto">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
//             Transform Your Media with{' '}
//             <span className="text-primary">Cloudinary AI</span>
//           </h1>

//           <p className="text-base sm:text-lg md:text-xl opacity-80 mb-8 md:mb-10 max-w-2xl mx-auto px-2">
//             Intelligent image resizing, video optimization, and seamless uploads powered by
//             cutting-edge AI technology. Everything you need for perfect media assets.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 md:mb-16">
//             <button className="btn btn-primary btn-lg w-full sm:w-auto"
//               onClick={sendToSignup}
//             >
//               <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
//               Start Free Trial
//             </button>
//             <button className="btn btn-outline btn-lg w-full sm:w-auto"
//               onClick={sendToLogin}
//             >
//               <LogIn className="w-5 h-5 md:w-6 md:h-6" />
//               Demo Login
//             </button>
//           </div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
//             <div className="card bg-base-200 p-4 md:p-6">
//               <div className="card-body items-center text-center p-2 md:p-4">
//                 <div className="p-2 md:p-3 rounded-full bg-primary/20 mb-3 md:mb-4">
//                   <Image className="w-8 h-8 md:w-10 md:h-10 text-primary" />
//                 </div>
//                 <h3 className="card-title text-xl md:text-2xl mb-1 md:mb-2">Smart Image Resizing</h3>
//                 <p className="opacity-80 text-sm md:text-base">
//                   Resize images intelligently with AI-powered cropping and optimization for any platform
//                 </p>
//               </div>
//             </div>

//             <div className="card bg-base-200 p-4 md:p-6">
//               <div className="card-body items-center text-center p-2 md:p-4">
//                 <div className="p-2 md:p-3 rounded-full bg-secondary/20 mb-3 md:mb-4">
//                   <Video className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
//                 </div>
//                 <h3 className="card-title text-xl md:text-2xl mb-1 md:mb-2">Video Optimization</h3>
//                 <p className="opacity-80 text-sm md:text-base">
//                   Upload videos and get optimized versions with perfect compression and format conversion
//                 </p>
//               </div>
//             </div>

//             <div className="card bg-base-200 p-4 md:p-6">
//               <div className="card-body items-center text-center p-2 md:p-4">
//                 <div className="p-2 md:p-3 rounded-full bg-accent/20 mb-3 md:mb-4">
//                   <Upload className="w-8 h-8 md:w-10 md:h-10 text-accent" />
//                 </div>
//                 <h3 className="card-title text-xl md:text-2xl mb-1 md:mb-2">Seamless Uploads</h3>
//                 <p className="opacity-80 text-sm md:text-base">
//                   Batch upload support with automatic organization and cloud storage integration
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* How It Works */}
//           <div className="mb-16 md:mb-20">
//             <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">How It Works</h2>
//             <div className="steps steps-vertical lg:steps-horizontal">
//               <div className="step step-primary">
//                 <div className="step-circle">1</div>
//                 <div className="step-content">
//                   <h3 className="font-bold text-sm md:text-base">Upload Media</h3>
//                   <p className="text-xs md:text-sm">Drag & drop your images or videos</p>
//                 </div>
//               </div>
//               <div className="step step-primary">
//                 <div className="step-circle">2</div>
//                 <div className="step-content">
//                   <h3 className="font-bold text-sm md:text-base">Apply AI Magic</h3>
//                   <p className="text-xs md:text-sm">Let Cloudinary AI optimize your media</p>
//                 </div>
//               </div>
//               <div className="step step-primary">
//                 <div className="step-circle">3</div>
//                 <div className="step-content">
//                   <h3 className="font-bold text-sm md:text-base">Download & Use</h3>
//                   <p className="text-xs md:text-sm">Get perfectly optimized files instantly</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="card bg-linear-to-r from-primary/20 to-secondary/20 p-6 md:p-8">
//             <div className="card-body items-center text-center p-2 md:p-4">
//               <h2 className="card-title text-xl md:text-3xl mb-3 md:mb-4">Ready to Transform Your Workflow?</h2>
//               <p className="mb-4 md:mb-6 text-sm md:text-base max-w-xl">
//                 Join thousands of users who trust our platform for their media optimization needs.
//                 No credit card required to start.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
//                 <button className="btn btn-primary btn-wide w-full sm:w-auto"
//                   onClick={sendToSignup}
//                 >
//                   <UserPlus className="w-5 h-5" />
//                   Create Free Account
//                 </button>
//                 <button className="btn btn-ghost w-full sm:w-auto"
//                   onClick={sendToLogin}
//                 >
//                   <LogIn className="w-5 h-5" />
//                   Sign In
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="footer bg-base-200 p-6 md:p-10">
//         <div className="container mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
//               <span className="text-base md:text-lg font-bold">PixelShift</span>
//             </div>
//             <div className="flex flex-wrap justify-center gap-4 md:gap-6">
//               <a className="link link-hover text-sm md:text-base">Terms of Service</a>
//               <a className="link link-hover text-sm md:text-base">Privacy Policy</a>
//               <a className="link link-hover text-sm md:text-base">Contact</a>
//             </div>
//           </div>
//           <div className="divider my-4 md:my-6"></div>
//           <p className="text-center opacity-70 text-sm md:text-base">
//             Powered by Cloudinary AI • © {new Date().getFullYear()} PixelShift. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }


'use client'
import { Upload, Video, Image, Sparkles, LogIn, UserPlus, Menu, X, ArrowRight, Check, Download, Zap, Globe, Smartphone, Monitor } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, ReactNode } from 'react';

// Define types for the demo object
type DemoKey = 'resize' | 'optimize' | 'transform' | 'responsive';

interface DemoItem {
  title: string;
  description: string;
  before: {
    text: string;
    stats: string[];
  };
  after: {
    text: string;
    stats: string[];
  };
  icon: ReactNode;
}

interface TransformationItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function Page() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState<DemoKey>('resize');
  
  const sendToSignup = () => {
    router.push('/signup');
  };

  const sendToLogin = () => {
    router.push('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const demos: Record<DemoKey, DemoItem> = {
    resize: {
      title: "AI-Powered Image Resizing",
      description: "Automatically crop, resize and optimize images for any device while maintaining focus on the most important elements.",
      before: {
        text: "Original 4K Image (8.2 MB)",
        stats: ["3840 × 2160px", "8.2 MB file size", "Unoptimized"]
      },
      after: {
        text: "Optimized for Mobile (450 KB)",
        stats: ["1200 × 675px", "450 KB file size", "WebP format", "Smart cropped"]
      },
      icon: <Image className="w-6 h-6" />
    },
    optimize: {
      title: "Video Compression & Optimization",
      description: "Reduce video file sizes by up to 80% without noticeable quality loss. Automatic format conversion included.",
      before: {
        text: "Original Video (45 MB)",
        stats: ["1080p MP4", "45 MB file size", "30 seconds", "No compression"]
      },
      after: {
        text: "Optimized Video (9 MB)",
        stats: ["1080p WebM", "9 MB file size", "80% smaller", "Stream ready"]
      },
      icon: <Video className="w-6 h-6" />
    },
    transform: {
      title: "Smart Background Removal",
      description: "Automatically remove backgrounds and apply artistic effects with single-click precision.",
      before: {
        text: "Original with Background",
        stats: ["Complex background", "Distracting elements", "Static composition"]
      },
      after: {
        text: "Transformed Output",
        stats: ["Clean background", "Focus on subject", "Ready for design"]
      },
      icon: <Sparkles className="w-6 h-6" />
    },
    responsive: {
      title: "Responsive Image Generation",
      description: "Generate multiple image sizes automatically for different screen densities and devices.",
      before: {
        text: "Single Source Image",
        stats: ["One size fits all", "Manual resizing needed", "Performance issues"]
      },
      after: {
        text: "Multiple Optimized Versions",
        stats: ["Desktop (2x)", "Tablet (1.5x)", "Mobile (1x)", "Thumbnail"]
      },
      icon: <Smartphone className="w-6 h-6" />
    }
  };

  const transformations: TransformationItem[] = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast",
      description: "Process images in milliseconds with our global CDN"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Delivery",
      description: "Serve optimized media from 100+ edge locations"
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      title: "Auto Optimization",
      description: "Automatic format, quality, and compression optimization"
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "Batch Processing",
      description: "Transform thousands of images with a single API call"
    }
  ];

  // Now TypeScript knows activeDemo is one of the keys in demos
  const currentDemo = demos[activeDemo];

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Navigation */}
      <nav className="navbar bg-base-200 px-4 md:px-8 py-4">
        <div className="navbar-start">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <span className="text-lg md:text-xl font-bold">PixelShift</span>
          </div>
        </div>
        
        <div className="navbar-center hidden md:flex">
          {/* Center content if needed */}
        </div>
        
        <div className="navbar-end">
          <div className="hidden md:flex items-center gap-4">
            <button className="btn btn-ghost" onClick={sendToLogin}>
              <LogIn className="w-5 h-5" />
              Login
            </button>
            <button className="btn btn-primary" onClick={sendToSignup}>
              <UserPlus className="w-5 h-5" />
              Sign Up
            </button>
          </div>
          
          <div className="md:hidden">
            <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-base-200 border-t border-base-300 z-50 md:hidden">
            <div className="flex flex-col p-4 gap-2">
              <button className="btn btn-ghost justify-start w-full"
                onClick={() => { sendToLogin(); setIsMenuOpen(false); }}>
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </button>
              <button className="btn btn-primary w-full"
                onClick={() => { sendToSignup(); setIsMenuOpen(false); }}>
                <UserPlus className="w-5 h-5 mr-2" />
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Transform Your Media with{' '}
            <span className="text-primary">Cloudinary AI</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl opacity-80 mb-8 md:mb-10 max-w-2xl mx-auto px-2">
            Intelligent image resizing, video optimization, and seamless uploads powered by cutting-edge AI technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 md:mb-16">
            <button className="btn btn-primary btn-lg w-full sm:w-auto" onClick={sendToSignup}>
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
              Start Free Trial
            </button>
            <button className="btn btn-outline btn-lg w-full sm:w-auto" onClick={sendToLogin}>
              <LogIn className="w-5 h-5 md:w-6 md:h-6" />
              Demo Login
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            <div className="card bg-base-200 p-4 md:p-6">
              <div className="card-body items-center text-center p-2 md:p-4">
                <div className="p-2 md:p-3 rounded-full bg-primary/20 mb-3 md:mb-4">
                  <Image className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
                <h3 className="card-title text-xl md:text-2xl mb-1 md:mb-2">Smart Image Resizing</h3>
                <p className="opacity-80 text-sm md:text-base">
                  Resize images intelligently with AI-powered cropping and optimization for any platform
                </p>
              </div>
            </div>

            <div className="card bg-base-200 p-4 md:p-6">
              <div className="card-body items-center text-center p-2 md:p-4">
                <div className="p-2 md:p-3 rounded-full bg-secondary/20 mb-3 md:mb-4">
                  <Video className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
                </div>
                <h3 className="card-title text-xl md:text-2xl mb-1 md:mb-2">Video Optimization</h3>
                <p className="opacity-80 text-sm md:text-base">
                  Upload videos and get optimized versions with perfect compression and format conversion
                </p>
              </div>
            </div>

            <div className="card bg-base-200 p-4 md:p-6">
              <div className="card-body items-center text-center p-2 md:p-4">
                <div className="p-2 md:p-3 rounded-full bg-accent/20 mb-3 md:mb-4">
                  <Upload className="w-8 h-8 md:w-10 md:h-10 text-accent" />
                </div>
                <h3 className="card-title text-xl md:text-2xl mb-1 md:mb-2">Seamless Uploads</h3>
                <p className="opacity-80 text-sm md:text-base">
                  Batch upload support with automatic organization and cloud storage integration
                </p>
              </div>
            </div>
          </div>

          {/* Media Transformation Showcase */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">
              See the Magic in Action
            </h2>
            
            {/* Demo Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {(Object.entries(demos) as [DemoKey, DemoItem][]).map(([key, demo]) => (
                <button
                  key={key}
                  className={`btn btn-sm md:btn-md ${activeDemo === key ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setActiveDemo(key)}
                >
                  {demo.icon}
                  <span className="hidden sm:inline">{demo.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Demo Showcase */}
            <div className="bg-base-200 rounded-2xl p-6 md:p-8 mb-10">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {currentDemo.title}
                </h3>
                <p className="opacity-80 max-w-2xl mx-auto">
                  {currentDemo.description}
                </p>
              </div>

              {/* Before/After Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Before Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg">Before Transformation</h4>
                    <div className="badge badge-error">Original</div>
                  </div>
                  <div className="bg-gradient-to-br from-error/10 to-error/5 border-2 border-error/20 rounded-xl p-6 min-h-[200px] flex flex-col items-center justify-center">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">📷</div>
                      <p className="font-semibold">{currentDemo.before.text}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      {currentDemo.before.stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-2 opacity-80">
                          <X className="w-4 h-4 text-error" />
                          {stat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* After Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg">After Transformation</h4>
                    <div className="badge badge-success">Optimized</div>
                  </div>
                  <div className="bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/20 rounded-xl p-6 min-h-[200px] flex flex-col items-center justify-center">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">✨</div>
                      <p className="font-semibold">{currentDemo.after.text}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      {currentDemo.after.stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-2 opacity-80">
                          <Check className="w-4 h-4 text-success" />
                          {stat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformation Arrow */}
              <div className="flex justify-center items-center my-6">
                <div className="hidden lg:block w-16 h-1 bg-gradient-to-r from-error/50 via-primary to-success/50 rounded-full"></div>
                <div className="lg:hidden w-16 h-16 flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-primary rotate-90" />
                </div>
              </div>

              {/* Stats Bar */}
              <div className="bg-base-300 rounded-xl p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {transformations.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="p-2 rounded-full bg-primary/20 mb-2">
                        {item.icon}
                      </div>
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-xs opacity-80">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Demos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-base-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🖼️ → 📱</div>
                <p className="font-semibold text-sm">Format Conversion</p>
                <p className="text-xs opacity-70">PNG to WebP, AVIF</p>
              </div>
              <div className="bg-base-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🎨 → ✨</div>
                <p className="font-semibold text-sm">AI Enhancements</p>
                <p className="text-xs opacity-70">Auto-color correction</p>
              </div>
              <div className="bg-base-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">📹 → ⚡</div>
                <p className="font-semibold text-sm">Video to GIF</p>
                <p className="text-xs opacity-70">Automatic conversion</p>
              </div>
              <div className="bg-base-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🌐 → 📶</div>
                <p className="font-semibold text-sm">CDN Delivery</p>
                <p className="text-xs opacity-70">Global edge network</p>
              </div>
            </div>
          </div>

          {/* How It Works (Simplified) */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">How It Works</h2>
            <div className="steps steps-vertical lg:steps-horizontal">
              <div className="step step-primary">
                <div className="step-circle">1</div>
                <div className="step-content">
                  <h3 className="font-bold text-sm md:text-base">Upload Media</h3>
                  <p className="text-xs md:text-sm">Drag & drop your images or videos</p>
                </div>
              </div>
              <div className="step step-primary">
                <div className="step-circle">2</div>
                <div className="step-content">
                  <h3 className="font-bold text-sm md:text-base">Apply AI Magic</h3>
                  <p className="text-xs md:text-sm">Let Cloudinary AI optimize your media</p>
                </div>
              </div>
              <div className="step step-primary">
                <div className="step-circle">3</div>
                <div className="step-content">
                  <h3 className="font-bold text-sm md:text-base">Download & Use</h3>
                  <p className="text-xs md:text-sm">Get perfectly optimized files instantly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="card bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 p-6 md:p-8">
            <div className="card-body items-center text-center p-2 md:p-4">
              <h2 className="card-title text-xl md:text-3xl mb-3 md:mb-4">Ready to Transform Your Workflow?</h2>
              <p className="mb-4 md:mb-6 text-sm md:text-base max-w-xl">
                Join thousands of users who trust our platform for their media optimization needs.
                No credit card required to start.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                <button className="btn btn-primary btn-wide w-full sm:w-auto" onClick={sendToSignup}>
                  <UserPlus className="w-5 h-5" />
                  Create Free Account
                </button>
                <button className="btn btn-ghost w-full sm:w-auto" onClick={sendToLogin}>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer bg-base-200 p-6 md:p-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="text-base md:text-lg font-bold">PixelShift</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a className="link link-hover text-sm md:text-base">Terms of Service</a>
              <a className="link link-hover text-sm md:text-base">Privacy Policy</a>
              <a className="link link-hover text-sm md:text-base">Contact</a>
            </div>
          </div>
          <div className="divider my-4 md:my-6"></div>
          <p className="text-center opacity-70 text-sm md:text-base">
            Powered by Cloudinary AI • © {new Date().getFullYear()} PixelShift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
