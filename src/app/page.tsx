import React from 'react';
import InventoryManagement from '../components/InventoryManagement';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <InventoryManagement />
    </div>
  );
}