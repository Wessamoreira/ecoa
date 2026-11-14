import { mod, sec, w } from './helpers.ts'
import type { Audience } from './types.ts'

const T: Audience[] = ['teen']
const A: Audience[] = ['adult']

export const teenModules2 = [
  mod(
    {
      id: 't-movies', level: 'A2', audiences: T, title: 'Filmes, séries e música', subtitle: 'Fale sobre o que você maratona',
      emoji: '🎬', category: 'Vocabulário', photo: 'cinema popcorn',
      lesson: [sec('Recomendando', '"Have you seen...?" (Você já viu...?), "You should watch..." (Você deveria assistir...), "It\'s worth watching" (Vale a pena assistir). E nada de spoilers!')],
    },
    [
      w('episode / season', '/ˈepɪsəʊd/ /ˈsiːzn/', 'episódio / temporada', '📺', [['The new season comes out next week.', 'A nova temporada sai semana que vem.']], 'UK: "series" = temporada.', { lookup: 'episode', pos: 'substantivo' }),
      w('spoiler', '/ˈspɔɪlə/', 'spoiler', '🤐', [["No spoilers, please! I haven't finished it.", 'Sem spoilers! Ainda não terminei.']], 'Verbo: "Don\'t spoil it!"', { pos: 'substantivo' }),
      w('plot twist', '/plɒt twɪst/', 'reviravolta', '🌀', [['The plot twist at the end was insane!', 'A reviravolta no final foi insana!']], undefined, { lookup: 'plot', pos: 'substantivo' }),
      w('cast', '/kɑːst/', 'elenco', '🎭', [['The cast is amazing.', 'O elenco é incrível.']], undefined, { pos: 'substantivo' }),
      w('character', '/ˈkærəktə/', 'personagem', '🦸', [['Who is your favorite character?', 'Quem é seu personagem favorito?']], 'Pronúncia: "KÉ-rak-ter" — o "ch" soa como K.', { pos: 'substantivo' }),
      w('soundtrack', '/ˈsaʊndtræk/', 'trilha sonora', '🎵', [['The soundtrack is so good.', 'A trilha sonora é muito boa.']], undefined, { pos: 'substantivo' }),
      w('Have you seen...?', '', 'Você já viu...?', '👀', [['Have you seen the new Marvel movie?', 'Você já viu o novo filme da Marvel?', 'Present Perfect']], undefined, { lookup: 'seen', pos: 'expressão' }),
      w("It's worth watching", '', 'Vale a pena assistir', '⭐', [["It's long, but it's worth watching.", 'É longo, mas vale a pena assistir.']], undefined, { lookup: 'worth', pos: 'expressão' }),
      w('sequel', '/ˈsiːkwəl/', 'continuação (filme)', '2️⃣', [["The sequel wasn't as good as the original.", 'A continuação não foi tão boa quanto o original.']], undefined, { pos: 'substantivo' }),
      w('subtitles', '/ˈsʌbtaɪtlz/', 'legendas', '💬', [['I watch with English subtitles to practice.', 'Assisto com legenda em inglês para praticar.']], 'Dublado = dubbed.', { pos: 'substantivo' }),
    ],
  ),
]

