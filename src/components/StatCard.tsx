
import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
  bgColor?: string;
  className?: string;
  children?: ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'text-mochi-blue',
  bgColor = 'bg-white',
  className = '',
  children,
}) => {
  return (
    <div className={`stat-card ${bgColor} ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        {icon && <div className={`${color}`}>{icon}</div>}
      </div>
      <div className={`mt-2 text-xl font-bold ${color}`}>{value}</div>
      {children}
    </div>
  );
};

export default StatCard;
