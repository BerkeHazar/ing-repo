import { getRandomQuestions } from '../utils/quizUtils';
import { grammarData } from './grammarData';
import { readingData } from './readingData';
import { vocabData } from './vocabData';

// Combine all data sources
export const curriculum = [
    ...grammarData.map(topic => ({
        ...topic,
        grammarTopics: [topic.title] // Add grammarTopics field for UI compatibility
    })),
    ...readingData.map(topic => ({
        ...topic,
        grammarTopics: ["Reading Skills"]
    })),
    ...vocabData.map(topic => ({
        ...topic,
        grammarTopics: ["Vocabulary Skills"]
    }))
];

// Helper to get random questions for a topic
export const getTopicQuestions = (topicId) => {
    const topic = curriculum.find(t => t.id === topicId);
    if (!topic) return [];

    // Determine count based on topic type (Skills: 30, Grammar: 20)
    const isSkill = ["reading", "vocabulary"].includes(topicId);
    const count = isSkill ? 30 : 20;

    return getRandomQuestions(topic.questions, count);
};
