import React from 'react';
import Layout from '../components/Layout';
import TopicCard from '../components/TopicCard';
import { curriculum } from '../data/curriculum';

const Home = () => {
    return (
        <Layout>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                    11. Sınıf <span className="text-primary-600 dark:text-primary-400">İngilizce</span> Müfredatı
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Dil bölümü öğrencileri için özel olarak hazırlanmış konu anlatımları ve soru bankası.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {curriculum.map((topic, index) => (
                    <TopicCard key={topic.id} topic={topic} index={index} />
                ))}
            </div>
        </Layout>
    );
};

export default Home;
