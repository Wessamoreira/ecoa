import { mod, reg, sec, w } from './helpers.ts'
import type { Audience } from './types.ts'

const TA: Audience[] = ['teen', 'adult']

export const a1Modules = [
  mod(
    {
      id: 'a1-tobe', level: 'A1', audiences: TA, title: 'Verbo To Be', subtitle: 'Ser e estar no presente, passado e futuro',
      emoji: '🧩', category: 'Gramática',
      lesson: [
        sec('Um verbo, dois sentidos', '"To be" significa SER e ESTAR. É o verbo mais usado do inglês e a base de vários tempos verbais (como o Present Continuous e a voz passiva).'),
        sec('Presente', 'Afirmativa, negativa e interrogativa. Na interrogativa, o verbo troca de lugar com o sujeito — não usamos "do".', [
          ['Pessoa', 'Afirmativa', 'Negativa', 'Pergunta'],
          ['I', "I am / I'm", "I'm not", 'Am I?'],
          ['You / We / They', "are / 're", "aren't", 'Are you?'],
          ['He / She / It', "is / 's", "isn't", 'Is she?'],
        ]),
        sec('Passado e futuro', 'No passado só existem duas formas: WAS e WERE. No futuro, "will be" serve para todas as pessoas.', [
          ['Pessoa', 'Passado', 'Futuro'],
          ['I / He / She / It', 'was / wasn\'t', 'will be / won\'t be'],
          ['You / We / They', 'were / weren\'t', 'will be / won\'t be'],
        ]),
      ],
    },
    [
      w("I am (I'm)", '/aɪ æm/ /aɪm/', 'eu sou / eu estou', '🙋', [
        ["I'm a designer.", 'Eu sou designer.', 'profissão'],
        ["I'm tired today.", 'Eu estou cansado hoje.', 'estado'],
      ], 'Em inglês a profissão leva artigo: "I\'m A designer", nunca "I\'m designer".', { lookup: 'am', pos: 'estrutura' }),
      w("you / we / they are", '/ɑː/', 'você é, nós somos, eles são (ou estão)', '👥', [
        ["You're right.", 'Você está certo.'],
        ["They're from Brazil.", 'Eles são do Brasil.'],
      ], 'Contrações: you\'re, we\'re, they\'re. Cuidado: "they\'re" soa igual a "their" (deles) e "there" (lá).', { lookup: 'are', pos: 'estrutura' }),
      w('he / she / it is', '/ɪz/', 'ele é, ela é (ou está) / é, está', '🧍', [
        ["She's a doctor.", 'Ela é médica.'],
        ["It's 5 o'clock.", 'São 5 horas.', 'horas'],
      ], 'Para horas, clima e distâncias o sujeito é "it": "It\'s hot", "It\'s far".', { lookup: 'is', pos: 'estrutura' }),
      w("isn't / aren't", '/ˈɪznt/ /ɑːnt/', 'não é / não são (forma negativa)', '🚫', [
        ["He isn't at home.", 'Ele não está em casa.'],
        ["We aren't ready.", 'Nós não estamos prontos.'],
      ], 'Com "I" não existe "amn\'t": diga "I\'m not".', { lookup: 'not', pos: 'estrutura' }),
      w('Are you...? / Is he...?', '', 'Você é/está...? / Ele é/está...?', '❓', [
        ['Are you hungry? — Yes, I am.', 'Você está com fome? — Sim, estou.'],
        ['Is she your sister? — No, she isn\'t.', 'Ela é sua irmã? — Não, não é.'],
      ], 'Na resposta curta afirmativa NUNCA contraia: "Yes, I am." (e não "Yes, I\'m.").', { lookup: 'are', pos: 'estrutura' }),
      w('was / were', '/wɒz/ /wɜː/', 'era, estava / eram, estavam (passado)', '⏪', [
        ['I was at work yesterday.', 'Eu estava no trabalho ontem.', 'Simple Past'],
        ['They were very kind.', 'Eles foram muito gentis.', 'Simple Past'],
        ['If I were you, I would go.', 'Se eu fosse você, eu iria.', '2nd Conditional'],
      ], 'Em hipóteses usamos "were" para todas as pessoas: "If I were rich...".', { lookup: 'was', pos: 'estrutura' }),
      w("wasn't / weren't", '/ˈwɒznt/ /wɜːnt/', 'não era/estava / não eram/estavam', '⛔', [
        ["The movie wasn't good.", 'O filme não foi bom.'],
        ["We weren't late.", 'Nós não estávamos atrasados.'],
      ], undefined, { lookup: 'was', pos: 'estrutura' }),
      w('will be', '/wɪl biː/', 'será / estará (futuro)', '⏩', [
        ["I'll be there at 8.", 'Estarei lá às 8.', 'Future'],
        ["It won't be easy.", 'Não vai ser fácil.', 'Future'],
      ], '"Won\'t" é a contração de "will not". Fala "uônt", diferente de "want" ("uónt").', { lookup: 'will', pos: 'estrutura' }),
      w('there is / there are', '/ðeər ɪz/ /ðeər ɑː/', 'há / tem (existir)', '📍', [
        ["There's a pharmacy near here.", 'Tem uma farmácia aqui perto.'],
        ['There are two problems.', 'Há dois problemas.'],
        ['There was a lot of traffic.', 'Tinha muito trânsito.', 'Simple Past'],
      ], 'Brasileiro erra muito: "Tem um carro" NÃO é "It has a car", é "There is a car".', { lookup: 'there', pos: 'estrutura' }),
      w('to be + adjetivo de idade/fome/frio', '', 'ter X anos / estar com fome / estar com frio', '🥶', [
        ["I'm 25 years old.", 'Eu tenho 25 anos.'],
        ["Are you cold?", 'Você está com frio?'],
        ["She's afraid of dogs.", 'Ela tem medo de cachorros.'],
      ], 'Onde o português usa "ter", o inglês usa "be": idade, fome, sede, frio, calor, medo, razão ("You\'re right").', { lookup: 'old', pos: 'estrutura' }),
    ],
  ),
  mod(
    {
      id: 'a1-pronouns', level: 'A1', audiences: TA, title: 'Pronomes', subtitle: 'Sujeito, objeto, possessivos e reflexivos',
      emoji: '👤', category: 'Gramática',
      lesson: [
        sec('O mapa dos pronomes', 'Cada pessoa tem 5 formas. O sujeito faz a ação, o objeto recebe a ação, o adjetivo possessivo vem antes de um substantivo e o pronome possessivo substitui o substantivo.', [
          ['Sujeito', 'Objeto', 'Adj. possessivo', 'Pron. possessivo', 'Reflexivo'],
          ['I', 'me', 'my', 'mine', 'myself'],
          ['you', 'you', 'your', 'yours', 'yourself'],
          ['he', 'him', 'his', 'his', 'himself'],
          ['she', 'her', 'her', 'hers', 'herself'],
          ['it', 'it', 'its', '—', 'itself'],
          ['we', 'us', 'our', 'ours', 'ourselves'],
          ['they', 'them', 'their', 'theirs', 'themselves'],
        ]),
        sec('Sujeito obrigatório', 'Em português dizemos "Está chovendo" sem sujeito. Em inglês o sujeito é obrigatório: "IT is raining".'),
      ],
    },
    [
      w('I · me · my · mine', '/aɪ/ /miː/ /maɪ/ /maɪn/', 'eu · me/mim · meu · o meu', '🙋', [
        ['I love it.', 'Eu amo isso.', 'sujeito'], ['Call me later.', 'Me liga depois.', 'objeto'], ['This is my car. It\'s mine.', 'Este é meu carro. É meu.', 'possessivo'],
      ], '"I" é sempre maiúsculo, mesmo no meio da frase.', { lookup: 'mine', pos: 'pronome' }),
      w('you · your · yours', '/juː/ /jɔː/ /jɔːz/', 'você(s) · seu/sua · o seu', '👉', [
        ['I miss you.', 'Sinto sua falta.'], ['Is this your phone? Is it yours?', 'Este é seu celular? É seu?'],
      ], '"You" serve para singular e plural. "Your" (seu) ≠ "you\'re" (você é).', { lookup: 'yours', pos: 'pronome' }),
      w('he · him · his', '/hiː/ /hɪm/ /hɪz/', 'ele · o/lhe · dele', '👨', [
        ['He works here.', 'Ele trabalha aqui.'], ['I know him.', 'Eu o conheço.'], ['That is his bag.', 'Aquela é a bolsa dele.'],
      ], 'O possessivo concorda com o DONO, não com a coisa: "his mother" = a mãe DELE.', { lookup: 'his', pos: 'pronome' }),
      w('she · her · hers', '/ʃiː/ /hɜː/ /hɜːz/', 'ela · a/lhe/dela · o dela', '👩', [
        ['She is my boss.', 'Ela é minha chefe.'], ['I gave her a gift.', 'Eu dei um presente para ela.'], ['The idea was hers.', 'A ideia foi dela.'],
      ], '"Her" é objeto E adjetivo possessivo ao mesmo tempo.', { lookup: 'hers', pos: 'pronome' }),
      w('it · its', '/ɪt/ /ɪts/', 'ele/ela (coisa, animal) · dele/dela', '📦', [
        ['It is raining.', 'Está chovendo.'], ['The company changed its name.', 'A empresa mudou o nome dela.'],
      ], 'Pegadinha clássica: "its" (possessivo) não tem apóstrofo. "It\'s" = it is.', { lookup: 'its', pos: 'pronome' }),
      w('we · us · our · ours', '/wiː/ /ʌs/ /ˈaʊə/ /ˈaʊəz/', 'nós · nos · nosso · o nosso', '👫', [
        ['We are a team.', 'Nós somos uma equipe.'], ['Join us!', 'Junte-se a nós!'], ['Our house is small.', 'Nossa casa é pequena.'],
      ], undefined, { lookup: 'ours', pos: 'pronome' }),
      w('they · them · their · theirs', '/ðeɪ/ /ðem/ /ðeə/ /ðeəz/', 'eles/elas · os/as · deles · o deles', '👥', [
        ['They live in London.', 'Eles moram em Londres.'], ['Tell them.', 'Diga a eles.'], ['Their kids are cute.', 'Os filhos deles são fofos.'],
        ['Someone left their phone.', 'Alguém esqueceu o celular.', 'they singular'],
      ], 'Their / there / they\'re têm o MESMO som: /ðeə/. "They" também é usado no singular para pessoa não especificada.', { lookup: 'their', pos: 'pronome' }),
      w('myself / yourself...', '/maɪˈself/', 'eu mesmo / você mesmo... (reflexivos)', '🪞', [
        ['I cut myself.', 'Eu me cortei.'], ['Enjoy yourselves!', 'Divirtam-se!'], ['She did it herself.', 'Ela mesma fez.'],
      ], 'Plural troca "self" por "selves": ourselves, yourselves, themselves.', { lookup: 'myself', pos: 'pronome' }),
      w('this / that / these / those', '/ðɪs/ /ðæt/ /ðiːz/ /ðəʊz/', 'este / aquele / estes / aqueles', '👇', [
        ['This is delicious!', 'Isto está delicioso!'], ['Who are those people?', 'Quem são aquelas pessoas?'],
      ], 'Perto = this/these. Longe = that/those. Treine a diferença de som: "this" /ɪ/ curto vs "these" /iː/ longo.', { lookup: 'these', pos: 'pronome' }),
    ],
  ),
  mod(
    {
      id: 'a1-regular', level: 'A1', audiences: TA, title: 'Verbos regulares essenciais', subtitle: 'Os 20 verbos do dia a dia + o som do -ED',
      emoji: '⚙️', category: 'Verbos',
      lesson: [
        sec('Passado com -ED', 'Verbos regulares formam o passado e o particípio com -ED: work → worked. A grafia segue regras: like → liked (só +d), study → studied (y vira i), stop → stopped (dobra a consoante).'),
        sec('Os três sons do -ED', 'Este é o erro nº 1 de pronúncia de brasileiros: o -ED quase nunca é "id"!', [
          ['Som', 'Quando', 'Exemplos'],
          ['/t/', 'depois de sons surdos: p, k, s, sh, ch, f', 'worked, helped, watched, finished'],
          ['/d/', 'depois de sons sonoros e vogais', 'played, lived, cleaned, called'],
          ['/ɪd/', 'só depois de T ou D', 'wanted, needed, started, ended'],
        ]),
        sec('Terceira pessoa no presente', 'No Simple Present, he/she/it ganha -S: I work → she works. Verbos terminados em -o, -ch, -sh, -ss, -x ganham -ES (watches, finishes).'),
      ],
    },
    [
      reg('work', 'worked', 'working', '/wɜːk/', '/t/', 'trabalhar / funcionar', '💼', [
        ['I work from home.', 'Eu trabalho de casa.', 'Simple Present'], ['I worked late yesterday.', 'Trabalhei até tarde ontem.', 'Simple Past'], ['It doesn\'t work.', 'Não funciona.', 'funcionar'],
      ], '"Worked" tem uma sílaba só: "uórkt". Nada de "uórkid"!'),
      reg('live', 'lived', 'living', '/lɪv/', '/d/', 'morar / viver', '🏡', [
        ['Where do you live?', 'Onde você mora?'], ['I lived in Rio for 5 years.', 'Morei no Rio por 5 anos.', 'Simple Past'],
      ], 'Não confunda "live" /lɪv/ (morar) com "leave" /liːv/ (sair). A vogal longa muda tudo.'),
      reg('like', 'liked', 'liking', '/laɪk/', '/t/', 'gostar de', '👍', [
        ['I like coffee.', 'Eu gosto de café.'], ['She likes dancing.', 'Ela gosta de dançar.'], ['Did you like the movie?', 'Você gostou do filme?', 'Simple Past'],
      ], 'Não existe "of" depois de like: "I like coffee", nunca "I like of coffee".'),
      reg('love', 'loved', 'loving', '/lʌv/', '/d/', 'amar / adorar', '❤️', [['I love this song!', 'Eu adoro essa música!']]),
      reg('want', 'wanted', 'wanting', '/wɒnt/', '/ɪd/', 'querer', '🙏', [
        ['I want a coffee.', 'Quero um café.'], ['She wanted to leave.', 'Ela queria ir embora.', 'Simple Past'],
      ], 'Informal: "want to" vira "wanna": "I wanna go."'),
      reg('need', 'needed', 'needing', '/niːd/', '/ɪd/', 'precisar', '🆘', [
        ['I need help.', 'Eu preciso de ajuda.'], ['We needed more time.', 'Precisávamos de mais tempo.', 'Simple Past'],
      ], 'Sem "of": "I need help", não "I need of help".'),
      reg('play', 'played', 'playing', '/pleɪ/', '/d/', 'jogar / brincar / tocar', '🎸', [
        ['I play the guitar.', 'Eu toco violão.'], ['We played soccer.', 'Jogamos futebol.', 'Simple Past'],
      ], 'Instrumentos levam "the": play THE piano. Esportes não: play soccer.'),
      reg('watch', 'watched', 'watching', '/wɒtʃ/', '/t/', 'assistir / observar', '📺', [
        ['We watch Netflix every night.', 'Assistimos Netflix toda noite.'], ['I was watching TV when you called.', 'Eu estava vendo TV quando você ligou.', 'Past Continuous'],
      ], 'Ver TV/filme = watch. "Assist" em inglês significa AJUDAR (falso cognato!).'),
      reg('study', 'studied', 'studying', '/ˈstʌdi/', '/d/', 'estudar', '📚', [
        ['I study English every day.', 'Estudo inglês todo dia.'], ['She studied law.', 'Ela estudou Direito.', 'Simple Past'],
      ], 'Consoante + Y → IED no passado (studied), mas mantém o Y no -ing (studying).'),
      reg('talk', 'talked', 'talking', '/tɔːk/', '/t/', 'conversar / falar', '💬', [
        ['Can we talk?', 'Podemos conversar?'], ['We talked for hours.', 'Conversamos por horas.', 'Simple Past'],
      ], 'O "l" é mudo: "tók". Talk TO someone, talk ABOUT something.'),
      reg('walk', 'walked', 'walking', '/wɔːk/', '/t/', 'caminhar / andar', '🚶', [['I walk to work.', 'Vou a pé para o trabalho.']], 'O "l" também é mudo: "uók". Diferente de "work" /wɜːk/!'),
      reg('open', 'opened', 'opening', '/ˈəʊpən/', '/d/', 'abrir', '📂', [['The store opens at 9.', 'A loja abre às 9.']]),
      reg('close', 'closed', 'closing', '/kləʊz/', '/d/', 'fechar', '🔒', [['Please close the door.', 'Por favor, feche a porta.']], 'Verbo "close" tem som de Z: /kləʊz/. O adjetivo "close" (perto) tem som de S: /kləʊs/.'),
      reg('start', 'started', 'starting', '/stɑːt/', '/ɪd/', 'começar', '🏁', [
        ['The class starts at 7.', 'A aula começa às 7.'], ['It started to rain.', 'Começou a chover.', 'Simple Past'],
      ]),
      reg('finish', 'finished', 'finishing', '/ˈfɪnɪʃ/', '/t/', 'terminar', '🏆', [
        ['Did you finish your report?', 'Você terminou o relatório?', 'Simple Past'], ['I have just finished.', 'Acabei de terminar.', 'Present Perfect'],
      ], '"Finished" soa "fínisht", duas sílabas.'),
      reg('help', 'helped', 'helping', '/help/', '/t/', 'ajudar', '🤝', [
        ['Can you help me?', 'Você pode me ajudar?'], ['She helped me a lot.', 'Ela me ajudou muito.', 'Simple Past'],
      ]),
      reg('listen', 'listened', 'listening', '/ˈlɪsn/', '/d/', 'escutar', '🎧', [
        ['Listen to this!', 'Escuta isso!'], ['I was listening to music.', 'Eu estava ouvindo música.', 'Past Continuous'],
      ], 'O "t" é mudo: "lísen". E sempre "listen TO" algo.'),
      reg('call', 'called', 'calling', '/kɔːl/', '/d/', 'ligar / chamar', '📞', [
        ['I\'ll call you tomorrow.', 'Te ligo amanhã.', 'Future'], ['What is this called?', 'Como isso se chama?'],
      ]),
      reg('cook', 'cooked', 'cooking', '/kʊk/', '/t/', 'cozinhar', '🍳', [['My husband cooks very well.', 'Meu marido cozinha muito bem.']], '"Cook" é verbo e também o cozinheiro. "Cooker" é o FOGÃO (UK).'),
      reg('travel', 'traveled', 'traveling', '/ˈtrævl/', '/d/', 'viajar', '✈️', [
        ['I love to travel.', 'Eu amo viajar.'], ['We traveled to Chile last year.', 'Viajamos para o Chile ano passado.', 'Simple Past'],
      ], 'Grafia britânica dobra o L: travelled, travelling.'),
      reg('stop', 'stopped', 'stopping', '/stɒp/', '/t/', 'parar', '🛑', [
        ['Stop the car!', 'Pare o carro!'], ['She stopped smoking.', 'Ela parou de fumar.', 'Simple Past'],
      ], 'Regra CVC (consoante-vogal-consoante) em sílaba tônica: dobra a última letra → stopped, stopping.'),
    ],
  ),
  mod(
    {
      id: 'a1-present', level: 'A1', audiences: TA, title: 'Simple Present', subtitle: 'Rotinas, fatos e o auxiliar do/does',
      emoji: '🔁', category: 'Gramática',
      lesson: [
        sec('Quando usar', 'Para hábitos, rotinas, fatos e verdades gerais: "I drink coffee every morning", "Water boils at 100°C".'),
        sec('Estrutura', 'Na negativa e na pergunta entra o auxiliar DO (ou DOES para he/she/it) — e o verbo principal volta para a forma base.', [
          ['', 'I / you / we / they', 'he / she / it'],
          ['Afirmativa', 'I work', 'She works'],
          ['Negativa', "I don't work", "She doesn't work"],
          ['Pergunta', 'Do you work?', 'Does she work?'],
        ]),
      ],
    },
    [
      w('do / does (auxiliar)', '/duː/ /dʌz/', 'auxiliar de perguntas e negativas no presente', '❔', [
        ['Do you speak English?', 'Você fala inglês?'], ['Does he live here?', 'Ele mora aqui?'],
      ], 'Com "does", o verbo perde o S: "Does she work?" (nunca "Does she works?").', { lookup: 'does', pos: 'auxiliar' }),
      w("don't / doesn't", '/dəʊnt/ /ˈdʌznt/', 'não (negativa no presente)', '🙅', [
        ["I don't know.", 'Eu não sei.'], ["She doesn't eat meat.", 'Ela não come carne.'],
      ], '"Don\'t" se pronuncia "dôunt" — não "dont".', { lookup: "don't", pos: 'auxiliar' }),
      w('-s / -es (3ª pessoa)', '', 'he/she/it ganha S no presente', '➕', [
        ['He watches TV.', 'Ele assiste TV.'], ['She goes to the gym.', 'Ela vai à academia.'], ['It has four doors.', 'Tem quatro portas.'],
      ], 'Irregulares: have → has, go → goes, do → does.', { pos: 'regra' }),
      w('always · usually · often · sometimes · never', '/ˈɔːlweɪz/ /ˈjuːʒuəli/ /ˈɒfn/ /ˈsʌmtaɪmz/ /ˈnevə/', 'sempre · geralmente · frequentemente · às vezes · nunca', '📊', [
        ['I always wake up early.', 'Eu sempre acordo cedo.'], ['She is never late.', 'Ela nunca se atrasa.'],
      ], 'Posição: ANTES do verbo principal, mas DEPOIS do verbo to be.', { lookup: 'usually', pos: 'advérbio' }),
      w('every day / once a week', '', 'todo dia / uma vez por semana', '📅', [
        ['I go to the gym three times a week.', 'Vou à academia três vezes por semana.'], ['How often do you travel?', 'Com que frequência você viaja?'],
      ], 'Once (1x), twice (2x), three times (3x)...', { lookup: 'once', pos: 'expressão' }),
      w('have (ter)', '/hæv/', 'ter / possuir', '🎁', [
        ['I have two brothers.', 'Tenho dois irmãos.'], ["She doesn't have a car.", 'Ela não tem carro.'], ['Do you have a minute?', 'Você tem um minuto?'],
      ], 'Inglês britânico também usa "have got": "I\'ve got a car".', { lookup: 'have', pos: 'verbo' }),
    ],
  ),
  mod(
    {
      id: 'a1-survival', level: 'A1', audiences: TA, title: 'Inglês de sobrevivência', subtitle: 'Frases para se virar em qualquer lugar',
      emoji: '🧭', category: 'Conversação', photo: 'city map',
      lesson: [
        sec('Educação primeiro', 'Falantes de inglês usam MUITO "please", "thank you" e "excuse me". Pedidos diretos ("Give me water") soam rudes; prefira "Could I have some water, please?"'),
      ],
    },
    [
      w('Nice to meet you.', '', 'Prazer em te conhecer.', '🤝', [['Hi, I\'m Paula. — Nice to meet you, Paula.', 'Oi, sou a Paula. — Prazer, Paula.']], 'Resposta comum: "Nice to meet you too."', { lookup: 'meet', pos: 'expressão' }),
      w('How are you?', '', 'Como vai você?', '🙂', [["How are you? — I'm fine, thanks. And you?", 'Como vai? — Bem, obrigado. E você?']], 'Variações informais: "How\'s it going?", "What\'s up?".', { lookup: 'how', pos: 'expressão' }),
      w('Excuse me.', '/ɪkˈskjuːz miː/', 'Com licença. / Desculpe (para chamar atenção).', '🙋', [['Excuse me, where is the station?', 'Com licença, onde fica a estação?']], '"Excuse me" é ANTES de incomodar; "Sorry" é DEPOIS de fazer algo errado.', { lookup: 'excuse', pos: 'expressão' }),
      w("You're welcome.", '', 'De nada.', '😊', [["Thank you! — You're welcome.", 'Obrigado! — De nada.']], 'Alternativas: "No problem", "My pleasure", "Anytime".', { lookup: 'welcome', pos: 'expressão' }),
      w("I don't understand.", '', 'Eu não entendo.', '🤔', [["Sorry, I don't understand.", 'Desculpe, não entendi.']], undefined, { lookup: 'understand', pos: 'expressão' }),
      w('Could you repeat that, please?', '', 'Você poderia repetir, por favor?', '🔁', [['Could you repeat that, please? More slowly?', 'Poderia repetir, por favor? Mais devagar?']], 'Também: "Sorry?" ou "Pardon?" com entonação de pergunta.', { lookup: 'repeat', pos: 'expressão' }),
      w('Can you speak more slowly?', '', 'Você pode falar mais devagar?', '🐢', [['Can you speak more slowly, please?', 'Pode falar mais devagar, por favor?']], undefined, { lookup: 'slowly', pos: 'expressão' }),
      w('How much is it?', '', 'Quanto custa?', '💰', [['How much is this jacket?', 'Quanto custa esta jaqueta?']], 'Plural: "How much are these?"', { lookup: 'much', pos: 'expressão' }),
      w('Where is the bathroom?', '', 'Onde fica o banheiro?', '🚻', [['Excuse me, where is the restroom?', 'Com licença, onde fica o banheiro?']], 'Nos EUA, em locais públicos: "restroom". No Reino Unido: "toilet" ou "loo".', { lookup: 'bathroom', pos: 'expressão' }),
      w("I'd like...", '/aɪd laɪk/', 'Eu gostaria de...', '🍽️', [["I'd like a coffee, please.", 'Eu gostaria de um café, por favor.']], '"I\'d like" = "I would like", forma educada de pedir.', { lookup: 'like', pos: 'expressão' }),
      w("What's your name?", '', 'Qual é o seu nome?', '🏷️', [["What's your name? — My name is Bruno.", 'Qual é seu nome? — Meu nome é Bruno.']], undefined, { lookup: 'name', pos: 'expressão' }),
      w('Where are you from?', '', 'De onde você é?', '🌎', [["Where are you from? — I'm from Brazil.", 'De onde você é? — Sou do Brasil.']], 'Nacionalidade com maiúscula: Brazilian, American, British.', { lookup: 'from', pos: 'expressão' }),
      w('Help!', '/help/', 'Socorro!', '🆘', [['Help! Call an ambulance!', 'Socorro! Chamem uma ambulância!']], 'Número de emergência: 911 (EUA), 999 (Reino Unido), 112 (Europa).', { lookup: 'help', pos: 'expressão' }),
      w('Do you speak Portuguese?', '', 'Você fala português?', '🇧🇷', [['Excuse me, do you speak Portuguese?', 'Com licença, você fala português?']], undefined, { lookup: 'speak', pos: 'expressão' }),
      w('Can I have the check, please?', '', 'Pode me trazer a conta, por favor?', '🧾', [['Can I have the check, please?', 'A conta, por favor.']], 'EUA: "check". Reino Unido: "bill".', { lookup: 'check', pos: 'expressão' }),
    ],
  ),
  mod(
    {
      id: 'a1-numbers', level: 'A1', audiences: TA, title: 'Números, dias e horas', subtitle: 'Datas, horários e a armadilha do 13 vs 30',
      emoji: '🕒', category: 'Vocabulário', photo: 'calendar clock',
      lesson: [
        sec('Horas', '"What time is it?" — "It\'s ten thirty" (10:30) ou "It\'s half past ten". Para minutos antes da hora: "a quarter to five" (4:45).'),
        sec('Datas', 'Em inglês americano, o mês vem antes do dia: 03/04 = 4 de março (March 4th). Falamos as datas com números ordinais: "March fourth".'),
      ],
    },
    [
      w('thirteen vs thirty', '/θɜːˈtiːn/ /ˈθɜːti/', '13 vs 30', '🔢', [['It costs thirteen dollars, not thirty.', 'Custa treze dólares, não trinta.']], 'A diferença está na sílaba tônica: thirTEEN (forte no final) vs THIRty (forte no começo). Vale para 14/40, 15/50...', { lookup: 'thirteen', pos: 'número' }),
      w('hundred · thousand · million', '/ˈhʌndrəd/ /ˈθaʊznd/ /ˈmɪljən/', 'cem · mil · milhão', '💯', [['Two hundred people.', 'Duzentas pessoas.'], ['Three thousand dollars.', 'Três mil dólares.']], 'Sem "s" depois de número: "two hundred" (nunca "two hundreds").', { lookup: 'thousand', pos: 'número' }),
      w('What time is it?', '', 'Que horas são?', '⌚', [["It's a quarter past six.", 'São seis e quinze.'], ["It's half past nine.", 'São nove e meia.']], 'a.m. = da meia-noite ao meio-dia; p.m. = do meio-dia à meia-noite.', { lookup: 'time', pos: 'expressão' }),
      w('Monday · Tuesday · Wednesday', '/ˈmʌndeɪ/ /ˈtjuːzdeɪ/ /ˈwenzdeɪ/', 'segunda · terça · quarta', '📆', [["See you on Wednesday!", 'Até quarta!']], 'Wednesday tem o primeiro "d" mudo: "uénzdei". Dias sempre com maiúscula e "on": on Monday.', { lookup: 'wednesday', pos: 'substantivo' }),
      w('Thursday · Friday · Saturday · Sunday', '/ˈθɜːzdeɪ/ /ˈfraɪdeɪ/ /ˈsætədeɪ/ /ˈsʌndeɪ/', 'quinta · sexta · sábado · domingo', '🗓️', [['I work from Monday to Friday.', 'Trabalho de segunda a sexta.'], ['What are you doing on Saturday?', 'O que você vai fazer no sábado?']], undefined, { lookup: 'thursday', pos: 'substantivo' }),
      w('today · tomorrow · yesterday', '/təˈdeɪ/ /təˈmɒrəʊ/ /ˈjestədeɪ/', 'hoje · amanhã · ontem', '📍', [["I'm busy today.", 'Estou ocupado hoje.'], ['See you tomorrow!', 'Até amanhã!']], undefined, { lookup: 'tomorrow', pos: 'advérbio' }),
      w('first · second · third', '/fɜːst/ /ˈsekənd/ /θɜːd/', 'primeiro · segundo · terceiro', '🥇', [["It's on the third floor.", 'Fica no terceiro andar.'], ['My birthday is on May 21st.', 'Meu aniversário é 21 de maio.']], 'Abreviações: 1st, 2nd, 3rd, depois 4th, 5th... (21st, 22nd, 23rd).', { lookup: 'third', pos: 'número' }),
      w('in · on · at (tempo)', '', 'em (preposições de tempo)', '⏱️', [['in July / in 2026', 'em julho / em 2026'], ['on Monday / on May 5th', 'na segunda / em 5 de maio'], ['at 7 p.m. / at night', 'às 19h / à noite']], 'Regra do triângulo: IN (meses, anos, períodos longos) → ON (dias e datas) → AT (horas exatas).', { lookup: 'on', pos: 'preposição' }),
    ],
  ),
]
