import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { prisma } from "@/lib/prisma";


// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    duration?: number;
    [key: string]: any
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ) {
            return NextResponse.json({ error: "Missing Cloudinary credentials" }, { status: 500 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const originalSize = formData.get('originalSize') as string;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (!file.type.startsWith("video/")) {
            return NextResponse.json(
                { error: "Only video files are allowed" },
                { status: 400 }
            );
        }

        const MAX_SIZE = 100 * 1024 * 1024; // 100MB

        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: "Video too large (max 100MB)" },
                { status: 400 }
            );
        }


        // Convert File → ArrayBuffer → Node Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "video",
                        folder: "video-uploads",
                        transformation: [
                            { quality: "auto", fetch_format: "mp4" },
                        ]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                );

                uploadStream.end(buffer);
            }
        );

        const video = await prisma.video.create({
            data: {
                title,
                description,
                publicId: result.public_id,
                originalSize,
                compressedSize: String(result.bytes),
                duration: result.duration || 0,
            }
        })

        return NextResponse.json({
            success: true,
            data: video,
            message: "Video uploaded successfully",
        }, { status: 200 });

    } catch (error) {
        console.error("Error uploading video:", error);
        return NextResponse.json({ error: "Error uploading video" }, { status: 500 });
    }
}

