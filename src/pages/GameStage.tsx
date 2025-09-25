import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { stages, updateLeaderboard } from '../data/gameData';
import { ChevronRightIcon, HomeIcon, CheckCircle, XCircle } from 'lucide-react';
import Quiz, { QuizResultDetail } from '../components/Quiz';

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
    advanceStage,
    isSaving // NEW: get isSaving state
  } = useUser();
  const navigate = useNavigate();
  const [quizCompleted, setQuizCompleted] = useState(false);
  // NEW STATE: To store the detailed results
  const [quizResults, setQuizResults] = useState<QuizResultDetail[] | null>(null);

  // Get the current stage data
  const stage = stages[currentStageId];
  // Get the score for the current stage from the user context
  const currentStageScore = user.scores[currentStageId] || 0;

  useEffect(() => {
    // Reset state when stage changes
    // Check if the user already has a score for this stage
    if (currentStageScore > 0) {
      setQuizCompleted(true);
      // NOTE: If you want to show past results, you would need to store 
      // the detailed results in the user context/storage as well.
      // For simplicity here, we only show results for the quiz just completed.
      // We keep the old results if they exist, or set to null if re-visiting.
      // For this implementation, we will only show results right after completion.
      // If re-visiting, the result section will show the score, but not the detailed breakdown.
    } else {
      setQuizCompleted(false);
      setQuizResults(null); // Clear results if quiz hasn't been done
    }
  }, [currentStageId, currentStageScore]);

  // MODIFIED HANDLER: Now accepts detailed results
  const handleQuizComplete = (score: number, results: QuizResultDetail[]) => {
    setQuizCompleted(true);
    setQuizResults(results); // Store the detailed results

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

  const handleNextStage = async () => {
    if (currentStageId < stages.length - 1) {
      // await the advanceStage function to ensure Firestore save is complete before navigating
      await advanceStage();
      navigate(`/stage/${currentStageId + 1}`);
    } else {
      navigate('/leaderboard');
    }
  };

  // const handlePreviousStage = () => {
  //   if (currentStageId > 0) {
  //     navigate(`/stage/${currentStageId - 1}`);
  //   } else {
  //     navigate('/');
  //   }
  // };

  // NEW FUNCTION: Render the detailed results
  const renderQuizResults = () => {
    if (!quizResults) return null;

    return (
      <div className="mt-6 border-t pt-4 border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Hasil Jawaban</h3>
        <div className="space-y-4">
          {quizResults.map((result, index) => (
            <div
              key={index}
              className={`text-left p-4 rounded-lg shadow-sm ${result.isCorrect ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'}`}
            >
              <div className="flex items-center mb-2">
                {result.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                )}
                <span className="font-semibold text-gray-800">
                  Pertanyaan {index + 1}: {result.isCorrect ? 'BENAR' : 'SALAH'}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700">
                <b>Pertanyaan:</b> {result.question}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <b>Jawabanmu: </b> 
                {
                  result.userAnswer == result.correctAnswer 
                    ? <span className="font-bold text-green-700">{result.userAnswer}</span> 
                    : <span className="font-bold text-red-700">{result.userAnswer}</span>
                }
              </p>
              {!result.isCorrect && (
                <p className="text-sm text-gray-600 mt-1">
                  <b>Jawaban Benar:</b> <span className="font-bold text-green-700">{result.correctAnswer}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* User Info and Total Score */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate('/')} className="flex items-center text-green-700 hover:text-green-900">
            <HomeIcon className="w-5 h-5 mr-1" />
            <span>Halaman Awal</span>
          </button>
          <div className="text-sm text-green-700 text-right">
            <span className="font-semibold">{user.name}</span> | Kelas:{' '}
            {user.className}
            <div className="font-bold text-base text-green-800">
                Total Skor: {user.totalScore}
            </div>
          </div>
        </div>
        {/* Progress bar and Stage navigation... (omitted for brevity) */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-green-600 h-2.5 rounded-full" style={{
            width: `${(currentStageId + 1) / stages.length * 100}%`
          }}></div>
        </div>

        <div className="flex justify-between items-center mb-4">
          {/* <button onClick={handlePreviousStage} disabled={currentStageId === 0} className={`flex items-center ${currentStageId === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-green-700 hover:text-green-900'}`}>
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Stage sebelumnya
          </button> */}
          <span className="text-sm font-medium text-green-800">
            Stage {currentStageId + 1} dari {stages.length}
          </span>
          {quizCompleted ? (
            <button 
              onClick={handleNextStage} 
              className="flex items-center text-green-700 hover:text-green-900 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? (
                <>Menyimpan...</>
              ) : (
                <>
                  {currentStageId < stages.length - 1 ? 'Lanjut ke Stage Berikutnya' : 'Lihat Leaderboard'}
                  <ChevronRightIcon className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          ) : (
            <div className="w-24"></div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Stage header... (omitted for brevity) */}
          <div className="bg-green-600 p-4 md:p-6 text-white">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-3">{stage.icon}</div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">{stage.title}</h1>
              </div>
            </div>
          </div>

          {/* Stage content */}
          <div className="p-4 md:p-6">
            <div className="prose max-w-none text-gray-700 mb-8">
              {stage.content}
            </div>

            {/* Quiz section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Kuis: {stage.title}
              </h2>

              {quizCompleted ? (
                  <div className="mt-6 text-center">
                      <div className="text-2xl font-bold text-green-700 mb-4">
                          Skormu untuk Stage ini: {currentStageScore}
                      </div>
                      
                      {/* Render the detailed results */}
                      {renderQuizResults()} 

                      <button 
                          onClick={handleNextStage} 
                          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 mt-6"
                          disabled={isSaving}
                      >
                          {isSaving ? 'Menyimpan...' : (currentStageId < stages.length - 1 ? 'Lanjut ke Stage Berikutnya' : 'Lihat Leaderboard')}
                      </button>
                  </div>
              ) : (
                  // This renders the new, all-at-once quiz component
                  <Quiz questions={stage.questions} onComplete={(score, results) => handleQuizComplete(score, results || [])} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStage;