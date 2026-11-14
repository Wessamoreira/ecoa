import { mod, sec, w } from './helpers.ts'
import type { Audience } from './types.ts'

const TA: Audience[] = ['teen', 'adult']
const SP = 'Simple Past'
const PP = 'Present Perfect'

export const b1Modules = [
  mod(
    {
      id: 'b1-perfect', level: 'B1', audiences: TA, title: 'Present Perfect', subtitle: 'O tempo que não existe em português',
      emoji: '🌉', category: 'Gramática', photo: 'bridge connecting',
      lesson: [
        sec('A ponte entre passado e presente', 'HAVE/HAS + particípio. Use quando o passado tem ligação com o agora: experiências de vida (sem dizer quando), ações que começaram no passado e continuam, e resultados que importam agora.'),
        sec('Present Perfect × Simple Past', 'Se você diz QUANDO (yesterday, in 2019, last week, two days ago), use Simple Past. Se o momento não importa ou o período ainda não acabou, use Present Perfect.', [
          ['Present Perfect', 'Simple Past'],
          ["I've lost my keys. (estou sem elas agora)", 'I lost my keys yesterday. (fato terminado)'],
          ["She has worked here since 2020. (ainda trabalha)", 'She worked here for 3 years. (não trabalha mais)'],
          ["Have you ever been to Japan?", 'Did you go to Japan last year?'],
        ]),
      ],
    },
    [
      w('have / has + particípio', '', 'estrutura do Present Perfect', '🌉', [
        ["I've finished the report.", 'Terminei o relatório.', PP], ["She hasn't called yet.", 'Ela ainda não ligou.', PP], ['Has he arrived?', 'Ele já chegou?', PP],
      ], 'Contrações: I\'ve, you\'ve, she\'s (= she has), hasn\'t, haven\'t.', { lookup: 'have', pos: 'estrutura' }),
      w('ever / never', '/ˈevə/ /ˈnevə/', 'alguma vez / nunca (experiências)', '🌍', [
        ['Have you ever tried sushi?', 'Você já provou sushi?', PP], ["I've never been to Europe.", 'Nunca fui para a Europa.', PP],
      ], '"Ever" só em perguntas. "Never" já é negativo — não use com "not".', { lookup: 'ever', pos: 'advérbio' }),
      w('already / yet', '/ɔːlˈredi/ /jet/', 'já / ainda (não), já (pergunta)', '✔️', [
        ["I've already eaten.", 'Já comi.', PP], ["Have you finished yet?", 'Você já terminou?', PP], ["I haven't decided yet.", 'Ainda não decidi.', PP],
      ], 'ALREADY: afirmativas, no meio. YET: perguntas e negativas, no final da frase.', { lookup: 'already', pos: 'advérbio' }),
      w('just', '/dʒʌst/', 'acabar de', '⚡', [["I've just arrived.", 'Acabei de chegar.', PP], ['The movie has just started.', 'O filme acabou de começar.', PP]], 'Não existe verbo "acabar de" em inglês: use have + JUST + particípio.', { lookup: 'just', pos: 'advérbio' }),
      w('for / since', '/fɔː/ /sɪns/', 'há (duração) / desde (ponto de início)', '⏳', [
        ["I've lived here for ten years.", 'Moro aqui há dez anos.', PP], ["I've lived here since 2016.", 'Moro aqui desde 2016.', PP],
      ], 'Erro clássico de brasileiro: "I live here for ten years" ✗. Ação que começou no passado e continua = Present Perfect!', { lookup: 'since', pos: 'preposição' }),
      w('How long have you...?', '', 'Há quanto tempo você...?', '⌛', [["How long have you known him?", 'Há quanto tempo você o conhece?', PP], ['How long have you been waiting?', 'Há quanto tempo você está esperando?', 'Present Perfect Continuous']], undefined, { lookup: 'long', pos: 'estrutura' }),
      w('been vs gone', '/biːn/ /ɡɒn/', 'foi e voltou × foi e está lá', '🧳', [
        ["She's been to Paris twice.", 'Ela já foi a Paris duas vezes.', PP], ["She's gone to Paris.", 'Ela foi para Paris (e está lá).', PP],
      ], undefined, { lookup: 'been', pos: 'contraste' }),
      w('I lost × I have lost', '', 'Simple Past × Present Perfect', '🔑', [
        ['I lost my keys last night, but I found them.', 'Perdi minhas chaves ontem, mas achei.', SP], ["I've lost my keys! Can you help me look?", 'Perdi minhas chaves! Pode me ajudar a procurar?', PP],
      ], 'O Present Perfect enfatiza o RESULTADO no presente.', { lookup: 'lost', pos: 'contraste' }),
      w('have been + -ing', '', 'tenho feito / venho fazendo (Present Perfect Continuous)', '🔄', [
        ["I've been studying English for two years.", 'Estudo inglês há dois anos.', 'Present Perfect Continuous'], ["You look tired. — I've been working all day.", 'Você parece cansado. — Trabalhei o dia todo.', 'Present Perfect Continuous'],
      ], 'Enfatiza a DURAÇÃO e a continuidade da ação.', { lookup: 'been', pos: 'estrutura' }),
    ],
  ),
  mod(
    {
      id: 'b1-modals', level: 'B1', audiences: TA, title: 'Verbos modais', subtitle: 'Can, could, should, must, might, would...',
      emoji: '🎛️', category: 'Gramática',
      lesson: [
        sec('Como funcionam', 'Modais mudam o "tom" do verbo: habilidade, permissão, obrigação, conselho, possibilidade. Regras: não ganham -S ("she can"), não usam "do" (Can you...?) e o verbo seguinte vem sem "to" ("I must go").'),
        sec('Escala de certeza', 'Do mais certo ao menos certo: must (deve ser) → should (provavelmente) → may/might/could (talvez) → can\'t (impossível).'),
      ],
    },
    [
      w('can', '/kæn/', 'poder / conseguir / saber (habilidade)', '💪', [['I can speak three languages.', 'Sei falar três idiomas.', 'habilidade'], ['Can I sit here?', 'Posso sentar aqui?', 'permissão']], 'Na frase, "can" fica fraco: /kən/. "Can\'t" é forte: /kɑːnt/ ou /kænt/. A ênfase é que mostra a negação!', { pos: 'modal' }),
      w('could', '/kʊd/', 'podia / conseguia / poderia', '🙏', [['I could swim when I was five.', 'Eu sabia nadar aos cinco anos.', 'habilidade passada'], ['Could you help me?', 'Você poderia me ajudar?', 'pedido educado'], ['It could rain later.', 'Pode ser que chova mais tarde.', 'possibilidade']], 'O "l" é mudo: "kúd". Rima com "good".', { pos: 'modal' }),
      w('should', '/ʃʊd/', 'deveria (conselho)', '🧭', [['You should see a doctor.', 'Você deveria ir ao médico.', 'conselho'], ["You shouldn't worry.", 'Você não deveria se preocupar.', 'conselho']], '"L" mudo também: "chúd". Should have + particípio = deveria ter feito.', { pos: 'modal' }),
      w('must', '/mʌst/', 'dever (obrigação forte / dedução)', '⚠️', [['You must wear a seatbelt.', 'Você deve usar cinto.', 'obrigação'], ['She must be tired.', 'Ela deve estar cansada.', 'dedução']], 'MUST vem de dentro (regra/convicção). HAVE TO vem de fora (circunstância).', { pos: 'modal' }),
      w("mustn't × don't have to", '', 'não pode (proibido) × não precisa', '🚫', [["You mustn't smoke here.", 'Você não pode fumar aqui.', 'proibição'], ["You don't have to come.", 'Você não precisa vir.', 'ausência de obrigação']], 'Pegadinha enorme: "don\'t have to" NÃO é proibição!', { lookup: 'must', pos: 'contraste' }),
      w('have to', '/ˈhæf tə/', 'ter que', '📋', [['I have to work on Saturday.', 'Tenho que trabalhar no sábado.'], ['Did you have to wait?', 'Você teve que esperar?', SP]], 'Pronúncia natural: "háf-ta". Passado: had to.', { lookup: 'have', pos: 'semimodal' }),
      w('might / may', '/maɪt/ /meɪ/', 'talvez / pode ser que', '🎲', [["I might go to the party.", 'Talvez eu vá à festa.', 'possibilidade'], ['May I come in?', 'Posso entrar?', 'permissão formal']], 'MIGHT é um pouco menos certo que MAY. "May I...?" é mais formal que "Can I...?".', { lookup: 'might', pos: 'modal' }),
      w('would', '/wʊd/', 'futuro do pretérito (-ria) / pedidos', '💭', [['I would love to visit Japan.', 'Eu adoraria visitar o Japão.'], ['Would you like some coffee?', 'Você gostaria de um café?', 'oferta educada'], ['When I was a kid, I would play outside all day.', 'Quando criança, eu brincava fora o dia todo.', 'hábito passado']], 'Contração: I\'d, you\'d. "Would you mind + -ing?" = você se importaria de...?', { pos: 'modal' }),
      w('should have / could have / must have', '', 'deveria ter / poderia ter / deve ter (passado)', '🔙', [['You should have told me!', 'Você deveria ter me contado!'], ['It could have been worse.', 'Poderia ter sido pior.'], ['He must have forgotten.', 'Ele deve ter esquecido.']], 'Na fala: "shoulda", "coulda", "woulda". Nunca escreva "should of"!', { lookup: 'should', pos: 'estrutura' }),
    ],
  ),
  mod(
    {
      id: 'b1-conditionals', level: 'B1', audiences: TA, title: 'Condicionais', subtitle: 'Zero, first, second, third e mixed',
      emoji: '🔀', category: 'Gramática', photo: 'crossroads path choice',
      lesson: [
        sec('As 4 condicionais', 'Cada uma combina tempos verbais diferentes de acordo com o quanto a situação é real.', [
          ['Tipo', 'If + ...', 'Resultado', 'Uso'],
          ['Zero', 'presente', 'presente', 'fatos, verdades'],
          ['First', 'presente', 'will + verbo', 'futuro real/provável'],
          ['Second', 'passado', 'would + verbo', 'hipótese irreal no presente'],
          ['Third', 'had + particípio', 'would have + particípio', 'passado que não aconteceu'],
        ]),
        sec('Vírgula', 'Se a frase começa com IF, use vírgula. Se o IF vem no meio, não precisa: "If it rains, I stay home" / "I stay home if it rains".'),
      ],
    },
    [
      w('Zero Conditional', '', 'se + presente, presente (fatos)', '🧪', [['If you heat water to 100°C, it boils.', 'Se você aquece água a 100°C, ela ferve.', 'Zero'], ["If I drink coffee at night, I can't sleep.", 'Se tomo café à noite, não consigo dormir.', 'Zero']], 'IF aqui pode ser trocado por WHEN sem mudar o sentido.', { lookup: 'if', pos: 'estrutura' }),
      w('First Conditional', '', 'se + presente, will (futuro possível)', '🌦️', [['If it rains, we will stay home.', 'Se chover, vamos ficar em casa.', 'First'], ["If you study, you'll pass.", 'Se você estudar, vai passar.', 'First']], 'Nunca use "will" depois de IF: "If it will rain" ✗.', { lookup: 'if', pos: 'estrutura' }),
      w('Second Conditional', '', 'se + passado, would (hipótese irreal)', '💭', [['If I had more money, I would travel the world.', 'Se eu tivesse mais dinheiro, viajaria o mundo.', 'Second'], ['If I were you, I would accept the offer.', 'Se eu fosse você, aceitaria a oferta.', 'Second']], '"If I were you" é a forma correta para conselhos (were para todas as pessoas).', { lookup: 'would', pos: 'estrutura' }),
      w('Third Conditional', '', 'se + had + particípio, would have (passado irreal)', '🕳️', [["If I had known, I would have helped you.", 'Se eu soubesse, teria te ajudado.', 'Third'], ["If we had left earlier, we wouldn't have missed the flight.", 'Se tivéssemos saído mais cedo, não teríamos perdido o voo.', 'Third']], 'Usado para arrependimentos e críticas. Na fala: "If I\'d known, I\'d have..."', { lookup: 'known', pos: 'estrutura' }),
      w('Mixed Conditional', '', 'passado irreal → consequência no presente', '🔁', [["If I had studied medicine, I would be a doctor now.", 'Se eu tivesse estudado medicina, seria médico agora.', 'Mixed']], undefined, { lookup: 'had', pos: 'estrutura' }),
      w('unless', '/ənˈles/', 'a menos que / se não', '🚧', [["We'll be late unless we hurry.", 'Vamos nos atrasar a menos que nos apressemos.'], ["Don't call me unless it's urgent.", 'Não me ligue a não ser que seja urgente.']], 'UNLESS = IF NOT. Não use negativa depois dele.', { pos: 'conjunção' }),
      w('I wish / If only', '/aɪ wɪʃ/', 'eu queria que / quem me dera', '🌠', [['I wish I spoke French.', 'Queria falar francês.', 'presente'], ["I wish I hadn't said that.", 'Queria não ter dito aquilo.', 'passado']], 'Mesma lógica da 2ª/3ª condicional: desejo sobre o presente usa passado.', { lookup: 'wish', pos: 'estrutura' }),
    ],
  ),
  mod(
    {
      id: 'b1-false-friends', level: 'B1', audiences: TA, title: 'Falsos cognatos', subtitle: 'Parecem português, mas não são',
      emoji: '🎭', category: 'Vocabulário', photo: 'theater masks',
      lesson: [sec('Cuidado com a intuição', 'Palavras que parecem iguais ao português mas têm outro significado. Usar errado pode gerar confusão (ou situações engraçadas!).')],
    },
    [
      w('actually', '/ˈæktʃuəli/', 'na verdade (NÃO "atualmente")', '🎭', [["Actually, I'm from Recife.", 'Na verdade, sou de Recife.']], 'Atualmente = currently / nowadays.', { pos: 'falso cognato' }),
      w('pretend', '/prɪˈtend/', 'fingir (NÃO "pretender")', '🤥', [["He pretended to be sick.", 'Ele fingiu estar doente.']], 'Pretender = intend / plan.', { pos: 'falso cognato' }),
      w('push', '/pʊʃ/', 'empurrar (NÃO "puxar")', '🚪', [['Push the door.', 'Empurre a porta.']], 'Puxar = PULL. Olhe a placa da porta!', { pos: 'falso cognato' }),
      w('library', '/ˈlaɪbrəri/', 'biblioteca (NÃO "livraria")', '🏛️', [["I borrowed this book from the library.", 'Peguei este livro na biblioteca.']], 'Livraria = bookstore / bookshop.', { pos: 'falso cognato' }),
      w('college', '/ˈkɒlɪdʒ/', 'faculdade (NÃO "colégio")', '🎓', [['She is in college.', 'Ela está na faculdade.']], 'Colégio = high school / school.', { pos: 'falso cognato' }),
      w('parents', '/ˈpeərənts/', 'pais (pai e mãe) (NÃO "parentes")', '👪', [['My parents live in Curitiba.', 'Meus pais moram em Curitiba.']], 'Parentes = relatives.', { pos: 'falso cognato' }),
      w('realize', '/ˈrɪəlaɪz/', 'perceber (NÃO "realizar")', '💡', [["I didn't realize it was so late.", 'Não percebi que era tão tarde.']], 'Realizar (um sonho) = achieve / fulfill.', { pos: 'falso cognato' }),
      w('eventually', '/ɪˈventʃuəli/', 'no fim das contas (NÃO "eventualmente")', '🏁', [['Eventually, he found a job.', 'No fim, ele arrumou um emprego.']], 'Eventualmente = occasionally / from time to time.', { pos: 'falso cognato' }),
      w('lunch', '/lʌntʃ/', 'almoço (NÃO "lanche")', '🥗', [["Let's have lunch.", 'Vamos almoçar.']], 'Lanche = snack.', { pos: 'falso cognato' }),
      w('novel', '/ˈnɒvl/', 'romance (livro) (NÃO "novela")', '📚', [["I'm reading a novel by Machado de Assis.", 'Estou lendo um romance do Machado de Assis.']], 'Novela de TV = soap opera.', { pos: 'falso cognato' }),
      w('attend', '/əˈtend/', 'comparecer / frequentar (NÃO "atender")', '🗓️', [['Did you attend the meeting?', 'Você foi à reunião?']], 'Atender o telefone = answer the phone.', { pos: 'falso cognato' }),
      w('sensible', '/ˈsensəbl/', 'sensato (NÃO "sensível")', '🧠', [["That's a sensible decision.", 'É uma decisão sensata.']], 'Sensível = sensitive.', { pos: 'falso cognato' }),
      w('exquisite', '/ɪkˈskwɪzɪt/', 'requintado, primoroso (NÃO "esquisito")', '💎', [['An exquisite dinner.', 'Um jantar primoroso.']], 'Esquisito = weird / strange.', { pos: 'falso cognato' }),
      w('assist', '/əˈsɪst/', 'ajudar (NÃO "assistir")', '🙌', [['Can I assist you?', 'Posso ajudá-lo?']], 'Assistir TV = watch TV.', { pos: 'falso cognato' }),
      w('fabric', '/ˈfæbrɪk/', 'tecido (NÃO "fábrica")', '🧵', [['This fabric is soft.', 'Este tecido é macio.']], 'Fábrica = factory.', { pos: 'falso cognato' }),
    ],
  ),
  mod(
    {
      id: 'b1-compare', level: 'B1', audiences: TA, title: 'Comparando coisas', subtitle: 'Comparativos e superlativos',
      emoji: '⚖️', category: 'Gramática', photo: 'scales balance',
      lesson: [sec('Regras', 'Adjetivo curto: +ER / +EST (cheap → cheaper → the cheapest). Adjetivo longo: MORE / THE MOST (expensive → more expensive → the most expensive). Irregulares: good → better → the best; bad → worse → the worst; far → further → the furthest.', [
        ['Adjetivo', 'Comparativo', 'Superlativo'], ['big', 'bigger', 'the biggest'], ['happy', 'happier', 'the happiest'], ['interesting', 'more interesting', 'the most interesting'], ['good', 'better', 'the best'], ['bad', 'worse', 'the worst'],
      ])],
    },
    [
      w('-er than', '/ðæn/', 'mais ... do que (adjetivos curtos)', '📏', [['São Paulo is bigger than Rio.', 'São Paulo é maior que o Rio.']], '"Than" (do que) ≠ "then" (então).', { lookup: 'than', pos: 'estrutura' }),
      w('more ... than', '', 'mais ... do que (adjetivos longos)', '➕', [['This phone is more expensive than mine.', 'Este celular é mais caro que o meu.']], 'Nunca combine: "more bigger" ✗.', { lookup: 'more', pos: 'estrutura' }),
      w('the -est / the most', '', 'o mais ... (superlativo)', '🏆', [['She is the smartest person I know.', 'Ela é a pessoa mais inteligente que conheço.'], ["It's the most beautiful place in the world.", 'É o lugar mais bonito do mundo.']], 'Superlativo leva THE.', { lookup: 'most', pos: 'estrutura' }),
      w('better / the best', '/ˈbetə/ /best/', 'melhor / o melhor', '🥇', [['Your English is getting better!', 'Seu inglês está ficando melhor!'], ["It's the best pizza in town.", 'É a melhor pizza da cidade.']], undefined, { lookup: 'better', pos: 'irregular' }),
      w('worse / the worst', '/wɜːs/ /wɜːst/', 'pior / o pior', '👎', [['The traffic is worse today.', 'O trânsito está pior hoje.'], ['It was the worst day of my life.', 'Foi o pior dia da minha vida.']], undefined, { lookup: 'worse', pos: 'irregular' }),
      w('as ... as', '', 'tão ... quanto', '🟰', [["He's as tall as his father.", 'Ele é tão alto quanto o pai.'], ["It's not as easy as it looks.", 'Não é tão fácil quanto parece.']], undefined, { lookup: 'as', pos: 'estrutura' }),
    ],
  ),
]
