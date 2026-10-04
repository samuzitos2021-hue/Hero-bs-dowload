import React, { useState } from 'react';
import { 
  Crosshair, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Target, 
  Sliders, 
  Check, 
  Volume2, 
  Info, 
  Globe, 
  FileCode,
  Flame,
  Award
} from 'lucide-react';
import { playTacticalClick, playSuccessChime } from '../utils/audio';

interface ScopeSectionProps {
  onCopyCode: (code: string, message: string) => void;
}

interface ScopeType {
  id: string;
  name: string;
  zoom: string;
  type: string;
  recommendedSensSpeedyx: number;
  recommendedSensItusk: number;
  desc: string;
  reticleStyle: 'dot' | 'cross' | 'circle_dot' | 'sniper';
}

const SCOPES_DATA: ScopeType[] = [
  {
    id: 'red_dot',
    name: 'Red Dot (Ponto Vermelho)',
    zoom: '1.25x',
    type: 'Curto Alcance / SMG & Rifles',
    recommendedSensSpeedyx: 124,
    recommendedSensItusk: 135,
    desc: 'A mira mais usada para puxar capa e rushar de perto com Kala e MP5. Visão limpa e rápida.',
    reticleStyle: 'dot'
  },
  {
    id: 'holo',
    name: 'Mira Holográfica (Holo)',
    zoom: '1.5x',
    type: 'Curto e Médio Alcance',
    recommendedSensSpeedyx: 120,
    recommendedSensItusk: 130,
    desc: 'Excelente para quem prefere uma moldura de retículo mais visível em mapas claros como Desert Valley.',
    reticleStyle: 'circle_dot'
  },
  {
    id: 'scope_2x',
    name: 'Scope 2x Tático',
    zoom: '2.0x',
    type: 'Médio Alcance / Fuzis de Assalto',
    recommendedSensSpeedyx: 112,
    recommendedSensItusk: 122,
    desc: 'O scope equilibrado para spray contínuo a 30-50 metros sem perder o alvo de vista.',
    reticleStyle: 'cross'
  },
  {
    id: 'scope_4x',
    name: 'Scope 4x ACOG',
    zoom: '4.0x',
    type: 'Longo Alcance / DMR & Rifles',
    recommendedSensSpeedyx: 94,
    recommendedSensItusk: 104,
    desc: 'Ideal para rajadas controladas com M4A1 ou tiros precisos com armas semi-automáticas.',
    reticleStyle: 'cross'
  },
  {
    id: 'scope_6x',
    name: 'Scope 6x Marksman',
    zoom: '6.0x',
    type: 'Sniper Intermediária',
    recommendedSensSpeedyx: 80,
    recommendedSensItusk: 88,
    desc: 'Ótimo zoom para mapas abertos de Battle Royale sem zoom excessivo.',
    reticleStyle: 'sniper'
  },
  {
    id: 'scope_8x',
    name: 'Scope 8x Sniper Pro',
    zoom: '8.0x',
    type: 'Sniper Longa / Barrett & Kar98',
    recommendedSensSpeedyx: 72,
    recommendedSensItusk: 76,
    desc: 'Precisão máxima de headshot a mais de 100 metros. Sensibilidade mais baixa para micro-ajustes.',
    reticleStyle: 'sniper'
  }
];

