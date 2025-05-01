import { useState } from "react";
import { useUpdateQuestionnaire } from "../../hooks/user/useUpdateQuestionnaire";
import { motion } from "framer-motion";
import { useGetQuestions } from "../../hooks/user/useGetQuestions";
import Loader from "../../ui/Loader";
import { useSubmitQuestionnaire } from "../../hooks/user/useSubmitQuestionnaire";
function StudentQuestionaire() {
  const { updateQuestionnaire, isLoading } = useUpdateQuestionnaire();
  const { questions, isLoading: isGettingQuestions } = useGetQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { submitAnswers, isLoading: isSubmiting } = useSubmitQuestionnaire();
  console.log(questions);
  console.log(answers);
  const [questionnaireStart, setQuestionnaireStart] = useState(false);

  if (isGettingQuestions) return <Loader />;

  return (
    <div className="absolute inset-x-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/80 text-white backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, y: -50 }}
        className="flex w-full max-w-3xl flex-col gap-4 rounded-lg border border-gray-400 bg-gray-800 p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold">Student Questionnaire</h1>
        <p className="text-gray-400">
          Please fill out the questionnaire to help us understand your needs and
          preferences.
        </p>
        {questionnaireStart && (
          <div className="flex flex-col gap-4">
            <h2>{questions[currentQuestion]?.question}</h2>
            <div className="flex flex-col gap-2">
              {questions[currentQuestion]?.answers.map((option, index) => (
                <button
                  key={index}
                  className={`cursor-pointer rounded-md px-4 py-2 transition-all duration-200 ${answers[currentQuestion] === option.text ? "bg-emerald-600" : "bg-gray-700 hover:bg-gray-600"} `}
                  onClick={() => {
                    setAnswers((prev) => {
                      const newAnswers = [...prev];
                      newAnswers[currentQuestion] = option.text;
                      return newAnswers;
                    });
                  }}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between gap-4">
              <button
                className={`rounded-md bg-gray-600 px-4 py-2 transition-all duration-200 hover:bg-gray-700 ${currentQuestion === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1);
                  }
                }}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                className="bg-primary-600 hover:bg-primary-700 cursor-pointer rounded-md px-4 py-2 transition-all duration-200"
                onClick={() => {
                  if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                  }
                  if (currentQuestion === questions.length - 1) {
                    submitAnswers(answers);
                  }
                }}
                disabled={isSubmiting}
              >
                {currentQuestion === questions.length - 1
                  ? "Submit"
                  : answers[currentQuestion]
                    ? "Next"
                    : "Skip"}
              </button>
            </div>
          </div>
        )}
        {!questionnaireStart && (
          <div className="ml-auto flex items-center gap-4">
            <button
              className="cursor-pointer rounded-md bg-gray-600 px-4 py-2 transition-all duration-200 hover:bg-gray-700"
              onClick={updateQuestionnaire}
              disabled={isLoading}
            >
              Skip
            </button>
            <button
              className="bg-primary-600 hover:bg-primary-700 cursor-pointer rounded-md px-4 py-2 transition-all duration-200"
              onClick={() => {
                setQuestionnaireStart(true);
              }}
            >
              Take Questionnaire
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default StudentQuestionaire;
