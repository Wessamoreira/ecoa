import { mod, sec, w } from './helpers.ts'
import type { Audience } from './types.ts'

const TA: Audience[] = ['teen', 'adult']
const pv = { pos: 'phrasal verb' }

export const b1Modules2 = [
  mod(
    {
      id: 'b1-gerund', level: 'B1', audiences: TA, title: 'Gerúndio × infinitivo', subtitle: 'Enjoy doing ou want to do?',
      emoji: '🔁', category: 'Gramática', photo: 'fork in the road',
      lesson: [
        sec('Depende do verbo anterior', 'Alguns verbos pedem -ING (enjoy, avoid, finish, mind, suggest, keep). Outros pedem TO + verbo (want, need, decide, hope, plan, promise, refuse). Não há lógica — memorize com exemplos.'),
        sec('Muda o sentido!', 'Com stop, remember, forget e try, as duas formas existem, mas com sentidos diferentes.', [
          ['Verbo', '+ -ING', '+ TO'], ['stop', 'parar de fazer', 'parar PARA fazer'], ['remember', 'lembrar de ter feito', 'lembrar de fazer'], ['try', 'experimentar', 'esforçar-se para'],
        ]),
      ],
    },
    [
      w('enjoy + -ing', '/ɪnˈdʒɔɪ/', 'gostar de fazer', '😊', [['I enjoy reading before bed.', 'Gosto de ler antes de dormir.']], 'Nunca "enjoy to read".', { lookup: 'enjoy', pos: 'estrutura' }),
      w('avoid + -ing', '/əˈvɔɪd/', 'evitar fazer', '🚧', [['Avoid using your phone while driving.', 'Evite usar o celular enquanto dirige.']], undefined, { lookup: 'avoid', pos: 'estrutura' }),
      w('mind + -ing', '/maɪnd/', 'se importar de', '🙏', [['Do you mind waiting a minute?', 'Você se importa de esperar um minuto?']], 'Resposta educada de "sim, pode": "No, not at all!"', { lookup: 'mind', pos: 'estrutura' }),
      w('want / need / decide + to', '', 'querer / precisar / decidir + verbo', '🎯', [['I decided to quit my job.', 'Decidi largar meu emprego.'], ['We need to talk.', 'Precisamos conversar.']], undefined, { lookup: 'decide', pos: 'estrutura' }),
      w('stop doing × stop to do', '', 'parar de fazer × parar para fazer', '🛑', [['I stopped smoking.', 'Parei de fumar.'], ['I stopped to smoke.', 'Parei para fumar.']], undefined, { lookup: 'stop', pos: 'contraste' }),
      w('remember doing × remember to do', '', 'lembrar de ter feito × lembrar de fazer', '🧠', [['I remember locking the door.', 'Lembro de ter trancado a porta.'], ['Remember to lock the door!', 'Lembre-se de trancar a porta!']], undefined, { lookup: 'remember', pos: 'contraste' }),
      w('try doing × try to do', '', 'experimentar × tentar (com esforço)', '🧪', [['Try restarting your computer.', 'Experimente reiniciar o computador.'], ["I'm trying to sleep!", 'Estou tentando dormir!']], undefined, { lookup: 'try', pos: 'contraste' }),
      w('preposição + -ing', '', 'depois de preposição, sempre -ing', '🔗', [["I'm good at cooking.", 'Sou bom em cozinhar.'], ['Thanks for helping me.', 'Obrigado por me ajudar.']], 'Depois de at, in, on, for, about, without, before, after → verbo com -ING.', { lookup: 'preposition', pos: 'regra' }),
      w('be used to + -ing', '/biː juːst tə/', 'estar acostumado a', '🛋️', [["I'm used to waking up early.", 'Estou acostumado a acordar cedo.'], ["I'm getting used to living alone.", 'Estou me acostumando a morar sozinho.']], 'Não confunda com "used to" (costumava). Aqui o TO é preposição → -ING.', { lookup: 'used', pos: 'estrutura' }),
      w('-ing como sujeito', '', 'verbo como sujeito da frase', '🏊', [['Swimming is great exercise.', 'Nadar é um ótimo exercício.'], ['Learning English opens doors.', 'Aprender inglês abre portas.']], 'Português usa infinitivo ("Nadar é..."); inglês usa -ING.', { lookup: 'swimming', pos: 'regra' }),
    ],
  ),
  mod(
    {
      id: 'b1-relative', level: 'B1', audiences: TA, title: 'Orações relativas', subtitle: 'Who, which, that, where, whose',
      emoji: '🔗', category: 'Gramática',
      lesson: [sec('Ligando informações', 'Pronomes relativos juntam duas frases: "I have a friend. She lives in Paris." → "I have a friend WHO lives in Paris." WHO = pessoas, WHICH = coisas, THAT = ambos (informal).')],
    },
    [
      w('who', '/huː/', 'que, quem (pessoas)', '🧑', [['The woman who called you is my boss.', 'A mulher que te ligou é minha chefe.']], undefined, { pos: 'pronome relativo' }),
      w('which', '/wɪtʃ/', 'que, o qual (coisas)', '📦', [['The book which I bought is great.', 'O livro que comprei é ótimo.']], undefined, { pos: 'pronome relativo' }),
      w('that', '/ðæt/', 'que (pessoas e coisas)', '🔗', [["It's the best movie that I've ever seen.", 'É o melhor filme que já vi.']], 'Depois de superlativos e de "all, everything, nothing", prefira THAT.', { pos: 'pronome relativo' }),
      w('where', '/weə/', 'onde (lugares)', '🏠', [["That's the restaurant where we met.", 'Aquele é o restaurante onde nos conhecemos.']], undefined, { pos: 'pronome relativo' }),
      w('whose', '/huːz/', 'cujo, de quem', '🔑', [["That's the guy whose car was stolen.", 'Aquele é o cara cujo carro foi roubado.']], undefined, { pos: 'pronome relativo' }),
      w('omitindo o pronome', '', 'quando o relativo é objeto, pode sumir', '✂️', [['The movie (that) we watched was boring.', 'O filme que assistimos foi chato.']], 'Nativos omitem MUITO: "the girl I love", "the car he bought".', { lookup: 'relative', pos: 'regra' }),
      w(', which (comentário)', '', 'o que (referindo-se à frase toda)', '💬', [['He was late again, which annoyed everyone.', 'Ele se atrasou de novo, o que irritou todo mundo.']], 'Com vírgula, só WHICH (nunca THAT).', { lookup: 'which', pos: 'estrutura' }),
    ],
  ),
  mod(
    {
      id: 'b1-ed-ing', level: 'B1', audiences: TA, title: 'Adjetivos -ED × -ING', subtitle: 'Bored ou boring? A diferença que muda tudo',
      emoji: '😴', category: 'Gramática', photo: 'yawning cat',
      lesson: [sec('Sentir × causar', '-ED = como a pessoa SE SENTE. -ING = o que CAUSA o sentimento. "I\'m bored" = estou entediado. "I\'m boring" = eu sou chato! 😅')],
    },
    [
      w('bored / boring', '/bɔːd/ /ˈbɔːrɪŋ/', 'entediado / chato, entediante', '🥱', [["I'm bored. This class is boring.", 'Estou entediado. Esta aula é chata.']], undefined, { lookup: 'boring', pos: 'adjetivo' }),
      w('interested / interesting', '/ˈɪntrəstɪd/ /ˈɪntrəstɪŋ/', 'interessado / interessante', '🧐', [["I'm interested in history.", 'Tenho interesse em história.'], ['What an interesting idea!', 'Que ideia interessante!']], 'Interested IN (nunca "interested on").', { lookup: 'interesting', pos: 'adjetivo' }),
      w('tired / tiring', '/ˈtaɪəd/ /ˈtaɪərɪŋ/', 'cansado / cansativo', '😮‍💨', [['The trip was tiring. I\'m so tired.', 'A viagem foi cansativa. Estou muito cansado.']], undefined, { lookup: 'tiring', pos: 'adjetivo' }),
      w('excited / exciting', '/ɪkˈsaɪtɪd/ /ɪkˈsaɪtɪŋ/', 'animado / empolgante', '🤩', [["I'm excited about the trip!", 'Estou animado com a viagem!']], 'Excited NÃO é "excitado" (sentido sexual em português)!', { lookup: 'exciting', pos: 'adjetivo' }),
      w('confused / confusing', '/kənˈfjuːzd/ /kənˈfjuːzɪŋ/', 'confuso (pessoa) / confuso (coisa)', '😵‍💫', [['These instructions are confusing.', 'Estas instruções são confusas.']], undefined, { lookup: 'confusing', pos: 'adjetivo' }),
      w('surprised / surprising', '/səˈpraɪzd/ /səˈpraɪzɪŋ/', 'surpreso / surpreendente', '😲', [['I was surprised by the news.', 'Fiquei surpreso com a notícia.']], undefined, { lookup: 'surprising', pos: 'adjetivo' }),
      w('embarrassed / embarrassing', '/ɪmˈbærəst/ /ɪmˈbærəsɪŋ/', 'envergonhado / constrangedor', '😳', [['That was so embarrassing!', 'Aquilo foi muito constrangedor!']], 'Falso cognato: NÃO é "embaraçado". Grávida é "pregnant"!', { lookup: 'embarrassing', pos: 'adjetivo' }),
      w('annoyed / annoying', '/əˈnɔɪd/ /əˈnɔɪɪŋ/', 'irritado / irritante', '😤', [['That noise is really annoying.', 'Esse barulho é muito irritante.']], undefined, { lookup: 'annoying', pos: 'adjetivo' }),
    ],
  ),
  mod(
    {
      id: 'b1-makedo', level: 'B1', audiences: TA, title: 'Make × Do', subtitle: 'As collocations que mais confundem',
      emoji: '🛠️', category: 'Vocabulário', photo: 'workshop tools',
      lesson: [sec('A regra geral', 'MAKE = criar, produzir, causar algo novo (make a cake, make noise). DO = realizar atividades, tarefas e trabalho (do homework, do the dishes). Há exceções — aprenda os blocos.')],
    },
    [
      w('make a mistake', '', 'cometer um erro', '❌', [['Everyone makes mistakes.', 'Todo mundo comete erros.']], 'Nunca "do a mistake".', { lookup: 'mistake', pos: 'collocation' }),
      w('make money', '', 'ganhar dinheiro', '💵', [['He makes a lot of money.', 'Ele ganha muito dinheiro.']], undefined, { lookup: 'money', pos: 'collocation' }),
      w('make friends', '', 'fazer amigos', '🤝', [['It\'s easy to make friends here.', 'É fácil fazer amigos aqui.']], undefined, { lookup: 'friends', pos: 'collocation' }),
      w('make an effort', '', 'fazer um esforço', '💪', [['Please make an effort to arrive on time.', 'Por favor, se esforce para chegar no horário.']], undefined, { lookup: 'effort', pos: 'collocation' }),
      w('make sense', '', 'fazer sentido', '💡', [["That doesn't make sense.", 'Isso não faz sentido.']], undefined, { lookup: 'sense', pos: 'collocation' }),
      w('make plans', '', 'fazer planos', '🗓️', [["Let's make plans for the weekend.", 'Vamos fazer planos para o fim de semana.']], undefined, { lookup: 'plans', pos: 'collocation' }),
      w('make a phone call', '', 'fazer uma ligação', '📞', [['I need to make a quick call.', 'Preciso fazer uma ligação rápida.']], undefined, { lookup: 'call', pos: 'collocation' }),
      w('do your best', '', 'fazer o seu melhor', '🏅', [["Don't worry, just do your best.", 'Não se preocupe, só faça o seu melhor.']], undefined, { lookup: 'best', pos: 'collocation' }),
      w('do someone a favor', '', 'fazer um favor', '🙏', [['Can you do me a favor?', 'Pode me fazer um favor?']], undefined, { lookup: 'favor', pos: 'collocation' }),
      w('do business', '', 'fazer negócios', '🤝', [["We've done business with them for years.", 'Fazemos negócios com eles há anos.']], undefined, { lookup: 'business', pos: 'collocation' }),
      w('do the laundry', '', 'lavar a roupa', '🧺', [['I do the laundry on Sundays.', 'Lavo roupa aos domingos.']], undefined, { lookup: 'laundry', pos: 'collocation' }),
      w('do research', '', 'pesquisar', '🔬', [['I did some research before buying.', 'Pesquisei antes de comprar.']], '"Research" é incontável: nunca "researches".', { lookup: 'research', pos: 'collocation' }),
    ],
  ),
  mod(
    {
      id: 'b1-personality', level: 'B1', audiences: TA, title: 'Personalidade e emoções', subtitle: 'Descreva pessoas com precisão',
      emoji: '🧠', category: 'Vocabulário',
      lesson: [sec('Como ele é?', '"What is she like?" pergunta a PERSONALIDADE. "What does she look like?" pergunta a APARÊNCIA. Responda: "She\'s outgoing and really funny."')],
    },
    [
      w('outgoing', '/ˈaʊtɡəʊɪŋ/', 'extrovertido, sociável', '🥳', [["She's very outgoing — she talks to everyone.", 'Ela é muito sociável — conversa com todo mundo.']], undefined, { pos: 'adjetivo' }),
      w('shy', '/ʃaɪ/', 'tímido', '🙈', [["He's a bit shy at first.", 'Ele é um pouco tímido no começo.']], undefined, { pos: 'adjetivo' }),
      w('hard-working', '/ˌhɑːd ˈwɜːkɪŋ/', 'esforçado, trabalhador', '🐝', [['Our team is very hard-working.', 'Nossa equipe é muito esforçada.']], undefined, { lookup: 'hard-working', pos: 'adjetivo' }),
      w('lazy', '/ˈleɪzi/', 'preguiçoso', '🦥', [["Don't be lazy — get up!", 'Não seja preguiçoso — levanta!']], undefined, { pos: 'adjetivo' }),
      w('reliable', '/rɪˈlaɪəbl/', 'confiável', '🛡️', [['I need someone reliable.', 'Preciso de alguém confiável.']], undefined, { pos: 'adjetivo' }),
      w('easygoing', '/ˌiːziˈɡəʊɪŋ/', 'tranquilo, de boa', '😌', [["My dad is very easygoing.", 'Meu pai é muito tranquilo.']], undefined, { pos: 'adjetivo' }),
      w('stubborn', '/ˈstʌbən/', 'teimoso', '🐐', [["Don't be so stubborn!", 'Não seja tão teimoso!']], undefined, { pos: 'adjetivo' }),
      w('generous', '/ˈdʒenərəs/', 'generoso', '🎁', [['Thank you, that\'s very generous.', 'Obrigado, é muito generoso da sua parte.']], undefined, { pos: 'adjetivo' }),
      w('moody', '/ˈmuːdi/', 'de humor instável', '🌦️', [["He's been moody all week.", 'Ele está de mau humor a semana toda.']], undefined, { pos: 'adjetivo' }),
      w('confident', '/ˈkɒnfɪdənt/', 'confiante, seguro', '😎', [['She sounded confident in the interview.', 'Ela pareceu segura na entrevista.']], 'Confidente (pessoa) em inglês é "confidant".', { pos: 'adjetivo' }),
      w('upset', '/ʌpˈset/', 'chateado', '😞', [['Are you upset with me?', 'Você está chateado comigo?']], undefined, { pos: 'adjetivo' }),
      w('proud of', '/praʊd əv/', 'orgulhoso de', '🥹', [["I'm so proud of you!", 'Estou muito orgulhoso de você!']], undefined, { lookup: 'proud', pos: 'adjetivo' }),
      w('What is she like?', '', 'Como ela é (personalidade)?', '❔', [["What's your boss like? — She's strict but fair.", 'Como é sua chefe? — Exigente, mas justa.']], 'Não confunda com "What does she like?" (do que ela gosta?).', { lookup: 'like', pos: 'expressão' }),
    ],
  ),
]

