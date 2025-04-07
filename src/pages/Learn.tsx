import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicCard = ({
  id,
  title,
  subtitle,
  number,
  image,
  onClick,
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

const Learn = () => {
  const navigate = useNavigate();

  const topics = [
    {
      id: '1',
      title: 'Human nature P1',
      subtitle: 'Bản chất con người 1',
      number: 1,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    },
    {
      id: '2',
      title: 'Human nature P2',
      subtitle: 'Bản chất con người 2',
      number: 2,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    },
    {
      id: '3',
      title: 'Human nature P3',
      subtitle: 'Bản chất con người 3',
      number: 3,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    },
    {
      id: '4',
      title: 'Time for a change P1',
      subtitle: 'Đến lúc thay đổi 1',
      number: 4,
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    },
  ];

  const handleTopicClick = (topicId: string) => {
    navigate(`/learn/topic/${topicId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Quay lại trang chủ
        </button>
        <div className="bg-yellow-400 text-center py-4 px-8 rounded-xl mb-6">
          <h2 className="text-xl font-bold text-blue-900">Danh sách khóa học</h2>
        </div>
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
    </div>
  );
};

export default Learn;
