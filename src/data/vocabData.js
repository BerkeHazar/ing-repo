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

const vocabBase = [
    {
        id: "voc-1",
        text: "The student was very _____ to learn new things.",
        options: ["eager", "bored", "angry", "tired"],
        correctAnswer: 0,
        explanation: "'Eager' (istekli/hevesli) kelimesi cümleye en uygun anlamı katar."
    },
    {
        id: "voc-2",
        text: "It is _____ to wear a seatbelt while driving.",
        options: ["optional", "mandatory", "useless", "harmful"],
        correctAnswer: 1,
        explanation: "'Mandatory' (zorunlu) kelimesi trafik kuralları bağlamında doğrudur."
    },
    {
        id: "voc-3",
        text: "The teacher gave us a _____ explanation of the topic.",
        options: ["brief", "long", "boring", "difficult"],
        correctAnswer: 0,
        explanation: "'Brief' (kısa/öz) açıklama anlamına gelir."
    },
    {
        id: "voc-4",
        text: "She has a _____ personality and makes friends easily.",
        options: ["shy", "friendly", "rude", "quiet"],
        correctAnswer: 1,
        explanation: "'Friendly' (arkadaş canlısı) kolay arkadaş edinmeyi açıklar."
    },
    {
        id: "voc-5",
        text: "The movie was so _____ that I fell asleep.",
        options: ["exciting", "interesting", "boring", "funny"],
        correctAnswer: 2,
        explanation: "'Boring' (sıkıcı) uyumaya neden olur."
    },
    {
        id: "voc-6",
        text: "He is very _____ and always helps others.",
        options: ["selfish", "generous", "mean", "greedy"],
        correctAnswer: 1,
        explanation: "'Generous' (cömert) başkalarına yardım etmeyi ifade eder."
    },
    {
        id: "voc-7",
        text: "The exam was _____ difficult for most students.",
        options: ["extremely", "slightly", "barely", "hardly"],
        correctAnswer: 0,
        explanation: "'Extremely' (son derece) yoğunluğu vurgular."
    },
    {
        id: "voc-8",
        text: "She spoke in a _____ voice so everyone could hear.",
        options: ["quiet", "loud", "soft", "weak"],
        correctAnswer: 1,
        explanation: "'Loud' (yüksek sesle) herkesin duymasını sağlar."
    },
    {
        id: "voc-9",
        text: "The weather was _____ cold yesterday.",
        options: ["extremely", "slightly", "barely", "hardly"],
        correctAnswer: 0,
        explanation: "'Extremely cold' (aşırı soğuk) yoğun soğuğu ifade eder."
    },
    {
        id: "voc-10",
        text: "He is a very _____ person and never gives up.",
        options: ["lazy", "determined", "weak", "careless"],
        correctAnswer: 1,
        explanation: "'Determined' (kararlı) vazgeçmemeyi ifade eder."
    },
    {
        id: "voc-11",
        text: "The book was so _____ that I couldn't put it down.",
        options: ["boring", "dull", "fascinating", "tiring"],
        correctAnswer: 2,
        explanation: "'Fascinating' (büyüleyici) kitabı bırakamama nedenini açıklar."
    },
    {
        id: "voc-12",
        text: "She is very _____ about her future career.",
        options: ["worried", "optimistic", "pessimistic", "sad"],
        correctAnswer: 1,
        explanation: "'Optimistic' (iyimser) gelecek hakkında olumlu düşünmeyi ifade eder."
    },
    {
        id: "voc-13",
        text: "The solution to the problem was quite _____.",
        options: ["complex", "simple", "difficult", "impossible"],
        correctAnswer: 1,
        explanation: "'Simple' (basit) kolay çözümü ifade eder."
    },
    {
        id: "voc-14",
        text: "He made a _____ decision without thinking.",
        options: ["careful", "hasty", "wise", "smart"],
        correctAnswer: 1,
        explanation: "'Hasty' (acele) düşünmeden karar vermeyi ifade eder."
    },
    {
        id: "voc-15",
        text: "The restaurant serves _____ food from different countries.",
        options: ["local", "traditional", "exotic", "simple"],
        correctAnswer: 2,
        explanation: "'Exotic' (egzotik) farklı ülkelerden gelen yemekleri tanımlar."
    }
];

export const vocabData = [
    {
        id: "vocabulary",
        title: "Vocabulary",
        description: "Kelime bilgisi ve eş anlamlılar",
        explanation: `# Vocabulary

Kelime dağarcığını geliştirmeye yönelik alıştırmalar.

## Çalışma Yöntemi
- Kelimeleri bağlam içinde öğrenin
- Eş anlamlı (synonym) ve zıt anlamlı (antonym) kelimelere çalışın
- Kelime ailelerini (word families) öğrenin
- Düzenli tekrar yapın

## Kelime Kategorileri
- Sıfatlar (Adjectives)
- Zarflar (Adverbs)
- Fiiller (Verbs)
- İsimler (Nouns)
- Deyimler (Idioms)`,
        questions: generateVariations(vocabBase, 300, "voc")
    }
];
