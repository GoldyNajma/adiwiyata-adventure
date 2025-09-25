import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  name: string;
  className: string;
  currentStage: number;
  scores: number[];
  totalScore: number;
  isRegistered: boolean;
}
interface UserContextType {
  user: User;
  register: (name: string, className: string) => void;
  updateScore: (stageId: number, score: number) => void;
  advanceStage: () => void;
  resetProgress: () => void;
}
const initialUser: User = {
  name: '',
  className: '',
  currentStage: 0,
  scores: [0, 0, 0, 0, 0, 0, 0],
  totalScore: 0,
  isRegistered: false
};
const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('adiwiyataUser');
    return savedUser ? JSON.parse(savedUser) : initialUser;
  });
  useEffect(() => {
    localStorage.setItem('adiwiyataUser', JSON.stringify(user));
  }, [user]);
  const register = (name: string, className: string) => {
    setUser({
      ...initialUser,
      name,
      className,
      isRegistered: true
    });
  };
  const updateScore = (stageId: number, score: number) => {
    const newScores = [...user.scores];
    newScores[stageId] = score;
    const totalScore = newScores.reduce((sum, score) => sum + score, 0);
    setUser({
      ...user,
      scores: newScores,
      totalScore
    });
  };
  const advanceStage = () => {
    if (user.currentStage < 7) {
      setUser({
        ...user,
        currentStage: user.currentStage + 1
      });
    }
  };
  const resetProgress = () => {
    setUser(initialUser);
  };
  return <UserContext.Provider value={{
    user,
    register,
    updateScore,
    advanceStage,
    resetProgress
  }}>
      {children}
    </UserContext.Provider>;
};
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};