import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar'; // Import the NavBar component

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
  const [topics, setTopics] = useState<any[]>([]); // Add state for topics

  useEffect(() => {
    console.log('Fetching topics...');
    const username = 'admin'; // Replace with your username
    const password = '1'; // Replace with your password
    const token = btoa(`${username}:${password}`); // Encode credentials in Base64

    axios
      .get('http://localhost:9090/api/topics', {
        headers: {
          Authorization: `Basic ${token}`, // Add Basic Auth header
        },
      })
      .then((response) => {
        console.log('Response received:', response.data);
        setTopics(response.data); // Set the topics state
      })
      .catch((error) => {
        console.error('Error fetching topics:', error);
      });
  }, []);

  const handleTopicClick = (topicId: string) => {
    navigate(`/learn/topic/${topicId}`); // Fix typo: use navigate instead of navigator
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar /> {/* Add the NavBar component here */}
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
          />
        ))}
      </div>
    </div>
  );
};

export default Learn;