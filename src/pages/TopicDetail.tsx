import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume, X } from 'lucide-react';
import NavBar from '@/components/NavBar';
import '@/styles/global.css';
import { useLearnedWords } from "@/contexts/LearnedWordsContext";

const TopicDetail = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [vocabulary, setVocabulary] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learningMode, setLearningMode] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const { setTotalWordsLearned } = useLearnedWords();
  const [savedWordIds, setSavedWordIds] = useState<number[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null); // State for API error
  const [addFavoriteError, setAddFavoriteError] = useState<string | null>(null);
  const [failedUserInfo, setFailedUserInfo] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.learningMode) {
      setLearningMode(user.learningMode);
    }
  
    const fetchSavedWords = async () => {
      if (!user || !user.id) return;
      try {
        const response = await axios.get(`http://localhost:9090/api/favorites/user/${user.id}`);
        const savedIds = response.data.map((fav: any) => fav.vocabularyId || fav.vocabulary?.id).filter(Boolean);

        setSavedWordIds(savedIds);
      } catch (error) {
        console.error('Error fetching saved words:', error);
      }
    };
  
    const fetchVocabulary = async () => {
      const username = 'admin';
      const password = '1';
      const token = btoa(`${username}:${password}`);
      try {
        const response = await axios.get(`http://localhost:9090/api/vocabulary/topic/${topicId}`, {
          headers: { Authorization: `Basic ${token}` },
        });
        setVocabulary(response.data);
        setFetchError(null); // Clear any previous errors
      } catch (error: any) {
        console.error('Error fetching vocabulary:', error);
        setFetchError(
          error.response?.data?.message || 
          'An error occurred while fetching vocabulary. Please try again later.'
        );
      }
    };
  
    const loadData = async () => {
      await Promise.all([
        fetchSavedWords(),
        fetchVocabulary(),
      ]);
    };
  
    if (topicId) {
      loadData();
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
    console.log("⭐ user object in handleAddToFavorites:", user);
    if (!user || !user.id) {
        console.warn("User object missing id:", user);
        alert("User ID is missing. Please log in again.");
        return;
    }

    try {
        const vocabularyId = vocabulary[currentIndex].id;
        const userId = Number(user.id);
        // Payload đúng cho backend
        const payload = {
            user: { id: userId },
            vocabulary: { id: vocabularyId }
        };
        console.log("⭐ Payload being sent:", payload);

        await axios.post(`http://localhost:9090/api/favorites`, payload);

        setSavedWordIds(prev => [...prev, vocabularyId]);
        setAddFavoriteError(null);
        setFailedUserInfo(null);
        alert("Vocabulary added to favorites!");
    } catch (error: any) {
        console.error("Error adding to favorites:", error.response?.data || error.message);
        setAddFavoriteError("An error occurred while adding the vocabulary to favorites.");
        setFailedUserInfo(user);
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
              topicId,
            }
          );
          console.log("Updated totalWordsLearned:", response.data);
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

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <NavBar />
        <h1 className="text-xl font-bold text-red-500">Error</h1>
        <p className="text-gray-700">{fetchError}</p>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!currentVocabulary) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <NavBar />
        <h1 className="text-xl font-bold">Loading vocabulary...</h1>
      </div>
    );
  }
  console.log("📌 SavedWordIds:", savedWordIds);
  console.log("📌 Current Vocabulary ID:", currentVocabulary.id);
  const isSavedCurrentWord = savedWordIds.includes(currentVocabulary.id);

  if (learningMode === "flashcard") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <NavBar />
        <h1 className="text-2xl font-bold mb-4">Flashcard Mode</h1>
        {/* Show user info if add to favorites failed */}
        {addFavoriteError && failedUserInfo && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded text-red-700 w-full max-w-md">
            <div className="font-semibold mb-1">Add to favorites failed!</div>
            <div className="mb-1">{addFavoriteError}</div>
            <div className="text-xs break-all">
              <pre>{JSON.stringify(failedUserInfo, null, 2)}</pre>
            </div>
          </div>
        )}
        <div className="w-full max-w-md h-64 perspective">
          <div className={`flip-container ${isFlipped ? 'rotate-y-180' : ''}`}>
            <Card className="backface-hidden p-8 rounded-3xl bg-white shadow-md flex items-center justify-center">
              <h2 className="text-3xl font-bold">{currentVocabulary.word}</h2>
            </Card>
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
              {isSavedCurrentWord ? (
                <Button
                  disabled
                  className="mt-4 py-2 px-4 rounded-full bg-gray-400 text-white cursor-default"
                >
                  Saved
                </Button>
              ) : (
                <Button
                  onClick={handleAddToFavorites}
                  className="mt-4 py-2 px-4 rounded-full bg-green-500 text-white hover:bg-green-600"
                >
                  Save to Notebook
                </Button>
              )}
            </Card>
          </div>
        </div>

        <Button
          onClick={() => setIsFlipped(!isFlipped)}
          className="mt-4 py-2 px-6 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
        >
          Flip
        </Button>
        <Button
          onClick={() => {
            setIsFlipped(false);
            handleNext();
          }}
          className="w-full max-w-md py-6 mt-6 rounded-full text-white bg-green-500 hover:bg-green-600 text-lg font-medium"
        >
          {currentIndex < vocabulary.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <NavBar />
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
