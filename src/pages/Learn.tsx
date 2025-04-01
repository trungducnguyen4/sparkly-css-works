
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import MochiMascot from '@/components/MochiMascot';

const TopicCard = ({ 
  id,
  title, 
  subtitle, 
  number, 
  image,
  onClick
}: { 
  id: string;
  title: string; 
  subtitle: string; 
  number: number; 
  image: string;
  onClick: () => void;
}) => {
  return (
    <div 
      className="bg-green-500 hover:bg-green-600 transition-colors rounded-xl p-4 mb-4 cursor-pointer flex items-center gap-4"
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex-shrink-0 border-2 border-white">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm">
          {number}. {subtitle}
        </p>
      </div>
    </div>
  );
};

const PromoCard = ({ 
  title, 
  description, 
  buttonText,
  icon,
  bgColor = "bg-blue-600", 
  textColor = "text-white",
  badgeText
}: { 
  title: string; 
  description?: string; 
  buttonText: string;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  badgeText?: string;
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-4 mb-4 relative overflow-hidden`}>
      {badgeText && (
        <div className="absolute top-2 right-2 bg-yellow-300 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
          {badgeText}
        </div>
      )}
      <div className="flex items-center gap-4">
        {icon && <div className="text-white">{icon}</div>}
        <div className={textColor}>
          <h3 className="text-lg font-bold">{title}</h3>
          {description && <p className="text-sm">{description}</p>}
        </div>
      </div>
      <Button className="mt-2 bg-green-500 hover:bg-green-600 text-white rounded-full">
        {buttonText}
      </Button>
    </div>
  );
};

const Learn = () => {
  const navigate = useNavigate();
  
  // Mock data for topic cards
  const topics = [
    {
      id: "1",
      title: "Human nature P1",
      subtitle: "Bản chất con người 1",
      number: 1,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    },
    {
      id: "2",
      title: "Human nature P2",
      subtitle: "Bản chất con người 2",
      number: 2,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    },
    {
      id: "3",
      title: "Human nature P3",
      subtitle: "Bản chất con người 3",
      number: 3,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    },
    {
      id: "4",
      title: "Time for a change P1",
      subtitle: "Đến lúc thay đổi 1",
      number: 4,
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
    }
  ];

  const handleTopicClick = (topicId: string) => {
    navigate(`/learn/topic/${topicId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Tips */}
          <div className="md:col-span-1">
            <div className="mb-6 bg-white p-4 rounded-xl border border-yellow-300 flex items-center gap-3">
              <MochiMascot size="sm" />
              <div className="flex-1">
                <span className="text-gray-800 font-medium">TIPS GHI NHỚ TỪ VỰNG</span>
                <ArrowRight className="inline-block ml-2 h-4 w-4 text-yellow-500" />
              </div>
            </div>
          </div>
          
          {/* Center Column - Topic Cards */}
          <div className="md:col-span-1">
            <div className="bg-yellow-400 text-center py-4 px-8 rounded-xl mb-6">
              <h2 className="text-xl font-bold text-blue-900">IELTS NÂNG CAO</h2>
            </div>
            
            {/* Topic cards */}
            {topics.map((topic) => (
              <TopicCard 
                key={topic.id}
                id={topic.id}
                title={topic.title}
                subtitle={topic.subtitle}
                number={topic.number}
                image={topic.image}
                onClick={() => handleTopicClick(topic.id)}
              />
            ))}
          </div>
          
          {/* Right Column - Study Resources */}
          <div className="md:col-span-1">
            {/* Academic Resources */}
            <div className="bg-white p-4 rounded-xl mb-6 border border-blue-200 flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-red-500" />
              </div>
              <div className="flex-1">
                <span className="text-gray-800 font-bold">DANH SÁCH KHÓA HỌC</span>
                <ArrowRight className="inline-block ml-2 h-4 w-4 text-yellow-500" />
              </div>
            </div>
            
            {/* Learn in Context Promo */}
            <div className="bg-blue-800 text-white p-4 rounded-xl mb-6 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-yellow-300 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                MOCHI LISTENING
              </div>
              <div className="flex items-center justify-center py-3">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-yellow-300">
                    HỌC TỪ VỰNG TRONG NGỮ CẢNH
                  </h3>
                  <p className="text-sm mt-1">Ghi nhớ và vận dụng tốt hơn</p>
                  <Button className="mt-3 bg-green-500 hover:bg-green-600 text-white rounded-full">
                    HỌC THỬ NGAY
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Dictionary Promo */}
            <div className="bg-yellow-100 p-4 rounded-xl mb-6 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-yellow-300 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                MOCHI DICTIONARY EXTENSION
              </div>
              <div className="text-center py-3">
                <h3 className="text-lg font-bold text-red-500">
                  TRA VÀ LƯU NHANH
                </h3>
                <p className="text-3xl font-bold text-orange-500">70,000+ từ</p>
                <Button className="mt-3 bg-green-500 hover:bg-green-600 text-white rounded-full">
                  TRA CỨU NGAY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating mascot */}
      <div className="fixed bottom-10 right-10 z-10 pointer-events-none">
        <img 
          src="/lovable-uploads/b5475409-406d-4b20-84a8-c5fb4cca9e23.png" 
          alt="Mochi Mascot" 
          className="w-24 h-24 object-contain animate-bounce"
        />
      </div>
    </div>
  );
};

export default Learn;
