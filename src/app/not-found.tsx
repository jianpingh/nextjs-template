'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function NotFound() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">页面未找到</h2>
            <p className="text-gray-600 mb-8">
              抱歉，您访问的页面不存在。
            </p>
            <div className="space-y-4">
              <Link
                href={user ? "/dashboard" : "/login"}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {user ? "返回仪表板" : "前往登录"}
              </Link>
              <Link
                href="/"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
