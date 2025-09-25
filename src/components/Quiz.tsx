import React, { useState } from 'react';
import { Question } from '../data/gameData';
interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}
const Quiz: React.FC<QuizProps> = ({
  questions,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedOption(optionIndex);
  };
  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const isAnswerCorrect = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    if (isAnswerCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    // Wait 1.5 seconds before moving to next question
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        // Quiz completed
        setQuizCompleted(true);
        // Calculate score based on correct answers (10 points per correct answer)
        const score = correctAnswers * 10;
        onComplete(score);
      }
    }, 1500);
  };
  const calculateScore = () => {
    return Math.round(correctAnswers / questions.length * 100);
  };
  if (quizCompleted) {
    return <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="font-semibold text-green-800 text-xl mb-3">
          Kuis Selesai!
        </h3>
        <p className="text-gray-700 mb-4">
          Kamu mendapatkan {correctAnswers} dari {questions.length} pertanyaan terjawab benar.
        </p>
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-green-600 h-4 rounded-full" style={{
            width: `${calculateScore()}%`
          }}></div>
          </div>
          <p className="mt-2 font-medium">Your Score: {calculateScore()}%</p>
        </div>
      </div>;
  }
  return <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>
          Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
        </span>
        <span>Jawaban Benar: {correctAnswers}</span>
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        {currentQuestion.text}
      </h3>
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => <button key={index} onClick={() => handleOptionSelect(index)} className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedOption === index ? showFeedback ? isCorrect ? 'bg-green-100 border-green-500' : index === currentQuestion.correctAnswer ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500' : 'bg-blue-50 border-blue-500' : 'border-gray-200 hover:bg-gray-50'}`} disabled={showFeedback}>
            <div className="flex items-center">
              <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${selectedOption === index ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </button>)}
      </div>
      {showFeedback ? <div className={`p-3 rounded-md mb-4 ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {isCorrect ? 'Jawaban benar!' : `Salah. Jawaban yang benar adalah: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
        </div> : <button onClick={handleSubmitAnswer} disabled={selectedOption === null} className={`w-full py-3 rounded-lg font-medium ${selectedOption !== null ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
          Submit Jawaban
        </button>}
    </div>;
};
export default Quiz;