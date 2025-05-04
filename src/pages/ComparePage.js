import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function ComparePage() {
  const uploadedItems = JSON.parse(localStorage.getItem('uploadedItems') || '[]');
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    Papa.parse('/data/food_prices.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const enriched = result.data
          .map((item) => {
            const itemName = item['Name of product'];
            const unit = item['Units'];
            const rawMarket = item['Cost'];
            const marketPrice = parseFloat(rawMarket);

            if (!itemName || !unit || isNaN(marketPrice)) return null;

            const match = uploadedItems.find(
              (u) =>
                u.name.toLowerCase() === itemName.toLowerCase() &&
                u.unit.toLowerCase() === unit.toLowerCase()
            );

            if (!match) return null;

            const procurementPrice = parseFloat(match.price);
            if (isNaN(procurementPrice)) return null;

            return {
              name: itemName,
              unit,
              marketPrice,
              procurementPrice,
            };
          })
          .filter(Boolean);

        setMarketData(enriched);
      },
    });
  }, [uploadedItems]);

  const evaluate = (market, procurement) => {
    const over = ((procurement - market) / market) * 100;
    if (over <= 25) return '✅ Reasonable';
    if (over <= 30) return '❌ Overpriced';
    return '❌❌ Seriously Overpriced';
  };

  const getRowColor = (market, procurement) => {
    const over = ((procurement - market) / market) * 100;
    if (over <= 25) return 'bg-green-50';
    if (over <= 30) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-10 flex items-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <span className="mr-4">📊</span> Comparison Results
        </h2>
        <div className="bg-white shadow-[0_0_25px_rgba(59,130,246,0.5)] rounded-2xl p-8 mb-10 transform hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold w-1/5">Item</th>
                  <th className="px-6 py-4 font-semibold w-1/5">Market Price</th>
                  <th className="px-6 py-4 font-semibold w-1/5">Procurement Price</th>
                  <th className="px-6 py-4 font-semibold w-1/5">Unit</th>
                  <th className="px-6 py-4 font-semibold w-1/5">Status</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((item, i) => (
                  <tr key={i} className={`${getRowColor(item.marketPrice, item.procurementPrice)} hover:bg-gray-100 transition-colors`}>
                    <td className="px-6 py-4 border-b border-gray-200">{item.name}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{item.marketPrice.toFixed(2)} UZS</td>
                    <td className="px-6 py-4 border-b border-gray-200">{item.procurementPrice.toFixed(2)} UZS</td>
                    <td className="px-6 py-4 border-b border-gray-200">{item.unit}</td>
                    <td className="px-6 py-4 border-b border-gray-200 flex items-center">
                      <span>
                        {evaluate(item.marketPrice, item.procurementPrice).split(' ').map((part, index) => (
                          index === 0 ? (
                            <span key={index} className="mr-2">{part}</span>
                          ) : (
                            <span key={index} className="text-red-600 font-bold">{part}</span>
                          )
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {marketData.length > 0 && (
          <div className="bg-white shadow-[0_0_25px_rgba(59,130,246,0.5)] rounded-2xl p-8 transform hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] transition-all duration-300">
            <h3 className="text-4xl font-bold text-gray-900 mb-8 flex items-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span className="mr-4">📈</span> Visual Comparison
            </h3>
            <ResponsiveContainer width="100%" height={600}>
              <BarChart data={marketData} margin={{ top: 40, right: 50, left: 40, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#374151" fontSize={16} />
                <YAxis stroke="#374151" fontSize={16} label={{ value: 'Price (UZS)', angle: -90, position: 'insideLeft', offset: -15, fill: '#374151' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'  }}
                  labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                  formatter={(value) => `${value.toFixed(2)} UZS`}
                />
                <Legend verticalAlign="top" height={50} wrapperStyle={{ paddingBottom: '15px' }} />
                <Bar dataKey="marketPrice" fill="#10B981" name="Market Price" radius={[10, 10, 0, 0]} barSize={25} />
                <Bar dataKey="procurementPrice" fill="#EF4444" name="Procurement Price" radius={[10, 10, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComparePage;