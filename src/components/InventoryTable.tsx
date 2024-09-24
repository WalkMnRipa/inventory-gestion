import React from 'react';

interface InventoryItem {
  name: string;
  quantity: number;
  category: string;
}

interface InventoryTableProps {
  items: InventoryItem[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return <p className="text-gray-400">No items to display</p>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-600">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-600">
        {items.map((item, index) => (
          <tr key={index} className="hover:bg-gray-600">
            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;