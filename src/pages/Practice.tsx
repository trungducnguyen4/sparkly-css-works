import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import axios from 'axios';

const Practice = () => {
  const [wordsToReview, setWordsToReview] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWordsToReview = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user && user.email) {
          const response = await axios.get(`http://localhost:9090/api/users/review-words`, {
            params: { email: user.email },
          });
          setWordsToReview(response.data.wordsToReview);
        }
      } catch (error) {
        console.error('Error fetching words to review:', error);
      }
    };

    fetchWordsToReview();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-mochi-blue mb-6">Ôn tập</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          {wordsToReview !== null ? (
            <>
              <p className="text-gray-600">
                Có {wordsToReview} từ cần ôn tập hôm nay.
              </p>
              <button
                onClick={() => navigate('/review')}
                disabled={wordsToReview <= 0}
                className={`mt-4 px-6 py-2 rounded-md text-white ${
                  wordsToReview > 0
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Ôn tập ngay
              </button>
            </>
          ) : (
            <p className="text-gray-600">Đang tải dữ liệu...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Practice;