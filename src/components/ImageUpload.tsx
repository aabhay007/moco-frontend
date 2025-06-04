'use client';

import { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import axiosInstance from '@/lib/axios';

interface ImageUploadProps {
  onUploadComplete: (imagePath: string) => void;
  onClear: () => void;
}

export interface ImageUploadRef {
  openFileDialog: () => void;
}

export const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(
  ({ onUploadComplete, onClear }, ref) => {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const clearImage = () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
      onClear();
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload file
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axiosInstance.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status !== 200) {
          throw new Error('Upload failed');
        }

        onUploadComplete(response.data.result.imageLink);
        // Clear preview after successful upload
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreview(null);
      } catch (error) {
        console.error('Error uploading file:', error);
        clearImage();
      } finally {
        setIsUploading(false);
      }
    }, [onUploadComplete, clearImage]);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
      },
      maxFiles: 1,
      noClick: true,
    });

    // Expose the open function via ref
    useImperativeHandle(ref, () => ({
      openFileDialog: open,
    }));

    return (
      <div className="w-full max-w-xl mx-auto">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-default transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} disabled={isUploading} />
          
          {preview ? (
            <div className="relative w-full h-48 mb-4">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="space-y-4" onClick={open}> {/* Clickable area */} 
              <div className="text-6xl mb-4">📁</div>
              <p className="text-lg font-medium">
                {isDragActive
                  ? 'Drop the image here'
                  : 'Drag and drop an image here, or click to select'}
              </p>
              <p className="text-sm text-gray-500">
                Supports: PNG, JPG, JPEG, GIF, WEBP
              </p>
            </div>
          )}

          {isUploading && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Uploading...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload'; 