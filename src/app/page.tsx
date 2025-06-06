// src/app/page.tsx

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import FrameworkVersions from '@/components/FrameworkVersions';
import { ImageUpload, ImageUploadRef } from '@/components/ImageUpload';
import { useState, useRef } from 'react';
import UserImages from '@/components/UserImages';

export default function AuthPage() {
  const { data: session, status } = useSession();
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);
  const imageUploadRef = useRef<ImageUploadRef>(null);

  const handleUploadComplete = (path: string) => {
    setUploadedImagePath(path);
    console.log('Uploaded image path:', path);
  };

  const handleClear = () => {
    setUploadedImagePath(null);
    if (imageUploadRef.current) {
      imageUploadRef.current.openFileDialog();
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Image 
                    src={session.user?.image ?? ''} 
                    alt="avatar" 
                    width={100} 
                    height={100} 
                    className="rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-lg"
                  />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-200"
                >
                  Welcome, {session.user?.name || session.user?.email}!
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signOut()}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
                >
                  Sign out
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                Upload Images
              </h2>
              <ImageUpload 
                onUploadComplete={handleUploadComplete}
                onClear={handleClear}
                ref={imageUploadRef}
              />
              {uploadedImagePath && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-green-700 dark:text-green-400">
                      Image uploaded successfully!
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Image URL:
                    </p>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 p-2 bg-white dark:bg-gray-800 rounded text-sm break-all">
                        {uploadedImagePath}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(uploadedImagePath);
                        }}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer transition-colors"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleClear}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold cursor-pointer hover:from-blue-600 hover:to-indigo-700 active:scale-[0.98]"
                  >
                    Upload Another Image
                  </button>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-7xl mx-auto mt-8"
            >
              <UserImages />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <FrameworkVersions />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              Welcome to <span className="text-blue-600 dark:text-blue-400">Moco</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Your all-in-one platform for seamless collaboration and productivity
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="px-6 py-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Get Started</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signIn('google')}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                title: 'Collaborate',
                description: 'Work together seamlessly with your team members in real-time.',
                icon: '👥'
              },
              {
                title: 'Organize',
                description: 'Keep your projects and tasks organized with our intuitive interface.',
                icon: '📊'
              },
              {
                title: 'Track Progress',
                description: 'Monitor your progress and stay on top of your goals.',
                icon: '📈'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}