import { irr, mod, sec, w } from './helpers.ts'
import type { Audience } from './types.ts'

const TA: Audience[] = ['teen', 'adult']
const SP = 'Simple Past'
const PC = 'Past Continuous'
const PP = 'Present Perfect'

export const a2Modules = [
  mod(
    {
      id: 'a2-irregular', level: 'A2', audiences: TA, title: 'Verbos irregulares', subtitle: 'Os 42 mais usados, com passado e particípio',
      emoji: '🔀', category: 'Verbos', photo: 'open book library',
      lesson: [
        sec('Por que "irregulares"?', 'Eles não seguem a regra do -ED. Os 40 mais comuns aparecem em quase toda conversa, então vale decorar as 3 formas: base → passado → particípio (go → went → gone).'),
        sec('Simple Past × Past Continuous', 'Simple Past: ação concluída ("I called her"). Past Continuous (was/were + -ing): ação em andamento num momento do passado ("I was driving"). Juntos: a ação longa é interrompida pela curta.', undefined, [
          ['I was cooking when you called.', 'Eu estava cozinhando quando você ligou.', 'longa + curta'],
          ['While she was sleeping, it started to rain.', 'Enquanto ela dormia, começou a chover.', 'while'],
        ]),
        sec('Onde entra o particípio', 'O particípio (3ª forma) é usado no Present Perfect (have + particípio) e na voz passiva (be + particípio): "I have seen it", "It was written in 1990".'),
      ],
    },
    [
      irr('be', 'was / were', 'been', 'being', ['/biː/', '/wɒz/ /wɜː/', '/biːn/'], 'ser / estar', '🧩', [
        ['I was very tired last night.', 'Eu estava muito cansado ontem à noite.', SP],
        ['We were having dinner when the lights went out.', 'Estávamos jantando quando a luz acabou.', PC],
        ['Have you ever been to London?', 'Você já esteve em Londres?', PP],
      ], '"Been" (/biːn/ UK, /bɪn/ US) vs "gone": "She has been to Paris" = já foi e voltou; "She has gone to Paris" = foi e ainda está lá.'),
      irr('have', 'had', 'had', 'having', ['/hæv/', '/hæd/', '/hæd/'], 'ter / tomar (refeição)', '🎁', [
        ['I had a great time.', 'Eu me diverti muito.', SP],
        ['We were having lunch when he arrived.', 'Estávamos almoçando quando ele chegou.', PC],
        ['I have had this car for ten years.', 'Tenho este carro há dez anos.', PP],
      ], '"Have" no sentido de POSSUIR não vai para o -ing ("I am having a car" ✗). Mas em refeições e experiências pode: "having lunch", "having fun".'),
      irr('do', 'did', 'done', 'doing', ['/duː/', '/dɪd/', '/dʌn/'], 'fazer (tarefas, atividades)', '✅', [
        ['I did my homework.', 'Eu fiz minha lição de casa.', SP],
        ['What were you doing at 10 p.m.?', 'O que você estava fazendo às 22h?', PC],
        ["Have you done the dishes?", 'Você lavou a louça?', PP],
      ], 'DO = atividades e tarefas (do homework, do exercise, do the dishes). MAKE = criar/produzir (make a cake, make a mistake). "Did" também é o auxiliar do passado: "Did you see?"'),
      irr('say', 'said', 'said', 'saying', ['/seɪ/', '/sed/', '/sed/'], 'dizer', '💬', [
        ['She said she was busy.', 'Ela disse que estava ocupada.', SP],
        ['What was he saying?', 'O que ele estava dizendo?', PC],
        ["I've said it a thousand times!", 'Já disse isso mil vezes!', PP],
      ], 'Pronúncia-armadilha: "said" é /sed/ ("séd"), NÃO "seid". SAY algo; TELL alguém: "She said hello" / "She told me".'),
      irr('go', 'went', 'gone', 'going', ['/ɡəʊ/', '/went/', '/ɡɒn/'], 'ir', '🚶', [
        ['We went to the beach on Sunday.', 'Fomos à praia no domingo.', SP],
        ['I was going home when I saw the accident.', 'Eu estava indo para casa quando vi o acidente.', PC],
        ['He has gone to the bank.', 'Ele foi ao banco (e ainda não voltou).', PP],
      ], '"Go home" — sem "to"! Também: go shopping, go swimming, go fishing.'),
      irr('get', 'got', 'got / gotten', 'getting', ['/ɡet/', '/ɡɒt/', '/ɡɒt/ /ˈɡɒtn/'], 'conseguir, pegar, receber, ficar, chegar', '🎯', [
        ['I got your message.', 'Recebi sua mensagem.', SP],
        ['It was getting dark.', 'Estava ficando escuro.', PC],
        ['She has gotten much better.', 'Ela melhorou muito.', `${PP} (US)`],
      ], 'O verbo mais versátil do inglês: get home (chegar), get tired (ficar cansado), get a job (conseguir), get it (entender). "Gotten" é americano; britânicos usam "got".'),
      irr('make', 'made', 'made', 'making', ['/meɪk/', '/meɪd/', '/meɪd/'], 'fazer (criar, produzir)', '🛠️', [
        ['I made a mistake.', 'Eu cometi um erro.', SP],
        ['She was making a cake when I arrived.', 'Ela estava fazendo um bolo quando cheguei.', PC],
        ['We have made a decision.', 'Tomamos uma decisão.', PP],
      ], 'Collocations com MAKE: make a decision, make money, make friends, make a call, make sense.'),
      irr('know', 'knew', 'known', 'knowing', ['/nəʊ/', '/njuː/', '/nəʊn/'], 'saber / conhecer', '🧠', [
        ['I knew the answer.', 'Eu sabia a resposta.', SP],
        ["I've known her since 2015.", 'Eu a conheço desde 2015.', PP],
      ], 'O "k" é mudo: "nôu". "Knew" soa igual a "new". Verbo de estado: quase nunca vai para o -ing.'),
      irr('think', 'thought', 'thought', 'thinking', ['/θɪŋk/', '/θɔːt/', '/θɔːt/'], 'pensar / achar', '💭', [
        ['I thought you were at work.', 'Achei que você estava no trabalho.', SP],
        ['I was thinking about you.', 'Eu estava pensando em você.', PC],
        ["Have you thought about it?", 'Você pensou nisso?', PP],
      ], '"Thought" é /θɔːt/ — o "gh" é mudo. Língua entre os dentes no "th". Think ABOUT/OF (nunca "think in").'),
      irr('take', 'took', 'taken', 'taking', ['/teɪk/', '/tʊk/', '/ˈteɪkən/'], 'pegar, levar, tomar, demorar', '🫴', [
        ['I took a taxi to the airport.', 'Peguei um táxi para o aeroporto.', SP],
        ['She was taking a shower when the phone rang.', 'Ela estava tomando banho quando o telefone tocou.', PC],
        ['It has taken me years to learn this.', 'Levei anos para aprender isso.', PP],
      ], 'Take a shower, take a picture, take a break, take medicine. "It takes 2 hours" = demora 2 horas.'),
      irr('see', 'saw', 'seen', 'seeing', ['/siː/', '/sɔː/', '/siːn/'], 'ver', '👀', [
        ['I saw a great movie last night.', 'Vi um filme ótimo ontem à noite.', SP],
        ['Are you seeing anyone?', 'Você está saindo com alguém?', 'sentido de namorar'],
        ["I've never seen anything like it.", 'Nunca vi nada parecido.', PP],
      ], 'Erro comum: "I seen" ✗ → "I saw" ou "I have seen".'),
      irr('come', 'came', 'come', 'coming', ['/kʌm/', '/keɪm/', '/kʌm/'], 'vir', '🏃', [
        ['She came to my party.', 'Ela veio à minha festa.', SP],
        ['He was coming back from work.', 'Ele estava voltando do trabalho.', PC],
        ['Spring has come.', 'A primavera chegou.', PP],
      ], 'Particípio igual à base: come → came → COME. "Come" (/kʌm/) rima com "some".'),
      irr('find', 'found', 'found', 'finding', ['/faɪnd/', '/faʊnd/', '/faʊnd/'], 'encontrar / achar', '🔎', [
        ['I found my keys under the sofa.', 'Achei minhas chaves embaixo do sofá.', SP],
        ["Have you found a job yet?", 'Você já encontrou um emprego?', PP],
      ], 'Find out = descobrir (informação). "I found out the truth."'),
      irr('give', 'gave', 'given', 'giving', ['/ɡɪv/', '/ɡeɪv/', '/ˈɡɪvn/'], 'dar', '🎁', [
        ['He gave me a ride.', 'Ele me deu uma carona.', SP],
        ['They were giving away free samples.', 'Estavam distribuindo amostras grátis.', PC],
        ['She has given up sugar.', 'Ela parou de comer açúcar.', PP],
      ], 'Duas estruturas: "give me the book" = "give the book TO me".'),
      irr('tell', 'told', 'told', 'telling', ['/tel/', '/təʊld/', '/təʊld/'], 'contar / dizer (a alguém)', '🗣️', [
        ['She told me the truth.', 'Ela me contou a verdade.', SP],
        ['He was telling a joke when the boss walked in.', 'Ele estava contando uma piada quando o chefe entrou.', PC],
        ["I've told you before.", 'Eu já te disse antes.', PP],
      ], 'TELL sempre tem a pessoa: tell ME, tell HIM. Tell a story, tell the truth, tell a lie.'),
      irr('feel', 'felt', 'felt', 'feeling', ['/fiːl/', '/felt/', '/felt/'], 'sentir(-se)', '🫶', [
        ['I felt sick after lunch.', 'Me senti mal depois do almoço.', SP],
        ['I was feeling much better yesterday.', 'Eu estava me sentindo bem melhor ontem.', PC],
        ["I've never felt so happy.", 'Nunca me senti tão feliz.', PP],
      ], 'Feel like + -ing = estar com vontade: "I feel like eating pizza."'),
      irr('become', 'became', 'become', 'becoming', ['/bɪˈkʌm/', '/bɪˈkeɪm/', '/bɪˈkʌm/'], 'tornar-se', '🦋', [
        ['She became a doctor in 2020.', 'Ela se tornou médica em 2020.', SP],
        ['It was becoming a problem.', 'Estava se tornando um problema.', PC],
        ['English has become essential.', 'O inglês se tornou essencial.', PP],
      ], 'Segue o padrão de "come": become → became → become.'),
      irr('leave', 'left', 'left', 'leaving', ['/liːv/', '/left/', '/left/'], 'sair, partir, deixar', '🚪', [
        ['I left my phone at home.', 'Deixei meu celular em casa.', SP],
        ['We were leaving when it started to rain.', 'Estávamos saindo quando começou a chover.', PC],
        ['The train has just left.', 'O trem acabou de sair.', PP],
      ], '"Leave" /liːv/ tem vogal longa. Não confunda com "live" /lɪv/ (morar).'),
      irr('put', 'put', 'put', 'putting', ['/pʊt/', '/pʊt/', '/pʊt/'], 'colocar / pôr', '📥', [
        ['I put the milk in the fridge.', 'Coloquei o leite na geladeira.', SP],
        ['She was putting on her makeup.', 'Ela estava se maquiando.', PC],
        ["Where have you put my glasses?", 'Onde você colocou meus óculos?', PP],
      ], 'As três formas são iguais! Phrasal verbs: put on (vestir), put off (adiar), put up with (aguentar).'),
      irr('bring', 'brought', 'brought', 'bringing', ['/brɪŋ/', '/brɔːt/', '/brɔːt/'], 'trazer', '🧺', [
        ['She brought a cake to the party.', 'Ela trouxe um bolo para a festa.', SP],
        ["Have you brought your passport?", 'Você trouxe seu passaporte?', PP],
      ], 'BRING = trazer (para cá). TAKE = levar (para lá). "Brought" /brɔːt/ — "gh" mudo.'),
      irr('begin', 'began', 'begun', 'beginning', ['/bɪˈɡɪn/', '/bɪˈɡæn/', '/bɪˈɡʌn/'], 'começar', '🏁', [
        ['The meeting began at nine.', 'A reunião começou às nove.', SP],
        ['It has already begun.', 'Já começou.', PP],
      ], 'Padrão i → a → u (como drink, swim, sing). O -ing dobra o N: beginning.'),
      irr('buy', 'bought', 'bought', 'buying', ['/baɪ/', '/bɔːt/', '/bɔːt/'], 'comprar', '🛍️', [
        ['I bought a new laptop.', 'Comprei um notebook novo.', SP],
        ['We were buying groceries when you called.', 'Estávamos fazendo compras quando você ligou.', PC],
        ["I've already bought the tickets.", 'Já comprei os ingressos.', PP],
      ], '"Bought" /bɔːt/ rima com "thought" e "taught". Não confunda com "brought" (trouxe).'),
      irr('drink', 'drank', 'drunk', 'drinking', ['/drɪŋk/', '/dræŋk/', '/drʌŋk/'], 'beber', '🥤', [
        ['I drank too much coffee today.', 'Bebi café demais hoje.', SP],
        ['They were drinking wine on the balcony.', 'Eles estavam bebendo vinho na varanda.', PC],
        ["I've never drunk tequila.", 'Nunca bebi tequila.', PP],
      ], '"Drunk" também é adjetivo: bêbado.'),
      irr('eat', 'ate', 'eaten', 'eating', ['/iːt/', '/et/ /eɪt/', '/ˈiːtn/'], 'comer', '🍽️', [
        ['We ate sushi last night.', 'Comemos sushi ontem à noite.', SP],
        ['I was eating when you texted me.', 'Eu estava comendo quando você mandou mensagem.', PC],
        ["Have you eaten yet?", 'Você já comeu?', PP],
      ], '"Ate": UK /et/, US /eɪt/ (igual a "eight").'),
      irr('write', 'wrote', 'written', 'writing', ['/raɪt/', '/rəʊt/', '/ˈrɪtn/'], 'escrever', '✍️', [
        ['She wrote a book about Brazil.', 'Ela escreveu um livro sobre o Brasil.', SP],
        ['I was writing an email when the power went out.', 'Eu estava escrevendo um e-mail quando a luz caiu.', PC],
        ['This song was written in 1975.', 'Esta música foi escrita em 1975.', 'Passive'],
      ], 'O "w" é mudo. "Written" tem T duplo e vogal curta: /ˈrɪtn/.'),
      irr('speak', 'spoke', 'spoken', 'speaking', ['/spiːk/', '/spəʊk/', '/ˈspəʊkən/'], 'falar', '🗣️', [
        ['I spoke to the manager.', 'Falei com o gerente.', SP],
        ['English is spoken all over the world.', 'O inglês é falado no mundo todo.', 'Passive'],
      ], 'SPEAK = idiomas e situações formais ("speak English"). TALK = conversa informal.'),
      irr('run', 'ran', 'run', 'running', ['/rʌn/', '/ræn/', '/rʌn/'], 'correr / administrar', '🏃', [
        ['I ran 5 km this morning.', 'Corri 5 km hoje de manhã.', SP],
        ['She was running when she fell.', 'Ela estava correndo quando caiu.', PC],
        ["We've run out of milk.", 'Acabou o leite.', PP],
      ], 'Run a business = administrar um negócio. Run out of = ficar sem.'),
      irr('sleep', 'slept', 'slept', 'sleeping', ['/sliːp/', '/slept/', '/slept/'], 'dormir', '😴', [
        ["I slept badly last night.", 'Dormi mal ontem à noite.', SP],
        ['The baby was sleeping, so we whispered.', 'O bebê estava dormindo, então sussurramos.', PC],
      ], 'Fall asleep = pegar no sono. Oversleep = perder a hora.'),
      irr('drive', 'drove', 'driven', 'driving', ['/draɪv/', '/drəʊv/', '/ˈdrɪvn/'], 'dirigir', '🚗', [
        ['He drove all night.', 'Ele dirigiu a noite toda.', SP],
        ['I was driving when my phone rang.', 'Eu estava dirigindo quando meu celular tocou.', PC],
        ["Have you ever driven on the left?", 'Você já dirigiu pela esquerda?', PP],
      ], 'Driver\'s license (US) / driving licence (UK) = carteira de motorista.'),
      irr('choose', 'chose', 'chosen', 'choosing', ['/tʃuːz/', '/tʃəʊz/', '/ˈtʃəʊzn/'], 'escolher', '☝️', [
        ['She chose the red dress.', 'Ela escolheu o vestido vermelho.', SP],
        ['You have been chosen!', 'Você foi escolhido!', 'Passive'],
      ], 'Atenção às vogais: choose /uː/ → chose /əʊ/. Substantivo: choice.'),
      irr('forget', 'forgot', 'forgotten', 'forgetting', ['/fəˈɡet/', '/fəˈɡɒt/', '/fəˈɡɒtn/'], 'esquecer', '🫥', [
        ['I forgot your birthday. Sorry!', 'Esqueci seu aniversário. Desculpa!', SP],
        ["I've forgotten my password.", 'Esqueci minha senha.', PP],
      ], 'Forget TO do = esquecer de fazer. Forget DOING = esquecer que fez.'),
      irr('understand', 'understood', 'understood', 'understanding', ['/ˌʌndəˈstænd/', '/ˌʌndəˈstʊd/', '/ˌʌndəˈstʊd/'], 'entender', '💡', [
        ["I didn't understand the question.", 'Não entendi a pergunta.', SP],
        ["Have you understood everything?", 'Você entendeu tudo?', PP],
      ], 'Segue o padrão de "stand → stood".'),
      irr('pay', 'paid', 'paid', 'paying', ['/peɪ/', '/peɪd/', '/peɪd/'], 'pagar', '💳', [
        ['I paid by card.', 'Paguei no cartão.', SP],
        ["Have you paid the bill?", 'Você pagou a conta?', PP],
      ], 'Grafia: paid (não "payed"). Pay FOR something: "I paid for dinner". Pay attention = prestar atenção.'),
      irr('meet', 'met', 'met', 'meeting', ['/miːt/', '/met/', '/met/'], 'conhecer (pela 1ª vez) / encontrar', '🤝', [
        ['We met in college.', 'Nos conhecemos na faculdade.', SP],
        ["Have you met my wife?", 'Você já conhece minha esposa?', PP],
      ], 'Conhecer PESSOA pela primeira vez = meet. Conhecer LUGAR = visit/know. "Nice to meet you."'),
      irr('lose', 'lost', 'lost', 'losing', ['/luːz/', '/lɒst/', '/lɒst/'], 'perder', '🧭', [
        ['We lost the game.', 'Perdemos o jogo.', SP],
        ["I've lost my wallet!", 'Perdi minha carteira!', PP],
      ], '"Lose" /luːz/ (perder) ≠ "loose" /luːs/ (frouxo). Perder o ônibus = MISS the bus.'),
      irr('teach', 'taught', 'taught', 'teaching', ['/tiːtʃ/', '/tɔːt/', '/tɔːt/'], 'ensinar', '🧑‍🏫', [
        ['My grandma taught me to cook.', 'Minha avó me ensinou a cozinhar.', SP],
        ['She was teaching when the alarm went off.', 'Ela estava dando aula quando o alarme tocou.', PC],
      ], '"Taught" /tɔːt/ — mesmo som final de "thought" e "bought".'),
      irr('read', 'read', 'read', 'reading', ['/riːd/', '/red/', '/red/'], 'ler', '📖', [
        ['I read the whole book in one day.', 'Li o livro inteiro em um dia.', SP],
        ['I was reading when I fell asleep.', 'Eu estava lendo quando peguei no sono.', PC],
        ["Have you read the news?", 'Você leu as notícias?', PP],
      ], 'Escrita igual, som diferente! Presente /riːd/ ("riid"), passado e particípio /red/ (igual à cor "red").'),
      irr('send', 'sent', 'sent', 'sending', ['/send/', '/sent/', '/sent/'], 'enviar', '📨', [
        ['I sent you an email.', 'Te mandei um e-mail.', SP],
        ["Has the package been sent?", 'O pacote foi enviado?', 'Passive'],
      ]),
      irr('spend', 'spent', 'spent', 'spending', ['/spend/', '/spent/', '/spent/'], 'gastar (dinheiro) / passar (tempo)', '💸', [
        ['I spent too much money.', 'Gastei dinheiro demais.', SP],
        ['We spent the weekend at the beach.', 'Passamos o fim de semana na praia.', SP],
      ], 'Passar o tempo = SPEND time (nunca "pass time").'),
      irr('break', 'broke', 'broken', 'breaking', ['/breɪk/', '/brəʊk/', '/ˈbrəʊkən/'], 'quebrar', '💔', [
        ['He broke his leg skiing.', 'Ele quebrou a perna esquiando.', SP],
        ['The printer is broken.', 'A impressora está quebrada.', 'adjetivo'],
      ], '"I\'m broke" (informal) = estou sem dinheiro.'),
      irr('fall', 'fell', 'fallen', 'falling', ['/fɔːl/', '/fel/', '/ˈfɔːlən/'], 'cair', '🍂', [
        ['She fell off her bike.', 'Ela caiu da bicicleta.', SP],
        ['Prices have fallen.', 'Os preços caíram.', PP],
      ], 'Fall in love = se apaixonar. Fall asleep = adormecer. Não confunda "fell" (caiu) com "felt" (sentiu).'),
      irr('keep', 'kept', 'kept', 'keeping', ['/kiːp/', '/kept/', '/kept/'], 'manter / guardar / continuar', '🗄️', [
        ['She kept the secret.', 'Ela guardou o segredo.', SP],
        ['Keep going!', 'Continue!', 'imperativo'],
      ], 'Keep + -ing = continuar fazendo: "He keeps calling me."'),
    ],
  ),
  mod(
    {
      id: 'a2-pastcont', level: 'A2', audiences: TA, title: 'Contando histórias no passado', subtitle: 'Simple Past × Past Continuous',
      emoji: '📽️', category: 'Gramática', photo: 'old film camera',
      lesson: [
        sec('Simple Past', 'Ação terminada em um momento definido do passado. Afirmativa com o verbo no passado; negativa e pergunta com DID + verbo na forma base.', [
          ['Afirmativa', 'Negativa', 'Pergunta'], ['I worked.', "I didn't work.", 'Did you work?'], ['She went.', "She didn't go.", 'Did she go?'],
        ]),
        sec('Past Continuous', 'WAS/WERE + verbo-ING. Descreve o "cenário" de uma história ou uma ação que estava acontecendo quando outra a interrompeu.', [
          ['Afirmativa', 'Negativa', 'Pergunta'], ['I was sleeping.', "I wasn't sleeping.", 'Were you sleeping?'],
        ]),
      ],
    },
    [
      w('did + verbo base', '/dɪd/', 'auxiliar do passado (perguntas e negativas)', '⏪', [
        ['Did you call her?', 'Você ligou para ela?', SP], ["I didn't see it.", 'Eu não vi.', SP],
      ], 'Depois de "did/didn\'t" o verbo volta para a forma BASE: "Did you go?" (nunca "Did you went?").', { lookup: 'did', pos: 'estrutura' }),
      w('was/were + -ing', '', 'estava fazendo (ação em andamento)', '🎞️', [
        ['At 8 p.m. I was watching a movie.', 'Às 20h eu estava assistindo a um filme.', PC], ['It was raining all day.', 'Choveu o dia todo.', PC],
      ], undefined, { lookup: 'was', pos: 'estrutura' }),
      w('when', '/wen/', 'quando (interrupção, ação curta)', '⚡', [
        ['I was taking a shower when the doorbell rang.', 'Eu estava no banho quando a campainha tocou.', `${PC} + ${SP}`],
      ], 'WHEN costuma vir com a ação curta (Simple Past).', { lookup: 'when', pos: 'conjunção' }),
      w('while', '/waɪl/', 'enquanto (ação longa)', '⏳', [
        ['While I was cooking, my son was doing his homework.', 'Enquanto eu cozinhava, meu filho fazia a lição.', `${PC} + ${PC}`],
        ['Someone stole my bag while I was sleeping.', 'Alguém roubou minha bolsa enquanto eu dormia.', `${SP} + ${PC}`],
      ], 'WHILE costuma vir com a ação longa (Past Continuous).', { lookup: 'while', pos: 'conjunção' }),
      w('ago', '/əˈɡəʊ/', 'atrás (tempo)', '🕰️', [['I moved here two years ago.', 'Me mudei para cá há dois anos.', SP]], 'Vem DEPOIS do período: "three days ago" = há três dias.', { lookup: 'ago', pos: 'advérbio' }),
      w('last night / last week', '', 'ontem à noite / semana passada', '📅', [['What did you do last weekend?', 'O que você fez no fim de semana passado?', SP]], 'Sem "the" e sem "in": "last year" (não "in the last year").', { lookup: 'last', pos: 'expressão' }),
      w('used to', '/ˈjuːst tə/', 'costumava', '📼', [['I used to play soccer every day.', 'Eu costumava jogar bola todo dia.'], ["She didn't use to like coffee.", 'Ela não costumava gostar de café.']], 'Hábito do passado que não existe mais. Pronúncia: "iússtu" (o "d" some).', { lookup: 'used', pos: 'estrutura' }),
    ],
  ),
  mod(
    {
      id: 'a2-now', level: 'A2', audiences: TA, title: 'Agora e futuro', subtitle: 'Present Continuous, going to e will',
      emoji: '🔮', category: 'Gramática', photo: 'crystal ball',
      lesson: [
        sec('Present Continuous', 'AM/IS/ARE + -ING para o que está acontecendo agora ou em um período atual: "I\'m working on a new project".'),
        sec('Três formas de futuro', 'GOING TO: plano já decidido ou previsão com evidência. WILL: decisão na hora, promessa, previsão de opinião. PRESENT CONTINUOUS: compromisso marcado.', [
          ['Forma', 'Uso', 'Exemplo'],
          ['going to', 'plano / evidência', "I'm going to travel in July."],
          ['will', 'decisão na hora / promessa', "I'll help you!"],
          ['present continuous', 'agenda marcada', "I'm meeting Ana at 6."],
        ]),
      ],
    },
    [
      w('am / is / are + -ing', '', 'estou / está / estão fazendo', '▶️', [
        ["I'm working right now.", 'Estou trabalhando agora.', 'Present Continuous'], ['What are you doing?', 'O que você está fazendo?', 'Present Continuous'],
      ], 'Verbos de estado (know, like, want, need, believe) normalmente NÃO vão para o -ing.', { lookup: 'doing', pos: 'estrutura' }),
      w('going to', '/ˈɡəʊɪŋ tə/', 'vou / vai (plano ou previsão)', '🗺️', [
        ["I'm going to study tonight.", 'Vou estudar hoje à noite.', 'Future (plano)'], ["Look at those clouds! It's going to rain.", 'Olha essas nuvens! Vai chover.', 'Future (evidência)'],
      ], 'Na fala informal vira "gonna": "I\'m gonna call her."', { lookup: 'going', pos: 'estrutura' }),
      w('will / won\'t', '/wɪl/ /wəʊnt/', 'futuro: decisão na hora, promessa, previsão', '🤞', [
        ["It's heavy. — I'll help you!", 'Está pesado. — Eu te ajudo!', 'decisão na hora'], ["I won't tell anyone.", 'Não vou contar a ninguém.', 'promessa'], ['I think she will win.', 'Acho que ela vai ganhar.', 'opinião'],
      ], 'Contrações: I\'ll ("áiou"), you\'ll, she\'ll... e won\'t = will not.', { lookup: 'will', pos: 'auxiliar' }),
      w('right now / at the moment', '', 'agora mesmo / no momento', '⏱️', [["She's in a meeting at the moment.", 'Ela está em reunião no momento.']], undefined, { lookup: 'moment', pos: 'expressão' }),
      w('next week / next year', '', 'semana que vem / ano que vem', '⏭️', [["We're moving next month.", 'Vamos nos mudar mês que vem.', 'Present Continuous (futuro)']], 'Sem "the": "next week", "next Monday".', { lookup: 'next', pos: 'expressão' }),
      w('Shall we...?', '/ʃæl wiː/', 'Vamos...? (sugestão)', '🤝', [['Shall we go?', 'Vamos?'], ['Shall I open the window?', 'Quer que eu abra a janela?']], 'Bem britânico e educado. Nos EUA é mais comum "Should we...?" ou "Let\'s...".', { lookup: 'shall', pos: 'auxiliar' }),
    ],
  ),
  mod(
    {
      id: 'a2-routine', level: 'A2', audiences: TA, title: 'Rotina e casa', subtitle: 'Do despertador à hora de dormir',
      emoji: '🏠', category: 'Vocabulário', photo: 'home kitchen morning',
      lesson: [sec('Collocations', 'Em inglês as palavras andam em "duplas fixas": TAKE a shower, HAVE breakfast, DO the dishes, MAKE the bed. Aprenda o bloco inteiro, não a palavra isolada.')],
    },
    [
      w('wake up / get up', '', 'acordar / levantar da cama', '⏰', [['I wake up at 6 but I get up at 6:30.', 'Acordo às 6, mas levanto às 6:30.']], 'Wake up = abrir os olhos. Get up = sair da cama.', { lookup: 'wake', pos: 'phrasal verb' }),
      w('take a shower', '', 'tomar banho', '🚿', [['I usually take a shower at night.', 'Geralmente tomo banho à noite.']], 'UK: "have a shower". Banho de banheira: "take a bath".', { lookup: 'shower', pos: 'collocation' }),
      w('have breakfast / lunch / dinner', '', 'tomar café da manhã / almoçar / jantar', '🍳', [["Let's have lunch together.", 'Vamos almoçar juntos.']], 'Sem artigo: "have breakfast" (não "have the breakfast").', { lookup: 'breakfast', pos: 'collocation' }),
      w('commute', '/kəˈmjuːt/', 'deslocamento casa-trabalho', '🚇', [['My commute takes an hour.', 'Meu trajeto até o trabalho leva uma hora.']], 'Também é verbo: "I commute by train."', { pos: 'substantivo/verbo' }),
      w('do the dishes', '', 'lavar a louça', '🍽️', [["I'll do the dishes tonight.", 'Eu lavo a louça hoje.']], 'Tarefas domésticas: do the laundry (lavar roupa), do the cleaning.', { lookup: 'dishes', pos: 'collocation' }),
      w('make the bed', '', 'arrumar a cama', '🛏️', [['Make your bed before you leave.', 'Arrume sua cama antes de sair.']], undefined, { lookup: 'bed', pos: 'collocation' }),
      w('take out the trash', '', 'levar o lixo para fora', '🗑️', [['Can you take out the trash?', 'Você pode levar o lixo para fora?']], 'UK: "take out the rubbish".', { lookup: 'trash', pos: 'collocation' }),
      w('go grocery shopping', '', 'fazer compras de mercado', '🛒', [['We go grocery shopping on Saturdays.', 'Fazemos mercado aos sábados.']], undefined, { lookup: 'grocery', pos: 'collocation' }),
      w('fall asleep', '/fɔːl əˈsliːp/', 'pegar no sono', '😪', [['I fell asleep on the couch.', 'Peguei no sono no sofá.', SP]], undefined, { lookup: 'asleep', pos: 'collocation' }),
      w('day off', '/deɪ ɒf/', 'dia de folga', '🏖️', [["Tomorrow is my day off.", 'Amanhã é minha folga.']], undefined, { lookup: 'off', pos: 'substantivo' }),
    ],
  ),
]
