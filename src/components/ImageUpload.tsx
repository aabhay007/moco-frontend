'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageUploadProps {
  onUploadComplete: (imagePath: string) => void;
}

export const ImageUpload = ({ onUploadComplete }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

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
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadComplete(data.path);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
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
          <div className="space-y-4">
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
}; 