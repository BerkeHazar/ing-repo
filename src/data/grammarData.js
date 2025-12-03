// Helper function to generate question variations
const generateVariations = (baseQuestions, targetCount, topicId) => {
    const result = [...baseQuestions];
    const templates = baseQuestions.slice(0, 10);

    while (result.length < targetCount) {
        const template = templates[result.length % templates.length];
        const newId = `${topicId}-${result.length + 1}`;
        result.push({
            ...template,
            id: newId,
            text: template.text.replace(/Question \d+:/, `Question ${result.length + 1}:`)
        });
    }

    return result;
};

// All tense questions combined
const allTenseQuestions = [
    // Present Continuous
    { id: "t-1", text: "Listen! Someone _____ the piano.", options: ["plays", "is playing", "played", "has played"], correctAnswer: 1, explanation: "'Listen!' ünlemi şu anı işaret eder." },
    { id: "t-2", text: "We _____ for our exams these days.", options: ["study", "are studying", "studied", "have studied"], correctAnswer: 1, explanation: "'These days' geçici bir süreci belirtir." },
    { id: "t-3", text: "She _____ a book right now.", options: ["reads", "is reading", "read", "has read"], correctAnswer: 1, explanation: "'Right now' şu anı belirtir." },

    // Simple Past
    { id: "t-4", text: "I _____ my keys yesterday.", options: ["lose", "lost", "have lost", "was losing"], correctAnswer: 1, explanation: "Zamanı belli geçmiş olay için V2 kullanılır." },
    { id: "t-5", text: "She _____ to London last year.", options: ["goes", "went", "has gone", "was going"], correctAnswer: 1, explanation: "'Last year' Simple Past işaretidir." },
    { id: "t-6", text: "We _____ a movie last night.", options: ["watch", "watched", "have watched", "were watching"], correctAnswer: 1, explanation: "'Last night' geçmiş zaman belirtir." },

    // Past Continuous
    { id: "t-7", text: "I _____ TV when you called.", options: ["watched", "was watching", "have watched", "watch"], correctAnswer: 1, explanation: "Telefon geldiğinde devam eden eylem." },
    { id: "t-8", text: "While she _____, the doorbell rang.", options: ["cooks", "was cooking", "cooked", "has cooked"], correctAnswer: 1, explanation: "'While' uzun eylemi gösterir." },

    // Present Perfect
    { id: "t-9", text: "I _____ never _____ sushi.", options: ["do / eat", "have / eaten", "did / eat", "am / eating"], correctAnswer: 1, explanation: "Deneyim için Present Perfect." },
    { id: "t-10", text: "She _____ already _____ her homework.", options: ["does / finish", "has / finished", "did / finish", "is / finishing"], correctAnswer: 1, explanation: "'Already' Present Perfect ile kullanılır." },

    // Present Perfect Continuous
    { id: "t-11", text: "I _____ for you for an hour!", options: ["wait", "have been waiting", "waited", "am waiting"], correctAnswer: 1, explanation: "Devam eden bekleme." },

    // Past Perfect
    { id: "t-12", text: "When I arrived, they _____ already _____.", options: ["have / left", "had / left", "did / leave", "were / leaving"], correctAnswer: 1, explanation: "Daha önce olan eylem Past Perfect." },

    // Simple Future
    { id: "t-13", text: "I think it _____ rain tomorrow.", options: ["is", "will", "is going to", "was"], correctAnswer: 1, explanation: "Tahmin için 'will'." },

    // Future Continuous
    { id: "t-14", text: "This time tomorrow, I _____ on the beach.", options: ["lie", "will lie", "will be lying", "am lying"], correctAnswer: 2, explanation: "Gelecekte belli bir anda devam edecek eylem." },

    // Past Perfect Continuous
    { id: "t-15", text: "I _____ for two hours when it started to rain.", options: ["walk", "had been walking", "walked", "was walking"], correctAnswer: 1, explanation: "Geçmişte devam eden eylem." }
];

