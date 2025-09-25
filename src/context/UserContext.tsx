import React, { useEffect, useState, createContext, useContext } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface User {
  id: string; // This will now be a locally generated unique ID
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
  advanceStage: () => Promise<void>; // This is now async and returns a Promise
  resetProgress: () => void;
  isSaving: boolean; // NEW: Expose saving state
}

const initialUser: User = {
  id: '',
  name: '',
  className: '',
  currentStage: 0,
  scores: [0, 0, 0, 0, 0, 0, 0], // Assuming 7 stages
  totalScore: 0,
  isRegistered: false
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // NEW: State for saving

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
        userId = crypto.randomUUID();
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
          const newUser = { ...initialUser, id: userId };
          // We don't need to await here, as it's the initial save.
          saveUserToFirestore(newUser);
          setUser(newUser);
        }
      } catch (error) {
        console.error('Error loading or saving user data:', error);
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
    saveUserToFirestore(newUser);
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
      return updatedUser;
    });
  };

  const advanceStage = async () => {
    const prevUser = user;
    if (prevUser.currentStage >= prevUser.scores.length - 1) {
      console.warn('Cannot advance past the final stage.');
      return;
    }
    const updatedUser = {
      ...prevUser,
      currentStage: prevUser.currentStage + 1
    };
    setUser(updatedUser);
    await saveUserToFirestore(updatedUser);
  };

  const resetProgress = () => {
    setUser(initialUser);
    localStorage.removeItem('adiwiyataUserId');
    saveUserToFirestore(initialUser);
  };

  if (loading) {
      return <div>Loading user progress...</div>;
  }

  return <UserContext.Provider value={{ user, register, updateScore, advanceStage, resetProgress, isSaving }}>
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
