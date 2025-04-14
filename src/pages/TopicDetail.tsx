import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume, X } from 'lucide-react';

const TopicDetail = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [vocabulary, setVocabulary] = useState<any[]>([]); // State to store vocabulary data
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current vocabulary index

  useEffect(() => {
    const fetchVocabulary = async () => {
      console.log('Fetching vocabulary...');
      const username = 'admin'; // Replace with your username
      const password = '1'; // Replace with your password
      const token = btoa(`${username}:${password}`); // Encode credentials in Base64

      try {
        const response = await axios.get(`http://localhost:9090/api/vocabulary/topic/${topicId}`, {
          headers: {
            Authorization: `Basic ${token}`, // Add Basic Auth header
          },
        });

        console.log('Response received:', response.data);
        setVocabulary(response.data); // Set the vocabulary state
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    if (topicId) {
      fetchVocabulary();
    }
  }, [topicId]);

  const playAudio = () => {
    setIsPlaying(true);
    // In a real implementation, this would play an audio file
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const goBack = () => {
    navigate('/learn');
  };

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('Hoàn tất!'); // Replace with navigation or other logic
      navigate('/learn'); // Navigate back to the learn page or another route
    }
  };

  if (vocabulary.length === 0) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  const currentVocabulary = vocabulary[currentIndex]; // Get the current vocabulary item

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Progress bar at top */}
      <div className="w-full px-4 pt-4 flex items-center gap-3">
        <button onClick={goBack} className="text-gray-500">
          <X className="h-6 w-6" />
        </button>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 rounded-full"
            style={{ width: `${((currentIndex + 1) / vocabulary.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main content - Vocabulary card */}
      <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center px-4 py-8">
        <Card className="w-full p-8 rounded-3xl bg-white shadow-md relative">
          {/* Vocabulary content */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{currentVocabulary.word}</h2>
            <p className="text-gray-600 mb-4">{currentVocabulary.example || 'No example available'}</p>
            <p className="text-gray-800">{currentVocabulary.sound || 'No sound available'}</p>
          </div>
        </Card>
      </div>

      {/* Bottom action area */}
      <div className="w-full max-w-md px-4 pb-8 flex flex-col items-center">
        <Button
          onClick={handleNext}
          className="w-full py-6 rounded-full text-white bg-green-500 hover:bg-green-600 text-lg font-medium"
        >
          {currentIndex < vocabulary.length - 1 ? 'Tiếp tục' : 'Hoàn tất'}
        </Button>
      </div>
    </div>
  );
};

export default TopicDetail;