export const b2c1Modules2 = [
  mod(
    {
      id: 'b2-phrasal2', level: 'B2', audiences: TA, title: 'Phrasal verbs avançados', subtitle: 'Mais 22 que nativos usam todo dia',
      emoji: '🧲', category: 'Verbos',
      lesson: [sec('Pense em imagens', 'Muitas partículas têm um sentido-base: UP = completar/aumentar (use up, turn up), DOWN = reduzir/recusar (cut down, turn down), OUT = até o fim/descobrir (sort out, carry out), OFF = separar/cancelar (drop off, call off).')],
    },
    [
      w('carry out', '/ˈkæri aʊt/', 'realizar, executar', '⚙️', [['The team carried out a survey.', 'A equipe realizou uma pesquisa.', 'Simple Past']], undefined, { ...pv, lookup: 'carry' }),
      w('come across', '/kʌm əˈkrɒs/', 'encontrar por acaso / parecer', '🔎', [['I came across an old photo.', 'Encontrei uma foto antiga por acaso.'], ['He comes across as arrogant.', 'Ele passa a impressão de ser arrogante.']], undefined, { ...pv, lookup: 'come' }),
      w('cut down on', '/kʌt daʊn ɒn/', 'reduzir (consumo)', '✂️', [["I'm trying to cut down on sugar.", 'Estou tentando reduzir o açúcar.']], undefined, { ...pv, lookup: 'cut' }),
      w('drop off', '/drɒp ɒf/', 'deixar (alguém/algo em um lugar)', '🚗', [["I'll drop you off at the airport.", 'Eu te deixo no aeroporto.']], 'Oposto de "pick up".', { ...pv, lookup: 'drop' }),
      w('fall apart', '/fɔːl əˈpɑːt/', 'desmoronar, se desfazer', '🧱', [['My old shoes are falling apart.', 'Meus sapatos velhos estão se desmanchando.']], undefined, { ...pv, lookup: 'fall' }),
      w('get rid of', '/ɡet rɪd əv/', 'se livrar de', '🗑️', [['I need to get rid of these old clothes.', 'Preciso me livrar dessas roupas velhas.']], undefined, { ...pv, lookup: 'rid' }),
      w('give in', '/ɡɪv ɪn/', 'ceder, se render', '🏳️', [['The kids kept asking, so I gave in.', 'As crianças ficaram pedindo, então cedi.', 'Simple Past']], undefined, { ...pv, lookup: 'give' }),
      w('go through', '/ɡəʊ θruː/', 'passar por (dificuldade) / revisar', '🌧️', [["She's going through a hard time.", 'Ela está passando por um momento difícil.']], undefined, { ...pv, lookup: 'through' }),
      w('hold on', '/həʊld ɒn/', 'esperar um momento / segurar firme', '✋', [['Hold on, let me check.', 'Espera, deixa eu verificar.']], undefined, { ...pv, lookup: 'hold' }),
      w('keep up with', '/kiːp ʌp wɪð/', 'acompanhar (o ritmo)', '🏃', [["It's hard to keep up with the news.", 'É difícil acompanhar as notícias.']], undefined, { ...pv, lookup: 'keep' }),
      w('let down', '/let daʊn/', 'decepcionar', '😞', [["Don't let me down.", 'Não me decepcione.']], undefined, { ...pv, lookup: 'let' }),
      w('look into', '/lʊk ˈɪntuː/', 'investigar, analisar', '🕵️', [["We'll look into the problem.", 'Vamos analisar o problema.']], undefined, { ...pv, lookup: 'look' }),
      w('look up to', '/lʊk ʌp tə/', 'admirar, ter como exemplo', '🌟', [['I\'ve always looked up to my mother.', 'Sempre admirei minha mãe.']], undefined, { ...pv, lookup: 'look' }),
      w('run into', '/rʌn ˈɪntuː/', 'esbarrar com alguém / enfrentar', '😮', [['I ran into my ex at the mall.', 'Esbarrei com meu ex no shopping.', 'Simple Past']], undefined, { ...pv, lookup: 'run' }),
      w('sort out', '/sɔːt aʊt/', 'resolver, organizar', '🗂️', [["Don't worry, I'll sort it out.", 'Não se preocupe, eu resolvo.']], undefined, { ...pv, lookup: 'sort' }),
      w('take over', '/teɪk ˈəʊvə/', 'assumir (controle/cargo)', '🎬', [['She took over as CEO in 2024.', 'Ela assumiu como CEO em 2024.', 'Simple Past']], 'Takeover (junto) = aquisição de empresa.', { ...pv, lookup: 'take' }),
      w('turn down', '/tɜːn daʊn/', 'recusar / abaixar (volume)', '👎', [['He turned down the job offer.', 'Ele recusou a oferta de emprego.'], ['Turn down the music!', 'Abaixa a música!']], undefined, { ...pv, lookup: 'turn' }),
      w('turn up', '/tɜːn ʌp/', 'aparecer / aumentar (volume)', '🔊', [['She turned up late, as usual.', 'Ela apareceu atrasada, como sempre.']], undefined, { ...pv, lookup: 'turn' }),
      w('back up', '/bæk ʌp/', 'apoiar / fazer backup', '💾', [['Always back up your files.', 'Sempre faça backup dos seus arquivos.'], ['Thanks for backing me up in the meeting.', 'Obrigado por me apoiar na reunião.']], undefined, { ...pv, lookup: 'backup' }),
      w('bring about', '/brɪŋ əˈbaʊt/', 'causar, provocar (mudança)', '🌀', [['Technology has brought about huge changes.', 'A tecnologia provocou grandes mudanças.']], undefined, { ...pv, lookup: 'bring' }),
      w('pass out', '/pɑːs aʊt/', 'desmaiar', '😵', [['He passed out from the heat.', 'Ele desmaiou de calor.']], undefined, { ...pv, lookup: 'pass' }),
      w('opt out', '/ɒpt aʊt/', 'optar por não participar', '🚪', [['You can opt out of the newsletter.', 'Você pode cancelar a inscrição na newsletter.']], undefined, { ...pv, lookup: 'opt' }),
    ],
  ),
  mod(
    {
      id: 'b2-opinion', level: 'B2', audiences: TA, title: 'Opinião e debate', subtitle: 'Concordar, discordar e argumentar com educação',
      emoji: '🗣️', category: 'Fluência', photo: 'conference debate microphone',
      lesson: [sec('Discordar sem ser rude', 'Falantes de inglês suavizam a discordância: em vez de "You\'re wrong", diga "I see your point, but..." ou "I\'m not so sure about that." Isso é essencial em reuniões e provas orais.')],
    },
    [
      w('In my opinion...', '', 'Na minha opinião...', '💭', [['In my opinion, remote work is more productive.', 'Na minha opinião, o trabalho remoto é mais produtivo.']], 'Nunca "In my opinion, I think..." — é redundante.', { lookup: 'opinion', pos: 'expressão' }),
      w('As far as I\'m concerned', '', 'No que me diz respeito / Para mim', '🧍', [["As far as I'm concerned, it's a bad idea.", 'Para mim, é uma má ideia.']], undefined, { lookup: 'concerned', pos: 'expressão' }),
      w('The way I see it...', '', 'Do jeito que eu vejo...', '👓', [['The way I see it, we have two options.', 'Do jeito que eu vejo, temos duas opções.']], undefined, { lookup: 'see', pos: 'expressão' }),
      w('I couldn\'t agree more', '', 'Concordo totalmente', '💯', [["You're absolutely right. I couldn't agree more.", 'Você está certíssimo. Concordo totalmente.']], 'Parece negativo, mas é a concordância mais forte!', { lookup: 'agree', pos: 'expressão' }),
      w('I see your point, but...', '', 'Entendo seu ponto, mas...', '🤝', [["I see your point, but it's too expensive.", 'Entendo seu ponto, mas é caro demais.']], undefined, { lookup: 'point', pos: 'expressão' }),
      w("I'm not so sure about that", '', 'Não tenho tanta certeza', '🤨', [["I'm not so sure about that. Have you checked the numbers?", 'Não tenho tanta certeza. Você conferiu os números?']], undefined, { lookup: 'sure', pos: 'expressão' }),
      w('That\'s a good point', '', 'Bem observado', '✔️', [["That's a good point. I hadn't thought of that.", 'Bem observado. Eu não tinha pensado nisso.']], undefined, { lookup: 'point', pos: 'expressão' }),
      w('To be honest...', '', 'Para ser sincero...', '🫣', [["To be honest, I didn't like the movie.", 'Para ser sincero, não gostei do filme.']], 'Abreviação em mensagens: "tbh".', { lookup: 'honest', pos: 'expressão' }),
      w('It depends on...', '', 'Depende de...', '⚖️', [['It depends on the price.', 'Depende do preço.']], 'Sempre "depend ON" (nunca "depend of").', { lookup: 'depend', pos: 'expressão' }),
      w("Let's agree to disagree", '', 'Vamos concordar em discordar', '🕊️', [["We'll never agree on politics. Let's agree to disagree.", 'Nunca vamos concordar sobre política. Vamos concordar em discordar.']], undefined, { lookup: 'disagree', pos: 'expressão' }),
      w('Having said that...', '', 'Dito isso... / Por outro lado...', '↪️', [["It's expensive. Having said that, it's worth every penny.", 'É caro. Dito isso, vale cada centavo.']], undefined, { lookup: 'said', pos: 'expressão' }),
    ],
  ),
  mod(
    {
      id: 'c1-academic', level: 'C1', audiences: TA, title: 'Vocabulário acadêmico', subtitle: 'Para IELTS, TOEFL, artigos e relatórios',
      emoji: '🏛️', category: 'Escrita', photo: 'university library books',
      lesson: [sec('A lista acadêmica', 'Estas palavras aparecem em textos científicos, relatórios e provas internacionais. Usá-las com precisão mostra domínio C1 — mas na conversa do dia a dia, prefira equivalentes simples.')],
    },
    [
      w('analyze', '/ˈænəlaɪz/', 'analisar', '🔬', [['We analyzed the data from 2020 to 2025.', 'Analisamos os dados de 2020 a 2025.']], 'UK: analyse. Substantivo: analysis (plural: analyses).', { pos: 'verbo' }),
      w('assess', '/əˈses/', 'avaliar', '📋', [['It is difficult to assess the impact.', 'É difícil avaliar o impacto.']], undefined, { pos: 'verbo' }),
      w('crucial', '/ˈkruːʃl/', 'crucial, decisivo', '🔑', [['Sleep is crucial for memory.', 'O sono é crucial para a memória.']], undefined, { pos: 'adjetivo' }),
      w('evidence', '/ˈevɪdəns/', 'evidência, provas', '📎', [['There is little evidence to support this claim.', 'Há poucas evidências que sustentem essa afirmação.']], 'Incontável: "a piece of evidence", nunca "evidences".', { pos: 'substantivo' }),
      w('significant', '/sɪɡˈnɪfɪkənt/', 'significativo, relevante', '📈', [['There was a significant increase in sales.', 'Houve um aumento significativo nas vendas.']], undefined, { pos: 'adjetivo' }),
      w('consistent', '/kənˈsɪstənt/', 'coerente, constante', '📏', [['The results are consistent with previous studies.', 'Os resultados são coerentes com estudos anteriores.']], 'Não é "consistente" no sentido de "sólido/grosso".', { pos: 'adjetivo' }),
      w('hypothesis', '/haɪˈpɒθəsɪs/', 'hipótese', '💡', [['The data supports our hypothesis.', 'Os dados sustentam nossa hipótese.']], 'Plural: hypotheses /haɪˈpɒθəsiːz/.', { pos: 'substantivo' }),
      w('framework', '/ˈfreɪmwɜːk/', 'estrutura, referencial', '🧱', [['We need a clear framework for decisions.', 'Precisamos de uma estrutura clara para decisões.']], undefined, { pos: 'substantivo' }),
      w('undermine', '/ˌʌndəˈmaɪn/', 'minar, enfraquecer', '⛏️', [['Corruption undermines public trust.', 'A corrupção mina a confiança pública.']], undefined, { pos: 'verbo' }),
      w('widespread', '/ˈwaɪdspred/', 'generalizado, amplo', '🌐', [['The use of AI is now widespread.', 'O uso de IA agora é generalizado.']], undefined, { pos: 'adjetivo' }),
      w('substantial', '/səbˈstænʃl/', 'substancial, considerável', '🏋️', [['A substantial amount of money.', 'Uma quantia considerável de dinheiro.']], undefined, { pos: 'adjetivo' }),
      w('ubiquitous', '/juːˈbɪkwɪtəs/', 'onipresente', '📱', [['Smartphones are ubiquitous.', 'Os smartphones estão em toda parte.']], undefined, { pos: 'adjetivo' }),
      w('nuance', '/ˈnjuːɑːns/', 'nuance, sutileza', '🎨', [['Translation often loses the nuances of the original.', 'A tradução muitas vezes perde as nuances do original.']], undefined, { pos: 'substantivo' }),
      w('derive from', '/dɪˈraɪv frəm/', 'derivar de, originar-se de', '🌳', [['Many English words derive from Latin.', 'Muitas palavras em inglês derivam do latim.']], undefined, { lookup: 'derive', pos: 'verbo' }),
    ],
  ),
  mod(
    {
      id: 'c1-nuance', level: 'C1', audiences: TA, title: 'Advérbios de nuance', subtitle: 'Arguably, barely, presumably...',
      emoji: '🎚️', category: 'Fluência', photo: 'sound mixer sliders',
      lesson: [sec('Afinando o tom', 'Advérbios como "arguably", "presumably" e "virtually" ajustam o grau de certeza e a atitude do falante. São um marcador claro de fluência avançada.')],
    },
    [
      w('arguably', '/ˈɑːɡjuəbli/', 'provavelmente, possivelmente (defensável)', '🏆', [["She's arguably the best player in the world.", 'Ela é, possivelmente, a melhor jogadora do mundo.']], 'Indica que dá para defender a afirmação com argumentos.', { pos: 'advérbio' }),
      w('barely / hardly', '/ˈbeəli/ /ˈhɑːdli/', 'mal, quase não', '🤏', [['I could barely hear you.', 'Eu mal conseguia te ouvir.'], ['I hardly ever eat meat.', 'Quase nunca como carne.']], '"Hardly" NÃO é "duramente" (isso é "hard").', { lookup: 'barely', pos: 'advérbio' }),
      w('presumably', '/prɪˈzjuːməbli/', 'presumivelmente, imagino que', '🤔', [['Presumably, the meeting was cancelled.', 'Imagino que a reunião tenha sido cancelada.']], undefined, { pos: 'advérbio' }),
      w('allegedly', '/əˈledʒɪdli/', 'supostamente (acusação)', '⚖️', [['He allegedly stole the documents.', 'Ele supostamente roubou os documentos.']], 'Muito usado em jornalismo.', { pos: 'advérbio' }),
      w('virtually', '/ˈvɜːtʃuəli/', 'praticamente', '💯', [["It's virtually impossible.", 'É praticamente impossível.']], 'Também significa "virtualmente" (online).', { pos: 'advérbio' }),
      w('merely', '/ˈmɪəli/', 'meramente, apenas', '🪶', [['It was merely a suggestion.', 'Foi apenas uma sugestão.']], undefined, { pos: 'advérbio' }),
      w('inevitably', '/ɪnˈevɪtəbli/', 'inevitavelmente', '⏳', [['Prices will inevitably rise.', 'Os preços vão inevitavelmente subir.']], undefined, { pos: 'advérbio' }),
      w('reluctantly', '/rɪˈlʌktəntli/', 'relutantemente, a contragosto', '😒', [['He reluctantly agreed.', 'Ele concordou a contragosto.']], undefined, { pos: 'advérbio' }),
      w('notoriously', '/nəʊˈtɔːriəsli/', 'notoriamente (negativo)', '📢', [['The city is notoriously expensive.', 'A cidade é notoriamente cara.']], 'Tem conotação negativa. Para positivo: "famously".', { pos: 'advérbio' }),
      w('kind of / sort of', '/kaɪnd əv/ /sɔːt əv/', 'meio que, tipo', '🤷', [["I'm kind of tired.", 'Estou meio cansado.']], 'Na fala: "kinda", "sorta". Informal.', { lookup: 'kind', register: 'informal', pos: 'advérbio' }),
    ],
  ),
]
