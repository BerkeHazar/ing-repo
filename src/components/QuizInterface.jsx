import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, ArrowRight, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizInterface = ({ questions, onRetry }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleOptionSelect = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        if (index === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 text-center max-w-lg mx-auto"
            >
                <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy size={40} className="text-yellow-600 dark:text-yellow-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Test Tamamlandı!</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Toplam {questions.length} sorudan <span className="font-bold text-primary-600 dark:text-primary-400 text-xl">{score}</span> tanesini doğru bildin.
                </p>

                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-4 mb-8 overflow-hidden">
                    <div
                        className="bg-primary-500 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${(score / questions.length) * 100}%` }}
                    />
                </div>

                <button
                    onClick={onRetry}
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors w-full sm:w-auto"
                >
                    <RefreshCw size={20} className="mr-2" />
                    Tekrar Çöz
                </button>
            </motion.div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex justify-between items-center text-sm font-medium text-slate-500 dark:text-slate-400">
                <span>Soru {currentQuestion + 1} / {questions.length}</span>
                <span>Skor: {score}</span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-8">
                <div
                    className="bg-primary-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
                        {question.text}
                    </h3>

                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ";

                            if (isAnswered) {
                                if (index === question.correctAnswer) {
                                    optionClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                                } else if (index === selectedOption) {
                                    optionClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                                } else {
                                    optionClass += "border-slate-200 dark:border-slate-700 opacity-50 dark:text-slate-400";
                                }
                            } else {
                                optionClass += "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-800";
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(index)}
                                    disabled={isAnswered}
                                    className={optionClass}
                                >
                                    <span className="font-medium">{option}</span>
                                    {isAnswered && index === question.correctAnswer && <CheckCircle size={20} className="text-green-600 dark:text-green-400" />}
                                    {isAnswered && index === selectedOption && index !== question.correctAnswer && <XCircle size={20} className="text-red-600 dark:text-red-400" />}
                                </button>
                            );
                        })}
                    </div>

                    {isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl"
                        >
                            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Açıklama:</h4>
                            <p className="text-blue-800 dark:text-blue-200 text-sm">{question.explanation}</p>
                        </motion.div>
                    )}

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleNext}
                            disabled={!isAnswered}
                            className={`px-6 py-3 rounded-xl font-semibold flex items-center transition-all ${isAnswered
                                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200 dark:shadow-none'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                }`}
                        >
                            {currentQuestion === questions.length - 1 ? 'Sonucu Gör' : 'Sonraki Soru'}
                            <ArrowRight size={20} className="ml-2" />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default QuizInterface;
