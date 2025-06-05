'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import axiosInstance from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { eventEmitter } from '@/lib/events';

interface ImageResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: string;
  errors: string[] | null;
}

export default function UserImages() {
  const { data: session } = useSession();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    if (!session?.user?.email) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get<ImageResponse>('/api/image/get-images-by-user', {
        params: {
          email: session.user.email
        }
      });

      if (response.data.success && response.data.result) {
        // Split the comma-separated string into an array of URLs
        const imageUrls = response.data.result.split(',').map(url => url.trim());
        setImages(imageUrls);
      } else {
        setError(response.data.message || 'Failed to fetch images');
      }
    } catch (err) {
      setError('Error fetching images. Please try again later.');
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    // Subscribe to image upload events
    eventEmitter.subscribe('imageUploaded', fetchImages);

    // Cleanup subscription on unmount
    return () => {
      eventEmitter.unsubscribe('imageUploaded', fetchImages);
    };
  }, [fetchImages]);

  if (loading) {
    return (
      <Card className="w-full bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Your Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Your Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (images.length === 0) {
    return (
      <Card className="w-full bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Your Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">No images found. Upload some images to see them here!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Your Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 min-h-[300px]"
            >
              <Image
                src={imageUrl}
                alt={`Uploaded image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 