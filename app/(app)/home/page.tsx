"use client"
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Video } from '@/generated/prisma/client';
import VideoCard from '@/components/VideoCard'


const page = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/videos')
      if (Array.isArray(response.data.data)) {
        setVideos(response.data?.data)
      } else {
        throw new Error('Unexpected response format')
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching videos')
      toast.error('An error occurred while fetching videos')
    } finally {
      setLoading(false)
    }
  }, [])


  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])


  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [])



  if (loading) {
    return (
      <div className='flex justify-center items-center h-full w-full'>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {videos.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No videos available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDownload={handleDownload}
              />
            ))
          }
        </div>
      )}
    </div>
  )
}

export default page