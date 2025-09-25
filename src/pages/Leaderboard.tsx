import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
// import { getLeaderboard } from '../data/gameData'; // REMOVED
import { TrophyIcon, HomeIcon, RefreshCwIcon } from 'lucide-react';
import { db } from '../firebase'; // NEW: Import db from your Firebase config
import { collection, getDocs } from 'firebase/firestore';

interface LeaderboardEntry {
  name: string;
  className: string;
  totalScore: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true); // NEW: Loading state
  const {
    user,
    resetProgress
  } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLeaderboardLoading(true);
        const usersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollectionRef);

        const fetchedLeaderboard: LeaderboardEntry[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Only include registered users who have completed at least one stage (totalScore > 0)
          if (data.isRegistered && data.totalScore > 0) {
            fetchedLeaderboard.push({
              name: data.name,
              className: data.className,
              totalScore: data.totalScore
            });
          }
        });

        // Sort the leaderboard in memory by totalScore, descending
        fetchedLeaderboard.sort((a, b) => b.totalScore - a.totalScore);
        
        setLeaderboard(fetchedLeaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLeaderboardLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);

  const getUserRank = () => {
    const userIndex = leaderboard.findIndex(entry => entry.name === user.name && entry.className === user.className);
    return userIndex >= 0 ? userIndex + 1 : '-';
  };
  
  const handlePlayAgain = () => {
    resetProgress();
    navigate('/register');
  };

  return <div className="min-h-screen bg-green-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate('/')} className="flex items-center text-green-700 hover:text-green-900">
            <HomeIcon className="w-5 h-5 mr-1" />
            <span>Halaman Awal</span>
          </button>
          <div className="text-sm text-green-700">
            <span className="font-semibold">{user.name}</span> | Kelas:{' '}
            {user.className}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Leaderboard header */}
          <div className="bg-green-600 p-6 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-3">
                <TrophyIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold">Para Juara Adiwiyata</h1>
            <p className="text-green-100">
              Lihat peringkatmu dibandingkan dengan siswa lain
            </p>
          </div>
          {/* User score summary */}
          <div className="bg-green-50 border-b border-green-100 p-4">
            <div className="max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                Hasilmu
              </h2>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Skor Total</p>
                    <p className="text-2xl font-bold text-green-700">
                      {user.totalScore}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Peringkat</p>
                    <p className="text-2xl font-bold text-green-700">
                      {getUserRank()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Stage Selesai</p>
                    <p className="text-2xl font-bold text-green-700">7/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Leaderboard content */}
          <div className="p-4 md:p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Leaderboard
            </h2>
            {isLeaderboardLoading ? (
              <div className="text-center py-6 text-gray-500 flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memuat...
              </div>
            ) : leaderboard.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        Peringkat
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        Nama
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        Kelas
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        Skor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => {
                      const isCurrentUser = entry.name === user.name && entry.className === user.className;
                      return <tr key={index} className={`border-t border-gray-200 ${isCurrentUser ? 'bg-green-50' : ''}`}>
                          <td className="px-4 py-3">
                            {index === 0 && <span className="text-yellow-500 font-bold">
                                🥇
                              </span>}
                            {index === 1 && <span className="text-gray-400 font-bold">
                                🥈
                              </span>}
                            {index === 2 && <span className="text-amber-700 font-bold">
                                🥉
                              </span>}
                            {index > 2 && <span className="font-medium">{index + 1}</span>}
                          </td>
                          <td className={`px-4 py-3 ${isCurrentUser ? 'font-semibold' : ''}`}>
                            {entry.name}
                            {isCurrentUser && <span className="ml-2 text-green-600 text-xs">
                                (Kamu)
                              </span>}
                          </td>
                          <td className="px-4 py-3">{entry.className}</td>
                          <td className="px-4 py-3 font-medium">
                            {entry.totalScore}
                          </td>
                        </tr>;
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Belum ada juara. Jadilah yang pertama menyelesaikan semua tahapan!
              </div>
            )}
            <div className="mt-8 flex justify-center">
              <button onClick={handlePlayAgain} className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Jelajahi Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default Leaderboard;