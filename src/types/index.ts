export type NavTab = 'hud' | 'sense' | 'scope' | 'stretched';

export interface HUDButton {
  id: string;
  label: string;
  action: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number; // percentage relative size, e.g. 80 - 150
  opacity: number; // percentage 20 - 100
  iconName?: string;
  isPrimaryFire?: boolean;
  isAim?: boolean;
  color?: string;
  fingerTag?: string; // 'Indicador Esq.', 'Polegar Esq.', 'Polegar Dir.', etc.
}

export interface HUDLayout {
  id: string;
  title: string;
  fingerCount: '2 Dedos' | '3 Dedos' | '4 Dedos' | '5 Dedos' | 'Tablet / iPad';
  targetDevice: 'Mobile Universal' | 'Smartphones Grandes' | 'Tablets & iPads';
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Competitivo Pro';
  description: string;
  tacticalAdvantage: string;
  shareCode: string;
  fireButtonSize: number;
  fireButtonPosition: string;
  buttons: HUDButton[];
  tips: string[];
}

export interface SensePreset {
  id: string;
  creatorName: string;
  handle: string;
  platform: 'TikTok' | 'YouTube';
  avatar: string;
  badge: 'Verificado' | 'Pro Player' | 'Top 1 Global' | 'Criador Destaque';
  followers: string;
  deviceCategory: 'Xiaomi / Poco' | 'iPhone / iOS' | 'Samsung' | 'Motorola' | 'PC Emulador';
  deviceModel: string;
  playstyle: 'Rusher Capa' | 'Sniper Pro' | 'Movimentação Rápida' | 'Equilibrado';
  dpi: number;
  generalSens: number;
  redDotSens: number;
  scope2x: number;
  scope4x: number;
  scope6x: number;
  scope8x: number;
  accelMode: 'Desativada' | 'Aceleração de Velocidade' | 'Aceleração de Distância';
  accelValue: number;
  fireButtonSize: number;
  fireButtonPosition: string;
  gyroscope: {
    enabled: boolean;
    general?: number;
    redDot?: number;
    scope2x?: number;
    scope4x?: number;
  };
  shareCode: string;
  highlightQuote: string;
  tips: string[];
}

export interface StretchedPreset {
  id: string;
  name: string;
  resolution: string;
  aspectRatio: string;
  horizontalStretchPercent: number; // e.g. 33% wider
  fpsGain: string;
  fovVisual: string;
  description: string;
  recommendedFor: string;
  pros: string[];
  cons: string[];
  launchParameter: string;
}

export interface StretchedGuide {
  id: string;
  title: string;
  category: 'PC' | 'Mobile';
  method: string;
  steps: string[];
  tips: string[];
  warning?: string;
}
