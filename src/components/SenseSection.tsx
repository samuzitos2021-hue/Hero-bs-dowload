import React, { useState } from 'react';
import { TIKTOKER_SENS_PRESETS } from '../data/tiktokerSensPresets';
import { SensePreset } from '../types';
import { 
  Target, 
  Copy, 
  Smartphone, 
  Search, 
  Sliders, 
  Check, 
  Flame, 
  Compass, 
  Calculator,
  ExternalLink,
  ShieldCheck,
  Video,
  Sparkles
} from 'lucide-react';
import { playTacticalClick, playSuccessChime } from '../utils/audio';

interface SenseSectionProps {
  onCopyCode: (code: string, message: string) => void;
}

export const SenseSection: React.FC<SenseSectionProps> = ({ onCopyCode }) => {
  const [deviceFilter, setDeviceFilter] = useState<string>('Todos');
  const [styleFilter, setStyleFilter] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showConverter, setShowConverter] = useState<boolean>(false);

  // Converter state
  const [currentDpi, setCurrentDpi] = useState<number>(392);
  const [targetDpi, setTargetDpi] = useState<number>(480);
  const [baseSens, setBaseSens] = useState<number>(120);

  // Calculate converted sens
  // Formula: targetSens = baseSens * (currentDpi / targetDpi)
  const convertedSens = Math.round(baseSens * (currentDpi / targetDpi));

  const deviceFilters = ['Todos', 'Xiaomi / Poco', 'iPhone / iOS', 'Samsung', 'Motorola', 'PC Emulador'];
  const styleFilters = ['Todos', 'Rusher Capa', 'Sniper Pro', 'Movimentação Rápida', 'Equilibrado'];

  const filteredPresets = TIKTOKER_SENS_PRESETS.filter(preset => {
    const matchesDevice = deviceFilter === 'Todos' || preset.deviceCategory === deviceFilter;
    const matchesStyle = styleFilter === 'Todos' || preset.playstyle === styleFilter;
    const matchesSearch = 
      preset.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.deviceModel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDevice && matchesStyle && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#14121a] via-[#10131d] to-[#1a1114] border border-slate-800 p-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>SENSIBILIDADE DE CRIADORES & TIKTOKERS</span>
              <span className="text-slate-600">/</span>
              <span>TESTADAS NO BLOOD STRIKE ATUAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display uppercase">
              Sense de TikTokers & Pro Players
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Encontre a sensibilidade perfeita para o seu celular ou PC. Configurações completas com DPI / Menor Largura, mira geral, red dot, aceleração, tamanho do botão de atirar e código de compartilhamento oficial do Blood Strike.
            </p>
          </div>

          <button
            onClick={() => {
              playTacticalClick();
              setShowConverter(!showConverter);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-xs rounded-xl border border-slate-700 shadow-lg transition-colors shrink-0 cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-red-400" />
            <span>{showConverter ? 'Ocultar Calculadora' : 'Calculadora de DPI / Sense'}</span>
          </button>
        </div>
      </div>

      {/* Optional DPI Converter Drawer */}
      {showConverter && (
        <div className="p-5 bg-[#0e121b] border border-red-500/30 rounded-2xl space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-red-500" />
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">
                Calculadora de Adaptação de Sensibilidade e DPI
              </h3>
            </div>
            <span className="text-xs text-slate-400">Mantém a memória muscular exata</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Sua DPI / Menor Largura Atual:</label>
              <input
                type="number"
                value={currentDpi}
                onChange={(e) => setCurrentDpi(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
              />
              <span className="text-[10px] text-slate-500">Ex: 392 (padrão Android) ou 400 (mouse PC)</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Sua Sensibilidade Atual no Jogo:</label>
              <input
                type="number"
                value={baseSens}
                onChange={(e) => setBaseSens(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
              />
              <span className="text-[10px] text-slate-500">Valor da sensibilidade de câmera (0 - 300)</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Nova DPI / Menor Largura Alvo:</label>
              <input
                type="number"
                value={targetDpi}
                onChange={(e) => setTargetDpi(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
              />
              <span className="text-[10px] text-slate-500">Ex: 480 ou 540 no celular / 800 no PC</span>
            </div>
          </div>

          <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-xl flex items-center justify-between">
            <div className="text-xs text-slate-300">
              Sensibilidade calculada recomendada para manter a mesma puxada de capa:
            </div>
            <div className="font-mono text-lg font-extrabold text-red-400">
              {convertedSens}
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="space-y-4">
        
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por TikToker (ex: Diguinho, GodPai, Shido), aparelho (Poco, iPhone, S23) ou estilo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-slate-800 pb-3">
          
          {/* Device filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-slate-500 shrink-0 font-medium">Dispositivo:</span>
            {deviceFilters.map(dev => (
              <button
                key={dev}
                onClick={() => {
                  playTacticalClick();
                  setDeviceFilter(dev);
                }}
                className={`px-3 py-1 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  deviceFilter === dev
                    ? 'bg-red-600 text-white font-semibold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {dev}
              </button>
            ))}
          </div>

          {/* Style filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-slate-500 shrink-0 font-medium">Estilo:</span>
            {styleFilters.map(style => (
              <button
                key={style}
                onClick={() => {
                  playTacticalClick();
                  setStyleFilter(style);
                }}
                className={`px-3 py-1 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  styleFilter === style
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Presets Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPresets.map(preset => {
          return (
            <div
              key={preset.id}
              className="bg-[#0f131c] border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl hover:shadow-2xl group"
            >
              
              <div className="space-y-4">
                
                {/* Creator Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
                      <img
                        src={preset.avatar}
                        alt={preset.creatorName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                          {preset.creatorName}
                        </h3>
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <span>{preset.handle}</span>
                        <span>·</span>
                        <span className="text-red-400 font-medium">{preset.platform}</span>
                        <span>·</span>
                        <span>{preset.followers}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-amber-300 border border-slate-700 whitespace-nowrap">
                    {preset.playstyle}
                  </span>
                </div>

                {/* Device & DPI badge */}
                <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-300 font-medium truncate max-w-[170px]">
                      {preset.deviceModel}
                    </span>
                  </div>
                  <div className="font-mono text-red-400 font-bold bg-red-950/40 px-2 py-0.5 rounded border border-red-900/60">
                    DPI: {preset.dpi}
                  </div>
                </div>

                {/* Sensitivity Table / Meters */}
                <div className="space-y-2 text-xs">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    VALORES DE SENSIBILIDADE
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-slate-900/40 rounded-lg border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Geral (Câmera):</span>
                      <span className="font-mono text-white font-bold">{preset.generalSens}</span>
                    </div>

                    <div className="p-2 bg-slate-900/40 rounded-lg border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Red Dot / Ferro:</span>
                      <span className="font-mono text-red-400 font-bold">{preset.redDotSens}</span>
                    </div>

                    <div className="p-2 bg-slate-900/40 rounded-lg border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Mira 2x:</span>
                      <span className="font-mono text-slate-200 font-bold">{preset.scope2x}</span>
                    </div>

                    <div className="p-2 bg-slate-900/40 rounded-lg border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Mira 4x:</span>
                      <span className="font-mono text-slate-200 font-bold">{preset.scope4x}</span>
                    </div>

                    <div className="p-2 bg-slate-900/40 rounded-lg border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Mira 6x:</span>
                      <span className="font-mono text-slate-200 font-bold">{preset.scope6x}</span>
                    </div>

                    <div className="p-2 bg-slate-900/40 rounded-lg border border-slate-800/80 flex justify-between items-center">
                      <span className="text-slate-400">Mira 8x Sniper:</span>
                      <span className="font-mono text-slate-200 font-bold">{preset.scope8x}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Settings (Acceleration, Fire Button, Gyro) */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
                  <div className="flex justify-between">
                    <span>Aceleração:</span>
                    <span className="text-slate-200 font-medium">
                      {preset.accelMode} {preset.accelValue > 0 ? `(${preset.accelValue})` : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Botão de Disparo:</span>
                    <span className="text-slate-200 font-medium">
                      {preset.fireButtonSize}% ({preset.fireButtonPosition})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giroscópio:</span>
                    <span className={preset.gyroscope.enabled ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                      {preset.gyroscope.enabled ? `Ativado (Geral: ${preset.gyroscope.general})` : 'Desativado'}
                    </span>
                  </div>
                </div>

                {/* Quote / Highlight */}
                <p className="text-[11px] italic text-slate-400 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed">
                  "{preset.highlightQuote}"
                </p>

              </div>

              {/* Bottom Card Action: Copy Share Code */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-500">CÓDIGO BLOOD STRIKE:</span>
                  <span className="text-xs font-mono font-bold text-red-400 truncate max-w-[140px]">
                    {preset.shareCode}
                  </span>
                </div>

                <button
                  onClick={() => {
                    playSuccessChime();
                    onCopyCode(preset.shareCode, `Sensibilidade de ${preset.creatorName} copiada!`);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg transition-colors shadow-md shadow-red-950/30 shrink-0 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Sense</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredPresets.length === 0 && (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-400 space-y-2">
          <p className="text-sm">Nenhum criador encontrado com os filtros selecionados.</p>
          <button
            onClick={() => {
              setDeviceFilter('Todos');
              setStyleFilter('Todos');
              setSearchQuery('');
            }}
            className="text-xs text-red-400 hover:underline cursor-pointer"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}

    </div>
  );
};
