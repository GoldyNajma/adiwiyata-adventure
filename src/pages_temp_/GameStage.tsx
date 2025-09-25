// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useUser } from '../context/UserContext';
// import { stages, updateLeaderboard } from '../data/gameData';
// import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from 'lucide-react';
// import Quiz from '../components/Quiz';
// const GameStage: React.FC = () => {
//   const {
//     stageId
//   } = useParams<{
//     stageId: string;
//   }>();
//   const currentStageId = parseInt(stageId || '0');
//   const {
//     user,
//     updateScore,
//     advanceStage
//   } = useUser();
//   const navigate = useNavigate();
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const stage = stages[currentStageId];
//   useEffect(() => {
//     // Reset state when stage changes
//     setQuizCompleted(false);
//   }, [currentStageId]);
//   const handleQuizComplete = (score: number) => {
//     setQuizCompleted(true);
//     updateScore(currentStageId, score);
//     // Update leaderboard if this is the last stage
//     if (currentStageId === stages.length - 1) {
//       updateLeaderboard({
//         name: user.name,
//         className: user.className,
//         totalScore: user.totalScore + score
//       });
//     }
//   };
//   const handleNextStage = () => {
//     if (currentStageId < stages.length - 1) {
//       advanceStage();
//       navigate(`/stage/${currentStageId + 1}`);
//     } else {
//       navigate('/leaderboard');
//     }
//   };
//   const handlePreviousStage = () => {
//     if (currentStageId > 0) {
//       navigate(`/stage/${currentStageId - 1}`);
//     } else {
//       navigate('/');
//     }
//   };
//   return <div className="min-h-screen bg-green-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <button onClick={() => navigate('/')} className="flex items-center text-green-700 hover:text-green-900">
//             <HomeIcon className="w-5 h-5 mr-1" />
//             <span>Halaman Awal</span>
//           </button>
//           <div className="text-sm text-green-700">
//             <span className="font-semibold">{user.name}</span> | Kelas:{' '}
//             {user.className}
//           </div>
//         </div>
//         {/* Progress bar */}
//         <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
//           <div className="bg-green-600 h-2.5 rounded-full" style={{
//           width: `${(currentStageId + 1) / stages.length * 100}%`
//         }}></div>
//         </div>
//         {/* Stage navigation */}
//         <div className="flex justify-between items-center mb-4">
//           <button onClick={handlePreviousStage} disabled={currentStageId === 0} className={`flex items-center ${currentStageId === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-green-700 hover:text-green-900'}`}>
//             <ChevronLeftIcon className="w-5 h-5 mr-1" />
//             Stage sebelumnya
//           </button>
//           <span className="text-sm font-medium text-green-800">
//             Stage {currentStageId + 1} dari {stages.length}
//           </span>
//           {quizCompleted ? <button onClick={handleNextStage} className="flex items-center text-green-700 hover:text-green-900">
//               {currentStageId < stages.length - 1 ? 'Next Stage' : 'See Leaderboard'}
//               <ChevronRightIcon className="w-5 h-5 ml-1" />
//             </button> : <div className="w-24"></div>}
//         </div>
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Stage header */}
//           <div className="bg-green-600 p-4 md:p-6 text-white">
//             <div className="flex items-center">
//               <div className="bg-white rounded-full p-2 mr-3">{stage.icon}</div>
//               <div>
//                 <h1 className="text-xl md:text-2xl font-bold">{stage.title}</h1>
//                 {/* <p className="text-green-100 text-sm">{stage.description}</p> */}
//               </div>
//             </div>
//           </div>
//           {/* Stage content */}
//           <div className="p-4 md:p-6">
//             <div className="prose max-w-none text-gray-700 mb-8">
//               {stage.content}
//             </div>
//             {/* Quiz section - always visible below content */}
//             <div className="mt-8 pt-8 border-t border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Kuis: {stage.title}
//               </h2>
//               {quizCompleted ? <div className="mt-6 text-center">
//                   <button onClick={handleNextStage} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
//                     {currentStageId < stages.length - 1 ? 'Lanjut ke Stage Berikutnya' : 'Lihat Leaderboard'}
//                   </button>
//                 </div> : <Quiz questions={stage.questions} onComplete={handleQuizComplete} />}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>;
// };
// export default GameStage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { stages, updateLeaderboard } from '../data/gameData';
import { ChevronLeft, ChevronRight, Home, CheckCircle, Circle, Star, Target, Zap } from 'lucide-react';

