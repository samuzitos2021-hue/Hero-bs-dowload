import React, { useState } from 'react';
import { STRETCHED_PRESETS, STRETCHED_GUIDES } from '../data/stretchedPresets';
import { StretchedPreset, StretchedGuide } from '../types';
import { 
  Maximize2, 
  Copy, 
  Sliders, 
  Monitor, 
  Smartphone, 
  Gauge, 
  HelpCircle, 
  Check, 
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Tv
} from 'lucide-react';
import { playTacticalClick, playSuccessChime } from '../utils/audio';

interface StretchedSectionProps {
  onCopyCode: (code: string, message: string) => void;
  onOpenFloatingModal?: () => void;
}

export const StretchedSection: React.FC<StretchedSectionProps> = ({ onCopyCode, onOpenFloatingModal }) => {
  const [selectedPreset, setSelectedPreset] = useState<StretchedPreset>(STRETCHED_PRESETS[0]);
  const [activeGuideTab, setActiveGuideTab] = useState<'PC' | 'Mobile'>('PC');
  const [selectedGuideId, setSelectedGuideId] = useState<string>('guide-pc-nvidia');
  
  // Custom calculator state
  const [nativeWidth, setNativeWidth] = useState<number>(1920);
  const [nativeHeight, setNativeHeight] = useState<number>(1080);
  const [customAspect, setCustomAspect] = useState<string>('4:3');

  // Interactive slider for real-time visual simulation (0 = 16:9 Nativo, 100 = 1:1 Super Esticada)
  const [stretchSimulationLevel, setStretchSimulationLevel] = useState<number>(33);

  // Calculate custom resolution
  let calculatedWidth = nativeWidth;
  let horizSensMultiplier = 1.0;
  if (customAspect === '4:3') {
    calculatedWidth = Math.round(nativeHeight * (4 / 3));
    horizSensMultiplier = 0.75;
  } else if (customAspect === '5:4') {
    calculatedWidth = Math.round(nativeHeight * (5 / 4));
    horizSensMultiplier = 0.70;
  } else if (customAspect === '16:10') {
    calculatedWidth = Math.round(nativeHeight * (16 / 10));
    horizSensMultiplier = 0.89;
  } else if (customAspect === '1:1') {
    calculatedWidth = nativeHeight;
    horizSensMultiplier = 0.56;
  }

  const activeGuides = STRETCHED_GUIDES.filter(g => g.category === activeGuideTab);
  const currentGuide = STRETCHED_GUIDES.find(g => g.id === selectedGuideId) || activeGuides[0];

  // Dynamic model stretch transform for the visual simulator
  // 16:9 is scaleX(1), 33% is scaleX(1.33), up to scaleX(1.77)
  const visualScaleX = 1 + (stretchSimulationLevel / 100) * 0.75;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Mobile Floating Window & Overlay Permission Quick Action */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/60 via-[#131722] to-slate-900 border border-red-500/50 p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-red-600/25 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <Layers className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-red-600 text-white font-bold px-2 py-0.5 rounded">
                  MOBILE EXCLUSIVO
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  TELA ESTICADA 4:3
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Ativação de Janela Flutuante & Sobreposição (Android)
              </h3>
              <p className="text-xs text-slate-300">
                Conceda a permissão de sobreposição para abrir o Blood Strike em janela suspensa e esticar a tela em segundos.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playTacticalClick();
              if (onOpenFloatingModal) {
                onOpenFloatingModal();
              }
            }}
            className="py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/40 transition-all shrink-0 active:scale-95"
          >
            <Tv className="w-4 h-4" />
            <span>Pedir Permissão de Janela</span>
          </button>
        </div>
      </div>

      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#17141f] via-[#10141e] to-[#121c1f] border border-slate-800 p-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>RESOLUÇÃO ESTICADA (STRETCHED RES)</span>
              <span className="text-slate-600">/</span>
              <span>PC, STEAM & MOBILE ANDROID</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display uppercase">
              Stretched Resolution Hub
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jogue como os profissionais de esports: a tela esticada alarga os modelos dos inimigos (+33% a +77%), facilitando o acerto de tiros na cabeça e aumentando drasticamente a taxa de quadros (FPS) em computadores e celulares.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800 shrink-0">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-400">GANHO DE FPS MÉDIO:</span>
              <span className="text-sm font-extrabold font-mono text-emerald-400 flex items-center gap-1">
                <Zap className="w-4 h-4" /> +25% A +40% FPS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visual Comparison Simulator */}
      <div className="bg-[#0e121a] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider">
              <Maximize2 className="w-4 h-4" />
              <span>Simulador Visual Interativo</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Comparação de Alargamento de Inimigos (16:9 Nativo vs Esticado)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {[
              { label: '16:9 Nativo', val: 0 },
              { label: '16:10 (+12%)', val: 15 },
              { label: '4:3 Meta (+33%)', val: 45 },
              { label: '5:4 (+41%)', val: 65 },
              { label: '1:1 Extremo (+77%)', val: 100 }
            ].map(preset => (
              <button
                key={preset.label}
                onClick={() => {
                  playTacticalClick();
                  setStretchSimulationLevel(preset.val);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  Math.abs(stretchSimulationLevel - preset.val) <= 10
                    ? 'bg-red-600 text-white font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Arena Frame */}
        <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-[#07090e] border border-slate-800 flex items-center justify-center select-none">
          
          {/* Tactical Target Range Backdrop */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at center, rgba(220,38,38,0.3) 0%, transparent 70%),
                linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '100% 100%, 40px 40px, 40px 40px'
            }}
          />

          {/* Perspective grid floor */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-950 to-transparent border-t border-slate-800/40" />

          {/* Center Target Operator Model being visually stretched */}
          <div 
            className="relative z-10 flex flex-col items-center justify-center transition-transform duration-150 ease-out origin-center"
            style={{
              transform: `scaleX(${visualScaleX})`
            }}
          >
            {/* Operator Head */}
            <div className="relative w-16 h-18 bg-gradient-to-b from-slate-700 to-slate-900 rounded-t-2xl border-2 border-red-500/80 shadow-[0_0_15px_rgba(220,38,38,0.4)] flex flex-col items-center justify-center">
              {/* Visor glowing */}
              <div className="w-10 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.9)] animate-pulse" />
              <div className="text-[8px] font-mono text-red-200 mt-1 uppercase font-bold">CAPA</div>
            </div>

            {/* Operator Torso */}
            <div className="w-28 h-28 bg-gradient-to-b from-slate-800 to-slate-950 rounded-b-xl border-x-2 border-b-2 border-slate-700 flex flex-col items-center justify-center shadow-2xl relative">
              <div className="w-16 h-14 border border-red-500/40 rounded-lg flex items-center justify-center bg-black/40">
                <span className="text-[9px] font-mono text-slate-300 font-bold">HITBOX</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-2">STRIKER</span>
            </div>
          </div>

          {/* Holographic Crosshair Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute w-full h-[1px] bg-red-500/80" />
              <div className="absolute h-full w-[1px] bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full border border-red-400" />
            </div>
          </div>

          {/* Real-time stats HUD on canvas */}
          <div className="absolute top-4 left-4 p-2.5 bg-black/70 backdrop-blur-md border border-slate-800 rounded-lg text-xs space-y-1">
            <div className="text-slate-400 text-[10px] font-mono">LARGURA DO MODELO:</div>
            <div className="font-mono text-sm font-extrabold text-red-400">
              +{Math.round((visualScaleX - 1) * 100)}% Mais Largo
            </div>
          </div>

          <div className="absolute top-4 right-4 p-2.5 bg-black/70 backdrop-blur-md border border-slate-800 rounded-lg text-xs text-right space-y-1">
            <div className="text-slate-400 text-[10px] font-mono">ESTIMATIVA DE FPS:</div>
            <div className="font-mono text-sm font-extrabold text-emerald-400">
              +{Math.round((stretchSimulationLevel / 100) * 35)}% Frames
            </div>
          </div>

          <div className="absolute bottom-4 inset-x-4 flex justify-between text-[11px] text-slate-400 font-mono">
            <span>Nativo 16:9 (Modelos estreitos)</span>
            <span>Esticado 4:3 / 5:4 (Cabeça e corpo maiores)</span>
          </div>
        </div>

        {/* Dynamic Slider */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs text-slate-300">
            <span className="font-medium">Ajustar Nível de Esticamento Interativo:</span>
            <span className="font-mono text-red-400 font-bold">{stretchSimulationLevel}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={stretchSimulationLevel}
            onChange={(e) => setStretchSimulationLevel(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
        </div>

      </div>

      {/* Preset Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-display uppercase tracking-wide">
            Resoluções Competitivas Populares
          </h2>
          <span className="text-xs text-slate-400">Clique para inspecionar parâmetros de inicialização</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STRETCHED_PRESETS.map(preset => {
            const isSelected = preset.id === selectedPreset.id;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  playTacticalClick();
                  setSelectedPreset(preset);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#151923] border-red-500 shadow-xl ring-1 ring-red-500/40'
                    : 'bg-[#0f131c] border-slate-800 hover:border-slate-700 hover:bg-[#121620]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-red-400 bg-red-950/40 border border-red-900/60 px-2 py-0.5 rounded">
                      PROPORÇÃO {preset.aspectRatio}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {preset.fpsGain}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">{preset.name}</h3>
                    <div className="font-mono text-xs text-slate-400 mt-0.5">
                      Resolução: <strong className="text-slate-200">{preset.resolution}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {preset.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                    <div className="text-[11px] font-mono text-slate-500 uppercase">VANTAGENS:</div>
                    {preset.pros.map((pro, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[130px]">
                    {preset.launchParameter}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSuccessChime();
                      onCopyCode(preset.launchParameter, `Parâmetro de inicialização ${preset.resolution} copiado!`);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg transition-colors shadow-md cursor-pointer shrink-0"
                    title="Copiar comando de inicialização da Steam"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Comando</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Stretched Resolution & Sensitivity Compensation Calculator */}
      <div className="p-6 bg-[#0e121a] border border-slate-800 rounded-2xl space-y-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Calculadora Personalizada</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Calculadora de Resolução Esticada & Compensação de Sensibilidade Horizontal
          </h2>
          <p className="text-xs text-slate-400">
            Ao esticar a tela, os pixels horizontais são redistribuídos. Para sua mira manter exatamente a mesma velocidade muscular nos eixos X e Y, aplique o multiplicador sugerido abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Largura Nativa da sua Tela (Pixels):</label>
            <input
              type="number"
              value={nativeWidth}
              onChange={(e) => setNativeWidth(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
            />
            <span className="text-[10px] text-slate-500">Ex: 1920 (Full HD) ou 2400 (celulares)</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Altura Nativa da sua Tela (Pixels):</label>
            <input
              type="number"
              value={nativeHeight}
              onChange={(e) => setNativeHeight(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
            />
            <span className="text-[10px] text-slate-500">Ex: 1080 (Full HD)</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Proporção Desejada (Aspect Ratio):</label>
            <select
              value={customAspect}
              onChange={(e) => setCustomAspect(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
            >
              <option value="4:3">4:3 (Meta Competitivo - 33% mais largo)</option>
              <option value="5:4">5:4 (Ultra Esticado - 41% mais largo)</option>
              <option value="16:10">16:10 (Equilibrado - 12% mais largo)</option>
              <option value="1:1">1:1 (Extremo TikTok - 77% mais largo)</option>
            </select>
          </div>
        </div>

        {/* Results Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-950/70 border border-red-500/20 rounded-xl">
          <div>
            <span className="text-[11px] font-mono text-slate-400 block">RESOLUÇÃO CALCULADA:</span>
            <span className="text-base font-bold font-mono text-white">
              {calculatedWidth} x {nativeHeight}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono text-slate-400 block">MULTIPLICADOR DE SENSIBILIDADE X:</span>
            <span className="text-base font-bold font-mono text-red-400">
              x{horizSensMultiplier.toFixed(2)} (Reduzir ~{Math.round((1 - horizSensMultiplier) * 100)}%)
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono text-slate-400 block">PARÂMETRO STEAM:</span>
            <span className="text-xs font-mono text-slate-300 truncate block">
              -w {calculatedWidth} -h {nativeHeight} -screen-fullscreen 1
            </span>
          </div>
        </div>
      </div>

      {/* Step by Step Guides (PC & Mobile) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white font-display uppercase tracking-wide">
              Guias Passo a Passo de Ativação
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playTacticalClick();
                setActiveGuideTab('PC');
                setSelectedGuideId('guide-pc-nvidia');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeGuideTab === 'PC'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>PC (Nvidia / AMD)</span>
            </button>

            <button
              onClick={() => {
                playTacticalClick();
                setActiveGuideTab('Mobile');
                setSelectedGuideId('guide-mobile-split-screen');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeGuideTab === 'Mobile'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Android</span>
            </button>
          </div>
        </div>

        {/* Selected Guide Details */}
        <div className="bg-[#0f131c] border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-red-400 uppercase">
                {currentGuide.category} / {currentGuide.method}
              </span>
              <h3 className="text-base font-bold text-white">
                {currentGuide.title}
              </h3>
            </div>

            {/* Quick tabs among guides of category */}
            <div className="flex items-center gap-1.5">
              {activeGuides.map(g => (
                <button
                  key={g.id}
                  onClick={() => {
                    playTacticalClick();
                    setSelectedGuideId(g.id);
                  }}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                    currentGuide.id === g.id
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {g.title.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-3 pt-2">
            {currentGuide.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <span className="w-6 h-6 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* Tips for current guide */}
          {currentGuide.tips.length > 0 && (
            <div className="p-3.5 bg-red-950/20 border border-red-900/40 rounded-xl space-y-1.5 text-xs text-slate-300">
              <div className="font-semibold text-red-400 flex items-center gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5" /> Dicas Importantes:
              </div>
              <ul className="space-y-1 pl-4 list-disc text-slate-300">
                {currentGuide.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
