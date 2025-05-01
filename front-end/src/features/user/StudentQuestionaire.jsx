import { useState } from "react";
import { useUpdateQuestionnaire } from "../../hooks/user/useUpdateQuestionnaire";
import { useGetQuestions } from "../../hooks/user/useGetQuestions";
import { useSubmitQuestionnaire } from "../../hooks/user/useSubmitQuestionnaire";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight, X, Award } from "lucide-react";

function StudentQuestionnaire() {
  const { updateQuestionnaire, isLoading } = useUpdateQuestionnaire();
  const { questions, isLoading: isGettingQuestions } = useGetQuestions();
  const { submitAnswers, isLoading: isSubmitting } = useSubmitQuestionnaire();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questionnaireStart, setQuestionnaireStart] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (isGettingQuestions) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/90 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="font-medium text-white">Loading questions...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    submitAnswers(answers);
    setIsCompleted(true);
  };

  const progress = (currentQuestion / (questions?.length - 1)) * 100;

  const questionVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 300 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 text-white backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"
      >
        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-6 p-10 text-center"
          >
            <div className="rounded-full bg-green-500/20 p-4">
              <Award size={48} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="text-gray-300">
              Your responses have been submitted successfully. We appreciate
              your feedback!
            </p>
            <button
              onClick={() => updateQuestionnaire()}
              className="mt-4 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50"
            >
              Close Questionnaire
            </button>
          </motion.div>
        ) : (
          <>
            <div className="p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
                  Student Questionnaire
                </h1>
                <button
                  onClick={updateQuestionnaire}
                  className="rounded-full p-1.5 transition-colors duration-200 hover:bg-gray-700"
                >
                  <X size={20} className="text-gray-400 hover:text-white" />
                </button>
              </div>

              {!questionnaireStart ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6"
                >
                  <p className="text-gray-300">
                    Please complete this short questionnaire to help us
                    personalize your learning experience. Your feedback is
                    valuable to us.
                  </p>

                  <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-end">
                    <button
                      onClick={updateQuestionnaire}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-gray-600 px-4 py-2.5 font-medium transition-colors duration-200 hover:bg-gray-700 sm:w-auto"
                    >
                      Skip for Now
                    </button>
                    <button
                      onClick={() => setQuestionnaireStart(true)}
                      className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 font-medium shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 sm:w-auto"
                    >
                      Start Questionnaire
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col">
                  <div className="mb-6 flex flex-col gap-1">
                    <div className="mb-1 flex items-center justify-between text-sm text-gray-400">
                      <span>
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
                      <motion.div
                        initial={{
                          width: `${(currentQuestion / (questions.length - 1)) * 100}%`,
                        }}
                        animate={{ width: `${progress}%` }}
                        className="to-primary-600 h-full rounded-full bg-gradient-to-r from-indigo-500"
                      ></motion.div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait" custom={currentQuestion}>
                    <motion.div
                      key={currentQuestion}
                      custom={currentQuestion}
                      variants={questionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mb-6"
                    >
                      <h2 className="mb-6 text-xl font-medium">
                        {questions[currentQuestion]?.question}
                      </h2>

                      <div className="flex flex-col gap-3">
                        {questions[currentQuestion]?.answers.map(
                          (option, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.08,
                              }}
                              className={`group flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-200 ${
                                answers[currentQuestion] === option.text
                                  ? "border-indigo-500 bg-indigo-500/10 text-white"
                                  : "border-gray-700 bg-gray-800/50 text-gray-200 hover:border-gray-600 hover:bg-gray-800"
                              }`}
                              onClick={() => {
                                setAnswers((prev) => {
                                  const newAnswers = [...prev];
                                  newAnswers[currentQuestion] = option.text;
                                  return newAnswers;
                                });
                              }}
                            >
                              <span>{option.text}</span>
                              {answers[currentQuestion] === option.text && (
                                <CheckCircle
                                  size={20}
                                  className="text-indigo-400"
                                />
                              )}
                            </motion.button>
                          ),
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <button
                      className={`flex items-center gap-1 rounded-lg px-4 py-2.5 transition-all duration-200 ${
                        currentQuestion === 0
                          ? "cursor-not-allowed bg-gray-800 text-gray-500"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                      onClick={() => {
                        if (currentQuestion > 0) {
                          setCurrentQuestion(currentQuestion - 1);
                        }
                      }}
                      disabled={currentQuestion === 0}
                    >
                      <ChevronLeft size={18} />
                      <span>Previous</span>
                    </button>

                    <button
                      className={`flex items-center gap-1 rounded-lg px-6 py-2.5 transition-all duration-300 ${
                        answers[currentQuestion]
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                      onClick={() => {
                        if (currentQuestion < questions.length - 1) {
                          setCurrentQuestion(currentQuestion + 1);
                        } else if (currentQuestion === questions.length - 1) {
                          handleSubmit();
                        }
                      }}
                      disabled={isSubmitting}
                    >
                      <span>
                        {currentQuestion === questions.length - 1
                          ? isSubmitting
                            ? "Submitting..."
                            : "Submit"
                          : answers[currentQuestion]
                            ? "Next"
                            : "Skip"}
                      </span>
                      {currentQuestion < questions.length - 1 && (
                        <ChevronRight size={18} />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default StudentQuestionnaire;
