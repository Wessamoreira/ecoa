import { mod, sec, w } from './helpers.ts'

const K = ['kids'] as const
const kids = [...K]

export const kidsModules = [
  // ───────────────────────────── A1 · Primeiras palavras
  mod(
    {
      id: 'k-hello', level: 'A1', audiences: kids, title: 'Olá, mundo!', subtitle: 'Cumprimentos e palavrinhas mágicas',
      emoji: '👋', category: 'Conversação', photo: 'children waving hello',
      lesson: [
        sec('Como cumprimentar', 'Em inglês, a gente diz "Hello!" ou "Hi!" para dizer oi. De manhã é "Good morning", à tarde "Good afternoon" e de noite, para dormir, "Good night".'),
        sec('Palavrinhas mágicas', '"Please" (por favor), "Thank you" (obrigado) e "Sorry" (desculpa) deixam todo mundo feliz!'),
      ],
    },
    [
      w('hello', '/həˈləʊ/', 'olá', '👋', [['Hello! My name is Ana.', 'Olá! Meu nome é Ana.']], 'O "h" tem som de "rr" bem fraquinho, como um suspiro: "rrêlou".'),
      w('hi', '/haɪ/', 'oi', '🙋', [['Hi, Tom!', 'Oi, Tom!']], 'Fala "rái", bem rapidinho.'),
      w('goodbye', '/ɡʊdˈbaɪ/', 'tchau / adeus', '👋', [['Goodbye, teacher!', 'Tchau, professora!']], 'Também pode dizer só "Bye!".'),
      w('good morning', '/ɡʊd ˈmɔːnɪŋ/', 'bom dia', '🌅', [['Good morning, Mom!', 'Bom dia, mamãe!']]),
      w('good afternoon', '/ɡʊd ˌɑːftəˈnuːn/', 'boa tarde', '🌤️', [['Good afternoon, class!', 'Boa tarde, turma!']]),
      w('good night', '/ɡʊd ˈnaɪt/', 'boa noite (para dormir)', '🌙', [['Good night, Dad!', 'Boa noite, papai!']], '"Good night" é para despedir antes de dormir. Para chegar de noite, diga "Good evening".'),
      w('please', '/pliːz/', 'por favor', '🙏', [['Water, please.', 'Água, por favor.']], 'O "s" no final soa como "z": "pliiiz".'),
      w('thank you', '/ˈθæŋk juː/', 'obrigado / obrigada', '💛', [['Thank you, Grandma!', 'Obrigado, vovó!']], 'O "th" é com a língua entre os dentes, soltando um arzinho!'),
      w('sorry', '/ˈsɒri/', 'desculpa', '😅', [['Sorry, Ben!', 'Desculpa, Ben!']]),
      w("what's your name?", '/wɒts jɔː neɪm/', 'qual é o seu nome?', '🏷️', [["What's your name? — I'm Lucas.", 'Qual é o seu nome? — Eu sou o Lucas.']], 'Responda: "My name is..." ou "I\'m...".', { lookup: 'name' }),
    ],
  ),
  mod(
    {
      id: 'k-colors', level: 'A1', audiences: kids, title: 'Cores', subtitle: 'Pinte o mundo em inglês',
      emoji: '🎨', category: 'Vocabulário', photo: 'colorful crayons',
      lesson: [sec('A cor vem antes!', 'Em inglês a cor vem ANTES da coisa: "a red car" (um carro vermelho), "a blue ball" (uma bola azul).', undefined, [['a red apple', 'uma maçã vermelha'], ['a yellow sun', 'um sol amarelo']])],
    },
    [
      w('red', '/red/', 'vermelho', '🔴', [['The apple is red.', 'A maçã é vermelha.']]),
      w('blue', '/bluː/', 'azul', '🔵', [['The sky is blue.', 'O céu é azul.']]),
      w('yellow', '/ˈjeləʊ/', 'amarelo', '🟡', [['The banana is yellow.', 'A banana é amarela.']]),
      w('green', '/ɡriːn/', 'verde', '🟢', [['The frog is green.', 'O sapo é verde.']]),
      w('orange', '/ˈɒrɪndʒ/', 'laranja (cor)', '🟠', [['I like orange.', 'Eu gosto de laranja.']], 'Orange é a cor E a fruta!'),
      w('purple', '/ˈpɜːpl/', 'roxo', '🟣', [['My bag is purple.', 'Minha mochila é roxa.']]),
      w('pink', '/pɪŋk/', 'rosa', '🩷', [['The pig is pink.', 'O porquinho é rosa.']]),
      w('black', '/blæk/', 'preto', '⚫', [['The cat is black.', 'O gato é preto.']]),
      w('white', '/waɪt/', 'branco', '⚪', [['The snow is white.', 'A neve é branca.']], 'O "h" não tem som: fala "uáit".'),
      w('brown', '/braʊn/', 'marrom', '🟤', [['The dog is brown.', 'O cachorro é marrom.']]),
    ],
  ),
  mod(
    {
      id: 'k-numbers', level: 'A1', audiences: kids, title: 'Números', subtitle: 'Contando de 1 a 12',
      emoji: '🔢', category: 'Vocabulário', photo: 'colorful numbers toys',
      lesson: [sec('Vamos contar!', 'One, two, three... Conte os dedos das mãos em inglês! Para perguntar a idade: "How old are you?" — "I\'m seven."')],
    },
    [
      w('one', '/wʌn/', 'um', '1️⃣', [['I have one dog.', 'Eu tenho um cachorro.']], 'Fala "uân".'),
      w('two', '/tuː/', 'dois', '2️⃣', [['Two cats!', 'Dois gatos!']]),
      w('three', '/θriː/', 'três', '3️⃣', [['Three balls.', 'Três bolas.']], 'Língua entre os dentes no "th"!'),
      w('four', '/fɔː/', 'quatro', '4️⃣', [['Four ducks.', 'Quatro patos.']]),
      w('five', '/faɪv/', 'cinco', '5️⃣', [['High five!', 'Toca aqui!']], '"High five" é o "toca aqui" com a mão!'),
      w('six', '/sɪks/', 'seis', '6️⃣', [['Six eggs.', 'Seis ovos.']]),
      w('seven', '/ˈsevn/', 'sete', '7️⃣', [["I'm seven.", 'Eu tenho sete anos.']]),
      w('eight', '/eɪt/', 'oito', '8️⃣', [['Eight spiders!', 'Oito aranhas!']], 'Fala "êit" — o "gh" é mudo.'),
      w('nine', '/naɪn/', 'nove', '9️⃣', [['Nine stars.', 'Nove estrelas.']]),
      w('ten', '/ten/', 'dez', '🔟', [['Ten fingers.', 'Dez dedos.']]),
      w('eleven', '/ɪˈlevn/', 'onze', '🕚', [['Eleven players.', 'Onze jogadores.']]),
      w('twelve', '/twelv/', 'doze', '🕛', [['Twelve months.', 'Doze meses.']]),
      w('how old are you?', '/haʊ əʊld ɑː juː/', 'quantos anos você tem?', '🎂', [["How old are you? — I'm eight.", 'Quantos anos você tem? — Tenho oito.']], 'Em inglês a gente "É" a idade: "I am eight" (e não "I have eight").', { lookup: 'old' }),
    ],
  ),
  mod(
    {
      id: 'k-animals', level: 'A1', audiences: kids, title: 'Animais', subtitle: 'Do cachorro ao elefante',
      emoji: '🐶', category: 'Vocabulário', photo: 'cute puppy',
      lesson: [sec('Que animal é?', 'Pergunte "What is it?" e responda "It\'s a dog!" (É um cachorro!). Para dizer o que você gosta: "I like cats."')],
    },
    [
      w('dog', '/dɒɡ/', 'cachorro', '🐶', [['The dog says woof!', 'O cachorro faz au-au!']]),
      w('cat', '/kæt/', 'gato', '🐱', [['My cat is sleeping.', 'Meu gato está dormindo.']]),
      w('bird', '/bɜːd/', 'pássaro', '🐦', [['The bird can fly.', 'O pássaro sabe voar.']]),
      w('fish', '/fɪʃ/', 'peixe', '🐟', [['The fish is in the water.', 'O peixe está na água.']]),
      w('horse', '/hɔːs/', 'cavalo', '🐴', [['I ride a horse.', 'Eu ando a cavalo.']]),
      w('cow', '/kaʊ/', 'vaca', '🐮', [['The cow says moo!', 'A vaca faz muuu!']]),
      w('pig', '/pɪɡ/', 'porco', '🐷', [['The pig is pink.', 'O porco é rosa.']]),
      w('rabbit', '/ˈræbɪt/', 'coelho', '🐰', [['The rabbit eats carrots.', 'O coelho come cenouras.']]),
      w('lion', '/ˈlaɪən/', 'leão', '🦁', [['The lion is the king!', 'O leão é o rei!']]),
      w('elephant', '/ˈelɪfənt/', 'elefante', '🐘', [['The elephant is big.', 'O elefante é grande.']]),
      w('monkey', '/ˈmʌŋki/', 'macaco', '🐵', [['The monkey eats bananas.', 'O macaco come bananas.']]),
      w('duck', '/dʌk/', 'pato', '🦆', [['The duck says quack!', 'O pato faz quá-quá!']]),
      w('turtle', '/ˈtɜːtl/', 'tartaruga', '🐢', [['The turtle is slow.', 'A tartaruga é lenta.']]),
    ],
  ),
  mod(
    {
      id: 'k-family', level: 'A1', audiences: kids, title: 'Família', subtitle: 'Quem mora com você?',
      emoji: '👨‍👩‍👧', category: 'Vocabulário', photo: 'happy family picnic',
      lesson: [sec('Apresente sua família', 'Use "This is my..." para apresentar: "This is my mom." (Esta é a minha mãe.)')],
    },
    [
      w('mom', '/mɒm/', 'mãe / mamãe', '👩', [['I love you, Mom!', 'Eu te amo, mamãe!']], 'Mais formal: "mother". No Reino Unido: "mum".'),
      w('dad', '/dæd/', 'pai / papai', '👨', [['My dad is tall.', 'Meu pai é alto.']], 'Mais formal: "father".'),
      w('sister', '/ˈsɪstə/', 'irmã', '👧', [['My sister is five.', 'Minha irmã tem cinco anos.']]),
      w('brother', '/ˈbrʌðə/', 'irmão', '👦', [['I play with my brother.', 'Eu brinco com meu irmão.']]),
      w('grandma', '/ˈɡrænmɑː/', 'vovó', '👵', [['Grandma makes cookies.', 'A vovó faz biscoitos.']]),
      w('grandpa', '/ˈɡrænpɑː/', 'vovô', '👴', [['Grandpa tells stories.', 'O vovô conta histórias.']]),
      w('baby', '/ˈbeɪbi/', 'bebê', '👶', [['The baby is crying.', 'O bebê está chorando.']], 'Fala "bêibi".'),
      w('family', '/ˈfæməli/', 'família', '👨‍👩‍👧‍👦', [['I love my family.', 'Eu amo minha família.']]),
    ],
  ),
  mod(
    {
      id: 'k-body', level: 'A1', audiences: kids, title: 'Meu corpo', subtitle: 'Cabeça, ombro, joelho e pé',
      emoji: '🖐️', category: 'Vocabulário', photo: 'kids playing outside',
      lesson: [sec('Plural', 'Quando tem dois ou mais, colocamos "s": one eye → two eyes. Mas atenção: one foot → two FEET!')],
    },
    [
      w('head', '/hed/', 'cabeça', '🙆', [['Touch your head!', 'Toque na sua cabeça!']]),
      w('eyes', '/aɪz/', 'olhos', '👀', [['I have blue eyes.', 'Eu tenho olhos azuis.']]),
      w('ears', '/ɪəz/', 'orelhas', '👂', [['The rabbit has long ears.', 'O coelho tem orelhas compridas.']]),
      w('nose', '/nəʊz/', 'nariz', '👃', [['My nose is cold.', 'Meu nariz está gelado.']]),
      w('mouth', '/maʊθ/', 'boca', '👄', [['Open your mouth.', 'Abra a boca.']]),
      w('hand', '/hænd/', 'mão', '✋', [['Raise your hand!', 'Levante a mão!']]),
      w('foot / feet', '/fʊt/ /fiːt/', 'pé / pés', '🦶', [['One foot, two feet.', 'Um pé, dois pés.']], 'Plural especial: foot → feet!', { lookup: 'foot' }),
      w('arm', '/ɑːm/', 'braço', '💪', [['My arm is strong!', 'Meu braço é forte!']]),
      w('leg', '/leɡ/', 'perna', '🦵', [['A spider has eight legs.', 'Uma aranha tem oito pernas.']]),
      w('hair', '/heə/', 'cabelo', '💇', [['She has long hair.', 'Ela tem cabelo comprido.']]),
    ],
  ),
  mod(
    {
      id: 'k-food', level: 'A1', audiences: kids, title: 'Comidas e frutas', subtitle: 'Hora do lanche!',
      emoji: '🍎', category: 'Vocabulário', photo: 'fresh fruit basket',
      lesson: [sec('Do que você gosta?', '"I like pizza!" (Eu gosto de pizza!) / "I don\'t like broccoli." (Eu não gosto de brócolis.)')],
    },
    [
      w('apple', '/ˈæpl/', 'maçã', '🍎', [['An apple a day!', 'Uma maçã por dia!']], 'Antes de som de vogal usamos "an": an apple.'),
      w('banana', '/bəˈnɑːnə/', 'banana', '🍌', [['Monkeys love bananas.', 'Macacos amam bananas.']], 'Escreve igual, mas fala "bə-NÁ-nə".'),
      w('orange', '/ˈɒrɪndʒ/', 'laranja (fruta)', '🍊', [['I drink orange juice.', 'Eu bebo suco de laranja.']]),
      w('strawberry', '/ˈstrɔːbəri/', 'morango', '🍓', [['Strawberries are red.', 'Morangos são vermelhos.']]),
      w('milk', '/mɪlk/', 'leite', '🥛', [['I drink milk.', 'Eu bebo leite.']]),
      w('water', '/ˈwɔːtə/', 'água', '💧', [['Can I have water, please?', 'Posso tomar água, por favor?']], 'Nos EUA o "t" vira quase um "r": "uó-rer".'),
      w('bread', '/bred/', 'pão', '🍞', [['Bread and butter.', 'Pão com manteiga.']]),
      w('egg', '/eɡ/', 'ovo', '🥚', [['The chicken has an egg.', 'A galinha tem um ovo.']]),
      w('cheese', '/tʃiːz/', 'queijo', '🧀', [['Say cheese!', 'Diga "xis"!']], '"Say cheese!" é o que dizem na hora da foto!'),
      w('cake', '/keɪk/', 'bolo', '🎂', [['Happy birthday! Here is your cake.', 'Feliz aniversário! Aqui está seu bolo.']]),
      w('ice cream', '/ˌaɪs ˈkriːm/', 'sorvete', '🍦', [['I love ice cream!', 'Eu amo sorvete!']]),
      w('pizza', '/ˈpiːtsə/', 'pizza', '🍕', [['Pizza for dinner!', 'Pizza no jantar!']]),
      w('carrot', '/ˈkærət/', 'cenoura', '🥕', [['Rabbits eat carrots.', 'Coelhos comem cenouras.']]),
    ],
  ),
  mod(
    {
      id: 'k-school', level: 'A1', audiences: kids, title: 'Na escola', subtitle: 'O que tem na mochila?',
      emoji: '🎒', category: 'Vocabulário', photo: 'school supplies pencils',
      lesson: [sec('Frases da sala de aula', '"Open your book" (abra o livro), "Listen" (escute), "Sit down" (sente-se), "Stand up" (levante-se).')],
    },
    [
      w('pencil', '/ˈpensl/', 'lápis', '✏️', [['I draw with a pencil.', 'Eu desenho com um lápis.']]),
      w('pen', '/pen/', 'caneta', '🖊️', [['Can I borrow your pen?', 'Posso pegar sua caneta emprestada?']]),
      w('book', '/bʊk/', 'livro', '📕', [['Open your book.', 'Abra o seu livro.']]),
      w('backpack', '/ˈbækpæk/', 'mochila', '🎒', [['My backpack is heavy.', 'Minha mochila está pesada.']]),
      w('teacher', '/ˈtiːtʃə/', 'professor(a)', '🧑‍🏫', [['My teacher is nice.', 'Minha professora é legal.']]),
      w('scissors', '/ˈsɪzəz/', 'tesoura', '✂️', [['Be careful with the scissors.', 'Cuidado com a tesoura.']], 'Sempre no plural: "the scissors ARE..."'),
      w('ruler', '/ˈruːlə/', 'régua', '📏', [['I need a ruler.', 'Eu preciso de uma régua.']]),
      w('notebook', '/ˈnəʊtbʊk/', 'caderno', '📓', [['Write in your notebook.', 'Escreva no seu caderno.']], 'Notebook é caderno! Computador portátil é "laptop".'),
      w('eraser', '/ɪˈreɪzə/', 'borracha', '🧽', [['Can I use your eraser?', 'Posso usar sua borracha?']], 'No Reino Unido também se diz "rubber".'),
      w('friend', '/frend/', 'amigo / amiga', '🤝', [['She is my best friend.', 'Ela é minha melhor amiga.']], 'O "i" é mudo: fala "frénd".'),
    ],
  ),
  mod(
    {
      id: 'k-tobe', level: 'A1', audiences: kids, title: 'Eu sou, você é', subtitle: 'O verbo mágico "to be"',
      emoji: '🙋', category: 'Gramática', photo: 'kids smiling classroom',
      lesson: [
        sec('O verbo "to be"', 'O verbo "to be" quer dizer SER e ESTAR ao mesmo tempo! "I am happy" = Eu estou feliz. "I am Lucas" = Eu sou o Lucas.', [
          ['Quem', 'Verbo', 'Curtinho'], ['I', 'am', "I'm"], ['You', 'are', "You're"], ['He / She / It', 'is', "He's / She's / It's"], ['We / They', 'are', "We're / They're"],
        ]),
      ],
    },
    [
      w('I am', '/aɪ æm/', 'eu sou / eu estou', '🙋', [["I'm happy!", 'Eu estou feliz!'], ['I am a student.', 'Eu sou estudante.']], 'Curtinho: I\'m ("áim").', { lookup: 'am' }),
      w('you are', '/juː ɑː/', 'você é / você está', '👉', [["You're my friend.", 'Você é meu amigo.']], 'Curtinho: you\'re ("iór").', { lookup: 'are' }),
      w('he is', '/hiː ɪz/', 'ele é / ele está', '👦', [["He's tall.", 'Ele é alto.']]),
      w('she is', '/ʃiː ɪz/', 'ela é / ela está', '👧', [["She's my sister.", 'Ela é minha irmã.']]),
      w('it is', '/ɪt ɪz/', 'é / está (coisas e animais)', '🐶', [["It's a dog.", 'É um cachorro.']], '"It" é para coisas e animais.'),
      w('we are', '/wiː ɑː/', 'nós somos / estamos', '👫', [["We're friends.", 'Nós somos amigos.']]),
      w('they are', '/ðeɪ ɑː/', 'eles/elas são / estão', '👨‍👩‍👦', [["They're at school.", 'Eles estão na escola.']]),
    ],
  ),

  // ───────────────────────────── A2 · Pequeno explorador
  mod(
    {
      id: 'k-actions', level: 'A2', audiences: kids, title: 'Ações', subtitle: 'Correr, pular, nadar!',
      emoji: '🏃', category: 'Verbos', photo: 'children running park',
      lesson: [sec('O que você está fazendo?', 'Para algo que está acontecendo AGORA, usamos am/is/are + verbo com -ING: "I am running!" (Estou correndo!)', undefined, [['She is dancing.', 'Ela está dançando.'], ['We are swimming.', 'Nós estamos nadando.']])],
    },
    [
      w('run', '/rʌn/', 'correr', '🏃', [['I run in the park.', 'Eu corro no parque.'], ['He is running.', 'Ele está correndo.', 'agora']]),
      w('jump', '/dʒʌmp/', 'pular', '🦘', [['Kangaroos jump high.', 'Cangurus pulam alto.']]),
      w('swim', '/swɪm/', 'nadar', '🏊', [['I can swim!', 'Eu sei nadar!']]),
      w('dance', '/dɑːns/', 'dançar', '💃', [["Let's dance!", 'Vamos dançar!']]),
      w('sing', '/sɪŋ/', 'cantar', '🎤', [['She sings a song.', 'Ela canta uma música.']]),
      w('eat', '/iːt/', 'comer', '🍽️', [['I eat lunch at school.', 'Eu almoço na escola.']]),
      w('drink', '/drɪŋk/', 'beber', '🥤', [['Drink your milk.', 'Beba seu leite.']]),
      w('sleep', '/sliːp/', 'dormir', '😴', [['The cat sleeps a lot.', 'O gato dorme muito.']]),
      w('play', '/pleɪ/', 'brincar / jogar', '⚽', [["Let's play!", 'Vamos brincar!']], '"Play" serve para brincar, jogar e tocar instrumento!'),
      w('read', '/riːd/', 'ler', '📖', [['I read a book every night.', 'Eu leio um livro toda noite.']]),
      w('write', '/raɪt/', 'escrever', '✍️', [['Write your name.', 'Escreva seu nome.']], 'O "w" é mudo: fala "ráit".'),
      w('draw', '/drɔː/', 'desenhar', '🖍️', [['I draw a cat.', 'Eu desenho um gato.']]),
      w('climb', '/klaɪm/', 'escalar / subir', '🧗', [['The monkey climbs the tree.', 'O macaco sobe na árvore.']], 'O "b" no final é mudo: "kláim".'),
    ],
  ),
  mod(
    {
      id: 'k-house', level: 'A2', audiences: kids, title: 'Minha casa', subtitle: 'Cômodos e móveis',
      emoji: '🏠', category: 'Vocabulário', photo: 'cozy house living room',
      lesson: [sec('Onde está?', 'Use "in" (dentro), "on" (em cima) e "under" (embaixo): "The cat is under the bed." (O gato está embaixo da cama.)')],
    },
    [
      w('house', '/haʊs/', 'casa', '🏠', [['This is my house.', 'Esta é a minha casa.']]),
      w('bedroom', '/ˈbedruːm/', 'quarto', '🛏️', [['My bedroom is blue.', 'Meu quarto é azul.']]),
      w('kitchen', '/ˈkɪtʃɪn/', 'cozinha', '🍳', [['Mom is in the kitchen.', 'A mamãe está na cozinha.']]),
      w('bathroom', '/ˈbɑːθruːm/', 'banheiro', '🛁', [['Where is the bathroom?', 'Onde é o banheiro?']]),
      w('bed', '/bed/', 'cama', '🛌', [['Time for bed!', 'Hora de ir para a cama!']]),
      w('door', '/dɔː/', 'porta', '🚪', [['Close the door, please.', 'Feche a porta, por favor.']]),
      w('window', '/ˈwɪndəʊ/', 'janela', '🪟', [['Look out the window!', 'Olhe pela janela!']]),
      w('table', '/ˈteɪbl/', 'mesa', '🪑', [['The cake is on the table.', 'O bolo está em cima da mesa.']]),
      w('chair', '/tʃeə/', 'cadeira', '🪑', [['Sit on the chair.', 'Sente na cadeira.']]),
      w('garden', '/ˈɡɑːdn/', 'jardim / quintal', '🌻', [['We play in the garden.', 'Brincamos no jardim.']]),
    ],
  ),
  mod(
    {
      id: 'k-clothes', level: 'A2', audiences: kids, title: 'Roupas', subtitle: 'O que você está vestindo?',
      emoji: '👕', category: 'Vocabulário', photo: 'kids clothes colorful',
      lesson: [sec('Vestir', '"I\'m wearing a red T-shirt." = Estou usando uma camiseta vermelha. "Put on your shoes!" = Calce seus sapatos!')],
    },
    [
      w('T-shirt', '/ˈtiː ʃɜːt/', 'camiseta', '👕', [['I like your T-shirt!', 'Gostei da sua camiseta!']]),
      w('pants', '/pænts/', 'calça', '👖', [['My pants are blue.', 'Minha calça é azul.']], 'Nos EUA é "pants"; no Reino Unido é "trousers" (lá "pants" é cueca!).'),
      w('dress', '/dres/', 'vestido', '👗', [['What a pretty dress!', 'Que vestido bonito!']]),
      w('shoes', '/ʃuːz/', 'sapatos', '👟', [['Put on your shoes.', 'Calce seus sapatos.']]),
      w('hat', '/hæt/', 'chapéu / boné', '🧢', [['Wear a hat in the sun.', 'Use chapéu no sol.']]),
      w('socks', '/sɒks/', 'meias', '🧦', [['I have funny socks.', 'Eu tenho meias engraçadas.']]),
      w('jacket', '/ˈdʒækɪt/', 'jaqueta / casaco', '🧥', [["It's cold. Take a jacket.", 'Está frio. Leve um casaco.']]),
      w('glasses', '/ˈɡlɑːsɪz/', 'óculos', '👓', [['My grandpa wears glasses.', 'Meu vovô usa óculos.']]),
    ],
  ),
  mod(
    {
      id: 'k-weather', level: 'A2', audiences: kids, title: 'O tempo', subtitle: 'Sol, chuva e arco-íris',
      emoji: '🌈', category: 'Vocabulário', photo: 'rainbow sky',
      lesson: [sec('Como está o tempo?', 'Pergunte "What\'s the weather like?" e responda com "It\'s sunny / rainy / cold".')],
    },
    [
      w('sunny', '/ˈsʌni/', 'ensolarado', '☀️', [["It's sunny today!", 'Está ensolarado hoje!']]),
      w('rainy', '/ˈreɪni/', 'chuvoso', '🌧️', [["It's rainy. Take an umbrella.", 'Está chovendo. Leve um guarda-chuva.']]),
      w('cloudy', '/ˈklaʊdi/', 'nublado', '☁️', [["It's cloudy.", 'Está nublado.']]),
      w('windy', '/ˈwɪndi/', 'com vento', '🌬️', [["It's windy. Let's fly a kite!", 'Está ventando. Vamos soltar pipa!']]),
      w('snow', '/snəʊ/', 'neve', '❄️', [["Let's make a snowman!", 'Vamos fazer um boneco de neve!']]),
      w('hot', '/hɒt/', 'quente', '🥵', [["It's hot! I want ice cream.", 'Está quente! Quero sorvete.']]),
      w('cold', '/kəʊld/', 'frio', '🥶', [["It's cold outside.", 'Está frio lá fora.']]),
      w('rainbow', '/ˈreɪnbəʊ/', 'arco-íris', '🌈', [['Look! A rainbow!', 'Olha! Um arco-íris!']]),
    ],
  ),
  mod(
    {
      id: 'k-feelings', level: 'A2', audiences: kids, title: 'Sentimentos', subtitle: 'Como você está se sentindo?',
      emoji: '😊', category: 'Vocabulário', photo: 'happy children laughing',
      lesson: [sec('Como você está?', '"How are you?" — "I\'m happy!" Também dá para perguntar: "Are you OK?" (Você está bem?)')],
    },
    [
      w('happy', '/ˈhæpi/', 'feliz', '😄', [["I'm happy today!", 'Estou feliz hoje!']]),
      w('sad', '/sæd/', 'triste', '😢', [['Why are you sad?', 'Por que você está triste?']]),
      w('angry', '/ˈæŋɡri/', 'bravo / com raiva', '😠', [["Don't be angry!", 'Não fique bravo!']]),
      w('scared', '/skeəd/', 'com medo', '😨', [["I'm scared of the dark.", 'Tenho medo do escuro.']]),
      w('tired', '/ˈtaɪəd/', 'cansado', '🥱', [["I'm tired. I want to sleep.", 'Estou cansado. Quero dormir.']]),
      w('hungry', '/ˈhʌŋɡri/', 'com fome', '🤤', [["I'm hungry! Pizza, please!", 'Estou com fome! Pizza, por favor!']], 'Em inglês você "É/ESTÁ" com fome: "I am hungry".'),
      w('thirsty', '/ˈθɜːsti/', 'com sede', '🥤', [["I'm thirsty.", 'Estou com sede.']]),
      w('excited', '/ɪkˈsaɪtɪd/', 'animado / empolgado', '🤩', [["I'm so excited for my party!", 'Estou muito animado para a minha festa!']]),
    ],
  ),
  mod(
    {
      id: 'k-toys', level: 'A2', audiences: kids, title: 'Brinquedos', subtitle: 'Hora de brincar',
      emoji: '🧸', category: 'Vocabulário', photo: 'toys teddy bear',
      lesson: [sec('Eu tenho...', 'Use "I have..." para dizer o que você tem: "I have a ball." Pergunte: "Do you have a kite?"')],
    },
    [
      w('ball', '/bɔːl/', 'bola', '⚽', [['Kick the ball!', 'Chute a bola!']]),
      w('doll', '/dɒl/', 'boneca', '🪆', [['My doll has a pink dress.', 'Minha boneca tem um vestido rosa.']]),
      w('kite', '/kaɪt/', 'pipa', '🪁', [['My kite is flying high.', 'Minha pipa está voando alto.']]),
      w('teddy bear', '/ˈtedi beə/', 'ursinho de pelúcia', '🧸', [['I sleep with my teddy bear.', 'Eu durmo com meu ursinho.']]),
      w('bike', '/baɪk/', 'bicicleta', '🚲', [['I ride my bike.', 'Eu ando de bicicleta.']]),
      w('puzzle', '/ˈpʌzl/', 'quebra-cabeça', '🧩', [["Let's do a puzzle.", 'Vamos montar um quebra-cabeça.']]),
      w('video game', '/ˈvɪdiəʊ ɡeɪm/', 'videogame', '🎮', [['I play video games on Saturday.', 'Eu jogo videogame no sábado.']]),
      w('balloon', '/bəˈluːn/', 'balão / bexiga', '🎈', [['A red balloon!', 'Um balão vermelho!']]),
    ],
  ),
  mod(
    {
      id: 'k-can', level: 'A2', audiences: kids, title: 'Eu consigo!', subtitle: 'Can e can\'t: o que você sabe fazer',
      emoji: '🦸', category: 'Gramática', photo: 'child superhero costume',
      lesson: [sec('Can = consigo / sei', '"I can swim" = Eu sei nadar. "I can\'t fly" = Eu não consigo voar. Para perguntar: "Can you dance?" — "Yes, I can!"')],
    },
    [
      w('I can', '/aɪ kæn/', 'eu consigo / eu sei', '💪', [['I can ride a bike.', 'Eu sei andar de bicicleta.']], undefined, { lookup: 'can' }),
      w("I can't", '/aɪ kɑːnt/', 'eu não consigo', '🙅', [["I can't fly.", 'Eu não consigo voar.']], 'Nos EUA: "ként". No Reino Unido: "kánt".', { lookup: "can't" }),
      w('Can you...?', '/kæn juː/', 'você consegue...? / você sabe...?', '❓', [['Can you swim? — Yes, I can!', 'Você sabe nadar? — Sim, eu sei!']], undefined, { lookup: 'can' }),
      w('Can I...?', '/kæn aɪ/', 'posso...?', '🙏', [['Can I go to the bathroom?', 'Posso ir ao banheiro?']], 'Também serve para pedir permissão!', { lookup: 'can' }),
      w('Yes, I can! / No, I can\'t.', '', 'Sim, eu consigo! / Não, eu não consigo.', '✅', [['Can you whistle? — No, I can\'t.', 'Você sabe assobiar? — Não, não sei.']], undefined, { lookup: 'yes' }),
    ],
  ),

  // ───────────────────────────── B1 · Aventureiro
  mod(
    {
      id: 'k-routine', level: 'B1', audiences: kids, title: 'Meu dia', subtitle: 'Rotina da manhã à noite',
      emoji: '⏰', category: 'Verbos', photo: 'alarm clock morning',
      lesson: [sec('Contando a rotina', 'Use "First" (primeiro), "Then" (depois) e "Finally" (por fim): "First, I wake up. Then, I brush my teeth."')],
    },
    [
      w('wake up', '/weɪk ʌp/', 'acordar', '⏰', [['I wake up at seven.', 'Eu acordo às sete.']], undefined, { lookup: 'wake' }),
      w('brush my teeth', '/brʌʃ maɪ tiːθ/', 'escovar os dentes', '🪥', [['I brush my teeth after breakfast.', 'Eu escovo os dentes depois do café.']], undefined, { lookup: 'brush' }),
      w('have breakfast', '/hæv ˈbrekfəst/', 'tomar café da manhã', '🥣', [['We have breakfast together.', 'Nós tomamos café juntos.']], undefined, { lookup: 'breakfast' }),
      w('go to school', '/ɡəʊ tə skuːl/', 'ir para a escola', '🏫', [['I go to school by bus.', 'Eu vou para a escola de ônibus.']], undefined, { lookup: 'school' }),
      w('do my homework', '/duː maɪ ˈhəʊmwɜːk/', 'fazer a lição de casa', '📝', [['I do my homework after lunch.', 'Eu faço a lição depois do almoço.']], 'Lição de casa usa "DO", nunca "make".', { lookup: 'homework' }),
      w('take a shower', '/teɪk ə ˈʃaʊə/', 'tomar banho', '🚿', [['I take a shower at night.', 'Eu tomo banho à noite.']], undefined, { lookup: 'shower' }),
      w('go to bed', '/ɡəʊ tə bed/', 'ir para a cama', '🛏️', [['I go to bed at nine.', 'Eu vou dormir às nove.']], undefined, { lookup: 'bed' }),
    ],
  ),
  mod(
    {
      id: 'k-nature', level: 'B1', audiences: kids, title: 'Natureza', subtitle: 'Rios, florestas e montanhas',
      emoji: '🌳', category: 'Vocabulário', photo: 'forest river mountain',
      lesson: [sec('There is / There are', '"There is a tree" = Tem uma árvore. "There are many flowers" = Tem muitas flores. "Is" para um, "are" para vários.')],
    },
    [
      w('tree', '/triː/', 'árvore', '🌳', [['There is a bird in the tree.', 'Tem um pássaro na árvore.']]),
      w('flower', '/ˈflaʊə/', 'flor', '🌸', [['These flowers smell good.', 'Essas flores cheiram bem.']]),
      w('river', '/ˈrɪvə/', 'rio', '🏞️', [['The Amazon is a big river.', 'O Amazonas é um rio grande.']]),
      w('mountain', '/ˈmaʊntɪn/', 'montanha', '⛰️', [['We climbed a mountain!', 'Nós subimos uma montanha!']]),
      w('beach', '/biːtʃ/', 'praia', '🏖️', [["Let's go to the beach!", 'Vamos à praia!']], 'Cuidado com o som do "ee" longo: "biitch".'),
      w('forest', '/ˈfɒrɪst/', 'floresta', '🌲', [['Many animals live in the forest.', 'Muitos animais vivem na floresta.']]),
      w('sea', '/siː/', 'mar', '🌊', [['Dolphins live in the sea.', 'Golfinhos vivem no mar.']]),
      w('island', '/ˈaɪlənd/', 'ilha', '🏝️', [['A small island.', 'Uma ilha pequena.']], 'O "s" é mudo: "ái-lând".'),
    ],
  ),
  mod(
    {
      id: 'k-space', level: 'B1', audiences: kids, title: 'Espaço', subtitle: 'Viagem pelas estrelas',
      emoji: '🚀', category: 'Vocabulário', photo: 'space galaxy stars',
      lesson: [sec('Comparando', 'Para comparar: "The Sun is bigger than the Moon." (O Sol é MAIOR do que a Lua.) — big → bigger, small → smaller.')],
    },
    [
      w('planet', '/ˈplænɪt/', 'planeta', '🪐', [['Saturn is a planet with rings.', 'Saturno é um planeta com anéis.']]),
      w('star', '/stɑː/', 'estrela', '⭐', [['Look at the stars!', 'Olhe as estrelas!']]),
      w('moon', '/muːn/', 'lua', '🌙', [['The moon is bright tonight.', 'A lua está brilhante hoje.']]),
      w('rocket', '/ˈrɒkɪt/', 'foguete', '🚀', [['The rocket goes up fast.', 'O foguete sobe rápido.']]),
      w('astronaut', '/ˈæstrənɔːt/', 'astronauta', '🧑‍🚀', [['I want to be an astronaut.', 'Eu quero ser astronauta.']]),
      w('Earth', '/ɜːθ/', 'Terra (planeta)', '🌍', [['We live on Earth.', 'Nós moramos na Terra.']]),
      w('sky', '/skaɪ/', 'céu', '🌌', [['The sky is full of stars.', 'O céu está cheio de estrelas.']]),
    ],
  ),
  mod(
    {
      id: 'k-jobs', level: 'B1', audiences: kids, title: 'Profissões', subtitle: 'O que você quer ser?',
      emoji: '👩‍🚒', category: 'Vocabulário', photo: 'firefighter truck',
      lesson: [sec('Quando eu crescer...', '"What do you want to be when you grow up?" — "I want to be a doctor!" Lembre do "a/an" antes da profissão.')],
    },
    [
      w('doctor', '/ˈdɒktə/', 'médico(a)', '🧑‍⚕️', [['The doctor helps sick people.', 'O médico ajuda pessoas doentes.']]),
      w('firefighter', '/ˈfaɪəfaɪtə/', 'bombeiro(a)', '🧑‍🚒', [['Firefighters are brave.', 'Bombeiros são corajosos.']]),
      w('police officer', '/pəˈliːs ˈɒfɪsə/', 'policial', '👮', [['The police officer helps us.', 'O policial nos ajuda.']], undefined, { lookup: 'police' }),
      w('cook', '/kʊk/', 'cozinheiro(a)', '🧑‍🍳', [['My uncle is a great cook.', 'Meu tio é um ótimo cozinheiro.']]),
      w('farmer', '/ˈfɑːmə/', 'fazendeiro(a)', '🧑‍🌾', [['The farmer has many cows.', 'O fazendeiro tem muitas vacas.']]),
      w('pilot', '/ˈpaɪlət/', 'piloto', '🧑‍✈️', [['The pilot flies the plane.', 'O piloto pilota o avião.']]),
      w('vet', '/vet/', 'veterinário(a)', '🐾', [['The vet takes care of my dog.', 'A veterinária cuida do meu cachorro.']]),
      w('scientist', '/ˈsaɪəntɪst/', 'cientista', '🧑‍🔬', [['Scientists do experiments.', 'Cientistas fazem experiências.']]),
    ],
  ),
  mod(
    {
      id: 'k-past', level: 'B1', audiences: kids, title: 'Ontem eu...', subtitle: 'Contando o que já aconteceu',
      emoji: '🕰️', category: 'Gramática', photo: 'children storytelling',
      lesson: [
        sec('O passado', 'Para contar o que aconteceu, muitos verbos ganham -ED: play → played. Mas alguns são "rebeldes" e mudam: go → went, eat → ate, see → saw.', [
          ['Agora', 'Ontem'], ['I am', 'I was'], ['We are', 'We were'], ['I play', 'I played'], ['I go', 'I went'], ['I eat', 'I ate'],
        ]),
      ],
    },
    [
      w('was / were', '/wɒz/ /wɜː/', 'era, estava / eram, estavam', '🕰️', [['I was happy yesterday.', 'Eu estava feliz ontem.'], ['We were at the park.', 'Nós estávamos no parque.']], '"Was" para I/he/she/it. "Were" para you/we/they.', { lookup: 'was' }),
      w('played', '/pleɪd/', 'brinquei / jogou', '⚽', [['I played soccer yesterday.', 'Eu joguei bola ontem.']], undefined, { lookup: 'play' }),
      w('went', '/went/', 'fui / foi', '🚶', [['We went to the zoo.', 'Nós fomos ao zoológico.']], 'Passado de "go".', { lookup: 'go' }),
      w('ate', '/et/', 'comi / comeu', '🍔', [['I ate a big sandwich.', 'Eu comi um sanduíche grande.']], 'Passado de "eat". Fala "êit" (EUA) ou "ét" (Reino Unido).', { lookup: 'eat' }),
      w('saw', '/sɔː/', 'vi / viu', '👀', [['I saw a giraffe!', 'Eu vi uma girafa!']], 'Passado de "see".', { lookup: 'see' }),
      w('had', '/hæd/', 'tive / teve', '🎉', [['I had a great day!', 'Eu tive um dia ótimo!']], 'Passado de "have".', { lookup: 'have' }),
    ],
  ),
]
