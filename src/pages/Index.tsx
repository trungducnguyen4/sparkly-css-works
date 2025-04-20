
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
    <CardTitle>Hành trình học của bạn</CardTitle>
    <CardDescription>"To know your roots, speak the language of your ancestors — for in every word lies a piece of who you are."</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {/* Bài báo 1 */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>10 Tips to Improve Your English</CardTitle>
          <CardDescription>Learn practical tips to enhance your English skills effectively.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="link"
            onClick={() => window.open('https://example.com/improve-english', '_blank')}
          >
            Read More
          </Button>
        </CardContent>
      </Card>

      {/* Bài báo 2 */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>How to Build Vocabulary</CardTitle>
          <CardDescription>Discover strategies to expand your English vocabulary.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="link"
            onClick={() => window.open('https://example.com/build-vocabulary', '_blank')}
          >
            Read More
          </Button>
        </CardContent>
      </Card>

      {/* Bài báo 3 */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Mastering English Grammar</CardTitle>
          <CardDescription>Understand the key rules of English grammar to improve your writing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="link"
            onClick={() => window.open('https://example.com/english-grammar', '_blank')}
          >
            Read More
          </Button>
        </CardContent>
      </Card>
    </div>
  </CardContent>
</Card>
        
        
        {/* Vocabulary Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Thống kê mức độ ghi nhớ</CardTitle>
            <CardDescription>Spaced Repetition System (SRS) is a learning technique that helps improve long-term memory retention by reviewing information at increasing intervals. It uses the idea that we remember things better when we review them just before we’re about to forget them. SRS is commonly used in language learning and flashcard apps to make studying more efficient.</CardDescription>
          </CardHeader>
          <CardContent>
            <VocabChart data={vocabData} maxCount={30} />
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
};

export default Index;
