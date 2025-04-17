import { FaArrowLeft } from "react-icons/fa";
import { useGetStage } from "../../hooks/courses/useGetStage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Quiz() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const { stage: { stage } = {}, isLoading } = useGetStage();
  const navigate = useNavigate();
  const {
    description,
    questions,
    number,
    title,
    roadmap: roadmapId,
    questionsCount,
    type,
  } = stage || {};

  const handleOptionClick = (option) => {
    if (option.isCorrect) {
      setScore((curr) => curr + 1);
    }
    setCurrentAnswer(option);
  };
  console.log("quiz", stage);
  return (
    <div className="h-screen">
      <div className="overflow-y-auto px-6 py-6 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/roadmaps/${roadmapId}`)}
            className="bg-footer-900/70 hover:bg-primary-600 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-lg transition-all duration-300"
          >
            <FaArrowLeft />
            <span className="font-bold capitalize">Back to roadmap</span>
          </button>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary-700 rounded-full px-4 py-2 text-sm font-bold text-white capitalize select-none">
              {type}
            </span>
            <h2 className="text-3xl font-semibold capitalize">{title}</h2>
          </div>
          <p className="text-lg text-gray-400/80">{stage.description}</p>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Quiz</h2>
          <div className="bg-footer-900/70 mt-4 rounded-lg p-4">
            {!isQuizStarted && (
              <div className="space-y-6 text-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Quiz Overview</h3>
                  <div className="space-y-2">
                    <p className="text-lg">
                      Time Limit:{" "}
                      <span className="text-primary-500 font-semibold">
                        15 minutes
                      </span>
                    </p>
                    <p className="text-lg">
                      Total Questions:{" "}
                      <span className="text-primary-500 font-semibold">
                        {questionsCount}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      Complete all questions within the time limit to pass the
                      quiz
                    </p>
                  </div>
                </div>
                <button
                  className="bg-primary-700 hover:bg-primary-600 rounded-full px-8 py-3 text-lg font-bold text-white capitalize transition-all duration-300 select-none"
                  onClick={() => {
                    setIsQuizStarted(true);
                    setSelectedQuestion(questions[0]);
                  }}
                >
                  Start Quiz
                </button>
              </div>
            )}
            {isQuizStarted && (
              <div>
                <h3 className="text-center text-3xl font-semibold">
                  {selectedQuestion?.questionText}
                </h3>
                <div className="mt-4 space-y-4">
                  {selectedQuestion?.options.map((option) => (
                    <button
                      disabled={currentAnswer !== null}
                      key={option}
                      className={`bg-footer-800/50 w-full rounded-full p-4 text-left text-lg font-semibold transition-all duration-300 ${
                        currentAnswer === option
                          ? option.isCorrect
                            ? "bg-green-600"
                            : "bg-red-600"
                          : currentAnswer !== null && option.isCorrect
                            ? "bg-green-600"
                            : currentAnswer !== null
                              ? "bg-footer-800/50"
                              : ""
                      }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.answer}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
