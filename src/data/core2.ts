import { mod, sec, w } from './helpers.ts'
import type { Audience } from './types.ts'

const TA: Audience[] = ['teen', 'adult']

export const a1Modules2 = [
  mod(
    {
      id: 'a1-articles', level: 'A1', audiences: TA, title: 'Artigos e plurais', subtitle: 'A, an, the e como formar o plural',
      emoji: '📰', category: 'Gramática', photo: 'newspaper stack',
      lesson: [
        sec('A × An × The', 'A/AN = um, uma (algo não específico). Use AN antes de SOM de vogal: an apple, an hour (o "h" é mudo), mas a university (som de "iú"). THE = o, a, os, as (algo específico, que os dois sabem qual é).'),
        sec('Plurais', 'Regra geral: +S. Terminados em s, sh, ch, x, o: +ES. Consoante + Y: troca por IES. E existem os irregulares, que precisam ser decorados.', [
          ['Singular', 'Plural', 'Regra'], ['book', 'books', '+s'], ['box', 'boxes', '+es'], ['city', 'cities', 'y → ies'], ['man', 'men', 'irregular'], ['child', 'children', 'irregular'],
        ]),
      ],
    },
    [
      w('a / an', '/ə/ /ən/', 'um, uma', '1️⃣', [["I'm an engineer.", 'Sou engenheiro.'], ['She has a dog.', 'Ela tem um cachorro.']], 'O que importa é o SOM: an hour /aʊə/, a European /jʊə/.', { lookup: 'an', pos: 'artigo' }),
      w('the', '/ðə/ /ðiː/', 'o, a, os, as', '👉', [['Close the door, please.', 'Feche a porta, por favor.'], ['The sun is hot.', 'O sol está quente.']], 'Antes de vogal soa "dhi": the apple /ðiː/.', { pos: 'artigo' }),
      w('sem artigo (generalização)', '', 'falar de algo em geral', '🌐', [['I love music.', 'Eu amo (a) música.'], ['Dogs are loyal.', 'Os cachorros são leais.']], 'Em inglês NÃO se usa "the" para generalizar: "Life is beautiful" (não "The life").', { lookup: 'general', pos: 'regra' }),
      w('-s / -es', '', 'plural regular', '➕', [['two cats, three boxes', 'dois gatos, três caixas'], ['many buses', 'muitos ônibus']], '-ES depois de s, sh, ch, x, z e alguns -o (tomatoes, potatoes).', { lookup: 'plural', pos: 'regra' }),
      w('-y → -ies', '', 'consoante + y vira ies', '🏙️', [['one city, two cities', 'uma cidade, duas cidades'], ['one baby, three babies', 'um bebê, três bebês']], 'Vogal + y só ganha S: boys, days, keys.', { lookup: 'cities', pos: 'regra' }),
      w('man → men · woman → women', '/mæn/ /men/ /ˈwʊmən/ /ˈwɪmɪn/', 'homem → homens · mulher → mulheres', '👫', [['Two women and one man.', 'Duas mulheres e um homem.']], 'Pronúncia-armadilha: "women" soa "uí-min"!', { lookup: 'women', pos: 'plural irregular' }),
      w('child → children · person → people', '/tʃaɪld/ /ˈtʃɪldrən/ /ˈpiːpl/', 'criança → crianças · pessoa → pessoas', '👨‍👩‍👧‍👦', [['How many children do you have?', 'Quantos filhos você tem?'], ['People are friendly here.', 'As pessoas são simpáticas aqui.']], '"People" já é plural: "people ARE" (nunca "peoples is").', { lookup: 'children', pos: 'plural irregular' }),
      w('tooth → teeth · foot → feet · mouse → mice', '', 'dente → dentes · pé → pés · rato → ratos', '🦷', [['Brush your teeth.', 'Escove os dentes.'], ['My feet hurt.', 'Meus pés doem.']], undefined, { lookup: 'teeth', pos: 'plural irregular' }),
    ],
  ),
  mod(
    {
      id: 'a1-questions', level: 'A1', audiences: TA, title: 'Perguntas Wh-', subtitle: 'What, where, when, who, why, how',
      emoji: '❓', category: 'Gramática', photo: 'question mark',
      lesson: [sec('A ordem da pergunta', 'Palavra Wh- + auxiliar (do/does/did/is/are/can...) + sujeito + verbo. Ex.: "Where DO you live?", "What ARE you doing?", "Why DID she leave?".', [
        ['Palavra', 'Significado', 'Exemplo'], ['What', 'o quê / qual', 'What is your name?'], ['Where', 'onde', 'Where do you work?'], ['When', 'quando', 'When is your birthday?'], ['Who', 'quem', 'Who is she?'], ['Why', 'por quê', 'Why are you sad?'], ['How', 'como', 'How do you say...?'],
      ])],
    },
    [
      w('What', '/wɒt/', 'o que / qual', '❔', [["What do you do?", 'O que você faz (profissão)?'], ["What's your favorite movie?", 'Qual é seu filme favorito?']], '"What do you do?" pergunta a PROFISSÃO.', { pos: 'question word' }),
      w('Where', '/weə/', 'onde', '📍', [['Where do you live?', 'Onde você mora?'], ['Where are you from?', 'De onde você é?']], undefined, { pos: 'question word' }),
      w('When', '/wen/', 'quando', '📅', [['When is the meeting?', 'Quando é a reunião?'], ['When did you arrive?', 'Quando você chegou?', 'Simple Past']], undefined, { pos: 'question word' }),
      w('Who', '/huː/', 'quem', '🧑', [['Who is that guy?', 'Quem é aquele cara?'], ['Who called you?', 'Quem te ligou?', 'Simple Past']], 'Quando WHO é o sujeito, não usa auxiliar: "Who called?" (não "Who did call?").', { pos: 'question word' }),
      w('Why / Because', '/waɪ/ /bɪˈkɒz/', 'por quê / porque', '🤔', [["Why are you late? — Because of the traffic.", 'Por que você está atrasado? — Por causa do trânsito.']], 'A pergunta é WHY, a resposta é BECAUSE.', { lookup: 'why', pos: 'question word' }),
      w('How', '/haʊ/', 'como', '🛠️', [['How do you spell it?', 'Como se soletra?'], ['How was your weekend?', 'Como foi seu fim de semana?', 'Simple Past']], undefined, { pos: 'question word' }),
      w('Which', '/wɪtʃ/', 'qual (entre opções)', '🔀', [['Which color do you prefer, red or blue?', 'Qual cor você prefere, vermelho ou azul?']], 'WHICH = escolha entre opções limitadas. WHAT = pergunta aberta.', { pos: 'question word' }),
      w('Whose', '/huːz/', 'de quem', '🔑', [['Whose keys are these?', 'De quem são estas chaves?']], 'Soa igual a "who\'s" (who is).', { pos: 'question word' }),
      w('How much / How many', '', 'quanto (incontável) / quantos (contável)', '🔢', [['How much water do you drink?', 'Quanta água você bebe?'], ['How many brothers do you have?', 'Quantos irmãos você tem?']], 'MUCH para o que não se conta (water, money, time). MANY para o que se conta (books, people).', { lookup: 'many', pos: 'question word' }),
      w('How long / How far / How old', '', 'quanto tempo / qual distância / quantos anos', '📏', [["How long does it take?", 'Quanto tempo leva?'], ['How far is the airport?', 'A que distância fica o aeroporto?']], undefined, { lookup: 'far', pos: 'question word' }),
    ],
  ),
  mod(
    {
      id: 'a1-adjectives', level: 'A1', audiences: TA, title: 'Adjetivos e opostos', subtitle: 'Os 14 pares mais usados',
      emoji: '⚖️', category: 'Vocabulário',
      lesson: [sec('Posição e forma', 'Adjetivo vem ANTES do substantivo e nunca vai para o plural: "a big house", "two big houses" (nunca "bigs"). Depois do verbo to be: "The house is big".')],
    },
    [
      w('cheap / expensive', '/tʃiːp/ /ɪkˈspensɪv/', 'barato / caro', '💸', [['This phone is too expensive.', 'Este celular é caro demais.']], undefined, { lookup: 'expensive', pos: 'adjetivo' }),
      w('easy / difficult', '/ˈiːzi/ /ˈdɪfɪkəlt/', 'fácil / difícil', '🧗', [["English isn't difficult!", 'Inglês não é difícil!']], 'Sinônimo comum de difficult: hard.', { lookup: 'difficult', pos: 'adjetivo' }),
      w('good / bad', '/ɡʊd/ /bæd/', 'bom / ruim', '👍', [['That was a good movie.', 'Foi um filme bom.']], undefined, { lookup: 'good', pos: 'adjetivo' }),
      w('new / old', '/njuː/ /əʊld/', 'novo / velho, antigo', '🏚️', [['I need a new laptop. Mine is very old.', 'Preciso de um notebook novo. O meu é muito velho.']], undefined, { lookup: 'old', pos: 'adjetivo' }),
      w('young / old', '/jʌŋ/ /əʊld/', 'jovem / idoso', '🧓', [["He's too young to drive.", 'Ele é jovem demais para dirigir.']], undefined, { lookup: 'young', pos: 'adjetivo' }),
      w('busy / free', '/ˈbɪzi/ /friː/', 'ocupado / livre', '📆', [["Are you free tonight? — Sorry, I'm busy.", 'Está livre hoje à noite? — Desculpa, estou ocupado.']], '"Busy" soa "bízi". "Free" também significa grátis!', { lookup: 'busy', pos: 'adjetivo' }),
      w('early / late', '/ˈɜːli/ /leɪt/', 'cedo / tarde, atrasado', '⏰', [["Sorry I'm late!", 'Desculpe o atraso!'], ['I wake up early.', 'Acordo cedo.']], undefined, { lookup: 'early', pos: 'adjetivo' }),
      w('long / short', '/lɒŋ/ /ʃɔːt/', 'longo / curto', '📏', [['It was a long day.', 'Foi um dia longo.']], '"Short" também é baixo (pessoa).', { lookup: 'long', pos: 'adjetivo' }),
      w('beautiful / ugly', '/ˈbjuːtɪfl/ /ˈʌɡli/', 'bonito / feio', '🌸', [['What a beautiful view!', 'Que vista linda!']], undefined, { lookup: 'beautiful', pos: 'adjetivo' }),
      w('rich / poor', '/rɪtʃ/ /pɔː/', 'rico / pobre', '💰', [['He comes from a poor family.', 'Ele vem de uma família pobre.']], undefined, { lookup: 'rich', pos: 'adjetivo' }),
      w('noisy / quiet', '/ˈnɔɪzi/ /ˈkwaɪət/', 'barulhento / tranquilo', '🔇', [['My street is very noisy.', 'Minha rua é muito barulhenta.']], '"Quiet" /ˈkwaɪət/ ≠ "quite" /kwaɪt/ (bastante).', { lookup: 'quiet', pos: 'adjetivo' }),
      w('safe / dangerous', '/seɪf/ /ˈdeɪndʒərəs/', 'seguro / perigoso', '⚠️', [['Is it safe to walk here at night?', 'É seguro andar aqui à noite?']], undefined, { lookup: 'dangerous', pos: 'adjetivo' }),
      w('right / wrong', '/raɪt/ /rɒŋ/', 'certo / errado', '✅', [["You're right. I was wrong.", 'Você está certo. Eu estava errado.']], '"Right" também é direita.', { lookup: 'wrong', pos: 'adjetivo' }),
      w('very / too / really', '/ˈveri/ /tuː/ /ˈrɪəli/', 'muito / demais / muito mesmo', '🔊', [["It's very hot.", 'Está muito quente.'], ["It's too hot to go out.", 'Está quente DEMAIS para sair.']], 'TOO tem sentido negativo (excesso). VERY só intensifica.', { lookup: 'too', pos: 'advérbio' }),
    ],
  ),
  mod(
    {
      id: 'a1-place', level: 'A1', audiences: TA, title: 'Preposições de lugar', subtitle: 'In, on, at, next to, between...',
      emoji: '📍', category: 'Gramática', photo: 'city map pins',
      lesson: [sec('IN × ON × AT', 'IN = dentro de um espaço (in the car, in Brazil). ON = sobre uma superfície (on the table, on the wall, on the 3rd floor). AT = num ponto específico (at the bus stop, at home, at work).', [
        ['IN', 'ON', 'AT'], ['in the kitchen', 'on the table', 'at the door'], ['in São Paulo', 'on Main Street', 'at 25 Main Street'], ['in a taxi', 'on a bus / plane', 'at the airport'],
      ])],
    },
    [
      w('in', '/ɪn/', 'em, dentro de', '📦', [['My keys are in my bag.', 'Minhas chaves estão na minha bolsa.'], ['She lives in Lisbon.', 'Ela mora em Lisboa.']], undefined, { pos: 'preposição' }),
      w('on', '/ɒn/', 'em, sobre (superfície)', '🖼️', [['The picture is on the wall.', 'O quadro está na parede.'], ["I'm on the bus.", 'Estou no ônibus.']], 'Transporte grande e público = ON (on the bus, on the train). Carro e táxi = IN.', { pos: 'preposição' }),
      w('at', '/æt/', 'em (ponto específico)', '🎯', [["I'm at home.", 'Estou em casa.'], ["Let's meet at the station.", 'Vamos nos encontrar na estação.']], 'At home, at work, at school — sem "the".', { pos: 'preposição' }),
      w('under', '/ˈʌndə/', 'embaixo de', '⬇️', [['The cat is under the table.', 'O gato está embaixo da mesa.']], undefined, { pos: 'preposição' }),
      w('next to / beside', '/nekst tə/ /bɪˈsaɪd/', 'ao lado de', '↔️', [['The bank is next to the pharmacy.', 'O banco fica ao lado da farmácia.']], undefined, { lookup: 'beside', pos: 'preposição' }),
      w('between', '/bɪˈtwiːn/', 'entre (dois)', '🔀', [['The café is between the bank and the hotel.', 'O café fica entre o banco e o hotel.']], undefined, { pos: 'preposição' }),
      w('behind / in front of', '/bɪˈhaɪnd/ /ɪn frʌnt əv/', 'atrás de / na frente de', '🚶', [['Park behind the building.', 'Estacione atrás do prédio.'], ["I'm in front of the museum.", 'Estou na frente do museu.']], '"In front of" NÃO é "em frente a" do outro lado da rua — isso é "across from" / "opposite".', { lookup: 'behind', pos: 'preposição' }),
      w('across from / opposite', '/əˈkrɒs frəm/ /ˈɒpəzɪt/', 'em frente a (do outro lado)', '🛣️', [['The hotel is across from the park.', 'O hotel fica em frente ao parque.']], undefined, { lookup: 'opposite', pos: 'preposição' }),
      w('near / far from', '/nɪə/ /fɑː frəm/', 'perto de / longe de', '📡', [['Is there a pharmacy near here?', 'Tem farmácia aqui perto?'], ['My house is far from the city.', 'Minha casa é longe da cidade.']], 'Sem "of": "near here" (não "near of").', { lookup: 'near', pos: 'preposição' }),
    ],
  ),
  mod(
    {
      id: 'a1-family', level: 'A1', audiences: TA, title: 'Família e relações', subtitle: 'Parentes, casais e o possessivo \'s',
      emoji: '👨‍👩‍👧', category: 'Vocabulário', photo: 'family photo album',
      lesson: [sec('O possessivo \'S', 'Para dizer "a mãe da Ana", inverte a ordem e usa \'S: "Ana\'s mother". Plural terminado em S só ganha apóstrofo: "my parents\' house".')],
    },
    [
      w('husband / wife', '/ˈhʌzbənd/ /waɪf/', 'marido / esposa', '💍', [["This is my wife, Julia.", 'Esta é minha esposa, Júlia.']], undefined, { lookup: 'husband', pos: 'substantivo' }),
      w('son / daughter', '/sʌn/ /ˈdɔːtə/', 'filho / filha', '👧', [['Our daughter is ten.', 'Nossa filha tem dez anos.']], '"Son" soa igual a "sun". "Daughter": o "gh" é mudo ("dó-ter"). Filhos em geral = children / kids.', { lookup: 'daughter', pos: 'substantivo' }),
      w('grandparents', '/ˈɡrænpeərənts/', 'avós', '👴', [['My grandparents live in the countryside.', 'Meus avós moram no interior.']], undefined, { pos: 'substantivo' }),
      w('uncle / aunt', '/ˈʌŋkl/ /ɑːnt/', 'tio / tia', '🧔', [['My aunt is a teacher.', 'Minha tia é professora.']], 'EUA: "aunt" soa como "ant" (formiga).', { lookup: 'aunt', pos: 'substantivo' }),
      w('cousin', '/ˈkʌzn/', 'primo / prima', '🧑‍🤝‍🧑', [["She's my cousin.", 'Ela é minha prima.']], 'Serve para os dois gêneros.', { pos: 'substantivo' }),
      w('nephew / niece', '/ˈnefjuː/ /niːs/', 'sobrinho / sobrinha', '👶', [['My niece is so cute!', 'Minha sobrinha é tão fofa!']], undefined, { lookup: 'niece', pos: 'substantivo' }),
      w('relatives', '/ˈrelətɪvz/', 'parentes', '👪', [['We visit our relatives at Christmas.', 'Visitamos nossos parentes no Natal.']], 'Lembre: "parents" = pai e mãe!', { pos: 'substantivo' }),
      w('in-laws', '/ˈɪn lɔːz/', 'sogros / família do cônjuge', '🏡', [['We have lunch with my in-laws on Sundays.', 'Almoçamos com meus sogros aos domingos.']], 'Mother-in-law (sogra), brother-in-law (cunhado).', { lookup: 'in-law', pos: 'substantivo' }),
      w('boyfriend / girlfriend', '/ˈbɔɪfrend/ /ˈɡɜːlfrend/', 'namorado / namorada', '💑', [['How long have you been with your girlfriend?', 'Há quanto tempo você está com sua namorada?']], 'Parceiro (neutro): partner.', { lookup: 'girlfriend', pos: 'substantivo' }),
      w('only child', '', 'filho único', '🧒', [["I'm an only child.", 'Sou filho único.']], undefined, { lookup: 'only', pos: 'expressão' }),
      w("Ana's / my parents'", '', 'possessivo com \'s', '🔖', [["That's Ana's car.", 'Aquele é o carro da Ana.'], ["My parents' house is big.", 'A casa dos meus pais é grande.']], undefined, { lookup: 'possessive', pos: 'estrutura' }),
    ],
  ),
]

