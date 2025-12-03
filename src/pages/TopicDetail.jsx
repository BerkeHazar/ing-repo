import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, BookOpen, PlayCircle } from 'lucide-react';
import Layout from '../components/Layout';
import QuizInterface from '../components/QuizInterface';
import { curriculum, getTopicQuestions } from '../data/curriculum';

const TopicDetail = () => {
    const { id } = useParams();
    const topic = curriculum.find(t => t.id === id);
    const [mode, setMode] = useState('learn'); // 'learn' or 'quiz'
    const [quizQuestions, setQuizQuestions] = useState([]);

    // Load random questions when entering quiz mode
    const startQuiz = () => {
        setQuizQuestions(getTopicQuestions(id));
        setMode('quiz');
    };

    if (!topic) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Konu bulunamadı</h2>
                    <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline mt-4 inline-block">Ana Sayfaya Dön</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mb-8">
                <Link to="/" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-4">
                    <ArrowLeft size={20} className="mr-1" />
                    Konulara Dön
                </Link>

                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{topic.title}</h1>

                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        <button
                            onClick={() => setMode('learn')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${mode === 'learn'
                                ? 'bg-white dark:bg-slate-700 text-primary-700 dark:text-primary-300 shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                        >
                            <BookOpen size={18} className="mr-2" />
                            Konu Anlatımı
                        </button>
                        <button
                            onClick={startQuiz}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${mode === 'quiz'
                                ? 'bg-white dark:bg-slate-700 text-primary-700 dark:text-primary-300 shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                        >
                            <PlayCircle size={18} className="mr-2" />
                            Test Çöz
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm min-h-[500px]">
                {mode === 'learn' ? (
                    <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-200 prose-headings:text-slate-900 dark:prose-headings:text-white prose-strong:text-slate-900 dark:prose-strong:text-white prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-code:text-slate-900 dark:prose-code:text-slate-200">
                        <ReactMarkdown>{topic.explanation}</ReactMarkdown>

                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 flex justify-center">
                            <button
                                onClick={startQuiz}
                                className="px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 dark:shadow-none hover:shadow-primary-300 hover:-translate-y-1 flex items-center"
                            >
                                <PlayCircle size={24} className="mr-2" />
                                Konuyu Anladım, Teste Başla
                            </button>
                        </div>
                    </div>
                ) : (
                    <QuizInterface
                        questions={quizQuestions}
                        onRetry={startQuiz}
                    />
                )}
            </div>
        </Layout>
    );
};

export default TopicDetail;
