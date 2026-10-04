import { StretchedPreset, StretchedGuide } from '../types';

export const STRETCHED_PRESETS: StretchedPreset[] = [
  {
    id: 'res-4-3-1280-960',
    name: '4:3 Competitivo Clássico (1280 x 960)',
    resolution: '1280 x 960',
    aspectRatio: '4:3',
    horizontalStretchPercent: 33,
    fpsGain: '+25% a +35% FPS',
    fovVisual: 'Bonecos 33% mais largos e fáceis de acertar',
    description: 'A proporção mais lendária dos jogos de tiro competitivos (CS2, Blood Strike, Valorant). Os modelos dos Strikers ficam notavelmente mais largos na tela, facilitando miras na cabeça.',
    recommendedFor: 'PC Competitivo, Notebooks com placa de vídeo integrada, e celulares com Tela Dividida.',
    pros: [
      'Modelos de inimigos visivelmente mais largos e cabeças maiores para puxar capa',
      'Aumento expressivo na taxa de quadros (FPS) e redução drástica de input lag',
      'Movimentação e sensação de velocidade aumentadas'
    ],
    cons: [
      'Redução leve no campo de visão periférico horizontal (FOV)',
      'A sensibilidade horizontal fica ligeiramente mais rápida (ajuste recomendado: multiplicar sensibilidade X por 0.75)'
    ],
    launchParameter: '-w 1280 -h 960 -screen-fullscreen 1'
  },
  {
    id: 'res-4-3-1440-1080',
    name: '4:3 HD Pro Nitidez Máxima (1440 x 1080)',
    resolution: '1440 x 1080',
    aspectRatio: '4:3',
    horizontalStretchPercent: 33,
    fpsGain: '+15% a +20% FPS',
    fovVisual: 'Bonecos 33% mais largos com nitidez Full HD perfeita',
    description: 'Mantém a altura vertical de 1080p idêntica ao monitor nativo, eliminando qualquer aspecto embaçado nas miras de longa distância enquanto mantém os corpos dos Strikers esticados.',
    recommendedFor: 'Monitores Full HD (1920x1080) e celulares com telas AMOLED 1080p.',
    pros: [
      'Mesma nitidez cristalina do Full HD original',
      'Texturas e miras Red Dot nítidas sem pixels borrados',
      'Inimigos largos sem perda de qualidade visual'
    ],
    cons: [
      'Ganha menos FPS do que 1280x960',
      'No PC, requer criar uma resolução personalizada no painel da placa de vídeo'
    ],
    launchParameter: '-w 1440 -h 1080 -screen-fullscreen 1'
  },
  {
    id: 'res-5-4-1280-1024',
    name: '5:4 Ultra Esticada (1280 x 1024)',
    resolution: '1280 x 1024',
    aspectRatio: '5:4',
    horizontalStretchPercent: 41,
    fpsGain: '+30% a +40% FPS',
    fovVisual: 'Bonecos super largos (+41%) e foco máximo no centro',
    description: 'Mais esticada que o 4:3 tradicional. Ideal para jogadores de escopeta e submetralhadoras que rusheiam em locais fechados e querem acertar cada disparo sem errar.',
    recommendedFor: 'Rushers agressivos de curta distância e computadores fracos precisando de FPS.',
    pros: [
      'Sensação máxima de largura dos inimigos em combates próximos',
      'Excelente ganho de fluidez gráfica e estabilidade de frames',
      'Miras holográficas gigantescas na tela'
    ],
    cons: [
      'Perda perceptível de visão nos cantos extremos da tela',
      'Curva de adaptação de 2 a 3 dias na memória muscular'
    ],
    launchParameter: '-w 1280 -h 1024 -screen-fullscreen 1'
  },
  {
    id: 'res-16-10-1680-1050',
    name: '16:10 Equilíbrio Perfeito (1680 x 1050 / 1440 x 900)',
    resolution: '1680 x 1050',
    aspectRatio: '16:10',
    horizontalStretchPercent: 12,
    fpsGain: '+10% a +15% FPS',
    fovVisual: 'Bonecos sutilmente mais largos mantendo amplo FOV',
    description: 'A proporção do equilíbrio. Proporciona inimigos ligeiramente mais cheios sem deformar o jogo e mantendo quase todo o campo de visão periférico das partidas de Battle Royale.',
    recommendedFor: 'Jogadores que acham 4:3 muito agressivo ou que jogam muito de Sniper a longas distâncias.',
    pros: [
      'Transição imediata sem perder a mira habitual',
      'Não corta o campo de visão lateral das montanhas e vilas',
      'Compatível nativamente com quase qualquer monitor e tela'
    ],
    cons: [
      'Menor largura em relação ao 4:3 clássico',
      'Ganho moderado de FPS'
    ],
    launchParameter: '-w 1680 -h 1050 -screen-fullscreen 1'
  },
  {
    id: 'res-1-1-1080-1080',
    name: '1:1 Quadrada Extrema (1080 x 1080 / TikTok Clip Res)',
    resolution: '1080 x 1080',
    aspectRatio: '1:1',
    horizontalStretchPercent: 77,
    fpsGain: '+40% FPS',
    fovVisual: 'Bonecos gigantescos (+77% de largura horizontal)',
    description: 'A lendária resolução dos highlights e clipes virais do TikTok. Os personagens parecem blocos maciços na tela, tornando o spray control extremamente satisfatório.',
    recommendedFor: 'Gravação de clipes curtos verticais pro TikTok/Reels e jogatina casual de rush insano.',
    pros: [
      'Os personagens ficam tão largos que é quase impossível errar tiros de perto',
      'Visual hiper-agressivo que faz sucesso em clipes de redes sociais',
      'Altíssimo ganho de performance e leveza'
    ],
    cons: [
      'FOV lateral bastante reduzido',
      'Exige muita adaptação para enxergar inimigos flanqueando'
    ],
    launchParameter: '-w 1080 -h 1080 -screen-fullscreen 1'
  }
];

