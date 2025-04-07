
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NavBar from '@/components/NavBar';
import ProgressBar from '@/components/ProgressBar';
import StatCard from '@/components/StatCard';
import UserProgress from '@/components/UserProgress';
import VocabChart from '@/components/VocabChart';
import WordBar from '@/components/WordBar';
import StudyPromo from '@/components/StudyPromo';
import MochiMascot from '@/components/MochiMascot';
import { ModeSelect } from '@/components/ModeSelect';

const Index = () => {
  // Dữ liệu mẫu cho VocabChart
  const vocabData = [
    { day: 1, count: 15 },
    { day: 2, count: 20 },
    { day: 3, count: 10 },
    { day: 4, count: 25 },
    { day: 5, count: 30 },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        {/* Greeting and Mode Selection */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Xin chào, học viên!</h1>
            <p className="text-gray-600">Hãy tiếp tục hành trình học tiếng Anh của bạn</p>
          </div>
          <ModeSelect />
        </div>
        
        {/* Progress Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tiến độ của bạn</CardTitle>
            <CardDescription>Bạn đã hoàn thành 35% mục tiêu tuần này</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressBar current={35} total={100} />
            <UserProgress wordsLearned={245} streakDays={7} />
          </CardContent>
        </Card>
        
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Từ vựng" value="245" />
          <StatCard title="Điểm kinh nghiệm" value="1,240" />
          <StatCard title="Streak" value="7" />
        </div>
        
        {/* Vocabulary Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Từ vựng theo chủ đề</CardTitle>
            <CardDescription>Số từ bạn đã học trong mỗi chủ đề</CardDescription>
          </CardHeader>
          <CardContent>
            <VocabChart data={vocabData} maxCount={30} />
            <div className="space-y-4 mt-6">
              <WordBar day={1} count={28} max={50} color="bg-red-500" />
              <WordBar day={2} count={35} max={60} color="bg-blue-500" />
              <WordBar day={3} count={12} max={40} color="bg-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <div className="fixed bottom-4 right-4">
          <MochiMascot />
        </div>
      </div>
    </div>
  );
};

export default Index;
