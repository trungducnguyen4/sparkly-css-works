
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume, X, Apple } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const TopicDetail = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock vocabulary data - this would come from an API in a real app
  const vocabulary = {
    word: "apprehensive",
    pronunciation: "/ˌæprɪˈhensɪv/",
    translation: "Sợ hãi, e sợ (adj)",
    examples: [
      "She was apprehensive about meeting his parents for the first time.",
      "Many students feel apprehensive before exams."
    ]
  };
  
  const playAudio = () => {
    setIsPlaying(true);
    // In a real implementation, this would play an audio file
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const goBack = () => {
    navigate('/learn');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Progress bar at top */}
      <div className="w-full px-4 pt-4 flex items-center gap-3">
        <button onClick={goBack} className="text-gray-500">
          <X className="h-6 w-6" />
        </button>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-yellow-400 rounded-full"></div>
        </div>
        <div className="flex-shrink-0">
          <img 
            src="/lovable-uploads/a73464ce-3375-4eed-a835-dd2d0139e290.png" 
            alt="Mochi mascot" 
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
      
      {/* Main content - Vocabulary card */}
      <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center px-4 py-8">
        <Card className="w-full p-8 rounded-3xl bg-white shadow-md relative">
          {/* Action buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={playAudio}
              className={`rounded-full p-3 ${isPlaying ? 'bg-yellow-100' : 'bg-gray-100'} hover:bg-yellow-100 transition-colors`}
            >
              <Volume className={`h-5 w-5 ${isPlaying ? 'text-yellow-500' : 'text-gray-500'}`} />
            </button>
            
            <Sheet>
              <SheetTrigger asChild>
                <button className="rounded-full p-3 bg-gray-100 hover:bg-yellow-100 transition-colors">
                  <Apple className="h-5 w-5 text-gray-500" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4">Examples</h3>
                  <ul className="space-y-2">
                    {vocabulary.examples.map((example, index) => (
                      <li key={index} className="p-3 bg-gray-50 rounded-lg">{example}</li>
                    ))}
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Vocabulary content */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{vocabulary.word}</h2>
            <p className="text-gray-600 mb-4">{vocabulary.pronunciation}</p>
            <p className="text-gray-800">{vocabulary.translation}</p>
          </div>
          
          {/* Decoration at the bottom right */}
          <div className="absolute bottom-3 right-3">
            <span className="text-yellow-400">✨</span>
            <span className="text-pink-300">👆</span>
          </div>
        </Card>
      </div>
      
      {/* Bottom action area */}
      <div className="w-full max-w-md px-4 pb-8 flex flex-col items-center">
        <Button className="w-full py-6 rounded-full text-white bg-green-500 hover:bg-green-600 text-lg font-medium">
          Tiếp tục
        </Button>
        
        <button className="mt-4 text-gray-500 hover:text-gray-700 text-sm">
          Mình đã thuộc từ này
        </button>
      </div>
    </div>
  );
};

export default TopicDetail;
