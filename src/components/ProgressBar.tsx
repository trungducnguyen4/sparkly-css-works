
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
  height?: number;
  showText?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  color = 'bg-mochi-blue',
  height = 8,
  showText = false,
  className = '',
}) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="progress-bar" style={{ height: `${height}px` }}>
        <div
          className={`${color} h-full transition-all duration-500 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="text-xs text-gray-600 mt-1">
          {current} / {total} ({percentage}%)
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
