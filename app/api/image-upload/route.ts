import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// interface CloudinaryUploadResult {
//     public_id: string;
//     [key: string]: any
// }

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  resource_type: string;
}


export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "Only images allowed" },
                { status: 400 }
            );
        }

        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large (max 5MB)" },
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
                        folder: "next-cloudinary-upload",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                );

                uploadStream.end(buffer);
            }
        );

        return NextResponse.json(
            {
                publicId: result.public_id,
                url: result.secure_url,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Cloudinary upload error:", error);

        return NextResponse.json(
            { error: "Upload image failed" },
            { status: 500 }
        );
    }
}

