import { mod, sec, w } from './helpers.ts'
import type { Audience } from './types.ts'

const T: Audience[] = ['teen']
const A: Audience[] = ['adult']

export const teenModules = [
  mod(
    {
      id: 't-hobbies', level: 'A1', audiences: T, title: 'Hobbies e games', subtitle: 'Fale sobre o que você curte',
      emoji: '🎮', category: 'Vocabulário', photo: 'video game controller',
      lesson: [sec('Do que você gosta?', '"I\'m into..." é uma forma natural de dizer que curte algo: "I\'m into K-pop." Também: "I\'m a big fan of...", "I\'m obsessed with...".')],
    },
    [
      w("I'm into...", '', 'eu curto... / estou envolvido com...', '🎧', [["I'm really into anime.", 'Eu curto muito anime.']], undefined, { lookup: 'into', pos: 'expressão' }),
      w('play video games', '', 'jogar videogame', '🕹️', [['I play video games with my friends online.', 'Jogo videogame online com meus amigos.']], undefined, { lookup: 'game', pos: 'collocation' }),
      w('level up', '/ˈlevl ʌp/', 'subir de nível', '⬆️', [['I leveled up three times today!', 'Subi três níveis hoje!']], 'Também usado fora dos games: "level up your English".', { lookup: 'level', pos: 'phrasal verb' }),
      w('skateboard', '/ˈskeɪtbɔːd/', 'skate', '🛹', [['I go skateboarding on weekends.', 'Ando de skate nos fins de semana.']], undefined, { pos: 'substantivo' }),
      w('draw / sketch', '/drɔː/ /sketʃ/', 'desenhar / rabiscar', '✏️', [['She sketches characters in her notebook.', 'Ela desenha personagens no caderno.']], undefined, { lookup: 'sketch', pos: 'verbo' }),
      w('binge-watch', '/ˈbɪndʒ wɒtʃ/', 'maratonar (séries)', '📺', [['I binge-watched the whole season.', 'Maratonei a temporada inteira.']], undefined, { lookup: 'binge', pos: 'verbo' }),
      w('playlist', '/ˈpleɪlɪst/', 'playlist', '🎶', [['Send me your playlist!', 'Me manda sua playlist!']], undefined, { pos: 'substantivo' }),
      w('team / squad', '/tiːm/ /skwɒd/', 'time / galera', '👥', [["My squad is going to the mall.", 'Minha galera vai ao shopping.']], '"Squad" é informal para o grupo de amigos.', { lookup: 'squad', pos: 'substantivo' }),
      w('practice', '/ˈpræktɪs/', 'treino / praticar', '🏀', [['I have basketball practice after school.', 'Tenho treino de basquete depois da aula.']], 'UK: substantivo "practice", verbo "practise".', { pos: 'substantivo/verbo' }),
    ],
  ),
  mod(
    {
      id: 't-school', level: 'A2', audiences: T, title: 'Vida na escola', subtitle: 'Provas, notas, matérias e colegas',
      emoji: '🏫', category: 'Vocabulário', photo: 'school lockers',
      lesson: [sec('Sistema escolar americano', 'Nos EUA, o ensino médio é "high school" (9th a 12th grade). Os alunos são freshman, sophomore, junior e senior. Notas usam letras: A (excelente) até F (reprovado).')],
    },
    [
      w('homework', '/ˈhəʊmwɜːk/', 'lição de casa', '📝', [["I haven't done my homework yet.", 'Ainda não fiz a lição.']], 'Incontável: "a lot of homework" (nunca "homeworks").', { pos: 'substantivo' }),
      w('test / exam', '/test/ /ɪɡˈzæm/', 'prova', '📄', [['I have a math test tomorrow.', 'Tenho prova de matemática amanhã.']], undefined, { lookup: 'test', pos: 'substantivo' }),
      w('pass / fail', '/pɑːs/ /feɪl/', 'passar / reprovar', '✅', [['I passed my English test!', 'Passei na prova de inglês!'], ['He failed chemistry.', 'Ele reprovou em química.']], 'Pegadinha: "I passed the test" = passei. "Take a test" = fazer a prova.', { lookup: 'pass', pos: 'verbo' }),
      w('grade', '/ɡreɪd/', 'nota / ano escolar', '🅰️', [['I got a good grade.', 'Tirei uma nota boa.'], ["I'm in tenth grade.", 'Estou no primeiro ano do ensino médio.']], 'UK: "mark" para nota, "year" para série.', { pos: 'substantivo' }),
      w('classmate', '/ˈklɑːsmeɪt/', 'colega de classe', '🧑‍🤝‍🧑', [['My classmates are cool.', 'Meus colegas são legais.']], undefined, { pos: 'substantivo' }),
      w('subject', '/ˈsʌbdʒɪkt/', 'matéria', '📚', [["What's your favorite subject?", 'Qual sua matéria favorita?']], 'Matérias: math, science, history, geography, P.E. (educação física), art.', { pos: 'substantivo' }),
      w('break / recess', '/breɪk/ /rɪˈses/', 'intervalo / recreio', '⏸️', [["Let's talk at recess.", 'A gente conversa no intervalo.']], undefined, { lookup: 'recess', pos: 'substantivo' }),
      w('skip class', '', 'matar aula', '🙈', [['He skipped class to play soccer.', 'Ele matou aula para jogar bola.']], undefined, { lookup: 'skip', pos: 'collocation' }),
      w('principal', '/ˈprɪnsəpl/', 'diretor(a) da escola', '🧑‍💼', [['I was sent to the principal\'s office.', 'Fui mandado para a diretoria.']], 'UK: "head teacher".', { pos: 'substantivo' }),
      w('cram', '/kræm/', 'estudar tudo de última hora', '😵', [['I crammed all night for the exam.', 'Estudei a noite toda na véspera da prova.']], undefined, { pos: 'verbo' }),
    ],
  ),
  mod(
    {
      id: 't-social', level: 'B1', audiences: T, title: 'Redes sociais e internet', subtitle: 'Post, story, DM e viralizar',
      emoji: '📱', category: 'Vocabulário', photo: 'smartphone',
      lesson: [sec('Inglês digital', 'Boa parte do vocabulário da internet já chegou ao português, mas a gramática muda: "I posted a pic", "She slid into my DMs", "It went viral".')],
    },
    [
      w('post', '/pəʊst/', 'postar / publicação', '📸', [['She posted a pic from the beach.', 'Ela postou uma foto da praia.']], undefined, { pos: 'verbo/substantivo' }),
      w('follow / unfollow', '/ˈfɒləʊ/', 'seguir / deixar de seguir', '➕', [['Follow me back!', 'Me segue de volta!']], undefined, { lookup: 'follow', pos: 'verbo' }),
      w('DM', '/ˌdiː ˈem/', 'mensagem direta (direct message)', '💌', [['DM me the link.', 'Me manda o link no direct.']], undefined, { lookup: 'message', pos: 'substantivo/verbo' }),
      w('go viral', '', 'viralizar', '🔥', [['Her video went viral overnight.', 'O vídeo dela viralizou da noite para o dia.']], undefined, { lookup: 'viral', pos: 'collocation' }),
      w('trending', '/ˈtrendɪŋ/', 'em alta', '📈', [["This song is trending right now.", 'Essa música está em alta agora.']], undefined, { pos: 'adjetivo' }),
      w('scroll', '/skrəʊl/', 'rolar a tela', '📜', [['I spent hours scrolling through TikTok.', 'Passei horas rolando o TikTok.']], 'Doomscrolling = ficar rolando notícias ruins sem parar.', { pos: 'verbo' }),
      w('screenshot', '/ˈskriːnʃɒt/', 'print de tela', '🖼️', [['Take a screenshot!', 'Tira um print!']], 'Em inglês "print" é imprimir! Print de tela = screenshot.', { pos: 'substantivo' }),
      w('block / mute', '/blɒk/ /mjuːt/', 'bloquear / silenciar', '🔇', [['I muted him because he posts too much.', 'Silenciei ele porque posta demais.']], undefined, { lookup: 'mute', pos: 'verbo' }),
      w('notification', '/ˌnəʊtɪfɪˈkeɪʃn/', 'notificação', '🔔', [['Turn on notifications!', 'Ative as notificações!']], undefined, { pos: 'substantivo' }),
      w('content creator', '', 'criador de conteúdo', '🎥', [['She wants to be a content creator.', 'Ela quer ser criadora de conteúdo.']], undefined, { lookup: 'creator', pos: 'substantivo' }),
      w('log in / sign up', '', 'entrar / cadastrar-se', '🔑', [['Sign up for free.', 'Cadastre-se grátis.'], ["I can't log in.", 'Não consigo entrar.']], undefined, { lookup: 'login', pos: 'phrasal verb' }),
      w('online safety', '', 'segurança na internet', '🛡️', [["Never share your password online.", 'Nunca compartilhe sua senha na internet.']], 'Dica real: desconfie de quem pede fotos, senhas ou dados pessoais.', { lookup: 'safety', pos: 'substantivo' }),
    ],
  ),
  mod(
    {
      id: 't-slang', level: 'B2', audiences: T, title: 'Gírias atuais', subtitle: 'O inglês que você ouve nas redes e séries',
      emoji: '😎', category: 'Fluência', photo: 'street art graffiti wall',
      lesson: [sec('Use com o público certo', 'Gírias são informais — ótimas com amigos e nas redes, péssimas numa prova ou entrevista de emprego. Entender é obrigatório; usar é opcional!')],
    },
    [
      w('no cap', '/nəʊ kæp/', 'sem mentira / é sério', '🧢', [["That was the best pizza ever, no cap.", 'Foi a melhor pizza da vida, sério.']], '"Cap" = mentira. "Stop capping!" = para de mentir!', { lookup: 'cap', register: 'slang', pos: 'gíria' }),
      w('lowkey / highkey', '/ˈləʊkiː/ /ˈhaɪkiː/', 'meio que, discretamente / muito, assumidamente', '🤫', [["I lowkey want to stay home tonight.", 'Meio que quero ficar em casa hoje.']], undefined, { lookup: 'lowkey', register: 'slang', pos: 'gíria' }),
      w('slay', '/sleɪ/', 'arrasar', '💅', [["You slayed that presentation!", 'Você arrasou na apresentação!']], undefined, { register: 'slang', pos: 'gíria' }),
      w('vibe', '/vaɪb/', 'vibe, clima', '✨', [['This place has a great vibe.', 'Esse lugar tem uma vibe ótima.'], ['I vibe with her.', 'Eu me identifico com ela.']], 'Vibe check = verificar o clima.', { register: 'slang', pos: 'gíria' }),
      w('cringe', '/krɪndʒ/', 'vergonha alheia', '😬', [['That video is so cringe.', 'Esse vídeo dá muita vergonha alheia.']], undefined, { register: 'slang', pos: 'gíria' }),
      w('salty', '/ˈsɔːlti/', 'chateado, amargurado', '🧂', [["He's salty because he lost.", 'Ele está bravinho porque perdeu.']], undefined, { register: 'slang', pos: 'gíria' }),
      w('ghost', '/ɡəʊst/', 'sumir sem explicação (dar ghosting)', '👻', [['He ghosted me after the first date.', 'Ele sumiu depois do primeiro encontro.']], undefined, { register: 'slang', pos: 'gíria' }),
      w('FOMO', '/ˈfəʊməʊ/', 'medo de ficar de fora (fear of missing out)', '😰', [["I'm going to the party because of FOMO.", 'Vou à festa por medo de ficar de fora.']], undefined, { lookup: 'fomo', register: 'slang', pos: 'gíria' }),
      w('spill the tea', '', 'contar a fofoca', '🍵', [["Okay, spill the tea! What happened?", 'Tá, conta a fofoca! O que aconteceu?']], '"Tea" = fofoca. "Spill the beans" é a versão clássica (revelar segredo).', { lookup: 'tea', register: 'slang', pos: 'gíria' }),
      w('GOAT', '/ɡəʊt/', 'o melhor de todos (greatest of all time)', '🐐', [['Messi is the GOAT.', 'Messi é o maior de todos.']], undefined, { lookup: 'goat', register: 'slang', pos: 'gíria' }),
      w('bet', '/bet/', 'fechou / combinado', '🤙', [["See you at 8? — Bet.", 'Te vejo às 8? — Fechou.']], undefined, { register: 'slang', pos: 'gíria' }),
      w('sus', '/sʌs/', 'suspeito', '🤨', [["That's kinda sus.", 'Isso é meio suspeito.']], 'Abreviação de "suspicious", popularizada pelos jogos online.', { lookup: 'suspicious', register: 'slang', pos: 'gíria' }),
      w('it hits different', '', 'tem algo especial / bate diferente', '🎵', [['Music at 2 a.m. hits different.', 'Música às 2 da manhã bate diferente.']], undefined, { lookup: 'hit', register: 'slang', pos: 'gíria' }),
      w('I can\'t even', '', 'não tenho palavras (de tanto rir/choque)', '🤯', [["This is so funny, I can't even.", 'Isso é tão engraçado, não tenho palavras.']], undefined, { lookup: 'even', register: 'slang', pos: 'gíria' }),
    ],
  ),
]

