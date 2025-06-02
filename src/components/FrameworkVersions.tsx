'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface FrameworkVersion {
  name: string;
  version: string;
  lastUpdated: string;
  category: 'frontend' | 'backend' | 'database';
  imageUrl?: string;
}

const frameworks: FrameworkVersion[] = [
  { name: 'React', version: '', lastUpdated: '', category: 'frontend', imageUrl: '/images/TechLogos/React.png' },
  { name: 'Angular', version: '', lastUpdated: '', category: 'frontend', imageUrl: '/images/TechLogos/Angular.png' },
  { name: 'Vue', version: '', lastUpdated: '', category: 'frontend', imageUrl: '/images/TechLogos/Vuejs.png' },
  { name: 'Next.js', version: '', lastUpdated: '', category: 'frontend', imageUrl: '/images/TechLogos/Nextjs.png' },
  { name: 'Nuxt.js', version: '', lastUpdated: '', category: 'frontend', imageUrl: '/images/TechLogos/NuxtJS.png' },
  { name: 'Node.js', version: '', lastUpdated: '', category: 'backend', imageUrl: '/images/TechLogos/Nodejs.png' },
  { name: 'npm', version: '', lastUpdated: '', category: 'backend', imageUrl: '/images/TechLogos/NPM.png' },
  { name: 'NestJS', version: '', lastUpdated: '', category: 'backend', imageUrl: '/images/TechLogos/Nestjs.png' },
];

const categoryColors = {
  frontend: 'bg-blue-500 dark:bg-blue-600',
  backend: 'bg-green-500 dark:bg-green-600',
  database: 'bg-purple-500 dark:bg-purple-600',
};

const frameworkDocs: Record<string, string> = {
  React: 'https://react.dev/',
  Angular: 'https://angular.io/docs',
  Vue: 'https://vuejs.org/guide/introduction.html',
  'Next.js': 'https://nextjs.org/docs',
  'Nuxt.js': 'https://nuxt.com/docs',
  'Node.js': 'https://nodejs.org/en/docs',
  npm: 'https://docs.npmjs.com/',
  'NestJS': 'https://docs.nestjs.com/',
};

export default function FrameworkVersions() {
  const [versions, setVersions] = useState<FrameworkVersion[]>(frameworks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        // Fetch React version
        const reactResponse = await fetch('https://registry.npmjs.org/react/latest');
        const reactData = await reactResponse.json();
        
        // Fetch Angular version
        const angularResponse = await fetch('https://registry.npmjs.org/@angular/core/latest');
        const angularData = await angularResponse.json();
        
        // Fetch Vue version
        const vueResponse = await fetch('https://registry.npmjs.org/vue/latest');
        const vueData = await vueResponse.json();
        
        // Fetch Node.js version
        const nodeResponse = await fetch('https://nodejs.org/dist/index.json');
        const nodeData = await nodeResponse.json();
        
        // Fetch npm version
        const npmResponse = await fetch('https://registry.npmjs.org/npm/latest');
        const npmData = await npmResponse.json();

        // Fetch Next.js version
        const nextResponse = await fetch('https://registry.npmjs.org/next/latest');
        const nextData = await nextResponse.json();

        // Fetch Nuxt.js version
        const nuxtResponse = await fetch('https://registry.npmjs.org/nuxt/latest');
        const nuxtData = await nuxtResponse.json();

        // Fetch NestJS version
        const nestResponse = await fetch('https://registry.npmjs.org/@nestjs/core/latest');
        const nestData = await nestResponse.json();

        setVersions(prev => prev.map(framework => {
          switch (framework.name) {
            case 'React':
              return { ...framework, version: reactData.version, lastUpdated: new Date(reactData.time).toLocaleDateString() };
            case 'Angular':
              return { ...framework, version: angularData.version, lastUpdated: new Date(angularData.time).toLocaleDateString() };
            case 'Vue':
              return { ...framework, version: vueData.version, lastUpdated: new Date(vueData.time).toLocaleDateString() };
            case 'Next.js':
              return { ...framework, version: nextData.version, lastUpdated: new Date(nextData.time).toLocaleDateString() };
            case 'Nuxt.js':
              return { ...framework, version: nuxtData.version, lastUpdated: new Date(nuxtData.time).toLocaleDateString() };
            case 'Node.js':
              return { ...framework, version: nodeData[0].version, lastUpdated: new Date(nodeData[0].date).toLocaleDateString() };
            case 'npm':
              return { ...framework, version: npmData.version, lastUpdated: new Date(npmData.time).toLocaleDateString() };
            case 'NestJS':
              return { ...framework, version: nestData.version, lastUpdated: new Date(nestData.time).toLocaleDateString() };
            default:
              return framework;
          }
        }));
      } catch (error) {
        console.error('Error fetching versions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
    // Refresh every 6 hours
    const interval = setInterval(fetchVersions, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Framework Versions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {versions.map((framework) => (
            <div
              key={framework.name}
              className="p-6 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg dark:shadow-gray-900/50 transition-transform hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-900/70 flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex items-center justify-between mb-2">
                {framework.imageUrl && (
                  <Image 
                    src={framework.imageUrl}
                    alt={`${framework.name} logo`}
                    width={32}
                    height={32}
                    className="mr-3"
                  />
                )}
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{framework.name}</h3>
                <Badge className={`${categoryColors[framework.category]} text-white`}>
                  {framework.category}
                </Badge>
              </div>
              {loading ? (
                <Skeleton className="h-6 w-24 bg-gray-200 dark:bg-gray-700" />
              ) : (
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Version: <span className="font-medium text-gray-900 dark:text-white">{framework.version || 'N/A'}</span>
                  </p>
                  <a
                    href={frameworkDocs[framework.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start px-2 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg transition-all duration-200 font-semibold text-center"
                  >
                    View Docs
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 