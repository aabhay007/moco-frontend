import { NextResponse } from 'next/server';
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { 
          success: false,
          statusCode: 400,
          message: "Operation failed",
          result: null,
          errors: ["Email parameter is required."]
        },
        { status: 200 }
      );
    }

    // Call the backend API to check upload limit
    const response = await axiosInstance.get('/api/image/check-upload-limit', {
      params: {
        email: email
      }
    });

    // Always return 200 with the API response
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    // If the error has a response from the API, return it with 200
    if (error instanceof AxiosError && error.response?.data) {
      return NextResponse.json(error.response.data, { status: 200 });
    }

    // Handle unexpected errors
    console.error('Error checking upload limit:', error);
    return NextResponse.json(
      { 
        success: false,
        statusCode: 500,
        message: "Operation failed",
        result: null,
        errors: [error instanceof Error ? error.message : "Error checking upload limit"]
      },
      { status: 200 }
    );
  }
} 