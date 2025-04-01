
import React from 'react';
import { Star } from 'lucide-react';
import StatCard from './StatCard';
import MochiMascot from './MochiMascot';

interface UserProgressProps {
  wordsLearned: number;
  streakDays: number;
}

const UserProgress: React.FC<UserProgressProps> = ({
  wordsLearned,
  streakDays,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard 
        title="Bạn đã học được" 
        value={`${wordsLearned} từ`}
        icon={<Star className="h-5 w-5 text-mochi-yellow fill-mochi-yellow" />}
        className="bg-yellow-50 border-yellow-100"
      >
        <div className="flex items-center mt-2">
          <img 
            src="/lovable-uploads/a73464ce-3375-4eed-a835-dd2d0139e290.png" 
            alt="Vocabulary icon"
            className="w-10 h-10 object-contain"
          />
        </div>
      </StatCard>
      
      <StatCard 
        title="Bạn đã học liên tục" 
        value={`${streakDays} ngày`}
        icon={<Star className="h-5 w-5 text-mochi-yellow fill-mochi-yellow" />}
        className="bg-green-50 border-green-100"
      >
        <div className="flex items-center mt-2">
          <MochiMascot size="sm" animation="wiggle" />
        </div>
      </StatCard>
    </div>
  );
};

export default UserProgress;
