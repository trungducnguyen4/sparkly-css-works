
import React from 'react';
import { Button } from '@/components/ui/button';
import MochiMascot from './MochiMascot';

interface StudyPromoProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  bgColor?: string;
  onClick?: () => void;
}

const StudyPromo: React.FC<StudyPromoProps> = ({
  title,
  subtitle,
  buttonText,
  bgColor = 'bg-mochi-lightblue',
  onClick = () => {},
}) => {
  return (
    <div className={`${bgColor} rounded-2xl p-4 flex items-center justify-between overflow-hidden relative`}>
      <div className="flex flex-col gap-2 z-10">
        <h2 className="text-lg font-bold text-mochi-blue flex items-center gap-2">
          <span className="text-mochi-yellow">MOCHI</span> IELTS
        </h2>
        {subtitle && <p className="text-sm text-mochi-blue">{subtitle}</p>}
        <p className="text-xs text-blue-600 font-medium">{title}</p>
        <Button 
          onClick={onClick}
          className="bg-mochi-blue hover:bg-blue-700 text-white rounded-full py-1 px-4 w-fit text-sm"
        >
          {buttonText}
        </Button>
      </div>
      
      <div className="absolute right-4 bottom-4">
        <MochiMascot size="md" animation="float" />
      </div>
      
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-yellow-100 rounded-full opacity-50"></div>
      <div className="absolute right-10 top-6 w-10 h-10 bg-blue-100 rounded-full opacity-50"></div>
    </div>
  );
};

export default StudyPromo;