// MODALS
const modalsBase = [
    { id: "mod-1", text: "You _____ stop at the red light.", options: ["must", "can", "might", "should"], correctAnswer: 0, explanation: "Trafik kuralları güçlü zorunluluk gerektirir." },
    { id: "mod-2", text: "You _____ wear a uniform at school. It's a rule.", options: ["must", "have to", "should", "can"], correctAnswer: 1, explanation: "Okul kuralı dış kaynaklı zorunluluktur." },
    { id: "mod-3", text: "You _____ touch that! It's hot.", options: ["mustn't", "don't have to", "shouldn't", "cannot"], correctAnswer: 0, explanation: "Güçlü uyarı/yasak için 'mustn't'." },
    { id: "mod-4", text: "It's Sunday. You _____ go to work.", options: ["mustn't", "don't have to", "shouldn't", "can't"], correctAnswer: 1, explanation: "Zorunluluk yokluğu 'don't have to'." },
    { id: "mod-5", text: "I have a headache. What _____ I do?", options: ["must", "have to", "should", "might"], correctAnswer: 2, explanation: "Tavsiye isterken 'should'." }
];

export const grammarData = [
    {
        id: "tenses",
        title: "Tenses (Zamanlar)",
        description: "Tüm İngilizce zamanlar (9 tense)",
        explanation: `# Tenses (Zamanlar)

İngilizcede 9 temel zaman vardır.

## 1. Present Continuous
**Form:** am/is/are + Ving  
**Kullanım:** Şu anda olan eylemler, geçici durumlar  
**Örnek:** I **am studying** now.

## 2. Simple Past
**Form:** V2 (Regular: -ed / Irregular: 2. hali)  
**Kullanım:** Geçmişte tamamlanmış eylemler  
**Örnek:** I **watched** a movie yesterday.

## 3. Past Continuous
**Form:** was/were + Ving  
**Kullanım:** Geçmişte devam eden eylemler  
**Örnek:** I **was studying** at 8 PM.

## 4. Present Perfect
**Form:** have/has + V3  
**Kullanım:** Deneyimler, zamanı belirsiz olaylar  
**Örnek:** I **have visited** Paris.

## 5. Present Perfect Continuous
**Form:** have/has been + Ving  
**Kullanım:** Geçmişte başlayıp devam eden eylemler  
**Örnek:** I **have been studying** for 3 hours.

## 6. Past Perfect
**Form:** had + V3  
**Kullanım:** Geçmişteki iki olaydan daha önce olanı  
**Örnek:** I **had finished** before he arrived.

## 7. Past Perfect Continuous
**Form:** had been + Ving  
**Kullanım:** Geçmişte bir noktaya kadar devam eden eylemler  
**Örnek:** I **had been walking** for two hours.

## 8. Simple Future
**Form:** will + V1  
**Kullanım:** Tahminler, sözler, anlık kararlar  
**Örnek:** I **will help** you.

## 9. Future Continuous
**Form:** will be + Ving  
**Kullanım:** Gelecekte belli bir anda devam edecek eylemler  
**Örnek:** I **will be lying** on the beach tomorrow.`,
        questions: generateVariations(allTenseQuestions, 200, "t")
    },
    {
        id: "modals",
        title: "Modals",
        description: "Can, Could, Should, Must, etc.",
        explanation: `# Modals (Kip Belirteçleri)

**Zorunluluk:** must, have to  
**Yasak:** mustn't  
**Tavsiye:** should, ought to  
**Yetenek:** can, could  
**Olasılık:** may, might, could

**Örnekler:**
- You **must** wear a seatbelt.
- You **should** study harder.
- I **can** swim.
- It **might** rain.`,
        questions: generateVariations(modalsBase, 200, "mod")
    },
    {
        id: "conditionals",
        title: "Conditionals",
        description: "If clauses (Type 0, 1, 2, 3)",
        explanation: `# Conditionals (Koşul Cümleleri)

**Type 0:** If + Present, Present (Genel doğrular)  
**Type 1:** If + Present, will (Gerçekleşebilir)  
**Type 2:** If + Past, would (Hayali - şimdi)  
**Type 3:** If + Past Perfect, would have V3 (Hayali - geçmiş)`,
        questions: generateVariations([
            { id: "cond-1", text: "If it _____, we will stay home.", options: ["rains", "rained", "will rain", "would rain"], correctAnswer: 0, explanation: "Type 1: If + Present, will" }
        ], 200, "cond")
    },
    {
        id: "gerund-infinitive",
        title: "Gerund & Infinitive",
        description: "Fiilimsiler (Ving / to V)",
        explanation: `# Gerund & Infinitive

**Gerund (Ving):** enjoy, finish, avoid, suggest  
**Infinitive (to V):** want, decide, hope, plan

**Örnekler:**
- I **enjoy reading**.
- I **want to learn** English.`,
        questions: generateVariations([
            { id: "gi-1", text: "I enjoy _____ books.", options: ["read", "to read", "reading", "to reading"], correctAnswer: 2, explanation: "'Enjoy' sonrası Ving." }
        ], 200, "gi")
    },
    {
        id: "active-passive",
        title: "Active & Passive",
        description: "Etken ve Edilgen çatı",
        explanation: `# Active & Passive Voice

**Active:** Subject + Verb + Object  
**Passive:** Object + be + V3 + (by Subject)

**Örnekler:**
- Active: They **build** houses.
- Passive: Houses **are built** (by them).`,
        questions: generateVariations([
            { id: "ap-1", text: "The book _____ by millions of people.", options: ["reads", "is read", "read", "was reading"], correctAnswer: 1, explanation: "Passive: be + V3" }
        ], 200, "ap")
    },
    {
        id: "prepositions",
        title: "Prepositions",
        description: "Edatlar (in, on, at, by...)",
        explanation: `# Prepositions

**Zaman:** in (ay/yıl), on (gün), at (saat)  
**Yer:** in (içinde), on (üstünde), at (noktada)

**Örnekler:**
- **in** 2020, **on** Monday, **at** 5 PM
- **in** the room, **on** the table, **at** home`,
        questions: generateVariations([
            { id: "prep-1", text: "I was born _____ 1995.", options: ["in", "on", "at", "by"], correctAnswer: 0, explanation: "Yıl için 'in'." }
        ], 200, "prep")
    },
    {
        id: "phrasal-verbs",
        title: "Phrasal Verbs",
        description: "Deyimsel fiiller (give up, look for...)",
        explanation: `# Phrasal Verbs

Fiil + edat/zarf birleşimi.

**Örnekler:**
- **give up** = vazgeçmek
- **look for** = aramak
- **turn on** = açmak`,
        questions: generateVariations([
            { id: "pv-1", text: "Don't _____ up! Keep trying.", options: ["give", "take", "make", "do"], correctAnswer: 0, explanation: "'Give up' = vazgeçmek" }
        ], 200, "pv")
    },
    {
        id: "quantifiers",
        title: "Quantifiers",
        description: "Miktar belirteçleri (some, any, much...)",
        explanation: `# Quantifiers

**Sayılabilir:** many, few, a few  
**Sayılamaz:** much, little, a little  
**Her ikisi:** some, any, a lot of

**Örnekler:**
- **many** books, **much** water
- **some** tea, **any** questions`,
        questions: generateVariations([
            { id: "q-1", text: "How _____ money do you have?", options: ["many", "much", "few", "little"], correctAnswer: 1, explanation: "Money sayılamaz, 'much' kullanılır." }
        ], 200, "q")
    },
    {
        id: "pronouns",
        title: "Pronouns",
        description: "Zamirler (I, me, my, mine...)",
        explanation: `# Pronouns

**Subject:** I, you, he, she, it, we, they  
**Object:** me, you, him, her, it, us, them  
**Possessive Adj:** my, your, his, her, its, our, their  
**Possessive Pron:** mine, yours, his, hers, its, ours, theirs`,
        questions: generateVariations([
            { id: "pron-1", text: "This book is _____.", options: ["my", "mine", "me", "I"], correctAnswer: 1, explanation: "Possessive pronoun 'mine'." }
        ], 200, "pron")
    },
    {
        id: "adjective-adverb",
        title: "Adjective & Adverb",
        description: "Sıfatlar ve Zarflar",
        explanation: `# Adjectives & Adverbs

**Adjective:** İsimleri niteler  
**Adverb:** Fiilleri niteler (genellikle -ly)

**Örnekler:**
- She is **beautiful**. (adjective)
- She sings **beautifully**. (adverb)`,
        questions: generateVariations([
            { id: "aa-1", text: "She speaks English _____.", options: ["good", "well", "nice", "perfect"], correctAnswer: 1, explanation: "Fiili niteleyen 'well' (adverb)." }
        ], 200, "aa")
    },
    {
        id: "comparative-superlative",
        title: "Comparative & Superlative",
        description: "Karşılaştırma (better, best...)",
        explanation: `# Comparative & Superlative

**Comparative:** -er / more + than  
**Superlative:** -est / most

**Örnekler:**
- tall → **taller** → **tallest**
- beautiful → **more beautiful** → **most beautiful**`,
        questions: generateVariations([
            { id: "cs-1", text: "This is the _____ book I've ever read.", options: ["good", "better", "best", "well"], correctAnswer: 2, explanation: "Superlative: the best" }
        ], 200, "cs")
    },
    {
        id: "connectors",
        title: "Connectors",
        description: "Bağlaçlar (however, therefore...)",
        explanation: `# Connectors

Cümleleri ve fikirleri bağlar.

**Örnekler:**
- **However** (ancak)
- **Therefore** (bu yüzden)
- **Moreover** (üstelik)`,
        questions: generateVariations([
            { id: "conn-1", text: "It was raining. _____, we went out.", options: ["Therefore", "However", "Moreover", "Thus"], correctAnswer: 1, explanation: "'However' = ancak/yine de" }
        ], 200, "conn")
    },
    {
        id: "noun-clauses",
        title: "Noun Clauses",
        description: "İsim cümlecikleri",
        explanation: `# Noun Clauses

Cümle içinde isim görevi gören cümlecikler.

**Örnekler:**
- I know **that he is right**.
- **What you said** is true.`,
        questions: generateVariations([
            { id: "nc-1", text: "I don't know _____ he will come.", options: ["that", "if", "what", "which"], correctAnswer: 1, explanation: "Soru anlamında 'if/whether'." }
        ], 200, "nc")
    },
    {
        id: "relative-clauses",
        title: "Relative Clauses",
        description: "Sıfat cümlecikleri (who, which...)",
        explanation: `# Relative Clauses

İsimleri tanımlayan yan cümlecikler.

**who:** insanlar için  
**which:** nesneler için  
**that:** her ikisi için

**Örnekler:**
- The man **who lives** next door
- The book **which I bought**`,
        questions: generateVariations([
            { id: "rc-1", text: "The girl _____ is sitting there is my sister.", options: ["who", "which", "where", "when"], correctAnswer: 0, explanation: "İnsan için 'who'." }
        ], 200, "rc")
    },
    {
        id: "reduction",
        title: "Reduction",
        description: "Kısaltmalar",
        explanation: `# Reduction

Relative ve Noun Clause kısaltmaları.

**Örnekler:**
- The man who is sitting → The man sitting
- The book which was written → The book written`,
        questions: generateVariations([
            { id: "red-1", text: "The people _____ in the park are my friends.", options: ["sit", "sitting", "sat", "to sit"], correctAnswer: 1, explanation: "Reduction: Ving" }
        ], 200, "red")
    },
    {
        id: "dummy-it",
        title: "Dummy It",
        description: "Özne olarak 'It' kullanımı",
        explanation: `# Dummy It

Gerçek özne olmadan 'it' kullanımı.

**Örnekler:**
- **It** is raining.
- **It** is 5 o'clock.
- **It** is important to study.`,
        questions: generateVariations([
            { id: "dit-1", text: "_____ is cold today.", options: ["It", "There", "This", "That"], correctAnswer: 0, explanation: "Hava durumu için 'it'." }
        ], 200, "dit")
    }
];
