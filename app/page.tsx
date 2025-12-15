'use client'
import { Upload, Video, Image, Sparkles, LogIn, UserPlus, Menu, X, ArrowRight, Check, Download, Zap, Globe, Smartphone, Monitor, Play, Shield, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, ReactNode } from 'react';

type DemoKey = 'resize' | 'optimize' | 'transform' | 'responsive';

interface DemoItem {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
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
      beforeImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1080&h=1080&fit=crop&crop=center",
      afterImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=500&fit=crop&crop=center&q=80",
      before: {
        text: "Original 4K Landscape",
        stats: ["3840 × 2160px", "8.2 MB file size", "Unoptimized"]
      },
      after: {
        text: "Optimized Square Crop",
        stats: ["1080 × 1080px", "450 KB file size", "WebP format", "Smart cropped"]
      },
      icon: <Image className="w-6 h-6" />
    },
    optimize: {
      title: "Video Compression & Optimization",
      description: "Reduce video file sizes by up to 80% without noticeable quality loss. Automatic format conversion included.",
      beforeImage: "https://images.unsplash.com/photo-1599593752325-ffa4102d3d5c?w=1200&h=675&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1599593752325-ffa4102d3d5c?w=600&h=338&fit=crop&q=70",
      before: {
        text: "Original Video",
        stats: ["1080p MP4", "45 MB file size", "30 seconds", "No compression"]
      },
      after: {
        text: "Optimized Video",
        stats: ["1080p WebM", "9 MB file size", "80% smaller", "Stream ready"]
      },
      icon: <Video className="w-6 h-6" />
    },
    transform: {
      title: "Smart Background Removal",
      description: "Automatically remove backgrounds and apply artistic effects with single-click precision.",
      beforeImage: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=1080&h=1080&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=1080&h=1080&fit=crop&q=80&bg=transparent",
      before: {
        text: "Original with Background",
        stats: ["Complex background", "Distracting elements", "Static composition"]
      },
      after: {
        text: "Transparent Background",
        stats: ["Clean cutout", "Focus on subject", "Ready for design"]
      },
      icon: <Sparkles className="w-6 h-6" />
    },
    responsive: {
      title: "Responsive Image Generation",
      description: "Generate multiple image sizes automatically for different screen densities and devices.",
      beforeImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=675&fit=crop&q=80",
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
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Uploads",
      description: "Enterprise-grade security for all your media"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Auto Optimization",
      description: "Automatic format, quality, and compression"
    }
  ];

  const stats = [
    { value: "10M+", label: "Images Processed", icon: <Image className="w-5 h-5" /> },
    { value: "99.9%", label: "Uptime", icon: <Shield className="w-5 h-5" /> },
    { value: "50K+", label: "Happy Users", icon: <Users className="w-5 h-5" /> },
    { value: "200ms", label: "Avg. Processing", icon: <Clock className="w-5 h-5" /> },
  ];

  const currentDemo = demos[activeDemo];

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Navigation */}
      <nav className="navbar bg-base-100/80 backdrop-blur-sm sticky top-0 z-50 border-b border-base-300 px-4 md:px-8 py-4">
        <div className="navbar-start">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-linear-to-br from-primary to-secondary rounded-lg">
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              PixelShift
            </span>
          </div>
        </div>
        
        <div className="navbar-center hidden md:flex">
          <div className="flex items-center gap-8">
            <Link href="#" className="link link-hover font-medium">Features</Link>
            <Link href="#transformations" className="link link-hover font-medium">Transformations</Link>
            <Link href="#how-it-works" className="link link-hover font-medium">How It Works</Link>
            <Link href="#testimonials" className="link link-hover font-medium">Testimonials</Link>
          </div>
        </div>
        
        <div className="navbar-end">
          <div className="hidden md:flex items-center gap-4">
            <button className="btn btn-ghost font-medium" onClick={sendToLogin}>
              <LogIn className="w-5 h-5" />
              Login
            </button>
            <button className="btn btn-primary font-medium" onClick={sendToSignup}>
              <UserPlus className="w-5 h-5" />
              Get Started Free
            </button>
          </div>
          
          <div className="md:hidden">
            <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-base-100/95 backdrop-blur-lg border-b border-base-300 z-50 md:hidden">
            <div className="flex flex-col p-4 gap-2">
              <a href="#features" className="btn btn-ghost justify-start" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#transformations" className="btn btn-ghost justify-start" onClick={() => setIsMenuOpen(false)}>
                Transformations
              </a>
              <a href="#how-it-works" className="btn btn-ghost justify-start" onClick={() => setIsMenuOpen(false)}>
                How It Works
              </a>
              <div className="divider my-2"></div>
              <button className="btn btn-ghost justify-start"
                onClick={() => { sendToLogin(); setIsMenuOpen(false); }}>
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </button>
              <button className="btn btn-primary"
                onClick={() => { sendToSignup(); setIsMenuOpen(false); }}>
                <UserPlus className="w-5 h-5 mr-2" />
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    Powered by Cloudinary AI
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                    Transform Your{' '}
                    <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Media
                    </span>{' '}
                    Instantly
                  </h1>
                  <p className="text-xl opacity-90 mb-8 max-w-xl">
                    AI-powered image resizing, video optimization, and seamless uploads. Everything you need for perfect media assets.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn btn-primary btn-lg group" onClick={sendToSignup}>
                    <Sparkles className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="btn btn-outline btn-lg" onClick={sendToLogin}>
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </button>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-base-100 bg-base-300 flex items-center justify-center">
                        <span className="font-bold text-xs">U{i}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">Join 50,000+ creators</p>
                    <p className="opacity-70">Trusted by designers worldwide</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-base-300">
                  <div className="aspect-video bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">See Transformation in Action</h3>
                      <p className="opacity-80 mb-6">Upload any image to see instant AI optimization</p>
                      <button className="btn btn-primary" onClick={sendToSignup}>
                        Try It Free
                      </button>
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-secondary to-accent rounded-2xl shadow-xl border border-base-300 flex items-center justify-center">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-linear-to-br from-primary to-secondary rounded-2xl shadow-xl border border-base-300 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card bg-base-100 border border-base-300">
                <div className="card-body items-center text-center p-6">
                  <div className="p-3 rounded-full bg-primary/10 mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm opacity-70">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Perfect Media</h2>
            <p className="text-xl opacity-80">
              Our AI-powered platform handles all your media optimization needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 border border-base-300 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <div className="card-body p-8">
                <div className="p-4 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 w-fit mb-6">
                  <Image className="w-10 h-10 text-primary" />
                </div>
                <h3 className="card-title text-2xl mb-3">Smart Image Resizing</h3>
                <p className="opacity-80 mb-6">
                  Automatically crop and resize images for any platform while maintaining focus on important elements.
                </p>
                <ul className="space-y-2">
                  {["AI-powered cropping", "Multi-format output", "Batch processing", "Quality optimization"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 hover:border-secondary transition-all duration-300 hover:shadow-xl">
              <div className="card-body p-8">
                <div className="p-4 rounded-2xl bg-linear-to-br from-secondary/10 to-secondary/5 w-fit mb-6">
                  <Video className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="card-title text-2xl mb-3">Video Optimization</h3>
                <p className="opacity-80 mb-6">
                  Upload videos and get optimized versions with perfect compression and automatic format conversion.
                </p>
                <ul className="space-y-2">
                  {["80% size reduction", "Format conversion", "Stream ready", "Quality preservation"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="card-body p-8">
                <div className="p-4 rounded-2xl bg-linear-to-br from-accent/10 to-accent/5 w-fit mb-6">
                  <Upload className="w-10 h-10 text-accent" />
                </div>
                <h3 className="card-title text-2xl mb-3">Seamless Uploads</h3>
                <p className="opacity-80 mb-6">
                  Batch upload support with automatic organization and cloud storage integration.
                </p>
                <ul className="space-y-2">
                  {["Drag & drop", "Batch processing", "Cloud storage", "Automatic organization"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Showcase */}
      <section id="transformations" className="py-16 md:py-24 bg-base-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Transformation Magic</h2>
            <p className="text-xl opacity-80">
              Watch your media transform with AI-powered optimizations
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {(Object.entries(demos) as [DemoKey, DemoItem][]).map(([key, demo]) => (
                <button
                  key={key}
                  className={`btn btn-lg ${activeDemo === key ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setActiveDemo(key)}
                >
                  {demo.icon}
                  <span>{demo.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-xl">
              <div className="card-body p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    {currentDemo.title}
                  </h3>
                  <p className="text-lg opacity-80 max-w-2xl mx-auto">
                    {currentDemo.description}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xl flex items-center gap-2">
                        <span className="text-error">Before</span>
                        <div className="badge badge-error badge-lg">Original</div>
                      </h4>
                    </div>
                    <div className="rounded-2xl overflow-hidden border-2 border-error/20 shadow-lg">
                      <div 
                        className="aspect-square bg-cover bg-center"
                        style={{ backgroundImage: `url(${currentDemo.beforeImage})` }}
                      />
                    </div>
                    <div className="bg-error/5 rounded-xl p-4">
                      <p className="font-semibold text-lg mb-2">{currentDemo.before.text}</p>
                      <div className="space-y-2">
                        {currentDemo.before.stats.map((stat, index) => (
                          <div key={index} className="flex items-center gap-2 opacity-80">
                            <X className="w-4 h-4 text-error" />
                            {stat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xl flex items-center gap-2">
                        <span className="text-success">After</span>
                        <div className="badge badge-success badge-lg">Optimized</div>
                      </h4>
                    </div>
                    <div className="rounded-2xl overflow-hidden border-2 border-success/20 shadow-lg relative">
                      <div 
                        className="aspect-square bg-cover bg-center"
                        style={{ backgroundImage: `url(${currentDemo.afterImage})` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-success/20 backdrop-blur-sm rounded-full p-3">
                          <Sparkles className="w-8 h-8 text-success" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-success/5 rounded-xl p-4">
                      <p className="font-semibold text-lg mb-2">{currentDemo.after.text}</p>
                      <div className="space-y-2">
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

                <div className="flex justify-center my-8">
                  <ArrowRight className="w-12 h-12 text-primary animate-pulse" />
                </div>

                <div className="bg-base-200 rounded-2xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {transformations.map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="p-3 rounded-full bg-primary/20 inline-flex mb-3">
                          {item.icon}
                        </div>
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-sm opacity-80">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl opacity-80">
              Transform your media in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold text-white">
                  1
                </div>
                <div className="absolute top-1/2 -right-4 w-8 h-1 bg-linear-to-r from-primary to-secondary hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-3">Upload Media</h3>
              <p className="opacity-80">
                Drag & drop your images or videos directly to our platform
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-linear-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold text-white">
                  2
                </div>
                <div className="absolute top-1/2 -right-4 w-8 h-1 bg-linear-to-r from-secondary to-accent hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Magic</h3>
              <p className="opacity-80">
                Our AI automatically optimizes and transforms your media
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-linear-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold text-white">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Download & Use</h3>
              <p className="opacity-80">
                Get perfectly optimized files instantly, ready to use anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-linear-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="card bg-base-100 border border-base-300 shadow-2xl max-w-4xl mx-auto">
            <div className="card-body p-12 text-center">
              <div className="w-20 h-20 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="card-title text-3xl md:text-4xl justify-center mb-4">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-xl opacity-80 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who trust our platform for their media optimization needs.
                No credit card required to start.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary btn-lg gap-2" onClick={sendToSignup}>
                  <UserPlus className="w-6 h-6" />
                  Create Free Account
                </button>
                <button className="btn btn-outline btn-lg gap-2" onClick={sendToLogin}>
                  <LogIn className="w-6 h-6" />
                  Sign In to Dashboard
                </button>
              </div>
              <p className="text-sm opacity-70 mt-6">
                Free 14-day trial • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-base-200 p-8 md:p-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-primary to-secondary rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">PixelShift</span>
                <p className="text-sm opacity-70">AI-powered media transformation</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a className="link link-hover font-medium">Features</a>
              <a className="link link-hover font-medium">Pricing</a>
              <a className="link link-hover font-medium">Documentation</a>
              <a className="link link-hover font-medium">Contact</a>
              <a className="link link-hover font-medium">Privacy Policy</a>
              <a className="link link-hover font-medium">Terms of Service</a>
            </div>
          </div>
          <div className="divider my-6"></div>
          <div className="text-center">
            <p className="opacity-70">
              Powered by Cloudinary AI • © {new Date().getFullYear()} PixelShift. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
