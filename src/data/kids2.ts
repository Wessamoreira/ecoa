import { mod, sec, w } from './helpers.ts'
import type { Audience } from './types.ts'

const kids: Audience[] = ['kids']

export const kidsModules2 = [
  mod(
    {
      id: 'k-shapes', level: 'A1', audiences: kids, title: 'Formas', subtitle: 'Círculo, quadrado e estrela',
      emoji: '🔷', category: 'Vocabulário',
      lesson: [sec('Que forma é essa?', 'Pergunte "What shape is it?" e responda "It\'s a circle!" Junte com as cores: "a red circle" (um círculo vermelho).')],
    },
    [
      w('circle', '/ˈsɜːkl/', 'círculo', '⭕', [['The sun is a circle.', 'O sol é um círculo.']]),
      w('square', '/skweə/', 'quadrado', '🟥', [['Draw a square.', 'Desenhe um quadrado.']]),
      w('triangle', '/ˈtraɪæŋɡl/', 'triângulo', '🔺', [['A triangle has three sides.', 'Um triângulo tem três lados.']]),
      w('star', '/stɑː/', 'estrela', '⭐', [['I see a yellow star.', 'Eu vejo uma estrela amarela.']]),
      w('heart', '/hɑːt/', 'coração', '❤️', [['I love you! — A red heart.', 'Eu te amo! — Um coração vermelho.']]),
      w('rectangle', '/ˈrektæŋɡl/', 'retângulo', '🟦', [['The door is a rectangle.', 'A porta é um retângulo.']]),
      w('diamond', '/ˈdaɪəmənd/', 'losango', '🔷', [['A blue diamond.', 'Um losango azul.']], '"Diamond" também é diamante!'),
      w('oval', '/ˈəʊvl/', 'oval', '🥚', [['An egg is oval.', 'Um ovo é oval.']]),
    ],
  ),
  mod(
    {
      id: 'k-veggies', level: 'A2', audiences: kids, title: 'Legumes e verduras', subtitle: 'Comida que dá energia',
      emoji: '🥦', category: 'Vocabulário',
      lesson: [sec('Eu gosto / Eu não gosto', '"I like carrots!" — "I don\'t like onions." Pergunte ao amigo: "Do you like broccoli?" — "Yes, I do!" / "No, I don\'t."')],
    },
    [
      w('broccoli', '/ˈbrɒkəli/', 'brócolis', '🥦', [['Broccoli is green.', 'O brócolis é verde.']]),
      w('tomato', '/təˈmɑːtəʊ/', 'tomate', '🍅', [['I put tomato in my salad.', 'Eu ponho tomate na salada.']], 'EUA: "tə-MÊI-rou". Reino Unido: "tə-MÁ-tou".'),
      w('potato', '/pəˈteɪtəʊ/', 'batata', '🥔', [['I love potato chips!', 'Eu amo batata frita de pacote!']]),
      w('corn', '/kɔːn/', 'milho', '🌽', [['Popcorn is made from corn.', 'Pipoca é feita de milho.']]),
      w('lettuce', '/ˈletɪs/', 'alface', '🥬', [['Rabbits like lettuce.', 'Coelhos gostam de alface.']]),
      w('onion', '/ˈʌnjən/', 'cebola', '🧅', [['Onions make me cry!', 'Cebolas me fazem chorar!']]),
      w('cucumber', '/ˈkjuːkʌmbə/', 'pepino', '🥒', [['A cucumber is long and green.', 'O pepino é comprido e verde.']]),
      w('pepper', '/ˈpepə/', 'pimentão / pimenta', '🫑', [['A red pepper.', 'Um pimentão vermelho.']]),
    ],
  ),
  mod(
    {
      id: 'k-transport', level: 'A2', audiences: kids, title: 'Transportes', subtitle: 'Como você vai para a escola?',
      emoji: '🚌', category: 'Vocabulário',
      lesson: [sec('By bus, by car...', 'Para dizer como você vai: "I go to school BY bus" (de ônibus). Mas a pé é diferente: "I go ON foot" ou "I walk".')],
    },
    [
      w('car', '/kɑː/', 'carro', '🚗', [['We go by car.', 'Nós vamos de carro.']]),
      w('bus', '/bʌs/', 'ônibus', '🚌', [['The school bus is yellow.', 'O ônibus escolar é amarelo.']]),
      w('train', '/treɪn/', 'trem', '🚆', [['The train is very fast.', 'O trem é muito rápido.']]),
      w('plane', '/pleɪn/', 'avião', '✈️', [['The plane flies in the sky.', 'O avião voa no céu.']]),
      w('boat', '/bəʊt/', 'barco', '⛵', [['A boat on the sea.', 'Um barco no mar.']]),
      w('truck', '/trʌk/', 'caminhão', '🚚', [['A big red truck.', 'Um caminhão vermelho grande.']]),
      w('helicopter', '/ˈhelɪkɒptə/', 'helicóptero', '🚁', [['Look! A helicopter!', 'Olha! Um helicóptero!']]),
      w('subway', '/ˈsʌbweɪ/', 'metrô', '🚇', [['We take the subway.', 'Nós pegamos o metrô.']], 'No Reino Unido: "the underground" ou "the Tube".'),
      w('on foot', '/ɒn fʊt/', 'a pé', '🚶', [['I go to school on foot.', 'Eu vou para a escola a pé.']], undefined, { lookup: 'foot' }),
    ],
  ),
  mod(
    {
      id: 'k-sports', level: 'A2', audiences: kids, title: 'Esportes', subtitle: 'Bola, piscina e skate',
      emoji: '⚽', category: 'Vocabulário',
      lesson: [sec('Play ou Go?', 'Esportes com bola usam PLAY: "play soccer". Esportes com -ING usam GO: "go swimming", "go skateboarding".')],
    },
    [
      w('soccer', '/ˈsɒkə/', 'futebol', '⚽', [['I play soccer with my friends.', 'Eu jogo futebol com meus amigos.']], 'Nos EUA é "soccer". No Reino Unido é "football".'),
      w('basketball', '/ˈbɑːskɪtbɔːl/', 'basquete', '🏀', [['He is good at basketball.', 'Ele é bom no basquete.']]),
      w('volleyball', '/ˈvɒlibɔːl/', 'vôlei', '🏐', [["Let's play volleyball on the beach!", 'Vamos jogar vôlei na praia!']]),
      w('tennis', '/ˈtenɪs/', 'tênis (esporte)', '🎾', [['I play tennis on Saturdays.', 'Eu jogo tênis aos sábados.']], 'O sapato é "sneakers", não "tennis"!'),
      w('swimming', '/ˈswɪmɪŋ/', 'natação', '🏊', [['I go swimming every week.', 'Eu faço natação toda semana.']]),
      w('surfing', '/ˈsɜːfɪŋ/', 'surfe', '🏄', [['My dad goes surfing.', 'Meu pai surfa.']]),
      w('skateboarding', '/ˈskeɪtbɔːdɪŋ/', 'andar de skate', '🛹', [["Let's go skateboarding!", 'Vamos andar de skate!']]),
      w('team', '/tiːm/', 'time', '🏆', [['We are a great team!', 'Nós somos um ótimo time!']]),
    ],
  ),
  mod(
    {
      id: 'k-where', level: 'A2', audiences: kids, title: 'Onde está?', subtitle: 'Em cima, embaixo, atrás...',
      emoji: '📦', category: 'Gramática',
      lesson: [sec('Brincando de esconder', 'Pergunte "Where is the cat?" e responda usando: in (dentro), on (em cima), under (embaixo), behind (atrás), next to (ao lado).')],
    },
    [
      w('in', '/ɪn/', 'dentro', '📦', [['The cat is in the box.', 'O gato está dentro da caixa.']]),
      w('on', '/ɒn/', 'em cima', '🛋️', [['The ball is on the sofa.', 'A bola está em cima do sofá.']]),
      w('under', '/ˈʌndə/', 'embaixo', '🛏️', [['The dog is under the bed.', 'O cachorro está embaixo da cama.']]),
      w('behind', '/bɪˈhaɪnd/', 'atrás', '🌳', [['The boy is behind the tree.', 'O menino está atrás da árvore.']]),
      w('next to', '/nekst tə/', 'ao lado de', '🧸', [['The teddy is next to the doll.', 'O ursinho está ao lado da boneca.']], undefined, { lookup: 'next' }),
      w('in front of', '/ɪn frʌnt əv/', 'na frente de', '🚗', [['The car is in front of the house.', 'O carro está na frente da casa.']], undefined, { lookup: 'front' }),
      w('between', '/bɪˈtwiːn/', 'entre', '↔️', [['I sit between Mom and Dad.', 'Eu sento entre a mamãe e o papai.']]),
    ],
  ),
  mod(
    {
      id: 'k-numbers2', level: 'A2', audiences: kids, title: 'Números até 100', subtitle: 'Contando mais longe',
      emoji: '💯', category: 'Vocabulário',
      lesson: [sec('Dezenas', 'Depois do 20, é fácil: twenty-one (21), twenty-two (22)... Cuidado: thirTEEN (13) e THIRty (30) soam parecidos — preste atenção na parte forte!')],
    },
    [
      w('thirteen', '/θɜːˈtiːn/', 'treze', '1️⃣', [['I have thirteen stickers.', 'Eu tenho treze adesivos.']], 'A força fica no final: thir-TEEN.'),
      w('fifteen', '/ˌfɪfˈtiːn/', 'quinze', '5️⃣', [['My brother is fifteen.', 'Meu irmão tem quinze anos.']]),
      w('twenty', '/ˈtwenti/', 'vinte', '2️⃣', [['Twenty birds in the tree!', 'Vinte pássaros na árvore!']]),
      w('twenty-one', '/ˌtwenti ˈwʌn/', 'vinte e um', '🔢', [['Twenty-one, twenty-two, twenty-three...', 'Vinte e um, vinte e dois, vinte e três...']], undefined, { lookup: 'twenty' }),
      w('thirty', '/ˈθɜːti/', 'trinta', '3️⃣', [['There are thirty kids in my class.', 'Há trinta crianças na minha turma.']], 'A força fica no começo: THIR-ty.'),
      w('fifty', '/ˈfɪfti/', 'cinquenta', '🪙', [['Fifty cents.', 'Cinquenta centavos.']]),
      w('one hundred', '/wʌn ˈhʌndrəd/', 'cem', '💯', [['I can count to one hundred!', 'Eu sei contar até cem!']], undefined, { lookup: 'hundred' }),
    ],
  ),
  mod(
    {
      id: 'k-opposites', level: 'B1', audiences: kids, title: 'Opostos', subtitle: 'Grande e pequeno, rápido e devagar',
      emoji: '🐘', category: 'Vocabulário',
      lesson: [sec('Comparando', 'Use opostos para comparar: "The elephant is big. The mouse is small." Com -ER: "The rabbit is faster than the turtle."')],
    },
    [
      w('big / small', '/bɪɡ/ /smɔːl/', 'grande / pequeno', '🐘', [['The elephant is big. The mouse is small.', 'O elefante é grande. O rato é pequeno.']], undefined, { lookup: 'big' }),
      w('fast / slow', '/fɑːst/ /sləʊ/', 'rápido / devagar', '🐇', [['The rabbit is fast. The turtle is slow.', 'O coelho é rápido. A tartaruga é lenta.']], undefined, { lookup: 'fast' }),
      w('tall / short', '/tɔːl/ /ʃɔːt/', 'alto / baixo', '🦒', [['The giraffe is very tall!', 'A girafa é muito alta!']], undefined, { lookup: 'tall' }),
      w('old / new', '/əʊld/ /njuː/', 'velho / novo', '🧸', [['My teddy is old. My ball is new.', 'Meu ursinho é velho. Minha bola é nova.']], undefined, { lookup: 'new' }),
      w('open / closed', '/ˈəʊpən/ /kləʊzd/', 'aberto / fechado', '🚪', [['The door is open.', 'A porta está aberta.']], undefined, { lookup: 'open' }),
      w('full / empty', '/fʊl/ /ˈempti/', 'cheio / vazio', '🥛', [['My glass is empty.', 'Meu copo está vazio.']], undefined, { lookup: 'empty' }),
      w('loud / quiet', '/laʊd/ /ˈkwaɪət/', 'barulhento / silencioso', '🔊', [['Shh! Be quiet!', 'Shh! Fique quieto!']], undefined, { lookup: 'quiet' }),
      w('clean / dirty', '/kliːn/ /ˈdɜːti/', 'limpo / sujo', '🧼', [['My hands are dirty. Let\'s wash them!', 'Minhas mãos estão sujas. Vamos lavar!']], undefined, { lookup: 'dirty' }),
    ],
  ),
  mod(
    {
      id: 'k-town', level: 'B1', audiences: kids, title: 'Minha cidade', subtitle: 'Parque, hospital e padaria',
      emoji: '🏙️', category: 'Vocabulário',
      lesson: [sec('Onde fica?', '"Where is the park?" — "It\'s next to the school." Use "There is a..." para dizer o que tem na sua cidade.')],
    },
    [
      w('park', '/pɑːk/', 'parque', '🏞️', [["Let's play in the park!", 'Vamos brincar no parque!']]),
      w('hospital', '/ˈhɒspɪtl/', 'hospital', '🏥', [['Doctors work at the hospital.', 'Médicos trabalham no hospital.']]),
      w('supermarket', '/ˈsuːpəmɑːkɪt/', 'supermercado', '🛒', [['We buy food at the supermarket.', 'Compramos comida no supermercado.']]),
      w('library', '/ˈlaɪbrəri/', 'biblioteca', '📚', [['I read books at the library.', 'Eu leio livros na biblioteca.']], 'Biblioteca, NÃO livraria!'),
      w('zoo', '/zuː/', 'zoológico', '🦓', [['We saw lions at the zoo.', 'Vimos leões no zoológico.']]),
      w('playground', '/ˈpleɪɡraʊnd/', 'parquinho', '🛝', [['The playground has a big slide.', 'O parquinho tem um escorregador grande.']]),
      w('bakery', '/ˈbeɪkəri/', 'padaria', '🥐', [['The bakery smells good!', 'A padaria tem um cheiro bom!']]),
      w('street', '/striːt/', 'rua', '🛣️', [['Look both ways before you cross the street.', 'Olhe para os dois lados antes de atravessar a rua.']]),
    ],
  ),
]
