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
    // Simple Present
    { id: "t-1", text: "She usually _____ up early.", options: ["get", "gets", "is getting", "got"], correctAnswer: 1, explanation: "3. tekil şahısta fiil -s alır." },
    { id: "t-2", text: "Water _____ at 100 degrees Celsius.", options: ["boils", "is boiling", "boiled", "has boiled"], correctAnswer: 0, explanation: "Genel doğrular Simple Present ile anlatılır." },
    { id: "t-3", text: "They _____ football after school.", options: ["play", "are playing", "played", "have played"], correctAnswer: 0, explanation: "Alışkanlıklar Simple Present kullanır." },
    { id: "t-4", text: "He _____ like coffee.", options: ["don’t", "doesn’t", "isn’t", "didn’t"], correctAnswer: 1, explanation: "3. tekil olumsuzda 'doesn't' kullanılır." },
    { id: "t-5", text: "What time _____ the lesson start?", options: ["do", "does", "is", "did"], correctAnswer: 1, explanation: "3. tekil sorularda 'does' kullanılır." },
    { id: "t-6", text: "My parents _____ in a small town.", options: ["live", "are living", "lived", "have lived"], correctAnswer: 0, explanation: "Kalıcı durumlar Simple Present ile ifade edilir." },
    { id: "t-7", text: "She _____ English very well.", options: ["speaks", "is speaking", "spoke", "has spoken"], correctAnswer: 0, explanation: "Yetenek ve genel durumlar Simple Present." },
    { id: "t-8", text: "We _____ breakfast at 8 every morning.", options: ["have", "are having", "had", "have had"], correctAnswer: 0, explanation: "Günlük rutinler Simple Present." },
    { id: "t-9", text: "He _____ to school by bus.", options: ["go", "goes", "is going", "went"], correctAnswer: 1, explanation: "3. tekil şahıs fiile -s alır." },
    { id: "t-10", text: "I _____ understand this question.", options: ["am not", "don’t", "didn’t", "haven’t"], correctAnswer: 1, explanation: "State verb 'understand' Continuous kullanılmaz." },

    // Present Continuous
    { id: "t-11", text: "Listen! Someone _____ the door.", options: ["knocks", "is knocking", "knocked", "has knocked"], correctAnswer: 1, explanation: "'Listen!' şu anı işaret eder." },
    { id: "t-12", text: "She _____ a shower right now.", options: ["takes", "is taking", "took", "has taken"], correctAnswer: 1, explanation: "'Right now' Present Continuous." },
    { id: "t-13", text: "We _____ for our exams this week.", options: ["study", "are studying", "studied", "have studied"], correctAnswer: 1, explanation: "Geçici dönemler Present Continuous." },
    { id: "t-14", text: "Look! The children _____.", options: ["run", "are running", "ran", "have run"], correctAnswer: 1, explanation: "'Look!' anlık durumu gösterir." },
    { id: "t-15", text: "I _____ at home today.", options: ["work", "am working", "worked", "have worked"], correctAnswer: 1, explanation: "Geçici durum anlatılıyor." },
    { id: "t-16", text: "They _____ a new bridge these days.", options: ["build", "are building", "built", "have built"], correctAnswer: 1, explanation: "'These days' geçici süreci gösterir." },
    { id: "t-17", text: "She _____ TV at the moment.", options: ["watches", "is watching", "watched", "has watched"], correctAnswer: 1, explanation: "'At the moment' Present Continuous." },
    { id: "t-18", text: "We _____ dinner now.", options: ["have", "are having", "had", "have had"], correctAnswer: 1, explanation: "Şu anda olan eylem." },
    { id: "t-19", text: "He _____ with his friends this evening.", options: ["meets", "is meeting", "met", "has met"], correctAnswer: 1, explanation: "Planlanmış gelecek için Present Continuous." },
    { id: "t-20", text: "I _____ a lot of noise outside.", options: ["hear", "am hearing", "heard", "have heard"], correctAnswer: 0, explanation: "State verb 'hear' Continuous kullanılmaz." },

    // Mixed (Present vs Continuous)
    { id: "t-21", text: "She usually _____ tea, but today she _____ coffee.", options: ["drinks / drinks", "drinks / is drinking", "is drinking / drinks", "drank / drinks"], correctAnswer: 1, explanation: "Alışkanlık + şu an karşılaştırması." },
    { id: "t-22", text: "I _____ in Ankara, but I _____ in Istanbul this month.", options: ["live / stay", "live / am staying", "am living / stay", "lived / stayed"], correctAnswer: 1, explanation: "Kalıcı + geçici durum." },
    { id: "t-23", text: "He _____ usually late.", options: ["is", "is being", "was", "has been"], correctAnswer: 0, explanation: "'Usually' kalıcı durum belirtir." },
    { id: "t-24", text: "She _____ very kind today.", options: ["is", "is being", "was", "has been"], correctAnswer: 1, explanation: "Geçici davranışlarda 'is being' kullanılır." },

    // Review
    { id: "t-25", text: "My brother _____ to bed late.", options: ["go", "goes", "is going", "went"], correctAnswer: 1, explanation: "3. tekil şahıs kuralı." },
    { id: "t-26", text: "We _____ lunch at noon every day.", options: ["have", "are having", "had", "have had"], correctAnswer: 0, explanation: "Rutin eylem." },
    { id: "t-27", text: "She _____ her phone at the moment.", options: ["uses", "is using", "used", "has used"], correctAnswer: 1, explanation: "Şu an devam eden eylem." },
    { id: "t-28", text: "I _____ football on Sundays.", options: ["play", "am playing", "played", "have played"], correctAnswer: 0, explanation: "Alışkanlık." },
    { id: "t-29", text: "They _____ a meeting now.", options: ["have", "are having", "had", "have had"], correctAnswer: 1, explanation: "Şu anda olan eylem." },
    { id: "t-30", text: "He _____ late these days.", options: ["works", "is working", "worked", "has worked"], correctAnswer: 1, explanation: "Geçici yoğunluk Present Continuous." },
        // Simple Past
    { id: "t-31", text: "I _____ my homework yesterday.", options: ["do", "did", "have done", "was doing"], correctAnswer: 1, explanation: "'Yesterday' Simple Past gerektirir." },
    { id: "t-32", text: "She _____ me last night.", options: ["calls", "called", "has called", "was calling"], correctAnswer: 1, explanation: "Zamanı belli geçmiş eylem." },
    { id: "t-33", text: "We _____ the museum two days ago.", options: ["visit", "visited", "have visited", "are visiting"], correctAnswer: 1, explanation: "'Two days ago' Simple Past." },
    { id: "t-34", text: "He _____ his wallet on the bus.", options: ["loses", "lost", "has lost", "was losing"], correctAnswer: 1, explanation: "Geçmişte tamamlanan olay." },
    { id: "t-35", text: "They _____ home late last night.", options: ["come", "came", "have come", "were coming"], correctAnswer: 1, explanation: "'Last night' Simple Past kullanılır." },
    { id: "t-36", text: "I _____ very tired after work yesterday.", options: ["am", "was", "have been", "will be"], correctAnswer: 1, explanation: "Geçmişteki durum Simple Past." },
    { id: "t-37", text: "She _____ English at university.", options: ["studies", "studied", "has studied", "is studying"], correctAnswer: 1, explanation: "Geçmişte tamamlanan eğitim." },
    { id: "t-38", text: "We _____ a great time on holiday.", options: ["have", "had", "have had", "are having"], correctAnswer: 1, explanation: "Geçmişte yaşanan deneyim." },
    { id: "t-39", text: "He _____ his leg in an accident.", options: ["breaks", "broke", "has broken", "was breaking"], correctAnswer: 1, explanation: "Geçmişte olan tek seferlik olay." },
    { id: "t-40", text: "She _____ the answer immediately.", options: ["knows", "knew", "has known", "is knowing"], correctAnswer: 1, explanation: "Geçmişteki bilgi durumu." },

    // Past Continuous
    { id: "t-41", text: "I _____ TV when the phone rang.", options: ["watched", "was watching", "have watched", "watch"], correctAnswer: 1, explanation: "Telefon çaldığında devam eden eylem." },
    { id: "t-42", text: "While she _____ dinner, the guests arrived.", options: ["cooks", "was cooking", "cooked", "has cooked"], correctAnswer: 1, explanation: "'While' uzun süren eylemi gösterir." },
    { id: "t-43", text: "They _____ football when it started to rain.", options: ["played", "were playing", "have played", "play"], correctAnswer: 1, explanation: "Geçmişte devam eden eylem." },
    { id: "t-44", text: "He _____ to music when I saw him.", options: ["listens", "was listening", "listened", "has listened"], correctAnswer: 1, explanation: "Görme anında devam eden eylem." },
    { id: "t-45", text: "We _____ along the street when the accident happened.", options: ["walked", "were walking", "have walked", "walk"], correctAnswer: 1, explanation: "Uzun eylem + kısa olay." },

    // Simple Past vs Past Continuous
    { id: "t-46", text: "She _____ a shower when I _____ her.", options: ["took / called", "was taking / called", "takes / call", "has taken / called"], correctAnswer: 1, explanation: "Devam eden + kısa eylem kombinasyonu." },
    { id: "t-47", text: "While they _____ the house, someone knocked on the door.", options: ["cleaned", "were cleaning", "have cleaned", "clean"], correctAnswer: 1, explanation: "'While' Past Continuous ister." },
    { id: "t-48", text: "I _____ my friend while I _____ to school.", options: ["met / was going", "meet / go", "have met / went", "was meeting / went"], correctAnswer: 0, explanation: "Kısa olay + devam eden eylem." },
    { id: "t-49", text: "He _____ his keys while he _____ for work.", options: ["lost / was getting ready", "loses / gets ready", "has lost / was getting", "was losing / got ready"], correctAnswer: 0, explanation: "Simple Past + Past Continuous." },

    // Mixed Review
    { id: "t-50", text: "When I _____ home, everyone was sleeping.", options: ["get", "got", "have got", "was getting"], correctAnswer: 1, explanation: "Geçmişte kısa eylem." },
    { id: "t-51", text: "She _____ a book while her brother _____ TV.", options: ["read / watched", "was reading / was watching", "reads / watches", "has read / watched"], correctAnswer: 1, explanation: "Aynı anda devam eden iki eylem." },
    { id: "t-52", text: "We _____ dinner when the lights went out.", options: ["had", "were having", "have had", "are having"], correctAnswer: 1, explanation: "Geçmişte devam eden eylem." },
    { id: "t-53", text: "He _____ fast when the police stopped him.", options: ["drives", "was driving", "drove", "has driven"], correctAnswer: 1, explanation: "Devam eden eylem Past Continuous." },
    { id: "t-54", text: "They _____ about the exam when the teacher entered.", options: ["talked", "were talking", "have talked", "talk"], correctAnswer: 1, explanation: "Geçmişte sürmekte olan konuşma." },

    // Simple Past (questions & negatives)
    { id: "t-55", text: "Did you _____ her yesterday?", options: ["see", "saw", "seen", "seeing"], correctAnswer: 0, explanation: "Did ile fiil yalın halde." },
    { id: "t-56", text: "He _____ understand the question.", options: ["doesn’t", "didn’t", "isn’t", "hasn’t"], correctAnswer: 1, explanation: "Geçmiş zaman olumsuzu 'didn't'." },

    // Review
    { id: "t-57", text: "I _____ asleep while I _____ TV.", options: ["fell / was watching", "fall / watch", "have fallen / watched", "was falling / watched"], correctAnswer: 0, explanation: "Kısa olay + devam eden eylem." },
    { id: "t-58", text: "She _____ her bag at home yesterday.", options: ["leaves", "left", "has left", "was leaving"], correctAnswer: 1, explanation: "'Yesterday' Simple Past." },
    { id: "t-59", text: "We _____ a lot of fun at the party.", options: ["have", "had", "have had", "are having"], correctAnswer: 1, explanation: "Geçmişte tamamlanan deneyim." },
    { id: "t-60", text: "While I _____, I heard a strange noise.", options: ["sleep", "was sleeping", "slept", "have slept"], correctAnswer: 1, explanation: "Geçmişte devam eden eylem." },
    { id: "t-61", text: "I _____ never _____ such a beautiful place.", options: ["do / see", "have / seen", "did / see", "am / seeing"], correctAnswer: 1, explanation: "Deneyim anlatırken Present Perfect kullanılır." },
    { id: "t-62", text: "She _____ already _____ her homework.", options: ["does / finish", "has / finished", "did / finish", "is / finishing"], correctAnswer: 1, explanation: "'Already' Present Perfect ile kullanılır." },
    { id: "t-63", text: "We _____ just _____ lunch.", options: ["do / have", "have / had", "did / have", "are / having"], correctAnswer: 1, explanation: "'Just' yakın geçmiş için kullanılır." },
    { id: "t-64", text: "They _____ to this restaurant many times.", options: ["went", "have been", "have gone", "are going"], correctAnswer: 1, explanation: "Deneyim için 'have been'." },
    { id: "t-65", text: "He _____ his phone, so he can’t find it.", options: ["loses", "lost", "has lost", "was losing"], correctAnswer: 2, explanation: "Sonucu şu an etkileyen geçmiş olay." },
    { id: "t-66", text: "I _____ this movie before.", options: ["see", "saw", "have seen", "was seeing"], correctAnswer: 2, explanation: "Zaman belirtilmediği için Present Perfect." },
    { id: "t-67", text: "She _____ here since 2018.", options: ["lives", "lived", "has lived", "is living"], correctAnswer: 2, explanation: "'Since' ile Present Perfect kullanılır." },
    { id: "t-68", text: "We _____ each other for years.", options: ["know", "knew", "have known", "are knowing"], correctAnswer: 2, explanation: "Uzun süredir devam eden durum." },
    { id: "t-69", text: "He _____ three books this month.", options: ["reads", "read", "has read", "is reading"], correctAnswer: 2, explanation: "Henüz bitmemiş zaman dilimi." },
    { id: "t-70", text: "They _____ their project yet.", options: ["don’t finish", "didn’t finish", "haven’t finished", "aren’t finishing"], correctAnswer: 2, explanation: "'Yet' Present Perfect ile kullanılır." },

    // Present Perfect vs Simple Past
    { id: "t-71", text: "I _____ my wallet yesterday.", options: ["lose", "lost", "have lost", "was losing"], correctAnswer: 1, explanation: "'Yesterday' Simple Past gerektirir." },
    { id: "t-72", text: "She _____ her keys, so she can’t open the door.", options: ["lost", "has lost", "loses", "was losing"], correctAnswer: 1, explanation: "Sonucu şu an etkiliyor." },
    { id: "t-73", text: "We _____ him last week.", options: ["see", "saw", "have seen", "are seeing"], correctAnswer: 1, explanation: "'Last week' Simple Past." },
    { id: "t-74", text: "He _____ never _____ abroad.", options: ["did / go", "has / gone", "is / going", "was / going"], correctAnswer: 1, explanation: "Deneyim sorularında Present Perfect." },
    { id: "t-75", text: "I _____ to Paris in 2020.", options: ["have been", "went", "have gone", "go"], correctAnswer: 1, explanation: "Zaman belli olduğu için Simple Past." },
    { id: "t-76", text: "She _____ to Paris twice.", options: ["went", "has been", "has gone", "goes"], correctAnswer: 1, explanation: "Deneyim: kaç kez sorusu." },
    { id: "t-77", text: "They _____ the match an hour ago.", options: ["have won", "won", "win", "are winning"], correctAnswer: 1, explanation: "'An hour ago' Simple Past." },
    { id: "t-78", text: "We _____ the match, so we are very happy.", options: ["won", "have won", "win", "are winning"], correctAnswer: 1, explanation: "Sonucu şu an etkiliyor." },
    { id: "t-79", text: "He _____ his homework yet.", options: ["didn’t finish", "hasn’t finished", "isn’t finishing", "doesn’t finish"], correctAnswer: 1, explanation: "'Yet' Present Perfect." },
    { id: "t-80", text: "I _____ him since last summer.", options: ["don’t see", "didn’t see", "haven’t seen", "wasn’t seeing"], correctAnswer: 2, explanation: "'Since' + Present Perfect." },

    // Mixed Review
    { id: "t-81", text: "She _____ a lot of progress this year.", options: ["makes", "made", "has made", "is making"], correctAnswer: 2, explanation: "Devam eden zaman dilimi." },
    { id: "t-82", text: "We _____ our grandparents yesterday.", options: ["visit", "visited", "have visited", "are visiting"], correctAnswer: 1, explanation: "Zaman belli." },
    { id: "t-83", text: "He _____ never _____ such a mistake before.", options: ["did / make", "has / made", "was / making", "is / making"], correctAnswer: 1, explanation: "Daha önce hiç → Present Perfect." },
    { id: "t-84", text: "They _____ in this house for ten years.", options: ["live", "lived", "have lived", "are living"], correctAnswer: 2, explanation: "For + süre → Present Perfect." },
    { id: "t-85", text: "I _____ coffee this morning.", options: ["drink", "drank", "have drunk", "am drinking"], correctAnswer: 1, explanation: "Sabah bittiği için Simple Past." },
    { id: "t-86", text: "She _____ coffee three times today.", options: ["drank", "has drunk", "drinks", "is drinking"], correctAnswer: 1, explanation: "Bugün henüz bitmedi." },
    { id: "t-87", text: "We _____ each other since childhood.", options: ["know", "knew", "have known", "are knowing"], correctAnswer: 2, explanation: "Uzun süreli durum." },
    { id: "t-88", text: "He _____ just _____ the office.", options: ["did / leave", "has / left", "is / leaving", "was / leaving"], correctAnswer: 1, explanation: "'Just' Present Perfect." },
    { id: "t-89", text: "They _____ their homework an hour ago.", options: ["finish", "finished", "have finished", "are finishing"], correctAnswer: 1, explanation: "'An hour ago' Simple Past." },
    { id: "t-90", text: "I _____ my best friend since 2010.", options: ["know", "knew", "have known", "am knowing"], correctAnswer: 2, explanation: "'Since' + Present Perfect." },
    // Present Perfect Continuous
    { id: "t-91", text: "I _____ for you for two hours.", options: ["wait", "have waited", "have been waiting", "am waiting"], correctAnswer: 2, explanation: "Geçmişten şimdiye devam eden eylem." },
    { id: "t-92", text: "She _____ English all morning.", options: ["studies", "has studied", "has been studying", "is studying"], correctAnswer: 2, explanation: "Süre vurgusu olduğu için Perfect Continuous." },
    { id: "t-93", text: "They _____ on this project since March.", options: ["work", "have worked", "have been working", "are working"], correctAnswer: 2, explanation: "'Since' + devam eden eylem." },
    { id: "t-94", text: "He looks tired because he _____ all day.", options: ["works", "has worked", "has been working", "worked"], correctAnswer: 2, explanation: "Sonucu görülen uzun eylem." },
    { id: "t-95", text: "We _____ for the bus for half an hour.", options: ["wait", "have waited", "have been waiting", "are waiting"], correctAnswer: 2, explanation: "Süre + devam eden eylem." },
    { id: "t-96", text: "I _____ to call you all morning.", options: ["try", "have tried", "have been trying", "am trying"], correctAnswer: 2, explanation: "Tekrarlanan, süren çaba." },
    { id: "t-97", text: "She _____ a lot lately.", options: ["cries", "has cried", "has been crying", "is crying"], correctAnswer: 2, explanation: "'Lately' Perfect Continuous." },
    { id: "t-98", text: "They _____ too much TV recently.", options: ["watch", "have watched", "have been watching", "are watching"], correctAnswer: 2, explanation: "'Recently' süreklilik vurgusu." },

    // Present Perfect vs Present Perfect Continuous
    { id: "t-99", text: "I _____ this book, but I haven't finished it yet.", options: ["have read", "have been reading", "read", "am reading"], correctAnswer: 1, explanation: "Eylem devam ediyor → Perfect Continuous." },
    { id: "t-100", text: "She _____ three emails this morning.", options: ["has been writing", "has written", "wrote", "writes"], correctAnswer: 1, explanation: "Tamamlanan iş sayısı → Present Perfect." },

    // Past Perfect
    { id: "t-101", text: "When I arrived, they _____ already _____.", options: ["have / left", "had / left", "did / leave", "were / leaving"], correctAnswer: 1, explanation: "Daha önce gerçekleşen eylem." },
    { id: "t-102", text: "She _____ the report before the meeting started.", options: ["finishes", "finished", "had finished", "was finishing"], correctAnswer: 2, explanation: "Toplantıdan önce biten eylem." },
    { id: "t-103", text: "We _____ dinner when the guests arrived.", options: ["have had", "had had", "were having", "are having"], correctAnswer: 1, explanation: "Misafirlerden önce yemek bitmişti." },
    { id: "t-104", text: "He _____ the movie before he read the book.", options: ["saw", "has seen", "had seen", "was seeing"], correctAnswer: 2, explanation: "İki geçmiş olaydan önce olan." },
    { id: "t-105", text: "They _____ the station by the time the train arrived.", options: ["reached", "have reached", "had reached", "were reaching"], correctAnswer: 2, explanation: "'By the time' + Past Perfect." },
    { id: "t-106", text: "I _____ my homework before I went out.", options: ["finished", "have finished", "had finished", "was finishing"], correctAnswer: 2, explanation: "Dışarı çıkmadan önce bitmişti." },
    { id: "t-107", text: "She was sad because she _____ her phone.", options: ["loses", "lost", "had lost", "has lost"], correctAnswer: 2, explanation: "Üzüntüden önce gerçekleşen olay." },
    { id: "t-108", text: "We _____ never _____ such a place before.", options: ["have / seen", "did / see", "had / seen", "were / seeing"], correctAnswer: 2, explanation: "Geçmişte başka bir geçmişten önce." },

    // Past Perfect vs Simple Past
    { id: "t-109", text: "After he _____ the exam, he felt relieved.", options: ["finishes", "finished", "had finished", "was finishing"], correctAnswer: 2, explanation: "Sınavdan sonra gelen duygu → önce Past Perfect." },
    { id: "t-110", text: "She _____ to bed after she _____ her homework.", options: ["went / finished", "went / had finished", "had gone / finished", "was going / finished"], correctAnswer: 1, explanation: "Önce biten eylem Past Perfect." },
    { id: "t-111", text: "They _____ the house before they moved in.", options: ["painted", "have painted", "had painted", "were painting"], correctAnswer: 2, explanation: "Taşınmadan önce yapılan iş." },
    { id: "t-112", text: "When we got to the cinema, the movie _____.", options: ["starts", "started", "had started", "was starting"], correctAnswer: 2, explanation: "Bizden önce başlamıştı." },

    // Review
    { id: "t-113", text: "He _____ all night, so he is exhausted.", options: ["studied", "has studied", "has been studying", "was studying"], correctAnswer: 2, explanation: "Süre + sonucu şimdi." },
    { id: "t-114", text: "She _____ the house before the guests arrived.", options: ["cleaned", "has cleaned", "had cleaned", "was cleaning"], correctAnswer: 2, explanation: "Misafirlerden önce." },
    { id: "t-115", text: "We _____ for an hour when the bus finally came.", options: ["waited", "have waited", "had been waiting", "were waiting"], correctAnswer: 2, explanation: "Geçmişte bir noktaya kadar süren eylem." },
    { id: "t-116", text: "I _____ all morning, so my hands hurt.", options: ["worked", "have worked", "have been working", "was working"], correctAnswer: 2, explanation: "Süre vurgusu." },
    { id: "t-117", text: "They _____ each other before the party.", options: ["didn't meet", "haven't met", "hadn't met", "weren't meeting"], correctAnswer: 2, explanation: "Partiden önce tanışmamışlardı." },

    // Transition
    { id: "t-118", text: "She _____ for two hours before the help arrived.", options: ["cried", "has cried", "had been crying", "was crying"], correctAnswer: 2, explanation: "Geçmişte uzun süre devam eden eylem." },
    { id: "t-119", text: "We _____ the room when the lights went out.", options: ["cleaned", "were cleaning", "had cleaned", "have cleaned"], correctAnswer: 1, explanation: "Devam eden eylem kesildi." },
    { id: "t-120", text: "He _____ already _____ dinner when I called him.", options: ["has / had", "had / had", "did / have", "was / having"], correctAnswer: 1, explanation: "Aramadan önce yemek bitmişti." },
    // Simple Future (will)
    { id: "t-121", text: "I think she _____ pass the exam.", options: ["is", "will", "is going to", "was"], correctAnswer: 1, explanation: "Anlık fikir ve tahminlerde 'will' kullanılır." },
    { id: "t-122", text: "Don’t worry, I _____ help you.", options: ["am helping", "help", "will help", "helped"], correctAnswer: 2, explanation: "O anda verilen kararlar 'will' ile ifade edilir." },
    { id: "t-123", text: "I’m sure they _____ understand you.", options: ["are", "will", "are going to", "were"], correctAnswer: 1, explanation: "Kişisel tahminlerde 'will'." },
    { id: "t-124", text: "I promise I _____ late again.", options: ["am not", "won’t be", "don’t be", "wasn’t"], correctAnswer: 1, explanation: "Söz verme durumlarında 'will' kullanılır." },
    { id: "t-125", text: "Wait a minute, I _____ the door.", options: ["open", "am opening", "will open", "opened"], correctAnswer: 2, explanation: "O anda verilen karar." },

    // Future (going to)
    { id: "t-126", text: "Look at those dark clouds! It _____ rain.", options: ["will", "is going to", "rains", "rained"], correctAnswer: 1, explanation: "Gözleme dayalı tahminlerde 'going to'." },
    { id: "t-127", text: "She _____ study medicine next year.", options: ["will", "is going to", "studies", "studied"], correctAnswer: 1, explanation: "Önceden planlanmış gelecek." },
    { id: "t-128", text: "They _____ buy a new car soon.", options: ["will", "are going to", "buy", "bought"], correctAnswer: 1, explanation: "Plan ve niyetler 'going to'." },
    { id: "t-129", text: "We _____ visit our relatives this weekend.", options: ["will", "are going to", "visit", "visited"], correctAnswer: 1, explanation: "Önceden karar verilmiş plan." },
    { id: "t-130", text: "He _____ quit his job.", options: ["will", "is going to", "quits", "quit"], correctAnswer: 1, explanation: "Niyet bildirimi." },

    // will vs going to
    { id: "t-131", text: "I didn’t know it was cold. I _____ the window.", options: ["am closing", "will close", "am going to close", "closed"], correctAnswer: 1, explanation: "Anlık karar → will." },
    { id: "t-132", text: "She already decided. She _____ abroad.", options: ["will go", "is going to go", "goes", "went"], correctAnswer: 1, explanation: "Önceden verilmiş karar → going to." },
    { id: "t-133", text: "Watch out! You _____ fall.", options: ["will", "are going to", "fell", "fall"], correctAnswer: 1, explanation: "Kesin işaretlere dayalı tahmin." },

    // Future Continuous
    { id: "t-134", text: "This time tomorrow, I _____ on the plane.", options: ["will sit", "will be sitting", "am sitting", "sat"], correctAnswer: 1, explanation: "Gelecekte belli bir anda devam eden eylem." },
    { id: "t-135", text: "At 8 p.m., we _____ dinner.", options: ["will have", "will be having", "are having", "had"], correctAnswer: 1, explanation: "Belirli bir gelecekte devam eden eylem." },
    { id: "t-136", text: "Don’t call me at noon. I _____ an exam.", options: ["will take", "will be taking", "take", "took"], correctAnswer: 1, explanation: "O anda devam edecek eylem." },
    { id: "t-137", text: "Next week, she _____ with her family.", options: ["will stay", "will be staying", "stays", "stayed"], correctAnswer: 1, explanation: "Geçici gelecek planı." },
    { id: "t-138", text: "At this time next year, they _____ abroad.", options: ["will live", "will be living", "live", "lived"], correctAnswer: 1, explanation: "Gelecekte devam eden durum." },

    // Mixed Future Review
    { id: "t-139", text: "I think robots _____ many jobs in the future.", options: ["replace", "will replace", "are replacing", "replaced"], correctAnswer: 1, explanation: "Gelecek tahmini." },
    { id: "t-140", text: "She _____ a baby next month.", options: ["will have", "is going to have", "has", "had"], correctAnswer: 1, explanation: "Kesin plan ve kanıt → going to." },
    { id: "t-141", text: "I’m tired. I _____ go to bed early tonight.", options: ["will", "am going to", "go", "went"], correctAnswer: 1, explanation: "Mevcut duruma bağlı karar." },
    { id: "t-142", text: "Don’t worry, everything _____ fine.", options: ["is", "will be", "is going to be", "was"], correctAnswer: 1, explanation: "Teselli ve tahmin → will." },
    { id: "t-143", text: "He _____ probably be late.", options: ["is", "will", "is going to", "was"], correctAnswer: 1, explanation: "Olasılık bildirimi." },

    // Final Review
    { id: "t-144", text: "We _____ a meeting at 10 tomorrow.", options: ["will have", "are going to have", "have", "had"], correctAnswer: 1, explanation: "Önceden planlanmış gelecek." },
    { id: "t-145", text: "This time next week, I _____ in London.", options: ["stay", "will be staying", "will stay", "stayed"], correctAnswer: 1, explanation: "Future Continuous kullanımı." },
    { id: "t-146", text: "She _____ answer the phone. She’s in the shower.", options: ["won’t", "isn’t going to", "doesn’t", "didn’t"], correctAnswer: 1, explanation: "Mevcut kanıta dayalı olumsuz tahmin." },
    { id: "t-147", text: "I _____ you as soon as I arrive.", options: ["will call", "call", "am calling", "called"], correctAnswer: 0, explanation: "Zaman cümleciklerinde 'will' kullanılmaz, ana cümlede kullanılır." },
    { id: "t-148", text: "They _____ the results tomorrow.", options: ["announce", "will announce", "are announcing", "announced"], correctAnswer: 1, explanation: "Gelecek zaman bildirimi." },
    { id: "t-149", text: "By this time tomorrow, we _____ the exam.", options: ["finish", "will finish", "will be finishing", "finished"], correctAnswer: 2, explanation: "Gelecekte belirli bir anda devam eden eylem." },
    { id: "t-150", text: "I _____ my homework before dinner.", options: ["will finish", "am finishing", "finished", "finish"], correctAnswer: 0, explanation: "Geleceğe yönelik plan." }

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