export const ScopeSection: React.FC<ScopeSectionProps> = ({ onCopyCode }) => {
  const [selectedScope, setSelectedScope] = useState<ScopeType>(SCOPES_DATA[0]);
  const [reticleColor, setReticleColor] = useState<string>('#00ff66'); // Neon Green
  const [reticleSize, setReticleSize] = useState<number>(6);
  const [dotGap, setDotGap] = useState<number>(4);
  const [opacity, setOpacity] = useState<number>(100);
  const [isFiring, setIsFiring] = useState<boolean>(false);

  const colors = [
    { label: 'Verde Neon (Pro)', hex: '#00ff66' },
    { label: 'Ciano Cyber', hex: '#00f0ff' },
    { label: 'Vermelho Laser', hex: '#ff0033' },
    { label: 'Amarelo Ouro', hex: '#ffee00' },
    { label: 'Roxo Elétrico', hex: '#cc00ff' },
    { label: 'Branco Puro', hex: '#ffffff' }
  ];

  const handleSimulateShot = () => {
    playTacticalClick();
    setIsFiring(true);
    setTimeout(() => setIsFiring(false), 200);
  };

  const currentScopeCode = `SCOPE-${selectedScope.id.toUpperCase()}-COL:${reticleColor.replace('#', '')}-SZ:${reticleSize}-GP:${dotGap}`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#14121a] via-[#101722] to-[#121c17] border border-slate-800 p-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Crosshair className="w-4 h-4" />
              <span>CUSTOMIZADOR DE SCOPES & MIRAS TÁTICAS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-wide text-white">
              Laboratório de Scope & Retículos
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Configure as sensibilidades de cada mira (Red Dot, 2x, 4x, 8x), personalize a cor e estilo do seu retículo e confira os Scopes oficiais do app para publicação.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                playSuccessChime();
                onCopyCode(
                  `CONFIGURAÇÕES DE SCOPES BLOOD STRIKE:
- Red Dot: 124% (Speedyx) / 135% (Itusk)
- Scope 2x: 112% (Speedyx) / 122% (Itusk)
- Scope 4x: 94% (Speedyx) / 104% (Itusk)
- Scope 6x: 80% (Speedyx) / 88% (Itusk)
- Scope 8x: 72% (Speedyx) / 76% (Itusk)
Cor recomendada: Verde Neon (#00ff66)`,
                  'Tabela completa de Scopes copiada!'
                );
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copiar Tabela de Scopes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official App & Play Store Scopes Box */}
      <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider font-display">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Scopes Oficiais do Aplicativo (PWA / Google Play Console)</span>
          </div>
          <span className="text-[11px] text-slate-400">Padrão Técnico Android & Web</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Scope PWA */}
          <div className="p-3.5 bg-black/50 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">1. Scope do Aplicativo (PWA / Manifest):</span>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-sky-400 font-bold truncate">/</span>
              <button
                onClick={() => {
                  playSuccessChime();
                  onCopyCode('/', 'Scope PWA copiado: /');
                }}
                className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 cursor-pointer shrink-0"
                title="Copiar Scope PWA"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400">Garante que todas as abas abram dentro do app.</p>
          </div>

          {/* Scope Completo URL */}
          <div className="p-3.5 bg-black/50 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">2. Scope URL Completo:</span>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-emerald-400 font-bold truncate">https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app/</span>
              <button
                onClick={() => {
                  playSuccessChime();
                  onCopyCode('https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app/', 'URL de Scope completa copiada!');
                }}
                className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 cursor-pointer shrink-0"
                title="Copiar Scope Completo"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400">Host de escopo para Android TWA e PWABuilder.</p>
          </div>

          {/* Scope Google Play API */}
          <div className="p-3.5 bg-black/50 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">3. Scope API Google Play Developer:</span>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-amber-400 font-bold truncate">https://www.googleapis.com/auth/androidpublisher</span>
              <button
                onClick={() => {
                  playSuccessChime();
                  onCopyCode('https://www.googleapis.com/auth/androidpublisher', 'Scope do Google Play Developer API copiado!');
                }}
                className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 cursor-pointer shrink-0"
                title="Copiar Scope API"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400">OAuth Scope para publicar e gerenciar apps via API.</p>
          </div>

        </div>
      </div>

      {/* Main Interactive Scope Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Scope Selector */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-500" />
            <span>Selecione a Mira / Scope</span>
          </div>

          <div className="space-y-2">
            {SCOPES_DATA.map((scope) => {
              const isSelected = selectedScope.id === scope.id;
              return (
                <button
                  key={scope.id}
                  onClick={() => {
                    playTacticalClick();
                    setSelectedScope(scope);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500 shadow-md shadow-emerald-950/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {scope.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono font-bold">
                        {scope.zoom}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 block">{scope.type}</span>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-slate-500 block text-[10px]">Speedyx: <strong className="text-white font-mono">{scope.recommendedSensSpeedyx}%</strong></span>
                    <span className="text-slate-500 block text-[10px]">Itusk: <strong className="text-emerald-400 font-mono">{scope.recommendedSensItusk}%</strong></span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Simulator & Customizer */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Visual Scope Viewport */}
          <div className="relative rounded-2xl bg-black border border-slate-800 h-72 sm:h-80 overflow-hidden flex items-center justify-center shadow-2xl">
            
            {/* Background Grid simulating game aim */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/90 pointer-events-none" />

            {/* Target Silhouette in the distance */}
            <div className="absolute w-24 h-40 border border-red-500/20 rounded-t-full rounded-b-lg flex flex-col items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full border border-red-500/30 mb-2" />
              <div className="w-16 h-20 border border-red-500/20 rounded-md" />
              <span className="text-[9px] font-mono text-red-500/40 mt-1">ALVO 35M</span>
            </div>

            {/* Simulated Crosshair / Reticle */}
            <div 
              className={`relative z-10 transition-transform duration-75 flex items-center justify-center ${
                isFiring ? 'scale-125' : 'scale-100'
              }`}
              style={{ opacity: opacity / 100 }}
            >
              {/* Dot Reticle */}
              {selectedScope.reticleStyle === 'dot' && (
                <div 
                  className="rounded-full shadow-lg"
                  style={{
                    width: `${reticleSize * 1.5}px`,
                    height: `${reticleSize * 1.5}px`,
                    backgroundColor: reticleColor,
                    boxShadow: `0 0 10px ${reticleColor}`
                  }}
                />
              )}

              {/* Circle with Center Dot */}
              {selectedScope.reticleStyle === 'circle_dot' && (
                <div className="relative flex items-center justify-center">
                  <div 
                    className="rounded-full border-2"
                    style={{
                      width: `${reticleSize * 4 + dotGap}px`,
                      height: `${reticleSize * 4 + dotGap}px`,
                      borderColor: reticleColor,
                      boxShadow: `0 0 8px ${reticleColor}`
                    }}
                  />
                  <div 
                    className="absolute rounded-full"
                    style={{
                      width: `${reticleSize}px`,
                      height: `${reticleSize}px`,
                      backgroundColor: reticleColor
                    }}
                  />
                </div>
              )}

              {/* Classic Crosshair with 4 bars & gap */}
              {selectedScope.reticleStyle === 'cross' && (
                <div className="relative flex items-center justify-center">
                  {/* Center Dot */}
                  <div 
                    className="rounded-full"
                    style={{
                      width: `${reticleSize * 0.8}px`,
                      height: `${reticleSize * 0.8}px`,
                      backgroundColor: reticleColor
                    }}
                  />
                  {/* Top Bar */}
                  <div 
                    className="absolute"
                    style={{
                      top: `-${dotGap + 10}px`,
                      width: `${reticleSize * 0.5}px`,
                      height: '10px',
                      backgroundColor: reticleColor
                    }}
                  />
                  {/* Bottom Bar */}
                  <div 
                    className="absolute"
                    style={{
                      bottom: `-${dotGap + 10}px`,
                      width: `${reticleSize * 0.5}px`,
                      height: '10px',
                      backgroundColor: reticleColor
                    }}
                  />
                  {/* Left Bar */}
                  <div 
                    className="absolute"
                    style={{
                      left: `-${dotGap + 10}px`,
                      height: `${reticleSize * 0.5}px`,
                      width: '10px',
                      backgroundColor: reticleColor
                    }}
                  />
                  {/* Right Bar */}
                  <div 
                    className="absolute"
                    style={{
                      right: `-${dotGap + 10}px`,
                      height: `${reticleSize * 0.5}px`,
                      width: '10px',
                      backgroundColor: reticleColor
                    }}
                  />
                </div>
              )}

              {/* Sniper Mil-Dot Cross */}
              {selectedScope.reticleStyle === 'sniper' && (
                <div className="relative flex items-center justify-center">
                  {/* Huge Cross Lines */}
                  <div className="absolute w-64 h-[1px]" style={{ backgroundColor: reticleColor, opacity: 0.8 }} />
                  <div className="absolute h-64 w-[1px]" style={{ backgroundColor: reticleColor, opacity: 0.8 }} />
                  {/* Mil Dots */}
                  <div className="absolute -top-6 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reticleColor }} />
                  <div className="absolute -top-12 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reticleColor }} />
                  <div className="absolute top-6 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reticleColor }} />
                  <div className="absolute top-12 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reticleColor }} />
                  <div className="absolute -left-6 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reticleColor }} />
                  <div className="absolute -left-12 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reticleColor }} />
                  <div className="absolute left-6 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reticleColor }} />
                  <div className="absolute left-12 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reticleColor }} />
                  {/* Center Dot */}
                  <div 
                    className="w-2 h-2 rounded-full z-10"
                    style={{ backgroundColor: reticleColor, boxShadow: `0 0 8px ${reticleColor}` }}
                  />
                </div>
              )}
            </div>

            {/* Scope Info Overlay */}
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-300">
              <span>{selectedScope.name}</span> · <span className="text-emerald-400 font-bold">{selectedScope.zoom}</span>
            </div>

            {/* Fire Button Simulation */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                onClick={handleSimulateShot}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-transform active:scale-95 cursor-pointer shadow-lg shadow-red-950/50"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Testar Tiro / Recoil</span>
              </button>
            </div>

          </div>

          {/* Reticle Controls */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
            
            {/* Color Palette */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Cor do Retículo no Blood Strike:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => {
                      playTacticalClick();
                      setReticleColor(c.hex);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      reticleColor === c.hex 
                        ? 'border-white bg-slate-800 text-white shadow-md'
                        : 'border-slate-800 bg-black/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: c.hex, boxShadow: `0 0 6px ${c.hex}` }} 
                    />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Tamanho do Retículo:</span>
                  <span className="font-mono text-emerald-400 font-bold">{reticleSize}px</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="14"
                  value={reticleSize}
                  onChange={(e) => setReticleSize(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Abertura / Espaçamento (Gap):</span>
                  <span className="font-mono text-emerald-400 font-bold">{dotGap}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16"
                  value={dotGap}
                  onChange={(e) => setDotGap(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Copy Config Code for Blood Strike */}
            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400 truncate w-full sm:w-auto">
                <span className="text-slate-500 block text-[10px] font-mono">CÓDIGO DE RETÍCULO GERADO:</span>
                <span className="font-mono text-emerald-400 text-xs font-bold">{currentScopeCode}</span>
              </div>
              <button
                onClick={() => {
                  playSuccessChime();
                  onCopyCode(currentScopeCode, `Código do Scope ${selectedScope.name} copiado!`);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Config</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
