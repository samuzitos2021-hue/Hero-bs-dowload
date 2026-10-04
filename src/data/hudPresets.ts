import { HUDLayout } from '../types';

export const HUD_PRESETS: HUDLayout[] = [
  {
    id: 'hud-itusk-crab',
    title: 'HUD do ITUSK (Crab Movement / 4-5 Dedos)',
    fingerCount: '4 Dedos',
    targetDevice: 'Mobile Universal',
    difficulty: 'Competitivo Pro',
    description: 'O layout oficial de movimentação do criador ITUSK (@itusk.cc no TikTok). Feito especificamente para a técnica lendária "Crab Movement" no Blood Strike, permitindo slide cancel sem delay, zig-zag rápido e troca dinâmica de armas.',
    tacticalAdvantage: 'Crab Movement nativo + Slide cancel com indicador direito e disparo sem perder mira.',
    shareCode: 'NA/SA-HUD1-An3T2cP6MQMCO/4v-0-3',
    fireButtonSize: 120,
    fireButtonPosition: 'Superior Esquerdo (X: 16%, Y: 20%)',
    tips: [
      'O botão de agachamento/slide fica no topo direito (118%) para o indicador direito executar o slide cancel instantâneo.',
      'Botão de tiro principal aumentado para 120% no indicador esquerdo para garantir cliques sem falhas no rush.',
      'Troca rápida de armas posicionada ao lado do tiro para cancelar animações de recarga instantaneamente.',
      'Base do Crab Movement: puxe o joystick para frente e alterne slide e pulo rapidamente mantendo a mira central.'
    ],
    buttons: [
      {
        id: 'fire_left',
        label: 'Disparo Principal',
        action: 'Tiro Primário',
        x: 16,
        y: 20,
        size: 120,
        opacity: 90,
        isPrimaryFire: true,
        fingerTag: 'Indicador Esquerdo',
        color: 'bg-red-600/90 text-white border-red-400'
      },
      {
        id: 'quick_swap',
        label: 'Troca Rápida',
        action: 'Quick Switch',
        x: 28,
        y: 22,
        size: 95,
        opacity: 85,
        fingerTag: 'Indicador Esquerdo',
        color: 'bg-purple-600/80 text-white border-purple-400'
      },
      {
        id: 'joystick',
        label: 'Joystick',
        action: 'Crab Sprint',
        x: 18,
        y: 72,
        size: 115,
        opacity: 50,
        fingerTag: 'Polegar Esquerdo',
        color: 'bg-slate-700/60 text-slate-200 border-slate-500'
      },
      {
        id: 'crouch_top',
        label: 'Slide / Agachar',
        action: 'Slide Cancel Crab',
        x: 86,
        y: 18,
        size: 118,
        opacity: 90,
        fingerTag: 'Indicador Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'jump_mid',
        label: 'Pular',
        action: 'Pulo / Salto',
        x: 90,
        y: 36,
        size: 105,
        opacity: 85,
        fingerTag: 'Indicador Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'aim',
        label: 'Mirar (ADS)',
        action: 'Abrir Mira',
        x: 84,
        y: 60,
        size: 112,
        opacity: 85,
        isAim: true,
        fingerTag: 'Polegar Direito',
        color: 'bg-sky-600/80 text-white border-sky-400'
      },
      {
        id: 'reload',
        label: 'Recarregar',
        action: 'Recarga Rápida',
        x: 72,
        y: 74,
        size: 85,
        opacity: 75,
        fingerTag: 'Polegar Direito',
        color: 'bg-slate-800/80 text-slate-200 border-slate-600'
      },
      {
        id: 'weapon_swap',
        label: 'Armas 1 / 2',
        action: 'Troca de Slot',
        x: 52,
        y: 84,
        size: 125,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-zinc-800/80 text-zinc-100 border-zinc-600'
      },
      {
        id: 'striker_skill',
        label: 'Skill Striker',
        action: 'Habilidade',
        x: 72,
        y: 46,
        size: 95,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-rose-700/80 text-rose-100 border-rose-500'
      },
      {
        id: 'map',
        label: 'Mini-Mapa',
        action: 'Radar',
        x: 12,
        y: 16,
        size: 115,
        opacity: 70,
        color: 'bg-slate-900/80 text-slate-300 border-slate-700'
      }
    ]
  },
  {
    id: 'hud-speedyx-pro',
    title: 'HUD do Speedyx (Competitivo Latino / 4 Dedos)',
    fingerCount: '4 Dedos',
    targetDevice: 'Mobile Universal',
    difficulty: 'Avançado',
    description: 'O HUD utilizado por Speedyx (@speedyx00 no TikTok e YouTube), jogador de destaque em torneios competitivos latino-americanos de Blood Strike (Copa Latino). Otimizado para precisão cirúrgica de mira e rush de escopeta.',
    tacticalAdvantage: 'Mira aberta rápida com estabilidade de tiro e agilidade em duelos de curta distância.',
    shareCode: 'NA/SA-HUD1-AnxzIMEJNAECN7uJ-1-1',
    fireButtonSize: 115,
    fireButtonPosition: 'Superior Esquerdo (X: 17%, Y: 22%)',
    tips: [
      'Disparo primário e botão de pular em alturas alinhadas para saltar atirando sem tremer a mira.',
      'Botão de agachar logo abaixo do pulo para facilitar transições rápidas de slide.',
      'Mira ADS no polegar direito posicionada para descanso confortável durante partidas longas de campeonato.',
      'Excelente distribuição para espingardas Origin-12 e rifles Kala/AK-47.'
    ],
    buttons: [
      {
        id: 'fire_left',
        label: 'Disparo Principal',
        action: 'Tiro Primário',
        x: 17,
        y: 22,
        size: 115,
        opacity: 90,
        isPrimaryFire: true,
        fingerTag: 'Indicador Esquerdo',
        color: 'bg-red-600/90 text-white border-red-400'
      },
      {
        id: 'joystick',
        label: 'Joystick',
        action: 'Movimentação',
        x: 19,
        y: 72,
        size: 120,
        opacity: 50,
        fingerTag: 'Polegar Esquerdo',
        color: 'bg-slate-700/60 text-slate-200 border-slate-500'
      },
      {
        id: 'jump',
        label: 'Pular',
        action: 'Pulo / Escalada',
        x: 82,
        y: 22,
        size: 110,
        opacity: 85,
        fingerTag: 'Indicador Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'crouch',
        label: 'Agachar / Slide',
        action: 'Slide Cancel Pro',
        x: 90,
        y: 38,
        size: 115,
        opacity: 90,
        fingerTag: 'Indicador Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'aim',
        label: 'Mirar (ADS)',
        action: 'Abrir Mira',
        x: 84,
        y: 62,
        size: 115,
        opacity: 85,
        isAim: true,
        fingerTag: 'Polegar Direito',
        color: 'bg-sky-600/80 text-white border-sky-400'
      },
      {
        id: 'reload',
        label: 'Recarregar',
        action: 'Recarga',
        x: 74,
        y: 76,
        size: 88,
        opacity: 75,
        fingerTag: 'Polegar Direito',
        color: 'bg-slate-800/80 text-slate-200 border-slate-600'
      },
      {
        id: 'weapon_swap',
        label: 'Arsenal 1 / 2',
        action: 'Troca de Armas',
        x: 52,
        y: 84,
        size: 125,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-zinc-800/80 text-zinc-100 border-zinc-600'
      },
      {
        id: 'striker_skill',
        label: 'Skill Striker',
        action: 'Poder Striker',
        x: 70,
        y: 48,
        size: 95,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-rose-700/80 text-rose-100 border-rose-500'
      },
      {
        id: 'medkit',
        label: 'Kit Médico',
        action: 'Cura',
        x: 36,
        y: 84,
        size: 80,
        opacity: 75,
        fingerTag: 'Polegar Esquerdo',
        color: 'bg-emerald-700/80 text-emerald-100 border-emerald-500'
      },
      {
        id: 'map',
        label: 'Mini-Mapa',
        action: 'Radar',
        x: 12,
        y: 16,
        size: 115,
        opacity: 70,
        color: 'bg-slate-900/80 text-slate-300 border-slate-700'
      }
    ]
  },
  {
    id: 'hud-4-fingers-claw-pro',
    title: '4 Dedos Competitivo Claw (Meta Pro)',
    fingerCount: '4 Dedos',
    targetDevice: 'Mobile Universal',
    difficulty: 'Avançado',
    description: 'O layout mais utilizado pelos pro players de Blood Strike. Permite pular, agachar, mirar e atirar simultaneamente sem travar a movimentação de deslize (slide cancel).',
    tacticalAdvantage: 'Slide-jump sem delay + Puxada de capa precisa com botão de tiro esquerdo.',
    shareCode: 'NA/SA-HUD2-Kc81MweYRPIAqTt+-0-2',
    fireButtonSize: 110,
    fireButtonPosition: 'Superior Esquerdo (X: 18%, Y: 22%)',
    tips: [
      'Use o indicador esquerdo exclusivamente para o botão de disparo principal no topo.',
      'O indicador direito deve controlar o botão de pular e agachar rapidamente.',
      'Mantenha o botão de mira no lado direito inferior para ativar e soltar com o polegar.',
      'Deixe a opacidade do joystick em 40% para ter visão limpa do flanco esquerdo.'
    ],
    buttons: [
      {
        id: 'fire_left',
        label: 'Disparo Principal',
        action: 'Tiro Primário',
        x: 18,
        y: 22,
        size: 115,
        opacity: 90,
        isPrimaryFire: true,
        fingerTag: 'Indicador Esquerdo',
        color: 'bg-red-600/90 text-white border-red-400'
      },
      {
        id: 'joystick',
        label: 'Joystick',
        action: 'Movimentação / Sprint',
        x: 20,
        y: 72,
        size: 125,
        opacity: 50,
        fingerTag: 'Polegar Esquerdo',
        color: 'bg-slate-700/60 text-slate-200 border-slate-500'
      },
      {
        id: 'jump',
        label: 'Pular',
        action: 'Pulo / Escalada',
        x: 82,
        y: 24,
        size: 105,
        opacity: 85,
        fingerTag: 'Indicador Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'crouch',
        label: 'Agachar / Deslizar',
        action: 'Slide Cancel & Crouch',
        x: 90,
        y: 40,
        size: 110,
        opacity: 90,
        fingerTag: 'Indicador Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'aim',
        label: 'Mirar (ADS)',
        action: 'Abrir Mira',
        x: 84,
        y: 62,
        size: 110,
        opacity: 85,
        isAim: true,
        fingerTag: 'Polegar Direito',
        color: 'bg-sky-600/80 text-white border-sky-400'
      },
      {
        id: 'reload',
        label: 'Recarregar',
        action: 'Recarga Rápida',
        x: 74,
        y: 76,
        size: 85,
        opacity: 75,
        fingerTag: 'Polegar Direito',
        color: 'bg-slate-800/80 text-slate-200 border-slate-600'
      },
      {
        id: 'weapon_swap',
        label: 'Armas 1 / 2',
        action: 'Troca de Slot',
        x: 52,
        y: 84,
        size: 130,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-zinc-800/80 text-zinc-100 border-zinc-600'
      },
      {
        id: 'striker_skill',
        label: 'Habilidade Striker',
        action: 'Poder Especial',
        x: 70,
        y: 50,
        size: 95,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-rose-700/80 text-rose-100 border-rose-500'
      },
      {
        id: 'medkit',
        label: 'Kit Médico',
        action: 'Cura / Escudo',
        x: 36,
        y: 84,
        size: 80,
        opacity: 75,
        fingerTag: 'Polegar Esquerdo',
        color: 'bg-emerald-700/80 text-emerald-100 border-emerald-500'
      },
      {
        id: 'grenade',
        label: 'Granada',
        action: 'Tática / Letal',
        x: 44,
        y: 84,
        size: 80,
        opacity: 75,
        fingerTag: 'Polegar Esquerdo',
        color: 'bg-orange-700/80 text-orange-100 border-orange-500'
      },
      {
        id: 'map',
        label: 'Mini-Mapa',
        action: 'Radar Tático',
        x: 12,
        y: 16,
        size: 120,
        opacity: 70,
        color: 'bg-slate-900/80 text-slate-300 border-slate-700'
      }
    ]
  },
  {
    id: 'hud-3-fingers-rusher',
    title: '3 Dedos Híbrido Rusher (Fácil Adaptação)',
    fingerCount: '3 Dedos',
    targetDevice: 'Mobile Universal',
    difficulty: 'Intermediário',
    description: 'Ideal para quem está saindo do 2 dedos e quer evoluir rapidamente. Usa o indicador esquerdo no tiro superior e os dois polegares para mira, salto e agachamento.',
    tacticalAdvantage: 'Atirar pulando sem perder mira e facilidade tremenda de adaptação em 2 dias.',
    shareCode: 'NA/SA-HUD3-Ab26JzuXTQIAqBb+-0-2',
    fireButtonSize: 125,
    fireButtonPosition: 'Superior Esquerdo (X: 16%, Y: 24%)',
    tips: [
      'Deixe o botão de atirar maior (120-130%) para seu indicador nunca errar o clique durante o rush.',
      'Posicione o botão de pular e agachar próximos um do outro no canto direito.',
      'O joystick de corrida automática deve ficar travado no modo sprint sensível.'
    ],
    buttons: [
      {
        id: 'fire_left',
        label: 'Disparo Principal',
        action: 'Tiro Superior',
        x: 16,
        y: 24,
        size: 125,
        opacity: 90,
        isPrimaryFire: true,
        fingerTag: 'Indicador Esquerdo',
        color: 'bg-red-600/90 text-white border-red-400'
      },
      {
        id: 'joystick',
        label: 'Joystick',
        action: 'Andar / Correr',
        x: 18,
        y: 72,
        size: 110,
        opacity: 55,
        fingerTag: 'Polegar Esquerdo',
        color: 'bg-slate-700/60 text-slate-200 border-slate-500'
      },
      {
        id: 'aim',
        label: 'Mirar (ADS)',
        action: 'Mira Rápida',
        x: 82,
        y: 52,
        size: 105,
        opacity: 85,
        isAim: true,
        fingerTag: 'Polegar Direito',
        color: 'bg-sky-600/80 text-white border-sky-400'
      },
      {
        id: 'jump',
        label: 'Pular',
        action: 'Pulo Tático',
        x: 88,
        y: 32,
        size: 95,
        opacity: 85,
        fingerTag: 'Polegar Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'crouch',
        label: 'Agachar',
        action: 'Deslizar',
        x: 88,
        y: 72,
        size: 100,
        opacity: 85,
        fingerTag: 'Polegar Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'reload',
        label: 'Recarregar',
        action: 'Troca de Pente',
        x: 74,
        y: 72,
        size: 85,
        opacity: 75,
        fingerTag: 'Polegar Direito',
        color: 'bg-slate-800/80 text-slate-200 border-slate-600'
      },
      {
        id: 'weapon_swap',
        label: 'Slot de Armas',
        action: 'Armas',
        x: 52,
        y: 84,
        size: 120,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-zinc-800/80 text-zinc-100 border-zinc-600'
      },
      {
        id: 'striker_skill',
        label: 'Skill Striker',
        action: 'Habilidade',
        x: 68,
        y: 45,
        size: 90,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-rose-700/80 text-rose-100 border-rose-500'
      },
      {
        id: 'map',
        label: 'Mini-Mapa',
        action: 'Radar',
        x: 12,
        y: 16,
        size: 110,
        opacity: 70,
        color: 'bg-slate-900/80 text-slate-300 border-slate-700'
      }
    ]
  },
  {
    id: 'hud-2-fingers-basic',
    title: '2 Dedos Otimizado (Iniciante / Casual)',
    fingerCount: '2 Dedos',
    targetDevice: 'Mobile Universal',
    difficulty: 'Iniciante',
    description: 'Configuração limpa e ergonômica para jogar segurando o celular com apenas os dois polegares. Botões ajustados para não haver toques acidentais.',
    tacticalAdvantage: 'Conforto muscular máximo para partidas longas e visão de tela totalmente desobstruída.',
    shareCode: 'NA/SA-HUD1-Pt19VxaZQOIAyRr+-0-1',
    fireButtonSize: 115,
    fireButtonPosition: 'Inferior Direito (X: 84%, Y: 60%)',
    tips: [
      'Ative a opção de "Disparo ao Mirar" caso prefira economia de botões.',
      'Coloque o botão de pular logo acima do botão de disparo para deslizar o polegar com facilidade.',
      'Aumente a transparência dos botões secundários para 40% para maximizar a visão do mapa.'
    ],
    buttons: [
      {
        id: 'joystick',
        label: 'Joystick',
        action: 'Mover',
        x: 20,
        y: 68,
        size: 115,
        opacity: 60,
        fingerTag: 'Polegar Esquerdo',
        color: 'bg-slate-700/60 text-slate-200 border-slate-500'
      },
      {
        id: 'fire_right',
        label: 'Disparo + Mira',
        action: 'Atirar / Puxar Capa',
        x: 82,
        y: 60,
        size: 115,
        opacity: 90,
        isPrimaryFire: true,
        fingerTag: 'Polegar Direito',
        color: 'bg-red-600/90 text-white border-red-400'
      },
      {
        id: 'aim',
        label: 'Mira Manual',
        action: 'Mirar',
        x: 72,
        y: 50,
        size: 95,
        opacity: 80,
        isAim: true,
        fingerTag: 'Polegar Direito',
        color: 'bg-sky-600/80 text-white border-sky-400'
      },
      {
        id: 'jump',
        label: 'Pular',
        action: 'Salto',
        x: 90,
        y: 42,
        size: 90,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'crouch',
        label: 'Agachar',
        action: 'Agachar',
        x: 92,
        y: 76,
        size: 95,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'reload',
        label: 'Recarga',
        action: 'Recarregar',
        x: 74,
        y: 76,
        size: 85,
        opacity: 75,
        fingerTag: 'Polegar Direito',
        color: 'bg-slate-800/80 text-slate-200 border-slate-600'
      },
      {
        id: 'weapon_swap',
        label: 'Armas',
        action: 'Trocar Arma',
        x: 52,
        y: 84,
        size: 110,
        opacity: 75,
        fingerTag: 'Polegar Direito',
        color: 'bg-zinc-800/80 text-zinc-100 border-zinc-600'
      },
      {
        id: 'striker_skill',
        label: 'Skill',
        action: 'Striker',
        x: 62,
        y: 40,
        size: 85,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-rose-700/80 text-rose-100 border-rose-500'
      }
    ]
  },
  {
    id: 'hud-5-fingers-godmode',
    title: '5 Dedos Extremo (Movimentação Insana)',
    fingerCount: '5 Dedos',
    targetDevice: 'Smartphones Grandes',
    difficulty: 'Competitivo Pro',
    description: 'Para jogadores que buscam o ápice da mecânica de movimentação do Blood Strike. 3 dedos na mão esquerda (polegar, indicador, médio) e 2 dedos na direita.',
    tacticalAdvantage: 'Cancelamento perfeito de reload + troca infinita de arma (zigzag) + tiro preciso sem parar de mirar.',
    shareCode: 'NA/SA-HUD3-Zx73QvrXTWIApNm+-0-3',
    fireButtonSize: 115,
    fireButtonPosition: 'Topo Superior Esquerdo (X: 18%, Y: 18%)',
    tips: [
      'Dedo médio esquerdo no disparo superior.',
      'Indicador esquerdo no pular/troca de arma rápida.',
      'Indicador direito exclusivamente no agachamento e slide cancel.',
      'Exige suporte ou descanso para a pegada do celular.'
    ],
    buttons: [
      {
        id: 'fire_top_left',
        label: 'Disparo Primário',
        action: 'Tiro Primário',
        x: 18,
        y: 18,
        size: 115,
        opacity: 90,
        isPrimaryFire: true,
        fingerTag: 'Médio Esquerdo',
        color: 'bg-red-600/90 text-white border-red-400'
      },
      {
        id: 'quick_swap_left',
        label: 'Troca Rápida',
        action: 'Quick Weapon Switch',
        x: 28,
        y: 22,
        size: 95,
        opacity: 85,
        fingerTag: 'Indicador Esquerdo',
        color: 'bg-purple-600/80 text-white border-purple-400'
      },
      {
        id: 'joystick',
        label: 'Joystick',
        action: 'Movimentação',
        x: 18,
        y: 72,
        size: 110,
        opacity: 50,
        fingerTag: 'Polegar Esquerdo',
        color: 'bg-slate-700/60 text-slate-200 border-slate-500'
      },
      {
        id: 'crouch_top_right',
        label: 'Slide / Agachar',
        action: 'Slide Cancel Pro',
        x: 84,
        y: 20,
        size: 110,
        opacity: 90,
        fingerTag: 'Indicador Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'jump_mid',
        label: 'Pular',
        action: 'Salto',
        x: 92,
        y: 34,
        size: 100,
        opacity: 85,
        fingerTag: 'Indicador Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'aim',
        label: 'Mirar (ADS)',
        action: 'Mira Dinâmica',
        x: 82,
        y: 60,
        size: 110,
        opacity: 85,
        isAim: true,
        fingerTag: 'Polegar Direito',
        color: 'bg-sky-600/80 text-white border-sky-400'
      },
      {
        id: 'reload',
        label: 'Recarga',
        action: 'Recarga Rápida',
        x: 70,
        y: 75,
        size: 90,
        opacity: 75,
        fingerTag: 'Polegar Direito',
        color: 'bg-slate-800/80 text-slate-200 border-slate-600'
      },
      {
        id: 'striker_skill',
        label: 'Skill Striker',
        action: 'Habilidade',
        x: 72,
        y: 42,
        size: 95,
        opacity: 80,
        fingerTag: 'Polegar Direito',
        color: 'bg-rose-700/80 text-rose-100 border-rose-500'
      }
    ]
  },
  {
    id: 'hud-tablet-ipad-claw',
    title: 'iPad & Tablet Pro (Ergonomia Ampla)',
    fingerCount: 'Tablet / iPad',
    targetDevice: 'Tablets & iPads',
    difficulty: 'Competitivo Pro',
    description: 'Projetado especificamente para telas de 10 a 13 polegadas (iPad Pro, Air, Galaxy Tab). Evita fadiga nos pulsos distribuindo os controles nos cantos naturais de descanso.',
    tacticalAdvantage: 'Campo de visão central 100% desobstruído e precisão milimétrica em troca de mira.',
    shareCode: 'NA/SA-HUD2-Ip94MkeYVPIAoTt+-0-2',
    fireButtonSize: 130,
    fireButtonPosition: 'Superior Esquerdo (X: 14%, Y: 22%)',
    tips: [
      'Aproveite a tela grande aumentando os botões de ação rápida para nunca dar miss-click.',
      'Mantenha o centro da tela totalmente vazio para avistar inimigos a longas distâncias.',
      'Configure o giroscópio apenas para mirar (ADS) se o tablet for muito pesado.'
    ],
    buttons: [
      {
        id: 'fire_left',
        label: 'Disparo Esquerdo',
        action: 'Tiro Primário',
        x: 14,
        y: 22,
        size: 125,
        opacity: 85,
        isPrimaryFire: true,
        fingerTag: 'Indicador Esquerdo',
        color: 'bg-red-600/90 text-white border-red-400'
      },
      {
        id: 'joystick',
        label: 'Joystick',
        action: 'Movimentação',
        x: 15,
        y: 75,
        size: 130,
        opacity: 50,
        fingerTag: 'Polegar Esquerdo',
        color: 'bg-slate-700/60 text-slate-200 border-slate-500'
      },
      {
        id: 'jump',
        label: 'Pulo',
        action: 'Salto',
        x: 86,
        y: 20,
        size: 110,
        opacity: 85,
        fingerTag: 'Indicador Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'crouch',
        label: 'Slide / Agachar',
        action: 'Deslize',
        x: 88,
        y: 38,
        size: 115,
        opacity: 85,
        fingerTag: 'Indicador Direito',
        color: 'bg-amber-600/80 text-white border-amber-400'
      },
      {
        id: 'aim',
        label: 'Mirar (ADS)',
        action: 'Mira',
        x: 86,
        y: 65,
        size: 120,
        opacity: 85,
        isAim: true,
        fingerTag: 'Polegar Direito',
        color: 'bg-sky-600/80 text-white border-sky-400'
      },
      {
        id: 'weapon_swap',
        label: 'Arsenal',
        action: 'Armas',
        x: 50,
        y: 88,
        size: 130,
        opacity: 80,
        color: 'bg-zinc-800/80 text-zinc-100 border-zinc-600'
      },
      {
        id: 'striker_skill',
        label: 'Skill',
        action: 'Poder',
        x: 74,
        y: 48,
        size: 100,
        opacity: 80,
        color: 'bg-rose-700/80 text-rose-100 border-rose-500'
      }
    ]
  }
];