export const adultModules = [
  mod(
    {
      id: 'ad-travel', level: 'A2', audiences: A, title: 'Viagem', subtitle: 'Aeroporto, hotel e restaurante',
      emoji: '✈️', category: 'Conversação', photo: 'airport travel suitcase',
      lesson: [sec('Na imigração', 'Perguntas comuns: "What\'s the purpose of your visit?" (Business / Tourism), "How long are you staying?" (For two weeks), "Where are you staying?" (At the Hilton).')],
    },
    [
      w('boarding pass', '/ˈbɔːdɪŋ pɑːs/', 'cartão de embarque', '🎫', [['May I see your passport and boarding pass?', 'Posso ver seu passaporte e cartão de embarque?']], undefined, { lookup: 'boarding', pos: 'substantivo' }),
      w('check in a bag', '', 'despachar uma mala', '🧳', [['I\'d like to check in one bag.', 'Gostaria de despachar uma mala.']], 'Mala de mão = carry-on (bag).', { lookup: 'luggage', pos: 'collocation' }),
      w('gate', '/ɡeɪt/', 'portão de embarque', '🚪', [['Flight 123 is now boarding at gate 12.', 'O voo 123 está embarcando no portão 12.']], undefined, { pos: 'substantivo' }),
      w('delayed / canceled', '/dɪˈleɪd/ /ˈkænsld/', 'atrasado / cancelado', '⏱️', [['Our flight was delayed for two hours.', 'Nosso voo atrasou duas horas.']], undefined, { lookup: 'delayed', pos: 'adjetivo' }),
      w("I have a reservation", '', 'Tenho uma reserva', '🏨', [['Hi, I have a reservation under the name Silva.', 'Olá, tenho uma reserva em nome de Silva.']], undefined, { lookup: 'reservation', pos: 'expressão' }),
      w('round-trip ticket', '/ˈraʊnd trɪp/', 'passagem de ida e volta', '🔁', [['A round-trip ticket to Miami, please.', 'Uma passagem de ida e volta para Miami, por favor.']], 'Só ida = one-way. UK: return ticket.', { lookup: 'round-trip', pos: 'substantivo' }),
      w("Could we get a table for two?", '', 'Uma mesa para dois, por favor?', '🍽️', [['Could we get a table for two, please?', 'Poderíamos ter uma mesa para dois?']], undefined, { lookup: 'table', pos: 'expressão' }),
      w('tip', '/tɪp/', 'gorjeta / dica', '💵', [['In the US, people usually tip 15–20%.', 'Nos EUA, costuma-se dar 15–20% de gorjeta.']], 'Nos EUA a gorjeta não vem na conta e é praticamente obrigatória.', { pos: 'substantivo' }),
      w('How do I get to...?', '', 'Como chego a...?', '🗺️', [['How do I get to the museum?', 'Como chego ao museu?']], 'Respostas: "Go straight", "Turn left/right", "It\'s on the corner".', { lookup: 'get', pos: 'expressão' }),
      w('sightseeing', '/ˈsaɪtsiːɪŋ/', 'passeio turístico', '📷', [['We went sightseeing in Rome.', 'Fizemos turismo em Roma.']], undefined, { pos: 'substantivo' }),
      w('currency exchange', '', 'câmbio', '💱', [['Where is the currency exchange?', 'Onde fica a casa de câmbio?']], undefined, { lookup: 'currency', pos: 'substantivo' }),
      w('Is breakfast included?', '', 'O café da manhã está incluso?', '🥐', [['Is breakfast included in the price?', 'O café está incluso no preço?']], undefined, { lookup: 'included', pos: 'expressão' }),
    ],
  ),
  mod(
    {
      id: 'ad-work', level: 'B1', audiences: A, title: 'Trabalho e carreira', subtitle: 'Reuniões, prazos, entrevistas',
      emoji: '💼', category: 'Negócios', photo: 'office meeting team',
      lesson: [sec('Na entrevista', 'Prepare respostas para "Tell me about yourself", "What are your strengths?" e "Why do you want to work here?". Use o Present Perfect para experiência: "I\'ve worked in marketing for five years."')],
    },
    [
      w('meeting', '/ˈmiːtɪŋ/', 'reunião', '👥', [["I'm in a meeting. Can I call you back?", 'Estou em reunião. Posso te ligar depois?']], 'Schedule a meeting = marcar uma reunião.', { pos: 'substantivo' }),
      w('deadline', '/ˈdedlaɪn/', 'prazo final', '⏰', [["The deadline is next Friday.", 'O prazo é sexta que vem.']], undefined, { pos: 'substantivo' }),
      w('coworker', '/ˈkəʊwɜːkə/', 'colega de trabalho', '🧑‍💻', [['My coworkers are very supportive.', 'Meus colegas me apoiam muito.']], 'Sinônimo: colleague /ˈkɒliːɡ/.', { pos: 'substantivo' }),
      w('salary', '/ˈsæləri/', 'salário', '💰', [['The salary is negotiable.', 'O salário é negociável.']], undefined, { pos: 'substantivo' }),
      w('job interview', '', 'entrevista de emprego', '🎙️', [["I have a job interview tomorrow.", 'Tenho uma entrevista de emprego amanhã.']], undefined, { lookup: 'interview', pos: 'substantivo' }),
      w('résumé / CV', '/ˈrezjuːmeɪ/', 'currículo', '📄', [['Please send your résumé.', 'Por favor, envie seu currículo.']], 'EUA: résumé. UK: CV.', { lookup: 'resume', pos: 'substantivo' }),
      w('hire / fire', '/haɪə/ /faɪə/', 'contratar / demitir', '🤝', [['They hired three new people.', 'Contrataram três pessoas novas.'], ['He got fired.', 'Ele foi demitido.']], 'Pedir demissão = QUIT. Ser demitido por corte = be laid off.', { lookup: 'hire', pos: 'verbo' }),
      w('apply for', '/əˈplaɪ fɔː/', 'candidatar-se a', '📮', [["I'm applying for a job in Canada.", 'Estou me candidatando a uma vaga no Canadá.']], undefined, { lookup: 'apply', pos: 'phrasal verb' }),
      w('promotion', '/prəˈməʊʃn/', 'promoção (cargo)', '📈', [['She got a promotion last month.', 'Ela foi promovida mês passado.']], undefined, { pos: 'substantivo' }),
      w('remote work', '', 'trabalho remoto', '🏠', [['I work remotely three days a week.', 'Trabalho remoto três dias por semana.']], 'Híbrido = hybrid. Home office em inglês é o cômodo; o regime é "work from home (WFH)".', { lookup: 'remote', pos: 'substantivo' }),
      w('strengths and weaknesses', '', 'pontos fortes e fracos', '💪', [['One of my strengths is communication.', 'Um dos meus pontos fortes é a comunicação.']], undefined, { lookup: 'strength', pos: 'substantivo' }),
      w('Tell me about yourself.', '', 'Fale sobre você.', '🗣️', [["Tell me about yourself. — Sure. I'm a software engineer with six years of experience...", 'Fale sobre você. — Claro. Sou engenheiro de software com seis anos de experiência...']], 'Estrutura: presente (quem você é) → passado (experiência) → futuro (o que busca).', { lookup: 'yourself', pos: 'expressão' }),
    ],
  ),
  mod(
    {
      id: 'ad-emails', level: 'B1', audiences: A, title: 'E-mails profissionais', subtitle: 'Abrir, pedir, anexar e encerrar',
      emoji: '📧', category: 'Negócios', photo: 'laptop desk',
      lesson: [sec('Estrutura', 'Saudação (Hi John, / Dear Ms. Smith,) → motivo (I\'m writing to...) → pedido (Could you please...?) → encerramento (Looking forward to hearing from you.) → assinatura (Best regards,).')],
    },
    [
      w("I'm writing to...", '', 'Escrevo para...', '✉️', [["I'm writing to follow up on our meeting.", 'Escrevo para dar continuidade à nossa reunião.']], undefined, { lookup: 'writing', pos: 'expressão' }),
      w('I hope this email finds you well.', '', 'Espero que esteja bem.', '🌤️', [['Hi Sarah, I hope this email finds you well.', 'Olá Sarah, espero que esteja bem.']], 'Formal e comum. Mais casual: "Hope you\'re doing well."', { lookup: 'hope', pos: 'expressão' }),
      w('Please find attached...', '', 'Segue em anexo...', '📎', [['Please find attached the report.', 'Segue em anexo o relatório.']], 'Mais moderno: "I\'ve attached the report."', { lookup: 'attached', pos: 'expressão' }),
      w('Could you please...?', '', 'Você poderia, por favor...?', '🙏', [['Could you please confirm by Friday?', 'Você poderia confirmar até sexta?']], undefined, { lookup: 'could', pos: 'expressão' }),
      w('Let me know if...', '', 'Me avise se...', '💬', [['Let me know if you have any questions.', 'Me avise se tiver alguma dúvida.']], undefined, { lookup: 'know', pos: 'expressão' }),
      w('Looking forward to hearing from you.', '', 'Aguardo seu retorno.', '⏳', [['Looking forward to hearing from you.', 'Aguardo seu retorno.']], undefined, { lookup: 'forward', pos: 'expressão' }),
      w('Best regards / Kind regards', '', 'Atenciosamente', '✍️', [['Best regards, Ana', 'Atenciosamente, Ana']], 'Informal: "Best," "Cheers," (UK) ou "Thanks,".', { lookup: 'regards', pos: 'expressão' }),
      w('Sorry for the late reply.', '', 'Desculpe a demora em responder.', '🐌', [['Sorry for the late reply — I was traveling.', 'Desculpe a demora — eu estava viajando.']], undefined, { lookup: 'reply', pos: 'expressão' }),
    ],
  ),
  mod(
    {
      id: 'ad-business', level: 'C1', audiences: A, title: 'Business English', subtitle: 'O jargão das reuniões internacionais',
      emoji: '📊', category: 'Negócios', photo: 'business presentation conference',
      lesson: [sec('Linguagem corporativa', 'Em empresas globais, expressões como "touch base", "circle back" e "on the same page" são diárias. Use com moderação — excesso de jargão soa artificial.')],
    },
    [
      w('follow up', '/ˈfɒləʊ ʌp/', 'dar seguimento / retornar', '🔁', [["I'll follow up with the client tomorrow.", 'Vou dar retorno ao cliente amanhã.']], 'Substantivo: a follow-up (email/meeting).', { lookup: 'follow', pos: 'phrasal verb' }),
      w('touch base', '', 'fazer um contato rápido / alinhar', '📞', [["Let's touch base next week.", 'Vamos nos falar semana que vem.']], undefined, { lookup: 'base', pos: 'idiom' }),
      w('on the same page', '', 'alinhados / de acordo', '📖', [["Let's make sure we're all on the same page.", 'Vamos garantir que todos estejam alinhados.']], undefined, { lookup: 'page', pos: 'idiom' }),
      w('get the ball rolling', '', 'dar o pontapé inicial', '⚽', [["Let's get the ball rolling on this project.", 'Vamos dar início a este projeto.']], undefined, { lookup: 'ball', pos: 'idiom' }),
      w('ballpark figure', '', 'número aproximado / estimativa', '⚾', [['Can you give me a ballpark figure?', 'Pode me dar uma estimativa?']], undefined, { lookup: 'ballpark', pos: 'idiom' }),
      w('heads-up', '/ˈhedz ʌp/', 'aviso prévio', '📢', [['Thanks for the heads-up!', 'Obrigado pelo aviso!']], undefined, { lookup: 'heads-up', pos: 'substantivo' }),
      w('bottom line', '', 'resultado final / o essencial', '🧾', [["The bottom line is we need more sales.", 'O essencial é que precisamos de mais vendas.']], undefined, { lookup: 'bottom', pos: 'idiom' }),
      w('stakeholder', '/ˈsteɪkhəʊldə/', 'parte interessada', '🧑‍🤝‍🧑', [['We need to update the stakeholders.', 'Precisamos atualizar as partes interessadas.']], undefined, { pos: 'substantivo' }),
      w('leverage', '/ˈliːvərɪdʒ/', 'alavancar / aproveitar', '🪜', [['We can leverage our data to improve sales.', 'Podemos aproveitar nossos dados para melhorar as vendas.']], 'US: /ˈlevərɪdʒ/.', { pos: 'verbo' }),
      w('wrap up', '/ræp ʌp/', 'concluir / encerrar', '🎀', [["Let's wrap up the meeting.", 'Vamos encerrar a reunião.']], undefined, { lookup: 'wrap', pos: 'phrasal verb' }),
      w('circle back', '', 'voltar ao assunto depois', '🔄', [["Let's circle back on this next week.", 'Vamos retomar isso semana que vem.']], undefined, { lookup: 'circle', pos: 'phrasal verb' }),
      w('reach out', '/riːtʃ aʊt/', 'entrar em contato', '🤳', [['Feel free to reach out if you need anything.', 'Fique à vontade para entrar em contato se precisar.']], undefined, { lookup: 'reach', pos: 'phrasal verb' }),
      w('ASAP', '/ˌeɪ es eɪ ˈpiː/', 'o quanto antes (as soon as possible)', '🏃', [['Please reply ASAP.', 'Por favor, responda o quanto antes.']], 'Pode soar ríspido; prefira "at your earliest convenience" em e-mails formais.', { lookup: 'soon', pos: 'sigla' }),
      w('KPI', '/ˌkeɪ piː ˈaɪ/', 'indicador-chave de desempenho', '🎯', [['Our main KPI is customer retention.', 'Nosso KPI principal é a retenção de clientes.']], undefined, { lookup: 'indicator', pos: 'sigla' }),
    ],
  ),
]
