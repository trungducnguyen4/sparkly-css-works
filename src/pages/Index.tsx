
import React from 'react';
import NavBar from '@/components/NavBar';
import StudyPromo from '@/components/StudyPromo';
import VocabChart from '@/components/VocabChart';
import UserProgress from '@/components/UserProgress';

const Index = () => {
  // Mock data for the vocabulary chart
  const vocabData = [
    { day: 1, count: 1 },
    { day: 2, count: 4 },
    { day: 3, count: 3 },
    { day: 4, count: 9 },
    { day: 5, count: 1785 },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 gap-6">
          {/* Study Promotion Banner */}
          <StudyPromo 
            title="ĐẠT 6.5 IELTS SAU 1 KHÓA HỌC"
            buttonText="ĐĂNG KÝ NGAY"
            onClick={() => console.log("Banner clicked")}
          />
          
          {/* Vocabulary Progress Chart */}
          <VocabChart data={vocabData} maxCount={2000} />
          
          {/* User Progress Stats */}
          <UserProgress wordsLearned={2699} streakDays={1} />
        </div>
      </main>
      
      {/* Decorative elements */}
      <div className="fixed bottom-10 right-10 w-40 h-40 z-10 pointer-events-none">
        <img 
          src="/lovable-uploads/a73464ce-3375-4eed-a835-dd2d0139e290.png" 
          alt="Mochi Mascot" 
          className="w-full h-full object-contain animate-float"
        />
      </div>
    </div>
  );
};

export default Index;
