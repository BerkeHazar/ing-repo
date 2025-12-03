import React from 'react';
import { ArrowRight, Book, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TopicCard = ({ topic, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
        >
            <Link to={`/topic/${topic.id}`} className="block group">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-primary-50 dark:bg-slate-700 text-primary-600 dark:text-primary-400 p-3 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                            <Book size={24} />
                        </div>
                        <div className="flex gap-1">
                            {[1, 2, 3].map((star) => (
                                <Star key={star} size={16} className="text-slate-200 dark:text-slate-600 fill-slate-200 dark:fill-slate-600" />
                            ))}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {topic.title}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 flex-grow">
                        {topic.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {topic.grammarTopics.slice(0, 2).map((gt, i) => (
                            <span key={i} className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full">
                                {gt}
                            </span>
                        ))}
                        {topic.grammarTopics.length > 2 && (
                            <span className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full">
                                +{topic.grammarTopics.length - 2}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold text-sm mt-auto group-hover:translate-x-1 transition-transform">
                        Çalışmaya Başla <ArrowRight size={16} className="ml-1" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default TopicCard;
