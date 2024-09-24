import React from 'react';
import InventoryTable from '../components/InventoryTable';

const sampleData = [
  { name: 'Coca Cola', quantity: 50, category: 'Beverages' },
  { name: 'Chips', quantity: 100, category: 'Snacks' },
  { name: 'Chocolate Bars', quantity: 75, category: 'Sweets' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <main className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-300">Inventory Management</h1>
        <div className="bg-gray-700 rounded-lg p-6">
          <InventoryTable items={sampleData} />
        </div>
      </main>
    </div>
  );
}
