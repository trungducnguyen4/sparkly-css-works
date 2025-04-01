
import React from 'react';

interface WordBarProps {
  day: number;
  count: number;
  max: number;
  color: string;
  isActive?: boolean;
}

const WordBar: React.FC<WordBarProps> = ({ 
  day, 
  count, 
  max, 
  color,
  isActive = false
}) => {
  const heightPercentage = Math.min(Math.round((count / max) * 100), 100);
  
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs text-gray-500">{count} từ</div>
      <div className="relative w-12 h-32 bg-gray-100 rounded-md overflow-hidden">
        <div 
          className={`absolute bottom-0 w-full transition-all duration-500 ${color} ${isActive ? 'opacity-100' : 'opacity-80'}`}
          style={{ height: `${heightPercentage}%` }}
        ></div>
      </div>
      <div className={`font-medium ${isActive ? 'text-mochi-blue' : 'text-gray-700'}`}>{day}</div>
    </div>
  );
};

export default WordBar;
