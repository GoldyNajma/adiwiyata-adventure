import React, { useEffect, useState, createContext, useContext } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { v4 as uuid4 } from 'uuid';

interface User {
  id: string; // This will now be a locally generated unique ID
  name: string;
  className: string;
  currentStage: number;
  scores: number[];
  totalScore: number;
  isRegistered: boolean;
  isCompleted: boolean; // NEW: Track if all stages are completed
}

interface UserContextType {
  user: User;
  register: (name: string, className: string) => void;
  updateScore: (stageId: number, score: number) => void;
  advanceStage: () => Promise<void>;
  resetProgress: () => void;
  isSaving: boolean;
  isAllStagesCompleted: boolean; // NEW: Expose completion status
}

const TOTAL_STAGES = 7; // Define total number of stages (0-6)

const initialUser: User = {
  id: '',
  name: '',
  className: '',
  currentStage: 0,
  scores: [0, 0, 0, 0, 0, 0, 0], // Assuming 7 stages
  totalScore: 0,
  isRegistered: false,
  isCompleted: false
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Helper function to check if all stages are completed
  // With 0-based indexing (stages 0-6), completion happens when currentStage reaches 7
  const checkAllStagesCompleted = (currentStage: number): boolean => {
    return currentStage >= TOTAL_STAGES; // currentStage 7 means completed all 7 stages (0-6)
  };

  const saveUserToFirestore = async (userToSave: User) => {
    if (!userToSave.id) {
      console.error('Cannot save user data: ID is missing.');
      return;
    }
    const userRef = doc(db, 'users', userToSave.id);
    try {
      setIsSaving(true);
      const dataToSave = {
        name: userToSave.name,
        className: userToSave.className,
        currentStage: userToSave.currentStage,
        scores: userToSave.scores,
        totalScore: userToSave.totalScore,
        isRegistered: userToSave.isRegistered,
        isCompleted: userToSave.isCompleted,
        lastUpdated: new Date(),
      };
      await setDoc(userRef, dataToSave, { merge: true });
      console.log('User data saved to Firestore successfully.');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      let userId = localStorage.getItem('adiwiyataUserId');
      if (!userId) {
        userId = uuid4();
        localStorage.setItem('adiwiyataUserId', userId);
      }

      const userRef = doc(db, 'users', userId);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const firestoreData = docSnap.data() as Omit<User, 'id'>;
          setUser({
            ...initialUser,
            ...firestoreData,
            id: userId
          });
        } else {
          // Just set the user with ID, don't save to Firestore yet
          const newUser = { ...initialUser, id: userId };
          setUser(newUser);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to local user if Firestore fails
        const newUser = { ...initialUser, id: userId };
        setUser(newUser);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const register = (name: string, className: string) => {
    if (!user.id) return;
    const newUser: User = { ...user, name, className, isRegistered: true };
    setUser(newUser);
    // Don't save to Firestore here - only save locally
    console.log('User registered locally. Will save to Firestore upon completion.');
  };
  
  const updateScore = (stageId: number, score: number) => {
    setUser(prevUser => {
      const newScores = [...prevUser.scores];
      newScores[stageId] = score;
      const totalScore = newScores.reduce((sum, score) => sum + score, 0);
      const updatedUser = {
        ...prevUser,
        scores: newScores,
        totalScore
      };
      // Don't save to Firestore here - only update locally
      return updatedUser;
    });
  };

  const advanceStage = async () => {
    const prevUser = user;
    // Check if already BEYOND the final stage (stage 7+ in 0-based indexing means already completed)
    if (prevUser.currentStage >= TOTAL_STAGES) {
      console.warn('All stages already completed.');
      return;
    }
    
    const newStage = prevUser.currentStage + 1;
    const isNowCompleted = checkAllStagesCompleted(newStage);
    
    const updatedUser = {
      ...prevUser,
      currentStage: newStage,
      isCompleted: isNowCompleted
    };
    
    setUser(updatedUser);
    
    // Only save to Firestore if all stages are now completed
    // This happens when newStage becomes 7 (meaning completed stage 6)
    if (isNowCompleted) {
      console.log('All stages completed! Saving to Firestore...');
      await saveUserToFirestore(updatedUser);
    } else {
      console.log(`Advanced to stage ${newStage}. Progress saved locally.`);
    }
  };

  const resetProgress = () => {
    const resetUser = { ...initialUser, id: user.id }; // Keep the same ID
    setUser(resetUser);
    localStorage.removeItem('adiwiyataUserId');
    // Don't save to Firestore when resetting - user starts fresh
    console.log('Progress reset. Starting fresh locally.');
  };

  const isAllStagesCompleted = checkAllStagesCompleted(user.currentStage);

  if (loading) {
      return <div>Loading user progress...</div>;
  }

  return <UserContext.Provider value={{ 
    user, 
    register, 
    updateScore, 
    advanceStage, 
    resetProgress, 
    isSaving,
    isAllStagesCompleted 
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