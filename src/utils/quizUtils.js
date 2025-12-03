/**
 * Selects a random subset of questions from a larger pool.
 * @param {Array} allQuestions - The full pool of questions.
 * @param {number} count - The number of questions to select.
 * @returns {Array} - A random subset of questions.
 */
export const getRandomQuestions = (allQuestions, count) => {
    if (!allQuestions || allQuestions.length === 0) return [];

    // Create a shallow copy to avoid mutating the original array
    const shuffled = [...allQuestions];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
};
