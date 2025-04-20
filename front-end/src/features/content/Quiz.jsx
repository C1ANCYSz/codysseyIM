import { FaArrowLeft } from "react-icons/fa";
import { useGetStage } from "../../hooks/courses/useGetStage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PiCheckCircleFill, PiPlusBold, PiXCircleFill } from "react-icons/pi";
import { useUpdateStage } from "../../hooks/user/useUpdateStage";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import { useUpdateStageContent } from "../../hooks/courses/useUpdateStageContent";
const Quiz = () => {
  const [quizState, setQuizState] = useState({
    selectedQuestion: null,
    score: 0,
    isCompleted: false,
    isStarted: false,
    isLastQuestion: false,
    currentAnswer: null,
  });
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const [newQuestions, setNewQuestions] = useState([]);
  const { stage: { stage } = {}, isLoading } = useGetStage();
  const navigate = useNavigate();
  const { updateStage, isLoading: isUpdating } = useUpdateStage();
  const { updateStageContent, isLoading: isUpdatingContent } =
    useUpdateStageContent();
  const {
    description,
    questions,
    number,
    title,
    roadmap: roadmapId,
    questionsCount,
    type,
  } = stage ?? {};

  const handleOptionClick = (option) => {
    if (quizState.currentAnswer !== null) return;

    setQuizState((prev) => ({
      ...prev,
      currentAnswer: option,
      score: option.isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentAnswer === null) return;

    const nextQuestionIndex = questions.indexOf(quizState.selectedQuestion) + 1;
    const isLastQuestion = nextQuestionIndex === questions.length - 1;

    if (nextQuestionIndex === questions.length) {
      setQuizState((prev) => ({
        ...prev,
        isCompleted: true,
      }));
      return;
    }

    setQuizState((prev) => ({
      ...prev,
      selectedQuestion: questions[nextQuestionIndex],
      currentAnswer: null,
      isLastQuestion,
    }));
  };

  const handleRetakeQuiz = () => {
    setQuizState({
      selectedQuestion: null,
      score: 0,
      isCompleted: false,
      isStarted: false,
      isLastQuestion: false,
      currentAnswer: null,
    });
  };

  const handleAddQuestion = () => {
    setNewQuestions((current) => [...current, { question: "", options: [] }]);
  };

  const handleNextStage = () => {
    updateStage();
  };

  const startQuiz = () => {
    setQuizState((prev) => ({
      ...prev,
      isStarted: true,
      selectedQuestion: questions[0],
    }));
  };

  const onSubmit = (data) => {
    const newQuestions = {
      questions: data.questions.map((question) => ({
        questionText: question.questionText,
        options: question.options.map((option, index) => ({
          answer: option.answer,
          isCorrect: index === Number(question.correctOption),
        })),
      })),
    };
    newQuestions.questionsCount = newQuestions.questions.length;
    updateStageContent({ stageId: stage._id, data: newQuestions });
  };

  const isPassed = quizState.score / questionsCount >= 0.7;

  if (isLoading || isUpdating) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="border-primary-500 h-16 w-16 animate-spin rounded-full border-t-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <nav className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/roadmaps/${roadmapId}`)}
            className="group flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Roadmap</span>
          </button>
        </nav>

        <header className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 rounded-full bg-white/5 p-2 backdrop-blur-sm">
            <span className="bg-primary-600/80 rounded-full px-4 py-2 text-sm font-medium text-white">
              {type}
            </span>
            <h1 className="pr-4 text-2xl font-bold text-white">{title}</h1>
          </div>
          <p className="mt-6 text-lg text-gray-400">{stage?.description}</p>
        </header>

        {user.role === "content manager" && (
          <main className="mx-auto mt-12 max-w-4xl">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Add Questions</h2>
              <button
                className="bg-primary-600 hover:bg-primary-500 hover:shadow-primary-600/50 rounded-full p-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={handleAddQuestion}
              >
                <PiPlusBold className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="space-y-6">
                {newQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-700/30 bg-gray-800/50 p-6 shadow-lg backdrop-blur-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <label
                          htmlFor={`question-${index}`}
                          className="flex items-center gap-1 text-sm font-medium text-gray-300"
                        >
                          Question <span>{index + 1}</span>
                        </label>
                        <input
                          {...register(`questions.${index}.questionText`)}
                          type="text"
                          id={`question-${index}`}
                          className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-600/50 bg-gray-700/50 p-3 text-white placeholder-gray-400 transition-all duration-200 focus:ring-1"
                          placeholder="Enter your question..."
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((optionNum) => (
                          <div
                            key={optionNum}
                            className="flex items-center gap-3 rounded-lg bg-gray-700/30 p-3"
                          >
                            <input
                              {...register(
                                `questions.${index}.options.${optionNum - 1}.answer`,
                              )}
                              type="text"
                              placeholder={`Option ${optionNum}`}
                              className="flex-1 border-0 bg-transparent text-white placeholder-gray-400 focus:ring-0"
                            />
                            <div className="relative flex items-center">
                              <input
                                type="radio"
                                {...register(
                                  `questions.${index}.correctOption`,
                                )}
                                value={optionNum - 1}
                                className="text-primary-600 focus:ring-primary-500 h-5 w-5 border-gray-600 bg-gray-700"
                              />
                              <span className="ml-2 text-sm text-gray-400">
                                Correct
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {newQuestions.length > 0 && (
                <button
                  type="submit"
                  disabled={isUpdatingContent}
                  className="bg-primary-600 hover:bg-primary-500 hover:shadow-primary-600/30 mt-6 w-full rounded-lg px-6 py-3 font-bold text-white transition-all duration-300 hover:shadow-lg"
                >
                  Save Questions
                </button>
              )}
            </form>
          </main>
        )}

        {user.role === "student" && (
          <main className="mx-auto mt-12 max-w-4xl">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Quiz</h2>
              {quizState.isStarted && !quizState.isCompleted && (
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <span className="text-primary-500 text-2xl font-bold">
                    {questions.indexOf(quizState.selectedQuestion) + 1}
                  </span>
                  <span className="text-xl text-gray-400">
                    / {questionsCount}
                  </span>
                </div>
              )}
            </div>

            <section className="mt-8 rounded-2xl bg-white/5 p-8 backdrop-blur-md">
              {!quizState.isStarted && (
                <div className="space-y-8 text-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white">
                      Quiz Overview
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-center gap-8">
                        <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                          <p className="text-sm text-gray-400">Time Limit</p>
                          <p className="text-primary-500 text-2xl font-bold">
                            15 minutes
                          </p>
                        </div>
                        <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                          <p className="text-sm text-gray-400">Questions</p>
                          <p className="text-primary-500 text-2xl font-bold">
                            {questionsCount}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-400">
                        Complete all questions within the time limit. You need
                        70% to pass.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="bg-primary-600 hover:bg-primary-500 focus:ring-primary-500 transform rounded-full px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
                  >
                    Start Quiz
                  </button>
                </div>
              )}

              {quizState.isStarted && !quizState.isCompleted && (
                <div className="space-y-8">
                  <h3 className="text-center text-2xl font-bold text-white">
                    {quizState.selectedQuestion?.questionText}
                  </h3>
                  <div className="space-y-4">
                    {quizState.selectedQuestion?.options.map((option) => (
                      <button
                        disabled={quizState.currentAnswer !== null}
                        key={option.answer}
                        className={`group relative w-full overflow-hidden rounded-xl p-6 text-left text-lg font-medium transition-all duration-300 ${
                          quizState.currentAnswer === option
                            ? option.isCorrect
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                            : quizState.currentAnswer !== null &&
                                option.isCorrect
                              ? "bg-green-500/20 text-green-400"
                              : "bg-white/5 text-white hover:bg-white/10"
                        }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        <div className="relative z-10">{option.answer}</div>
                        <div
                          className={`absolute inset-0 transform transition-transform duration-300 ${
                            quizState.currentAnswer === null
                              ? "group-hover:scale-105"
                              : ""
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={quizState.currentAnswer === null}
                    className={`ml-auto block transform rounded-full px-10 py-4 text-lg font-bold transition-all ${
                      quizState.currentAnswer === null
                        ? "cursor-not-allowed bg-gray-600 text-gray-400"
                        : "bg-primary-600 hover:bg-primary-500 text-white hover:scale-105"
                    }`}
                    onClick={handleNextQuestion}
                  >
                    {quizState.isLastQuestion ? "Finish" : "Next Question"}
                  </button>
                </div>
              )}

              {quizState.isCompleted && (
                <div className="space-y-8 text-center">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white">
                      Quiz Completed
                    </h3>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3">
                      <span className="text-primary-500 text-2xl font-bold">
                        {quizState.score}
                      </span>
                      <span className="text-gray-400">/ {questionsCount}</span>
                      <span className="text-lg text-gray-400">
                        ({Math.round((quizState.score / questionsCount) * 100)}
                        %)
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col items-center gap-4 ${
                      isPassed ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isPassed ? (
                      <PiCheckCircleFill className="text-6xl" />
                    ) : (
                      <PiXCircleFill className="text-6xl" />
                    )}
                    <p className="text-3xl font-bold">
                      {isPassed ? "Passed!" : "Failed"}
                    </p>
                  </div>

                  {isPassed ? (
                    <button
                      onClick={handleNextStage}
                      className="bg-primary-600 hover:bg-primary-500 transform rounded-full px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105"
                    >
                      Continue to Next Stage
                    </button>
                  ) : (
                    <button
                      onClick={handleRetakeQuiz}
                      className="transform rounded-full bg-red-600 px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-red-500"
                    >
                      Retake Quiz
                    </button>
                  )}
                </div>
              )}
            </section>
          </main>
        )}
      </div>
    </div>
  );
};

export default Quiz;
