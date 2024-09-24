'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, ChevronRight, ChevronDown } from 'lucide-react';
import initialData from './initial-data.json';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

interface Category {
  id: string;
  name: string;
  items: InventoryItem[];
}

const InventoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id'>>({ name: '', quantity: 0 });
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<{ categoryId: string; itemId: string } | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    const storedCategories = localStorage.getItem('inventoryCategories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(initialData.categories);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inventoryCategories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObject = { id: Date.now().toString(), name: newCategory, items: [] };
      setCategories(prevCategories => [...prevCategories, newCategoryObject]);
      setNewCategory('');
    }
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
  };

  const addItem = (categoryId: string) => {
    if (newItem.name && newItem.quantity > 0) {
      setCategories(prevCategories => prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, items: [...category.items, { ...newItem, id: Date.now().toString() }] }
          : category
      ));
      setNewItem({ name: '', quantity: 0 });
    }
  };

  const updateItem = (categoryId: string, itemId: string) => {
    setCategories(prevCategories => prevCategories.map(category =>
      category.id === categoryId
        ? {
          ...category,
          items: category.items.map(item =>
            item.id === itemId ? { ...item, ...newItem, id: itemId } : item
          )
        }
        : category
    ));
    setEditingItem(null);
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories(prevCategories => prevCategories.map(category =>
      category.id === categoryId
        ? { ...category, items: category.items.filter(item => item.id !== itemId) }
        : category
    ));
  };

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-300">Gestion de l'Inventaire</h1>

      {/* Add Category Section */}
      <div className="mb-6 flex">
        <input
          className="flex-grow bg-gray-700 text-white border border-gray-600 rounded-l p-2"
          placeholder="Nouvelle Catégorie"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
          onClick={addCategory}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Categories and Items List */}
      {categories.map(category => (
        <div key={category.id} className="mb-4 bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <button onClick={() => toggleCategoryExpand(category.id)} className="mr-2">
                {expandedCategories.includes(category.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </div>
            <button className="text-red-400" onClick={() => deleteCategory(category.id)}>
              <Trash2 size={20} />
            </button>
          </div>

          {expandedCategories.includes(category.id) && (
            <>
              <table className="w-full mb-4">
                <thead>
                  <tr>
                    <th className="text-left">Nom</th>
                    <th className="text-left">Quantité</th>
                    <th className="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map(item => (
                    <tr key={item.id}>
                      <td>
                        {editingItem?.categoryId === category.id && editingItem?.itemId === item.id ? (
                          <input
                            className="bg-gray-600 text-white border border-gray-500 rounded p-1"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                          />
                        ) : (
                          item.name
                        )}
                      </td>
                      <td>
                        {editingItem?.categoryId === category.id && editingItem?.itemId === item.id ? (
                          <input
                            className="bg-gray-600 text-white border border-gray-500 rounded p-1"
                            type="number"
                            value={newItem.quantity}
                            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      <td>
                        {editingItem?.categoryId === category.id && editingItem?.itemId === item.id ? (
                          <>
                            <button className="text-green-400 mr-2" onClick={() => updateItem(category.id, item.id)}>
                              <Check size={20} />
                            </button>
                            <button className="text-red-400" onClick={() => setEditingItem(null)}>
                              <X size={20} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="text-blue-400 mr-2" onClick={() => {
                              setEditingItem({ categoryId: category.id, itemId: item.id });
                              setNewItem({ name: item.name, quantity: item.quantity });
                            }}>
                              <Edit2 size={20} />
                            </button>
                            <button className="text-red-400" onClick={() => deleteItem(category.id, item.id)}>
                              <Trash2 size={20} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add Item Form */}
              <div className="flex mt-2">
                <input
                  className="flex-grow bg-gray-600 text-white border border-gray-500 rounded-l p-1 mr-2"
                  placeholder="Nouvel Article"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                  className="w-24 bg-gray-600 text-white border border-gray-500 p-1 mr-2"
                  type="number"
                  placeholder="Quantité"
                  value={newItem.quantity || ''}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
                />
                <button
                  className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
                  onClick={() => addItem(category.id)}
                >
                  <Plus size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default InventoryManagement;