import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getLeaderboard } from '../data/gameData';
import { Trophy, Medal, Crown, Sparkles, RefreshCw, Home, Star } from 'lucide-react';
interface LeaderboardEntry {
  name: string;
  className: string;
  totalScore: number;
}
const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const {
    user,
    resetProgress
  } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);
  const getUserRank = () => {
    const userIndex = leaderboard.findIndex(entry => entry.name === user.name && entry.className === user.className);
    return userIndex >= 0 ? userIndex + 1 : '-';
  };
  const handlePlayAgain = () => {
    resetProgress();
    navigate('/register');
  };
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="w-8 h-8 text-yellow-400" />;
      case 1: return <Medal className="w-7 h-7 text-gray-400" />;
      case 2: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <div className="w-8 h-8 flex items-center justify-center font-bold text-lg text-gray-600">{index + 1}</div>;
    }
  };
  const getScoreColor = (score: number) => {
    if (score >= 35) return 'text-green-600';
    if (score >= 25) return 'text-blue-600';
    if (score >= 15) return 'text-orange-600';
    return 'text-gray-600';
  };
  const getProgressWidth = (score: number) => {
    const maxScore = Math.max(...leaderboard.map(entry => entry.totalScore), 40);
    return Math.max((score / maxScore) * 100, 5);
  };
  const userRank = getUserRank();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center text-green-700 hover:text-green-900 transition-colors">
            <Home className="w-5 h-5 mr-1" />
            <span>Halaman Awal</span>
          </button>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border">
            <span className="font-semibold text-green-700">{user.name}</span>
            <span className="text-gray-500 mx-2">|</span>
            <span className="text-green-600">Kelas: {user.className}</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-bounce">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">🏆 Hall of Fame Adiwiyata</h1>
              <p className="text-orange-100">Para pejuang lingkungan terbaik sekolah kita!</p>
              
              {/* Sparkle effects */}
              <Sparkles className="absolute top-4 left-8 w-6 h-6 text-yellow-300 animate-pulse" />
              <Sparkles className="absolute top-12 right-12 w-4 h-4 text-yellow-200 animate-pulse delay-1000" />
              <Sparkles className="absolute bottom-8 left-12 w-5 h-5 text-yellow-100 animate-pulse delay-500" />
            </div>
          </div>

          {/* User Achievement Card */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-green-200">
                <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-500" />
                  Pencapaianmu
                </h2>
                
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className={`text-3xl font-bold ${getScoreColor(user.totalScore)} mb-1`}>
                      {user.totalScore}
                    </div>
                    <div className="text-sm text-gray-600">Poin Total</div>
                    {/* Score progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${getProgressWidth(user.totalScore)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">#{userRank}</div>
                    <div className="text-sm text-gray-600">Peringkat</div>
                    <div className="text-xs text-blue-600 mt-1">
                      {typeof userRank === 'number' ? userRank <= 3 ? 'Juara!' : 'Keep going!' : ''}
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-600 mb-1">7/7</div>
                    <div className="text-sm text-gray-600">Misi Selesai</div>
                    <div className="text-xs text-purple-600 mt-1">Complete!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="p-8 bg-gradient-to-b from-white to-gray-50">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">🏆 Podium Juara</h2>
            
            <div className="flex justify-center items-end space-x-4 mb-8">
              {leaderboard.slice(0, 3).map((_entry, index) => {
                const heights = ['h-24', 'h-32', 'h-20'];
                const bgColors = ['bg-gray-300', 'bg-yellow-400', 'bg-amber-600'];
                const positions = [2, 1, 3];
                const actualIndex = [1, 0, 2][index]; // Reorder for podium display
                
                if (actualIndex >= leaderboard.length) return null;
                
                const winner = leaderboard[actualIndex];
                const isCurrentUser = winner.name === user.name && winner.className === user.className;
                
                return (
                  <div key={actualIndex} className="text-center">
                    <div className={`${bgColors[actualIndex]} ${heights[actualIndex]} w-20 rounded-t-lg flex items-center justify-center text-white font-bold text-xl mb-2 relative`}>
                      {positions[actualIndex]}
                      {actualIndex === 0 && <Crown className="absolute -top-4 w-8 h-8 text-yellow-500" />}
                    </div>
                    <div className={`text-sm font-semibold ${isCurrentUser ? 'text-green-600' : 'text-gray-800'}`}>
                      {winner.name.split(' ')[0]}
                      {isCurrentUser && <div className="text-xs text-green-500">(Kamu!)</div>}
                    </div>
                    <div className="text-xs text-gray-600">{winner.className}</div>
                    <div className={`text-lg font-bold ${getScoreColor(winner.totalScore)} mt-1`}>
                      {winner.totalScore} pts
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full Leaderboard */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b">
                <h3 className="font-semibold text-gray-800">Peringkat Lengkap</h3>
              </div>
              
              <div className="divide-y">
                {leaderboard.map((entry, index) => {
                  const isCurrentUser = entry.name === user.name && entry.className === user.className;
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${
                        isCurrentUser ? 'bg-green-50 border-l-4 border-green-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-center w-12 mr-4">
                        {getRankIcon(index)}
                      </div>
                      
                      <div className="flex-1">
                        <div className={`font-semibold ${isCurrentUser ? 'text-green-800' : 'text-gray-800'}`}>
                          {entry.name}
                          {isCurrentUser && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Kamu</span>}
                        </div>
                        <div className="text-sm text-gray-600">Kelas {entry.className}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getScoreColor(entry.totalScore)}`}>
                          {entry.totalScore}
                        </div>
                        <div className="text-xs text-gray-500">poin</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center mt-8">
              <button onClick={handlePlayAgain} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                <RefreshCw className="w-5 h-5 mr-2 inline" />
                Mainkan Lagi
              </button>
              <p className="text-sm text-gray-600 mt-2">Tingkatkan skormu dan raih juara 1!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;