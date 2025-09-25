import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { stages, updateLeaderboard } from '../data/gameData';
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from 'lucide-react';
import Quiz from '../components/Quiz';
const GameStage: React.FC = () => {
  const {
    stageId
  } = useParams<{
    stageId: string;
  }>();
  const currentStageId = parseInt(stageId || '0');
  const {
    user,
    updateScore,
    advanceStage
  } = useUser();
  const navigate = useNavigate();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const stage = stages[currentStageId];
  useEffect(() => {
    // Reset state when stage changes
    setQuizCompleted(false);
  }, [currentStageId]);
  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    updateScore(currentStageId, score);
    // Update leaderboard if this is the last stage
    if (currentStageId === stages.length - 1) {
      updateLeaderboard({
        name: user.name,
        className: user.className,
        totalScore: user.totalScore + score
      });
    }
  };
  const handleNextStage = () => {
    if (currentStageId < stages.length - 1) {
      advanceStage();
      navigate(`/stage/${currentStageId + 1}`);
    } else {
      navigate('/leaderboard');
    }
  };
  const handlePreviousStage = () => {
    if (currentStageId > 0) {
      navigate(`/stage/${currentStageId - 1}`);
    } else {
      navigate('/');
    }
  };
  return <div className="min-h-screen bg-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-green-600 h-2.5 rounded-full" style={{
          width: `${(currentStageId + 1) / stages.length * 100}%`
        }}></div>
        </div>
        {/* Stage navigation */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePreviousStage} disabled={currentStageId === 0} className={`flex items-center ${currentStageId === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-green-700 hover:text-green-900'}`}>
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Stage sebelumnya
          </button>
          <span className="text-sm font-medium text-green-800">
            Stage {currentStageId + 1} dari {stages.length}
          </span>
          {quizCompleted ? <button onClick={handleNextStage} className="flex items-center text-green-700 hover:text-green-900">
              {currentStageId < stages.length - 1 ? 'Next Stage' : 'See Leaderboard'}
              <ChevronRightIcon className="w-5 h-5 ml-1" />
            </button> : <div className="w-24"></div>}
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Stage header */}
          <div className="bg-green-600 p-4 md:p-6 text-white">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-3">{stage.icon}</div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">{stage.title}</h1>
                {/* <p className="text-green-100 text-sm">{stage.description}</p> */}
              </div>
            </div>
          </div>
          {/* Stage content */}
          <div className="p-4 md:p-6">
            <div className="prose max-w-none text-gray-700 mb-8">
              {stage.content}
            </div>
            {/* Quiz section - always visible below content */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Kuis: {stage.title}
              </h2>
              {quizCompleted ? <div className="mt-6 text-center">
                  <button onClick={handleNextStage} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
                    {currentStageId < stages.length - 1 ? 'Lanjut ke Stage Berikutnya' : 'Lihat Leaderboard'}
                  </button>
                </div> : <Quiz questions={stage.questions} onComplete={handleQuizComplete} />}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default GameStage;