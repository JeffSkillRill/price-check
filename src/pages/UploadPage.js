import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const [items, setItems] = useState([{ name: '', price: '', unit: '' }]);
  const navigate = useNavigate();

  const handleChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const handleAddRow = () => {
    setItems([...items, { name: '', price: '', unit: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('uploadedItems', JSON.stringify(items));
    navigate('/compare');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-[0_0_20px_rgba(59,130,246,0.5)] rounded-2xl p-8 transform hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all duration-300">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <span className="mr-3">📥</span> Upload Procurement Data
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex gap-6 mb-6">
              <input
                type="text"
                placeholder="Name"
                value={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-[0_0_8px_rgba(59,130,246,0.3)] transition-all duration-300"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleChange(index, 'price', e.target.value)}
                className="flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-[0_0_8px_rgba(59,130,246,0.3)] transition-all duration-300"
                required
              />
              <select
                value={item.unit}
                onChange={(e) => handleChange(index, 'unit', e.target.value)}
                className="flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-[0_0_8px_rgba(59,130,246,0.3)] transition-all duration-300"
                required
              >
                <option value="">Select unit</option>
                <option value="kg">kg</option>
                <option value="piece">piece</option>
                <option value="liter">liter</option>
              </select>
            </div>
          ))}
          <div className="flex gap-6">
            <button
              type="button"
              onClick={handleAddRow}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-[0_0_10px_rgba(59,130,246,0.6)] hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-300"
            >
              ➕ Add Item
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:shadow-[0_0_15px_rgba(34,197,94,0.8)] transition-all duration-300"
            >
              🚀 Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;