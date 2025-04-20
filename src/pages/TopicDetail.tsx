import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume, X } from 'lucide-react';
import NavBar from '@/components/NavBar'; // Import NavBar
import '@/styles/global.css'; // Use the alias for the correct path
import { useLearnedWords } from "@/contexts/LearnedWordsContext";

const TopicDetail = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [vocabulary, setVocabulary] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learningMode, setLearningMode] = useState<string | null>(null); // State to store the learning mode
  const [isFlipped, setIsFlipped] = useState(false); // State to track flip status
  const { setTotalWordsLearned } = useLearnedWords();
  const [isSaved, setIsSaved] = useState(false); // State to track if the word is saved

  useEffect(() => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Retrieved user from localStorage:", user); // Log the user object

    if (user && user.learningMode) {
      console.log("User's learning mode:", user.learningMode); // Debugging: Log the learning mode
      setLearningMode(user.learningMode); // Set the learning mode
    } else {
      console.error("Learning mode not found for the user. User object:", user); // Add fallback log
    }

    const fetchVocabulary = async () => {
      console.log('Fetching vocabulary...');
      const username = 'admin'; // Replace with your username
      const password = '1'; // Replace with your password
      const token = btoa(`${username}:${password}`);

      try {
        const response = await axios.get(`http://localhost:9090/api/vocabulary/topic/${topicId}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });

        console.log('Response received:', response.data);
        setVocabulary(response.data);
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

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        const updatedUser = JSON.parse(event.newValue || "{}");
        if (updatedUser && updatedUser.learningMode) {
          setLearningMode(updatedUser.learningMode);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const playAudio = (audioUrl: string) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      alert('No audio available');
    }
  };

  const goBack = () => {
    navigate('/learn');
  };

  const handleAddToFavorites = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.id) {
      alert("User ID is missing. Please log in again.");
      return;
    }
  
    try {
      const vocabularyId = vocabulary[currentIndex].id;
  
      // Send the user_id from the logger (localStorage) and vocabulary_id to the backend
      await axios.post(`http://localhost:9090/api/favorites`, {
        user: { id: user.id }, // Pass the user object with the ID
        vocabulary: { id: vocabularyId }, // Pass the vocabulary object with the ID
      });
  
      setIsSaved(true); // Mark the word as saved
      alert("Vocabulary added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error.response?.data || error.message);
      alert("An error occurred while adding the vocabulary to favorites.");
    }
  };
  const handleNext = async () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
  
        if (user && user.email) {
          const response = await axios.post(
            `http://localhost:9090/api/users/learned-words`,
            {
              email: user.email,
              topicId, // Send topicId instead of vocabularyId
            }
          );
  
          console.log("Updated totalWordsLearned:", response.data);
  
          // Update context and localStorage
          setTotalWordsLearned(response.data.totalWordsLearned);
          const updatedUser = { ...user, totalWordsLearned: response.data.totalWordsLearned };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error("Error updating totalWordsLearned:", error);
      }
  
      alert("Hoàn tất!");
      navigate("/learn");
    }
  };

  const currentVocabulary = vocabulary[currentIndex];

if (!currentVocabulary) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <NavBar />
      <h1 className="text-xl font-bold">Loading vocabulary...</h1>
    </div>
  );
}

  // Render different UI based on the learning mode
  if (learningMode === "flashcard") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <NavBar /> {/* Add NavBar here */}
        <h1 className="text-2xl font-bold mb-4">Flashcard Mode</h1>
        <div className="w-full max-w-md h-64 perspective">
  <div
    className={`flip-container ${isFlipped ? 'rotate-y-180' : ''}`}
  >
    {/* Front Side */}
    <Card className="backface-hidden p-8 rounded-3xl bg-white shadow-md flex items-center justify-center">
      <h2 className="text-3xl font-bold">{currentVocabulary.word}</h2>
    </Card>

    {/* Back Side */}
    <Card
      className="backface-hidden p-8 rounded-3xl bg-white shadow-md flex flex-col items-center justify-center"
      style={{ transform: 'rotateY(180deg)' }}
    >
      <p className="text-gray-600 mb-4">
        {currentVocabulary.translate || "No translation available"}
      </p>
      <p className="text-gray-800 mb-4">
        {currentVocabulary.example || "No example available"}
      </p>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          playAudio(currentVocabulary.sound);
        }}
        className="py-2 px-4 rounded-full bg-blue-500 text-white hover:bg-blue-600"
      >
        <Volume className="inline-block h-5 w-5 mr-2" />
        Play Sound
      </Button>
      <Button
        onClick={handleAddToFavorites}
        className={`mt-4 py-2 px-4 rounded-full ${isSaved ? 'bg-gray-400' : 'bg-green-500'} text-white hover:bg-green-600`}
        disabled={isSaved} // Disable button if already saved
      >
        {isSaved ? "Saved" : "Save to Notebook"}
      </Button>
    </Card>
  </div>
</div>

        <Button
          onClick={() => setIsFlipped(!isFlipped)} // Flip the card
          className="mt-4 py-2 px-6 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
        >
          Flip
        </Button>
        <Button
          onClick={() => {
            setIsFlipped(false); // Reset flip state when moving to the next card
            handleNext();
          }}
          className="w-full max-w-md py-6 mt-6 rounded-full text-white bg-green-500 hover:bg-green-600 text-lg font-medium"
        >
          {currentIndex < vocabulary.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    );
  }

  // Default UI for traditional mode
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <NavBar /> {/* Add NavBar here */}
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

      <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center px-4 py-8">
        <Card className="w-full p-8 rounded-3xl bg-white shadow-md relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{currentVocabulary.word}</h2>
            <p className="text-gray-600 mb-4">{currentVocabulary.translate || 'No translation available'}</p>
            <p className="text-gray-800 mb-4">{currentVocabulary.example || 'No example available'}</p>
            <Button
              onClick={() => playAudio(currentVocabulary.sound)}
              className="py-2 px-4 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <Volume className="inline-block h-5 w-5 mr-2" />
              Play Sound
            </Button>
          </div>
        </Card>
      </div>

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