const GameStage = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
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
      // setCurrentStage(currentStage + 1)
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

  const totalStages = stages.length;
  
  const handleAnswerSelect = (answerIndex: React.SetStateAction<number | null>) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
    if (selectedAnswer === stage.questions[currentQuestion].correctAnswer) {
      setScore(score + 10);
    }
    
    setTimeout(() => {
      if (currentQuestion < stage.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const getAnswerStyle = (index: number | null) => {
    if (!showResult) {
      return selectedAnswer === index 
        ? 'bg-blue-100 border-blue-500 border-2' 
        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50';
    }
    
    if (index === stage.questions[currentQuestion].correctAnswer) {
      return 'bg-green-100 border-green-500 border-2';
    }
    
    if (selectedAnswer === index && selectedAnswer !== stage.questions[currentQuestion].correctAnswer) {
      return 'bg-red-100 border-red-500 border-2';
    }
    
    return 'bg-gray-100 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center text-green-700 hover:text-green-900 transition-colors group">
            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            <span>Halaman Awal</span>
          </button>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
              {user.name.charAt(0)}
            </div>
            <span className="font-semibold text-green-700">{user.name}</span>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-blue-600">Kelas: {user.className}</span>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Progress Petualangan</h3>
            <span className="text-sm text-green-600 font-medium">
              Stage {currentStage + 1} dari {totalStages}
            </span>
          </div>
          
          {/* Visual progress with stages */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${((currentStage + 1) / totalStages) * 100}%` }}
              ></div>
            </div>
            
            {/* Stage markers */}
            <div className="flex justify-between mt-2">
              {[...Array(totalStages)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${
                    i <= currentStage ? 'bg-green-500' : 'bg-gray-300'
                  } mb-1`}></div>
                  <span className="text-xs text-gray-500">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button 
            disabled={currentStage === 0}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
              currentStage === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-green-700 hover:text-green-900 hover:bg-green-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Stage Sebelumnya
          </button>
          
          {quizCompleted && (
            <button 
              onClick={handleNextStage}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
              {currentStage < totalStages - 1 ? (
                <>
                  Stage Selanjutnya
                  <ChevronRight className="w-5 h-5 ml-1" />
                </>
              ) : (
                <>
                  Lihat Leaderboard
                  <Star className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Stage Header */}
          <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                {stage.icon}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{stage.title}</h1>
                <p className="text-blue-100 mt-1">Mari pelajari tentang konsep dasar Adiwiyata!</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <Zap className="absolute top-4 right-8 w-6 h-6 text-yellow-300 opacity-50" />
            <Star className="absolute bottom-4 right-12 w-4 h-4 text-yellow-200 opacity-30" />
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-8 border-l-4 border-green-500">
              <h2 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                <Circle className="w-5 h-5 mr-2 text-green-500" />
                Apa sih Adiwiyata itu?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {stage.content}
              </p>
            </div>

            {/* Quiz Section */}
            <div className="border-t-2 border-dashed border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-blue-500" />
                  Kuis: {stage.title}
                </h2>
                <div className="bg-blue-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-blue-800">
                    Pertanyaan {currentQuestion + 1} dari {stage.questions.length}
                  </span>
                </div>
              </div>

              {!quizCompleted ? (
                <div className="bg-gray-50 rounded-xl p-6">
                  {/* Question */}
                  <div className="mb-6">
                    <p className="text-lg font-medium text-gray-800 mb-1">
                      {stage.questions[currentQuestion].text}
                    </p>
                    <div className="text-sm text-gray-500">Pilih jawaban yang paling tepat!</div>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-3 mb-6">
                    {stage.questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-300 ${getAnswerStyle(index)}`}
                      >
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 font-bold ${
                            selectedAnswer === index ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="font-medium">{option}</span>
                          {showResult && index === stage.questions[currentQuestion].correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Submit Button */}
                  {showResult ? (
                    <div className="text-center py-4">
                      {selectedAnswer === stage.questions[currentQuestion].correctAnswer ? (
                        <div className="text-green-600 font-bold text-lg">
                          🎉 Jawaban Benar! +10 poin
                        </div>
                      ) : (
                        <div className="text-red-600 font-bold text-lg">
                          😅 Jawaban kurang tepat. Coba lagi ya!
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                          selectedAnswer !== null
                            ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {selectedAnswer !== null ? 'Submit Jawaban' : 'Pilih jawaban dulu ya!'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Kuis Selesai!</h3>
                  <p className="text-gray-600 mb-4">Skor kamu: {score} poin</p>
                  <button 
                    onClick={handleNextStage}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    {currentStage < totalStages - 1 ? 'Lanjut ke Stage Berikutnya' : 'Lihat Leaderboard'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStage;