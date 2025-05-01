import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

const TopicCard = ({
  id,
  title,
  subtitle,
  number,
  image,
  onClick,
  isLocked,
}: {
  id: string;
  title: string;
  subtitle: string;
  number: number;
  image: string;
  onClick: () => void;
  isLocked: boolean;
}) => {
  return (
    <div
      className={`relative bg-green-500 ${
        isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 cursor-pointer'
      } transition-colors rounded-xl p-4 mb-4 flex items-center gap-4`}
      onClick={!isLocked ? onClick : undefined}
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
      {isLocked && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <span className="text-white text-lg font-bold">🔒</span>
        </div>
      )}
    </div>
  );
};

const Learn = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<any[]>([]);
  const [userSubscription, setUserSubscription] = useState<any>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const username = 'admin';
        const password = '1';
        const token = btoa(`${username}:${password}`);

        const topicsResponse = await axios.get('http://localhost:9090/api/topics', {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setTopics(topicsResponse.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    const fetchUserSubscription = async () => {
      try {
        const userId = 1; // Replace with the actual user ID
        const subscriptionResponse = await axios.get(`http://localhost:9090/api/premium/${userId}`);
        setUserSubscription(subscriptionResponse.data);
      } catch (error) {
        console.error('Error fetching user subscription:', error);
        setUserSubscription(null); // No subscription or expired
      }
    };

    fetchTopics();
    fetchUserSubscription();
  }, []);

  const handleTopicClick = (topicId: string) => {
    navigate(`/learn/topic/${topicId}`);
  };

  const isTopicLocked = (topic: any) => {
    if (!topic.paid) return false; // Free topics are not locked
    if (!userSubscription) return true; // No subscription
    const currentDate = new Date();
    const expireDate = new Date(userSubscription.expireDate);
    return currentDate > expireDate; // Locked if subscription expired
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Quay lại trang chủ
        </button>
        <div className="bg-yellow-400 text-center py-4 px-8 rounded-xl mb-6">
          <h2 className="text-xl font-bold text-blue-900">Danh sách từ vựng theo chủ đề </h2>
        </div>
        {topics.map((topic, index) => (
          <TopicCard
            key={topic.id}
            id={topic.id}
            title={topic.name}
            subtitle={topic.description}
            number={index + 1}
            image={topic.image || 'https://via.placeholder.com/150'}
            onClick={() => handleTopicClick(topic.id)}
            isLocked={isTopicLocked(topic)}
          />
        ))}
      </div>
    </div>
  );
};

export default Learn;