import React, { useState } from 'react';
import { Question } from '../data/gameData';
import { CheckCircle, XCircle } from 'lucide-react';

// Define the structure for the detailed results
export interface QuizResultDetail {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

// The onComplete handler signature remains the same, but its logic changes
interface QuizProps {
  questions: Question[];
  onComplete: (score: number, results: QuizResultDetail[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  // State to track the user's selected option for each question (Question Index -> Option Index)
  const [userAnswers, setUserAnswers] = useState<Record<number, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  
  // Update the selected option for a specific question
  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    // Disable selection after submission
    if (submitted) return; 

    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);

    let correctCount = 0;
    const results: QuizResultDetail[] = [];

    questions.forEach((question, index) => {
      const selectedOptionIndex = userAnswers[index];
      const isCorrect = selectedOptionIndex === question.correctAnswer;

      if (isCorrect) {
        correctCount++;
      }

      // Record the detailed result
      results.push({
        question: question.text,
        userAnswer: selectedOptionIndex !== null 
          ? question.options[selectedOptionIndex] 
          : 'Tidak dijawab',
        correctAnswer: question.options[question.correctAnswer],
        isCorrect: isCorrect,
      });
    });

    // Calculate score (10 points per correct answer)
    const score = correctCount * 10;
    
    // Pass the final score and all detailed results to the parent
    onComplete(score, results);
  };

  const allAnswered = questions.every((_, index) => userAnswers[index] !== null);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <form onSubmit={(e) => { e.preventDefault(); handleSubmitQuiz(); }} className="space-y-8">
        
        {questions.map((question, qIndex) => {
          const selectedOption = userAnswers[qIndex];
          const isCorrect = submitted ? selectedOption === question.correctAnswer : null;
          
          return (
            <div key={qIndex}>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {qIndex + 1}. {question.text}
              </h3>
              
              <div className="space-y-2">
                {question.options.map((option, oIndex) => {
                  
                  // Determine the button's style based on state
                  let className = 'w-full text-left p-3 rounded-lg border transition-colors';

                  if (submitted) {
                    if (oIndex === question.correctAnswer) {
                      // Always highlight the correct answer
                      className += ' bg-green-100 border-green-500 font-medium text-green-800';
                    } else if (selectedOption === oIndex) {
                      // Highlight the user's incorrect choice
                      className += ' bg-red-100 border-red-500 font-medium text-red-800';
                    } else {
                      className += ' border-gray-200';
                    }
                  } else {
                    // Pre-submission styles
                    if (selectedOption === oIndex) {
                      className += ' bg-blue-50 border-blue-500';
                    } else {
                      className += ' border-gray-200 hover:bg-gray-50';
                    }
                  }

                  return (
                    <button
                      key={oIndex}
                      type="button"
                      onClick={() => handleOptionSelect(qIndex, oIndex)}
                      className={className}
                      disabled={submitted}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${selectedOption === oIndex && !submitted ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                          {String.fromCharCode(65 + oIndex)}
                        </div>
                        <span>{option}</span>
                      </div>
                      
                      {/* Show Check/X icon after submission */}
                      {submitted && selectedOption === oIndex && (
                        isCorrect ? <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                                  : <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
              
              {/* Show immediate feedback after submission */}
              {submitted && (
                <div className={`mt-3 p-2 rounded-md font-medium text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {isCorrect ? 'BENAR' : `SALAH. Jawaban benar: ${question.options[question.correctAnswer]}`}
                </div>
              )}
            </div>
          );
        })}

        {/* Submit Button (Only visible before submission) */}
        {!submitted && (
          <button 
            type="submit" 
            disabled={!allAnswered} 
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              allAnswered 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Jawaban
            {/* Submit Kuis ({questions.length} Pertanyaan) */}
          </button>
        )}
      </form>
    </div>
  );
};

export default Quiz;