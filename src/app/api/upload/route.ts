import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import axiosInstance from '@/lib/axios';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { 
          success: false,
          statusCode: 401,
          message: "Unauthorized",
          result: null,
          errors: ["User not authenticated"]
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { 
          success: false,
          statusCode: 400,
          message: "Bad Request",
          result: null,
          errors: ["No file uploaded"]
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64
    const base64String = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(dataURI, {
        folder: 'moco',
        resource_type: 'auto',
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    const imageLink = (result as { secure_url: string }).secure_url;

    // Send the image link to the backend
    const backendResponse = await axiosInstance.post('/api/image/upload-image', {
      email: session.user.email,
      imageLink: imageLink
    });

    // Check if the backend request was successful
    if (!backendResponse.data.success) {
      return NextResponse.json(
        backendResponse.data,
        { status: backendResponse.data.statusCode }
      );
    }

    // Return the response in the expected format
    return NextResponse.json({ 
      success: true,
      statusCode: 200,
      message: "Image uploaded successfully",
      result: {
        email: session.user.email,
        imageLink: imageLink
      },
      errors: null
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { 
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
        result: null,
        errors: [error.message || "Error uploading file"]
      },
      { status: 500 }
    );
  }
} 