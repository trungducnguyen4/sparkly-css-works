
import React from 'react';
import WordBar from './WordBar';

interface VocabDay {
  day: number;
  count: number;
}

interface VocabChartProps {
  data: VocabDay[];
  maxCount: number;
}

const VocabChart: React.FC<VocabChartProps> = ({ data, maxCount }) => {
  const getBarColor = (index: number) => {
    const colors = [
      'bg-red-500',      // 1
      'bg-yellow-500',   // 2
      'bg-blue-500',     // 3
      'bg-purple-500',   // 4
      'bg-mochi-blue',   // 5
    ];
    return colors[index] || 'bg-gray-500';
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Chuẩn bị ôn tập: <span className="text-mochi-yellow">277</span> từ</h3>
      </div>
      
      <div className="flex justify-between items-end">
        {data.map((item, index) => (
          <WordBar 
            key={item.day}
            day={item.day} 
            count={item.count} 
            max={maxCount} 
            color={getBarColor(index)}
            isActive={index === 4} // Assuming day 5 is active as per image
          />
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="mochi-button">
          Ôn tập ngay
        </button>
      </div>
    </div>
  );
};

export default VocabChart;
