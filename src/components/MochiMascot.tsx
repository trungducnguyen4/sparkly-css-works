
import React from 'react';

interface MochiMascotProps {
  size?: 'sm' | 'md' | 'lg';
  animation?: 'float' | 'wiggle' | 'none';
}

const MochiMascot: React.FC<MochiMascotProps> = ({ 
  size = 'md', 
  animation = 'none'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };
  
  const animationClasses = {
    float: 'animate-float',
    wiggle: 'animate-wiggle',
    none: ''
  };
  
  return (
    <div className={`${sizeClasses[size]} ${animationClasses[animation]}`}>
      <img 
        src="/lovable-uploads/a73464ce-3375-4eed-a835-dd2d0139e290.png" 
        alt="Mochi Mascot" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default MochiMascot;
