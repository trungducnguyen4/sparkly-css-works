import React, { createContext, useContext, useState } from "react";

interface LearnedWordsContextProps {
  totalWordsLearned: number;
  setTotalWordsLearned: (count: number) => void;
}

const LearnedWordsContext = createContext<LearnedWordsContextProps | undefined>(undefined);

export const LearnedWordsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalWordsLearned, setTotalWordsLearned] = useState<number>(0);

  return (
    <LearnedWordsContext.Provider value={{ totalWordsLearned, setTotalWordsLearned }}>
      {children}
    </LearnedWordsContext.Provider>
  );
};

export const useLearnedWords = (): LearnedWordsContextProps => {
  const context = useContext(LearnedWordsContext);
  if (!context) {
    throw new Error("useLearnedWords must be used within a LearnedWordsProvider");
  }
  return context;
};