export const STRETCHED_GUIDES: StretchedGuide[] = [
  {
    id: 'guide-pc-nvidia',
    title: 'Nvidia Geforce (Painel de Controle)',
    category: 'PC',
    method: 'GPU Scaling / Tela Inteira Nativo',
    steps: [
      'Clique com o botão direito na Área de Trabalho e abra o "Painel de Controle da NVIDIA".',
      'No menu lateral esquerdo, vá em "Vídeo" > "Ajustar o tamanho e a posição da área de trabalho".',
      'Selecione a opção de escala: "Tela inteira" (Full-screen).',
      'Em "Executar escala em:", selecione "GPU" e marque a caixinha "Substituir o modo de escala definido por jogos e programas".',
      'Clique em Aplicar. Em seguida, vá em "Mudar resolução" e crie sua resolução (ex: 1440x1080 ou 1280x960 a 144Hz/240Hz).',
      'Abra o Blood Strike e selecione a nova resolução em Modo Tela Cheia!'
    ],
    tips: [
      'Garante zero barras pretas laterais (Black Bars) e resposta instantânea do monitor.',
      'Se o jogo abrir em janela, aperte Alt + Enter para forçar tela cheia esticada.'
    ]
  },
  {
    id: 'guide-pc-amd',
    title: 'AMD Radeon Software (Adrenalin)',
    category: 'PC',
    method: 'Dimensionamento da GPU / Painel Inteiro',
    steps: [
      'Abra o AMD Software: Adrenalin Edition clicando com botão direito na área de trabalho.',
      'Clique na engrenagem de Configurações (canto superior direito) e vá na aba "Tela".',
      'Ative a opção "Dimensionamento de GPU".',
      'No campo "Modo de dimensionamento", alterne para "Painel Inteiro" (Full Panel).',
      'Vá em "Resoluções Personalizadas" > "Criar nova", digite 1440x1080 e a taxa do seu monitor.',
      'Inicie o Blood Strike e ative a resolução esticada.'
    ],
    tips: [
      'Mantenha o FreeSync ativado para evitar screen tearing na tela esticada.'
    ]
  },
  {
    id: 'guide-mobile-split-screen',
    title: 'Android - Método Tela Dividida (Sem Root / Nativo)',
    category: 'Mobile',
    method: 'Multi-Window / Split Screen Nativo',
    steps: [
      'Abra qualquer aplicativo simples que suporte tela dividida (ex: Calculadora ou Configurações).',
      'Abra os aplicativos recentes do seu celular (botão multitarefa ou gesto de arrastar pra cima).',
      'Toque no ícone do aplicativo ou segure nele e selecione "Abrir no modo tela dividida".',
      'Na outra metade da tela, selecione e abra o Blood Strike.',
      'Espere o Blood Strike carregar completamente até a tela de início do lobby.',
      'Assim que entrar no lobby, puxe a barra divisora preta do meio até o final para fechar o outro aplicativo.',
      'Pronto! O Blood Strike recalculará a proporção da tela ficando 100% esticado!'
    ],
    tips: [
      'Funciona perfeitamente em aparelhos Xiaomi (MIUI/HyperOS), Samsung (One UI) e Motorola.',
      'Se o boneco não esticar, certifique-se de ativar a rotação automática antes de fazer o procedimento.'
    ]
  },
  {
    id: 'guide-mobile-dpi',
    title: 'Android - Método Menor Largura (DPI Avançado)',
    category: 'Mobile',
    method: 'Opções do Desenvolvedor / DPI',
    steps: [
      'Vá em Configurações > Sobre o telefone e toque 7 vezes em "Número da versão" para ativar o modo desenvolvedor.',
      'Vá em Sistema > Opções do desenvolvedor.',
      'Role até encontrar "Menor largura" (ou Largura mínima).',
      'Anote o número original (geralmente entre 360 e 411) para poder voltar depois se quiser.',
      'Aumente o valor para 480 ou 540 (no máximo 600 para não quebrar a interface do sistema).',
      'Abra o Blood Strike e sinta a tela com elementos menores, mais campo de visão e sensação esticada fluida.'
    ],
    tips: [
      'DPI mais alta deixa a sensibilidade do toque muito mais rápida e sem atraso de amostragem.',
      'Nunca coloque valores absurdos como 1000+ para não travar o teclado virtual do celular.'
    ]
  }
];