export const adultModules2 = [
  mod(
    {
      id: 'ad-housing', level: 'A2', audiences: A, title: 'Casa e aluguel', subtitle: 'Alugar, mudar e falar com o proprietário',
      emoji: '🔑', category: 'Vocabulário',
      lesson: [sec('Morando fora', 'Se for morar no exterior, você vai ouvir: "lease" (contrato), "deposit" (caução), "utilities" (contas de luz/água/gás) e "landlord" (proprietário).')],
    },
    [
      w('rent', '/rent/', 'aluguel / alugar', '🏠', [['How much is the rent?', 'Quanto é o aluguel?'], ['We rent a two-bedroom apartment.', 'Alugamos um apartamento de dois quartos.']], undefined, { pos: 'substantivo/verbo' }),
      w('landlord', '/ˈlændlɔːd/', 'proprietário (que aluga)', '🧑‍💼', [['I need to call the landlord about the leak.', 'Preciso ligar para o proprietário sobre o vazamento.']], 'Inquilino = tenant.', { pos: 'substantivo' }),
      w('apartment / flat', '/əˈpɑːtmənt/ /flæt/', 'apartamento', '🏢', [['Our apartment is on the 10th floor.', 'Nosso apartamento fica no 10º andar.']], 'EUA: apartment. UK: flat.', { lookup: 'apartment', pos: 'substantivo' }),
      w('lease', '/liːs/', 'contrato de aluguel', '📄', [['We signed a one-year lease.', 'Assinamos um contrato de um ano.']], undefined, { pos: 'substantivo' }),
      w('deposit', '/dɪˈpɒzɪt/', 'caução / depósito', '💰', [['The deposit is one month\'s rent.', 'A caução é de um mês de aluguel.']], undefined, { pos: 'substantivo' }),
      w('utilities', '/juːˈtɪlətiz/', 'contas (luz, água, gás)', '💡', [['Are utilities included?', 'As contas estão incluídas?']], undefined, { pos: 'substantivo' }),
      w('roommate', '/ˈruːmmeɪt/', 'colega de quarto/apartamento', '🛏️', [["I'm looking for a roommate.", 'Estou procurando alguém para dividir o apartamento.']], 'UK: "flatmate".', { pos: 'substantivo' }),
      w('move in / move out', '', 'mudar para / sair (de casa)', '📦', [['We moved in last week.', 'Nos mudamos semana passada.', 'Simple Past']], 'Mudar de casa em geral: "move" ("We\'re moving to Canada").', { lookup: 'move', pos: 'phrasal verb' }),
      w('furnished', '/ˈfɜːnɪʃt/', 'mobiliado', '🛋️', [['Is the apartment furnished?', 'O apartamento é mobiliado?']], 'Móveis = furniture (incontável).', { pos: 'adjetivo' }),
      w('neighborhood', '/ˈneɪbəhʊd/', 'bairro, vizinhança', '🏘️', [["It's a quiet neighborhood.", 'É um bairro tranquilo.']], 'UK: neighbourhood. Vizinho = neighbor.', { pos: 'substantivo' }),
    ],
  ),
  mod(
    {
      id: 'ad-calls', level: 'B1', audiences: A, title: 'Telefone e videochamada', subtitle: 'Do "you\'re on mute" ao "let\'s hop on a call"',
      emoji: '📞', category: 'Negócios', photo: 'video call laptop headset',
      lesson: [sec('Chamadas de trabalho', 'Em chamadas, frases curtas e educadas salvam: "Sorry, you\'re breaking up" (está cortando), "Can you hear me?", "Let me share my screen". Treine estas para soar natural no remoto.')],
    },
    [
      w("Who's calling, please?", '', 'Quem fala, por favor?', '☎️', [["Good morning, ABC Company. Who's calling, please?", 'Bom dia, empresa ABC. Quem fala, por favor?']], undefined, { lookup: 'calling', pos: 'expressão' }),
      w('Hold on, please', '', 'Aguarde um momento, por favor', '⏸️', [["Hold on, please. I'll put you through.", 'Aguarde, vou transferir sua ligação.']], '"Put someone through" = transferir a ligação.', { lookup: 'hold', pos: 'expressão' }),
      w('Can you hear me?', '', 'Você está me ouvindo?', '🎧', [['Can you hear me okay?', 'Você está me ouvindo bem?']], undefined, { lookup: 'hear', pos: 'expressão' }),
      w("You're on mute", '', 'Você está no mudo', '🔇', [["Sorry, I think you're on mute.", 'Desculpe, acho que você está no mudo.']], undefined, { lookup: 'mute', pos: 'expressão' }),
      w("You're breaking up", '', 'Está cortando (sinal ruim)', '📶', [["Sorry, you're breaking up. Can you repeat that?", 'Desculpe, está cortando. Pode repetir?']], undefined, { lookup: 'breaking', pos: 'expressão' }),
      w('Let me share my screen', '', 'Deixa eu compartilhar minha tela', '🖥️', [['Let me share my screen so you can see the numbers.', 'Deixa eu compartilhar a tela para você ver os números.']], undefined, { lookup: 'screen', pos: 'expressão' }),
      w('leave a message', '', 'deixar recado', '📝', [["She's not available. Would you like to leave a message?", 'Ela não está disponível. Gostaria de deixar recado?']], undefined, { lookup: 'message', pos: 'collocation' }),
      w('call back', '/kɔːl bæk/', 'retornar a ligação', '↩️', [["I'll call you back in ten minutes.", 'Te ligo de volta em dez minutos.']], undefined, { lookup: 'call', pos: 'phrasal verb' }),
      w("Let's hop on a call", '', 'Vamos fazer uma call rápida', '🐇', [["It's easier to explain. Let's hop on a call.", 'É mais fácil explicar. Vamos fazer uma call.']], 'Informal e muito comum em empresas de tecnologia.', { lookup: 'hop', register: 'informal', pos: 'expressão' }),
      w('I have a hard stop at...', '', 'Preciso sair impreterivelmente às...', '🛑', [['Just so you know, I have a hard stop at 3.', 'Só para avisar, preciso sair às 3 em ponto.']], undefined, { lookup: 'stop', pos: 'expressão' }),
    ],
  ),
  mod(
    {
      id: 'ad-meetings', level: 'B2', audiences: A, title: 'Reuniões e apresentações', subtitle: 'Conduzir, interromper e encerrar com classe',
      emoji: '📊', category: 'Negócios', photo: 'presentation slides meeting room',
      lesson: [sec('Estrutura de uma apresentação', 'Abertura ("Today I\'d like to talk about..."), transição ("Moving on to..."), dados ("As you can see on this slide..."), fechamento ("To sum up...") e perguntas ("Any questions?").')],
    },
    [
      w('agenda', '/əˈdʒendə/', 'pauta (da reunião)', '📋', [["Let's go through the agenda.", 'Vamos repassar a pauta.']], 'Falso cognato: agenda (caderno) = "planner" / "diary".', { pos: 'substantivo' }),
      w("Let's get started", '', 'Vamos começar', '▶️', [["It's 10 o'clock. Let's get started.", 'São 10 horas. Vamos começar.']], undefined, { lookup: 'started', pos: 'expressão' }),
      w("Today I'd like to talk about...", '', 'Hoje eu gostaria de falar sobre...', '🎤', [["Today I'd like to talk about our Q3 results.", 'Hoje gostaria de falar sobre os resultados do terceiro trimestre.']], undefined, { lookup: 'talk', pos: 'expressão' }),
      w('Moving on to...', '', 'Passando para...', '➡️', [['Moving on to the next point: the budget.', 'Passando para o próximo ponto: o orçamento.']], undefined, { lookup: 'moving', pos: 'expressão' }),
      w('As you can see on this slide', '', 'Como vocês podem ver neste slide', '📈', [['As you can see on this slide, sales doubled.', 'Como podem ver neste slide, as vendas dobraram.']], undefined, { lookup: 'slide', pos: 'expressão' }),
      w('Sorry to interrupt, but...', '', 'Desculpe interromper, mas...', '✋', [['Sorry to interrupt, but could you clarify that number?', 'Desculpe interromper, mas pode esclarecer esse número?']], undefined, { lookup: 'interrupt', pos: 'expressão' }),
      w('Could you elaborate on that?', '', 'Poderia detalhar isso?', '🔍', [['Interesting. Could you elaborate on that?', 'Interessante. Poderia detalhar isso?']], undefined, { lookup: 'elaborate', pos: 'expressão' }),
      w('action items', '/ˈækʃn ˈaɪtəmz/', 'próximos passos / tarefas definidas', '✅', [["Let's review the action items before we finish.", 'Vamos revisar os próximos passos antes de terminar.']], undefined, { lookup: 'action', pos: 'substantivo' }),
      w('To sum up...', '', 'Resumindo...', '🧾', [['To sum up, we need more time and budget.', 'Resumindo, precisamos de mais tempo e orçamento.']], 'Também: "In a nutshell", "To wrap up".', { lookup: 'sum', pos: 'expressão' }),
      w('Does anyone have any questions?', '', 'Alguém tem alguma pergunta?', '🙋', [["That's all from me. Does anyone have any questions?", 'É isso da minha parte. Alguém tem perguntas?']], undefined, { lookup: 'questions', pos: 'expressão' }),
      w('take the minutes', '/ˈmɪnɪts/', 'fazer a ata', '✍️', [['Who will take the minutes today?', 'Quem vai fazer a ata hoje?']], '"Minutes" aqui = ata da reunião.', { lookup: 'minutes', pos: 'collocation' }),
    ],
  ),
]
