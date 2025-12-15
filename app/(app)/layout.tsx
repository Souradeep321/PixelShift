"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
  XIcon,
  HomeIcon,
  VideoIcon,
  SettingsIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-base-200 border-b border-base-300">
        <div className="navbar px-4">
          <div className="flex-1">
            <button
              className="btn btn-ghost btn-square"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <Link href="/" onClick={handleLogoClick} className="ml-2">
              <div className="text-xl font-bold tracking-tight cursor-pointer">
                PixelShift
              </div>
            </Link>
          </div>
          <div className="flex-none">
            {user && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user.imageUrl}
                      alt={user.username || user.emailAddresses[0]?.emailAddress}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                >
                  <li className="px-4 py-2 border-b border-base-300">
                    <div className="flex flex-col">
                      <span className="font-semibold truncate">
                        {user.username || user.emailAddresses[0]?.emailAddress}
                      </span>
                      <span className="text-xs opacity-70">User Account</span>
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="btn btn-error btn-sm mt-2"
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block w-full bg-base-200 border-b border-base-300">
        <div className="navbar max-w-7xl mx-auto px-6">
          <div className="flex-1">
            <Link href="/" onClick={handleLogoClick}>
              <div className="flex items-center gap-2 cursor-pointer">
                <ImageIcon className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold tracking-tight">PixelShift</span>
              </div>
            </Link>
          </div>
          <div className="flex-none flex items-center gap-6">
            {user && (
              <>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={user.imageUrl}
                        alt={user.username || user.emailAddresses[0]?.emailAddress}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm truncate max-w-[200px]">
                      {user.username || user.emailAddresses[0]?.emailAddress}
                    </span>
                    <span className="text-xs opacity-70">Premium User</span>
                  </div>
                </div>
                <div className="divider divider-horizontal h-8"></div>
                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost btn-circle"
                  title="Sign Out"
                >
                  <LogOutIcon className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar for Mobile (Drawer) */}
        <div
          className={`fixed inset-0 z-50 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden transition-transform duration-300 ease-in-out`}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleOverlayClick}
          />
          <aside className="relative bg-base-200 w-72 h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-base-300">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold">PixelShift</span>
              </div>
              <button
                className="btn btn-ghost btn-square"
                onClick={() => setSidebarOpen(false)}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {user && (
                  <div className="flex items-center gap-3 p-4 bg-base-300 rounded-lg mb-6">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={user.imageUrl}
                          alt={user.username || user.emailAddresses[0]?.emailAddress}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">
                        {user.username || user.emailAddresses[0]?.emailAddress}
                      </p>
                      <p className="text-sm opacity-70">Welcome back!</p>
                    </div>
                  </div>
                )}
                
                <nav className="space-y-2">
                  <div className="px-3 py-2">
                    <span className="text-sm font-semibold text-base-content/70 uppercase tracking-wider">
                      Main Menu
                    </span>
                  </div>
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                        pathname === item.href
                          ? "bg-primary text-primary-content shadow-lg"
                          : "hover:bg-base-300"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 px-3 py-2">
                  <span className="text-sm font-semibold text-base-content/70 uppercase tracking-wider">
                    Quick Actions
                  </span>
                </div>
                <div className="space-y-2">
                  <button className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-base-300 w-full text-left">
                    <HomeIcon className="w-5 h-5" />
                    <span className="font-medium">Dashboard</span>
                  </button>
                  <button className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-base-300 w-full text-left">
                    <SettingsIcon className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                  <button className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-base-300 w-full text-left">
                    <VideoIcon className="w-5 h-5" />
                    <span className="font-medium">Media Library</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-base-300">
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error w-full"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>

        {/* Sidebar for Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-base-200 border-r border-base-300 sticky top-0 h-screen">
          <div className="flex items-center justify-center py-6">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-10 h-10 text-primary" />
              <span className="text-xl font-bold">PixelShift</span>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            {user && (
              <div className="flex items-center gap-3 p-4 bg-base-300 rounded-xl mb-6">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                    <img
                      src={user.imageUrl}
                      alt={user.username || user.emailAddresses[0]?.emailAddress}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {user.username || user.emailAddresses[0]?.emailAddress}
                  </p>
                  <p className="text-xs opacity-70">Online</p>
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              <div className="px-3 py-2">
                <span className="text-xs font-semibold text-base-content/70 uppercase tracking-wider">
                  Navigation
                </span>
              </div>
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                    pathname === item.href
                      ? "bg-primary text-primary-content shadow-lg"
                      : "hover:bg-base-300"
                  }`}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                  {pathname === item.href && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-primary-content"></div>
                  )}
                </Link>
              ))}
            </div>

           
          </nav>
          
          <div className="p-4 border-t border-base-300">
            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-error w-full btn-sm"
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Sign Out
            </button>
            <div className="mt-4 text-center">
              <span className="text-xs opacity-50">
                © {new Date().getFullYear()} PixelShift
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen">
          <div className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb for Desktop */}
              {pathname !== "/home" && (
                <div className="hidden lg:flex items-center gap-2 mb-6 text-sm">
                  <Link href="/home" className="text-primary hover:underline">
                    Home
                  </Link>
                  <span className="opacity-50">/</span>
                  <span className="opacity-70">
                    {sidebarItems.find(item => item.href === pathname)?.label || "Current Page"}
                  </span>
                </div>
              )}
              
              {/* Mobile Page Header */}
              <div className="lg:hidden mb-6">
                <h1 className="text-2xl font-bold">
                  {sidebarItems.find(item => item.href === pathname)?.label || "Dashboard"}
                </h1>
                {pathname !== "/home" && (
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <Link href="/home" className="text-primary hover:underline">
                      Home
                    </Link>
                    <span className="opacity-50">/</span>
                    <span className="opacity-70">
                      {sidebarItems.find(item => item.href === pathname)?.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-4 lg:p-6">
                {children}
              </div>

              {/* Mobile Bottom Navigation */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-base-200 border-t border-base-300 z-40">
                <div className="flex justify-around items-center h-16">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-col items-center justify-center p-2 ${
                        pathname === item.href ? "text-primary" : "text-base-content"
                      }`}
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="text-xs mt-1">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}