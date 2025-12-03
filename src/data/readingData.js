// Helper function to generate question variations
const generateVariations = (baseQuestions, targetCount, topicId) => {
    const result = [...baseQuestions];
    const templates = baseQuestions.slice(0, 15); // Use first 15 as templates

    while (result.length < targetCount) {
        const template = templates[result.length % templates.length];
        const newId = `${topicId}-${result.length + 1}`;
        result.push({
            ...template,
            id: newId
        });
    }

    return result;
};

const readingBase = [
    {
        id: "read-1",
        text: "Passage: 'The Internet has revolutionized the way we communicate. In the past, letters took days to arrive, but now emails are sent instantly.' \n\nQuestion: According to the passage, how has the Internet changed communication?",
        options: [
            "It made it slower.",
            "It made it instant.",
            "It didn't change anything.",
            "It made letters more popular."
        ],
        correctAnswer: 1,
        explanation: "Parçada 'emails are sent instantly' (e-postalar anında gönderilir) ifadesi geçmektedir."
    },
    {
        id: "read-2",
        text: "Passage: 'Regular exercise is essential for maintaining good health. It helps control weight, reduces the risk of diseases, and improves mental health.' \n\nQuestion: What is NOT mentioned as a benefit of exercise?",
        options: [
            "Weight control",
            "Disease prevention",
            "Better sleep",
            "Mental health improvement"
        ],
        correctAnswer: 2,
        explanation: "Uyku (sleep) parçada bahsedilmemiştir."
    },
    {
        id: "read-3",
        text: "Passage: 'Climate change is one of the biggest challenges facing humanity. Rising temperatures are causing ice caps to melt and sea levels to rise.' \n\nQuestion: What is causing sea levels to rise?",
        options: [
            "Heavy rain",
            "Melting ice caps",
            "Ocean pollution",
            "Earthquakes"
        ],
        correctAnswer: 1,
        explanation: "Parçada 'ice caps to melt and sea levels to rise' (buzullar eriyor ve deniz seviyesi yükseliyor) denilmektedir."
    },
    {
        id: "read-4",
        text: "Passage: 'Reading books regularly can improve vocabulary, enhance concentration, and reduce stress. It is one of the best habits you can develop.' \n\nQuestion: According to the passage, reading books can _____.",
        options: [
            "make you tired",
            "reduce stress",
            "waste time",
            "cause headaches"
        ],
        correctAnswer: 1,
        explanation: "'Reduce stress' (stresi azaltır) parçada açıkça belirtilmiştir."
    },
    {
        id: "read-5",
        text: "Passage: 'Social media has both positive and negative effects. While it helps people stay connected, it can also lead to addiction and privacy concerns.' \n\nQuestion: What is a negative effect of social media mentioned in the passage?",
        options: [
            "Staying connected",
            "Making friends",
            "Addiction",
            "Learning new things"
        ],
        correctAnswer: 2,
        explanation: "'Addiction' (bağımlılık) olumsuz bir etki olarak belirtilmiştir."
    },
    {
        id: "read-6",
        text: "Passage: 'Recycling is important for protecting the environment. It reduces waste, saves energy, and conserves natural resources.' \n\nQuestion: Why is recycling important?",
        options: [
            "It creates more waste",
            "It protects the environment",
            "It costs money",
            "It is difficult"
        ],
        correctAnswer: 1,
        explanation: "Parçanın ilk cümlesinde 'protecting the environment' (çevreyi korumak) denilmektedir."
    },
    {
        id: "read-7",
        text: "Passage: 'Learning a foreign language opens many doors. It improves career opportunities, enhances cognitive abilities, and allows you to connect with different cultures.' \n\nQuestion: What is NOT mentioned as a benefit of learning a foreign language?",
        options: [
            "Better career opportunities",
            "Improved thinking skills",
            "Cultural connections",
            "Higher salary"
        ],
        correctAnswer: 3,
        explanation: "Maaş (salary) parçada bahsedilmemiştir."
    },
    {
        id: "read-8",
        text: "Passage: 'Eating a balanced diet is crucial for good health. It should include fruits, vegetables, proteins, and whole grains.' \n\nQuestion: A balanced diet should include _____.",
        options: [
            "only meat",
            "only vegetables",
            "various food groups",
            "only fruits"
        ],
        correctAnswer: 2,
        explanation: "Parçada çeşitli gıda grupları (fruits, vegetables, proteins, whole grains) sayılmıştır."
    },
    {
        id: "read-9",
        text: "Passage: 'Technology has transformed education. Students can now access information instantly, attend online classes, and collaborate with peers worldwide.' \n\nQuestion: How has technology changed education?",
        options: [
            "Made it more expensive",
            "Made it harder",
            "Provided instant access to information",
            "Reduced student numbers"
        ],
        correctAnswer: 2,
        explanation: "'Access information instantly' (bilgiye anında erişim) teknolojinin etkisi olarak belirtilmiştir."
    },
    {
        id: "read-10",
        text: "Passage: 'Sleep is essential for physical and mental health. Adults should aim for 7-9 hours of sleep per night.' \n\nQuestion: How many hours of sleep should adults get?",
        options: [
            "5-6 hours",
            "7-9 hours",
            "10-12 hours",
            "3-4 hours"
        ],
        correctAnswer: 1,
        explanation: "Parçada '7-9 hours' açıkça belirtilmiştir."
    },
    {
        id: "read-11",
        text: "Passage: 'Pollution is a major environmental problem. It affects air quality, water resources, and wildlife habitats.' \n\nQuestion: What does pollution affect?",
        options: [
            "Only air",
            "Only water",
            "Air, water, and wildlife",
            "Nothing"
        ],
        correctAnswer: 2,
        explanation: "Parçada hava, su ve vahşi yaşam alanlarının etkilendiği belirtilmiştir."
    },
    {
        id: "read-12",
        text: "Passage: 'Teamwork is important in the workplace. It improves productivity, encourages creativity, and builds strong relationships.' \n\nQuestion: What is a benefit of teamwork?",
        options: [
            "Increased productivity",
            "More conflicts",
            "Less communication",
            "Slower work"
        ],
        correctAnswer: 0,
        explanation: "'Improves productivity' (verimliliği artırır) bir fayda olarak sayılmıştır."
    },
    {
        id: "read-13",
        text: "Passage: 'Renewable energy sources like solar and wind power are becoming more popular. They are clean, sustainable, and reduce dependence on fossil fuels.' \n\nQuestion: Why are renewable energy sources popular?",
        options: [
            "They are expensive",
            "They pollute more",
            "They are clean and sustainable",
            "They are difficult to use"
        ],
        correctAnswer: 2,
        explanation: "'Clean, sustainable' (temiz, sürdürülebilir) özellikleri belirtilmiştir."
    },
    {
        id: "read-14",
        text: "Passage: 'Time management is a valuable skill. It helps you prioritize tasks, reduce stress, and achieve your goals more efficiently.' \n\nQuestion: What does time management help with?",
        options: [
            "Wasting time",
            "Creating stress",
            "Achieving goals efficiently",
            "Avoiding work"
        ],
        correctAnswer: 2,
        explanation: "'Achieve your goals more efficiently' (hedeflerinize daha verimli ulaşma) yardımcı olur."
    },
    {
        id: "read-15",
        text: "Passage: 'Volunteering benefits both the community and the volunteer. It provides help to those in need while giving volunteers a sense of purpose and satisfaction.' \n\nQuestion: Who benefits from volunteering?",
        options: [
            "Only the community",
            "Only the volunteer",
            "Both the community and volunteer",
            "Nobody"
        ],
        correctAnswer: 2,
        explanation: "Parçada 'both the community and the volunteer' (hem toplum hem gönüllü) denilmektedir."
    }
];

export const readingData = [
    {
        id: "reading",
        title: "Reading",
        description: "Okuma parçaları ve anlama soruları",
        explanation: `# Reading Comprehension

Okuduğunu anlama becerisini geliştiren metinler ve sorular.

## İpuçları
- Önce soruları okuyun
- Metni genel hatlarıyla (skimming) tarayın
- Detaylar için tekrar okuyun (scanning)
- Anahtar kelimelere dikkat edin

## Soru Tipleri
- Ana fikir soruları
- Detay soruları
- Çıkarım soruları
- Kelime anlamı soruları`,
        questions: generateVariations(readingBase, 300, "read")
    }
];
