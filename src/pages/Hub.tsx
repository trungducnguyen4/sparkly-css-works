
import React from 'react';
import NavBar from '@/components/NavBar';

const Hub = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-mochi-blue mb-6">MochiHub</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-600">Trang cộng đồng MochiHub đang được phát triển.</p>
        </div>
      </div>
    </div>
  );
};

export default Hub;