export const a2Modules2 = [
  mod(
    {
      id: 'a2-food', level: 'A2', audiences: TA, title: 'No restaurante', subtitle: 'Pedir, reclamar e pagar a conta',
      emoji: '🍝', category: 'Conversação', photo: 'restaurant table dinner',
      lesson: [sec('Pedindo com educação', 'Use "I\'ll have...", "Can I get...?" ou "I\'d like...". Evite "I want..." — soa rude para o garçom. Para chamar: "Excuse me!" (nunca assobio ou "Hey!").')],
    },
    [
      w('menu', '/ˈmenjuː/', 'cardápio', '📜', [['Could we see the menu, please?', 'Podemos ver o cardápio, por favor?']], undefined, { pos: 'substantivo' }),
      w("I'll have...", '/aɪl hæv/', 'Eu vou querer...', '🍽️', [["I'll have the chicken, please.", 'Vou querer o frango, por favor.']], undefined, { lookup: 'have', pos: 'expressão' }),
      w('Can I get...?', '', 'Pode me trazer...?', '🥤', [['Can I get a glass of water?', 'Pode me trazer um copo de água?']], 'Muito usado nos EUA. Mais formal: "Could I have...?"', { lookup: 'get', pos: 'expressão' }),
      w('appetizer / main course / dessert', '/ˈæpɪtaɪzə/ /dɪˈzɜːt/', 'entrada / prato principal / sobremesa', '🍰', [["What would you like for dessert?", 'O que vai querer de sobremesa?']], '"Dessert" (sobremesa, dois S) ≠ "desert" (deserto). UK: "starter" = entrada.', { lookup: 'dessert', pos: 'substantivo' }),
      w('rare / medium / well-done', '/reə/ /ˈmiːdiəm/ /ˌwel ˈdʌn/', 'malpassado / ao ponto / bem passado', '🥩', [['How would you like your steak? — Medium, please.', 'Como prefere o bife? — Ao ponto, por favor.']], undefined, { lookup: 'medium', pos: 'adjetivo' }),
      w('spicy', '/ˈspaɪsi/', 'apimentado', '🌶️', [['Is this dish spicy?', 'Este prato é apimentado?']], undefined, { pos: 'adjetivo' }),
      w("I'm allergic to...", '/əˈlɜːdʒɪk/', 'Sou alérgico a...', '⚠️', [["I'm allergic to peanuts.", 'Sou alérgico a amendoim.']], 'Pronúncia: "a-LÉR-djik".', { lookup: 'allergic', pos: 'expressão' }),
      w('vegetarian / vegan', '/ˌvedʒəˈteəriən/ /ˈviːɡən/', 'vegetariano / vegano', '🥗', [['Do you have any vegan options?', 'Vocês têm opções veganas?']], undefined, { lookup: 'vegetarian', pos: 'adjetivo' }),
      w('delicious', '/dɪˈlɪʃəs/', 'delicioso', '😋', [['This is delicious!', 'Isso está delicioso!']], 'Informal: "This is so good!" / "Yummy!"', { pos: 'adjetivo' }),
      w('to go / takeout', '/tə ɡəʊ/ /ˈteɪkaʊt/', 'para viagem', '🥡', [['For here or to go?', 'Para comer aqui ou para viagem?']], 'UK: "takeaway". Sobras para levar: "Can I get a box for this?"', { lookup: 'takeout', pos: 'expressão' }),
      w('the check / the bill', '/tʃek/ /bɪl/', 'a conta', '🧾', [['Could we get the check, please?', 'Pode trazer a conta, por favor?'], ["Let's split the bill.", 'Vamos dividir a conta.']], undefined, { lookup: 'bill', pos: 'substantivo' }),
      w("It's on me", '', 'É por minha conta / eu pago', '💳', [["Don't worry, it's on me.", 'Não se preocupe, eu pago.']], 'Também: "My treat!"', { lookup: 'treat', pos: 'expressão' }),
    ],
  ),
  mod(
    {
      id: 'a2-shopping', level: 'A2', audiences: TA, title: 'Compras e dinheiro', subtitle: 'Provar, pagar, trocar e devolver',
      emoji: '🛍️', category: 'Conversação', photo: 'clothing store shopping',
      lesson: [sec('Na loja', 'O vendedor pergunta: "Can I help you?" ou "Are you looking for anything?". Se só está olhando: "I\'m just looking, thanks."')],
    },
    [
      w("I'm just looking", '', 'Só estou olhando', '👀', [["Can I help you? — I'm just looking, thanks.", 'Posso ajudar? — Só estou olhando, obrigado.']], undefined, { lookup: 'looking', pos: 'expressão' }),
      w('try on', '/traɪ ɒn/', 'experimentar (roupa)', '👗', [['Can I try this on?', 'Posso experimentar?']], 'O provador é "fitting room" (EUA também "dressing room").', { lookup: 'try', pos: 'phrasal verb' }),
      w('size', '/saɪz/', 'tamanho', '📐', [['Do you have this in a smaller size?', 'Tem esse num tamanho menor?']], undefined, { pos: 'substantivo' }),
      w('on sale', '/ɒn seɪl/', 'em promoção', '🏷️', [['These shoes are on sale — 30% off!', 'Estes sapatos estão em promoção — 30% de desconto!']], '"For sale" = à venda. "On sale" = em promoção.', { lookup: 'sale', pos: 'expressão' }),
      w('discount', '/ˈdɪskaʊnt/', 'desconto', '💲', [['Can you give me a discount?', 'Pode me dar um desconto?']], undefined, { pos: 'substantivo' }),
      w('cash / card', '/kæʃ/ /kɑːd/', 'dinheiro vivo / cartão', '💳', [['Cash or card? — Card, please.', 'Dinheiro ou cartão? — Cartão, por favor.']], undefined, { lookup: 'cash', pos: 'substantivo' }),
      w('change', '/tʃeɪndʒ/', 'troco', '🪙', [['Keep the change.', 'Pode ficar com o troco.']], 'Também significa mudar/trocar.', { pos: 'substantivo' }),
      w('receipt', '/rɪˈsiːt/', 'recibo / nota fiscal', '🧾', [['Can I have the receipt, please?', 'Pode me dar o recibo?']], 'O "p" é mudo: "ri-SÍT".', { pos: 'substantivo' }),
      w('refund', '/ˈriːfʌnd/', 'reembolso', '↩️', [["I'd like a refund, please.", 'Gostaria de um reembolso, por favor.']], undefined, { pos: 'substantivo' }),
      w('exchange', '/ɪksˈtʃeɪndʒ/', 'trocar (produto)', '🔄', [['Can I exchange this for a bigger size?', 'Posso trocar por um tamanho maior?']], undefined, { pos: 'verbo' }),
      w("can't afford", '/kɑːnt əˈfɔːd/', 'não ter dinheiro para', '🙅', [["I can't afford a new car right now.", 'Não tenho condições de comprar um carro novo agora.']], undefined, { lookup: 'afford', pos: 'expressão' }),
      w("It's a rip-off!", '/ˈrɪp ɒf/', 'É um roubo! (caro demais)', '😤', [['Twenty dollars for a coffee? It\'s a rip-off!', 'Vinte dólares por um café? É um roubo!']], 'Informal.', { lookup: 'rip-off', register: 'informal', pos: 'expressão' }),
    ],
  ),
  mod(
    {
      id: 'a2-health', level: 'A2', audiences: TA, title: 'Saúde e médico', subtitle: 'Sintomas, consultas e farmácia',
      emoji: '🩺', category: 'Conversação', photo: 'stethoscope medical',
      lesson: [sec('Descrevendo sintomas', 'Use "I have a..." para sintomas: "I have a headache / a fever / a cold". E "My ... hurts" para dor: "My back hurts".')],
    },
    [
      w('headache', '/ˈhedeɪk/', 'dor de cabeça', '🤕', [['I have a terrible headache.', 'Estou com uma dor de cabeça terrível.']], '"-ache" soa "êik": stomachache, toothache, backache.', { pos: 'substantivo' }),
      w('sore throat', '/sɔː θrəʊt/', 'dor de garganta', '😷', [["I have a sore throat and a cough.", 'Estou com dor de garganta e tosse.']], undefined, { lookup: 'throat', pos: 'substantivo' }),
      w('fever', '/ˈfiːvə/', 'febre', '🤒', [['She has a high fever.', 'Ela está com febre alta.']], undefined, { pos: 'substantivo' }),
      w('a cold / the flu', '/kəʊld/ /fluː/', 'resfriado / gripe', '🤧', [["I think I'm catching a cold.", 'Acho que estou pegando um resfriado.']], undefined, { lookup: 'flu', pos: 'substantivo' }),
      w('cough', '/kɒf/', 'tosse / tossir', '😮‍💨', [["He can't stop coughing.", 'Ele não para de tossir.']], 'Pronúncia: "kóf". O "gh" soa como F!', { pos: 'substantivo/verbo' }),
      w('It hurts', '/ɪt hɜːts/', 'Dói', '💢', [['My back hurts.', 'Minhas costas doem.'], ['Where does it hurt?', 'Onde dói?']], undefined, { lookup: 'hurt', pos: 'expressão' }),
      w('I feel sick', '/aɪ fiːl sɪk/', 'Estou passando mal / enjoado', '🤢', [["I feel sick. I need to lie down.", 'Estou passando mal. Preciso deitar.']], undefined, { lookup: 'sick', pos: 'expressão' }),
      w('make an appointment', '/əˈpɔɪntmənt/', 'marcar uma consulta', '📅', [["I'd like to make an appointment with Dr. Lee.", 'Gostaria de marcar uma consulta com o Dr. Lee.']], undefined, { lookup: 'appointment', pos: 'collocation' }),
      w('prescription', '/prɪˈskrɪpʃn/', 'receita médica', '📋', [['You need a prescription for this medicine.', 'Você precisa de receita para este remédio.']], undefined, { pos: 'substantivo' }),
      w('pharmacy / drugstore', '/ˈfɑːməsi/ /ˈdrʌɡstɔː/', 'farmácia', '💊', [['Is there a drugstore near here?', 'Tem uma farmácia aqui perto?']], 'UK: "chemist\'s".', { lookup: 'pharmacy', pos: 'substantivo' }),
      w('take medicine', '', 'tomar remédio', '💊', [['Take this medicine twice a day.', 'Tome este remédio duas vezes ao dia.']], 'Remédio se TOMA com TAKE, não "drink".', { lookup: 'medicine', pos: 'collocation' }),
      w('get better', '/ɡet ˈbetə/', 'melhorar (de saúde)', '🌱', [['Get better soon!', 'Melhoras!'], ["I'm getting better.", 'Estou melhorando.']], 'Também: "Get well soon!"', { lookup: 'better', pos: 'expressão' }),
    ],
  ),
  mod(
    {
      id: 'a2-directions', level: 'A2', audiences: TA, title: 'Direções na cidade', subtitle: 'Pedir e entender o caminho',
      emoji: '🗺️', category: 'Conversação', photo: 'city street crosswalk',
      lesson: [sec('Dando direções', 'Use o imperativo: "Go straight", "Turn left", "Take the second right". E marque referências: "It\'s on the corner", "It\'s across from the bank".')],
    },
    [
      w('How do I get to...?', '', 'Como eu chego a...?', '🧭', [['Excuse me, how do I get to the train station?', 'Com licença, como chego à estação de trem?']], undefined, { lookup: 'get', pos: 'expressão' }),
      w('go straight', '/ɡəʊ streɪt/', 'siga reto', '⬆️', [['Go straight for two blocks.', 'Siga reto por dois quarteirões.']], 'Também: "go straight ahead".', { lookup: 'straight', pos: 'expressão' }),
      w('turn left / turn right', '/tɜːn left/ /raɪt/', 'vire à esquerda / direita', '↩️', [['Turn right at the traffic lights.', 'Vire à direita no semáforo.']], undefined, { lookup: 'turn', pos: 'expressão' }),
      w('corner', '/ˈkɔːnə/', 'esquina', '📐', [["It's on the corner of 5th and Main.", 'Fica na esquina da 5ª com a Main.']], undefined, { pos: 'substantivo' }),
      w('block', '/blɒk/', 'quarteirão', '🏘️', [["It's three blocks from here.", 'Fica a três quarteirões daqui.']], undefined, { pos: 'substantivo' }),
      w('traffic lights', '/ˈtræfɪk laɪts/', 'semáforo', '🚦', [['Stop at the traffic lights.', 'Pare no semáforo.']], undefined, { lookup: 'traffic', pos: 'substantivo' }),
      w('crosswalk', '/ˈkrɒswɔːk/', 'faixa de pedestres', '🚸', [['Cross at the crosswalk.', 'Atravesse na faixa.']], 'UK: "zebra crossing".', { pos: 'substantivo' }),
      w("It's a 5-minute walk", '', 'Fica a 5 minutos a pé', '🚶', [["The beach? It's a ten-minute walk from here.", 'A praia? Fica a dez minutos a pé daqui.']], 'Note: "five-minute" sem S, porque funciona como adjetivo.', { lookup: 'walk', pos: 'expressão' }),
      w('get lost', '/ɡet lɒst/', 'se perder', '😵‍💫', [['We got lost in the old town.', 'Nós nos perdemos no centro antigo.', 'Simple Past']], '"Get lost!" sozinho é rude: "Some daqui!"', { lookup: 'lost', pos: 'expressão' }),
      w('downtown', '/ˌdaʊnˈtaʊn/', 'centro da cidade', '🏙️', [["Let's go downtown tonight.", 'Vamos ao centro hoje à noite.']], 'Sem "to": "go downtown". UK: "the city centre".', { pos: 'substantivo/advérbio' }),
      w("You can't miss it", '', 'Não tem como errar', '🎯', [["It's the big red building. You can't miss it.", 'É o prédio vermelho grande. Não tem como errar.']], undefined, { lookup: 'miss', pos: 'expressão' }),
    ],
  ),
  mod(
    {
      id: 'a2-quantity', level: 'A2', audiences: TA, title: 'Contáveis e incontáveis', subtitle: 'Much, many, some, any, a few, a little',
      emoji: '🧮', category: 'Gramática', photo: 'rice grains coins',
      lesson: [
        sec('Dá para contar?', 'Contáveis têm plural (apple → apples). Incontáveis não: water, money, information, advice, furniture, bread. Para contar incontáveis use uma unidade: "a piece of advice", "a bottle of water".'),
        sec('Quantificadores', 'Cada quantificador combina com um tipo.', [
          ['', 'Contável', 'Incontável'], ['muito', 'many', 'much'], ['pouco (mas algum)', 'a few', 'a little'], ['quase nada', 'few', 'little'], ['vários / bastante', 'a lot of', 'a lot of'],
        ]),
      ],
    },
    [
      w('many / much', '/ˈmeni/ /mʌtʃ/', 'muitos / muito', '📊', [["I don't have many friends here.", 'Não tenho muitos amigos aqui.'], ["We don't have much time.", 'Não temos muito tempo.']], 'MUCH é mais usado em negativas e perguntas. Em afirmativas prefira "a lot of".', { lookup: 'many', pos: 'quantificador' }),
      w('a lot of', '/ə lɒt əv/', 'muito(s), bastante', '🧺', [['She has a lot of books.', 'Ela tem muitos livros.'], ['He drinks a lot of coffee.', 'Ele bebe muito café.']], 'Na fala: "lots of".', { lookup: 'lot', pos: 'quantificador' }),
      w('some / any', '/sʌm/ /ˈeni/', 'algum, alguns / nenhum, algum (pergunta)', '🔍', [["I need some help.", 'Preciso de uma ajuda.'], ["Do you have any questions?", 'Tem alguma pergunta?'], ["There isn't any milk.", 'Não tem leite.']], 'SOME em afirmativas e ofertas ("Would you like some tea?"); ANY em negativas e perguntas.', { lookup: 'some', pos: 'quantificador' }),
      w('a few / a little', '/ə fjuː/ /ə ˈlɪtl/', 'alguns, uns poucos / um pouco', '🤏', [['I have a few questions.', 'Tenho algumas perguntas.'], ['Can I have a little sugar?', 'Pode me dar um pouco de açúcar?']], undefined, { lookup: 'few', pos: 'quantificador' }),
      w('few / little (sem "a")', '', 'pouquíssimo, quase nenhum', '📉', [['Few people came to the party.', 'Pouquíssimas pessoas vieram à festa.']], 'Sem o "a" o sentido é NEGATIVO.', { lookup: 'little', pos: 'quantificador' }),
      w('money, information, advice', '', 'incontáveis que pegam brasileiro', '💡', [['Can you give me some advice?', 'Pode me dar um conselho?'], ['I need more information.', 'Preciso de mais informações.']], 'Nunca "advices", "informations", "furnitures", "homeworks".', { lookup: 'advice', pos: 'regra' }),
      w('a piece of / a bottle of / a cup of', '', 'um pedaço de / uma garrafa de / uma xícara de', '🍞', [['a piece of cake', 'um pedaço de bolo'], ['two cups of coffee', 'duas xícaras de café']], undefined, { lookup: 'piece', pos: 'estrutura' }),
      w('too much / too many / enough', '/ɪˈnʌf/', 'demais / suficiente', '⚖️', [["There's too much salt.", 'Tem sal demais.'], ['We have enough chairs.', 'Temos cadeiras suficientes.']], '"Enough" vem ANTES do substantivo e DEPOIS do adjetivo: "old enough".', { lookup: 'enough', pos: 'quantificador' }),
    ],
  ),
]
