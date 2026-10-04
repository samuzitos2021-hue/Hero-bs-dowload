import React, { useState } from 'react';
import { HUD_PRESETS } from '../data/hudPresets';
import { HUDLayout, HUDButton } from '../types';
import { 
  Crosshair, 
  Copy, 
  Sparkles, 
  Smartphone, 
  Sliders, 
  Layers, 
  RotateCcw, 
  Check, 
  Info,
  Maximize,
  HelpCircle,
  Eye,
  Hand
} from 'lucide-react';
import { playTacticalClick, playSuccessChime } from '../utils/audio';

interface HUDSectionProps {
  onCopyCode: (code: string, message: string) => void;
}

export const HUDSection: React.FC<HUDSectionProps> = ({ onCopyCode }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
  const [activePreset, setActivePreset] = useState<HUDLayout>(HUD_PRESETS[0]);
  const [currentButtons, setCurrentButtons] = useState<HUDButton[]>(HUD_PRESETS[0].buttons);
  const [selectedButtonId, setSelectedButtonId] = useState<string>('fire_left');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [screenOrientation, setScreenOrientation] = useState<'smartphone' | 'tablet'>('smartphone');

  // Filter presets
  const filteredPresets = selectedFilter === 'Todos'
    ? HUD_PRESETS
    : HUD_PRESETS.filter(p => p.fingerCount === selectedFilter);

  const handleSelectPreset = (preset: HUDLayout) => {
    playTacticalClick();
    setActivePreset(preset);
    setCurrentButtons(preset.buttons);
    setSelectedButtonId(preset.buttons[0]?.id || '');
    if (preset.fingerCount === 'Tablet / iPad') {
      setScreenOrientation('tablet');
    } else {
      setScreenOrientation('smartphone');
    }
  };

  const selectedButton = currentButtons.find(b => b.id === selectedButtonId) || currentButtons[0];

  const handleButtonUpdate = (field: keyof HUDButton, val: number | string) => {
    if (!selectedButton) return;
    setCurrentButtons(prev => prev.map(btn => {
      if (btn.id === selectedButton.id) {
        return { ...btn, [field]: val };
      }
      return btn;
    }));
  };

  const handleResetLayout = () => {
    playTacticalClick();
    setCurrentButtons(activePreset.buttons);
  };

  const filterOptions = ['Todos', '2 Dedos', '3 Dedos', '4 Dedos', '5 Dedos', 'Tablet / iPad'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner / Description */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#121722] via-[#10141e] to-[#181116] border border-slate-800 p-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>LAYOUTS DE CONTROLE & BOTÕES</span>
              <span className="text-slate-600">/</span>
              <span>BLOOD STRIKE MOBILE & IPAD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display uppercase">
              HUDs Competitivos & Otimizados
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Elimine o delay de movimentação e acerte mais tiros de capa. Escolha o layout de acordo com a quantidade de dedos que você usa, visualize cada botão no simulador de tela interativo e copie o código para colar diretamente no jogo.
            </p>
          </div>

          {/* Quick Share Code Action */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <span className="text-xs font-mono text-slate-400">CÓDIGO DO LAYOUT ATUAL:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm bg-slate-900/90 text-red-400 px-3 py-2 rounded-lg border border-red-950 font-bold tracking-wider">
                {activePreset.shareCode}
              </span>
              <button
                onClick={() => {
                  playSuccessChime();
                  onCopyCode(activePreset.shareCode, `Código do HUD "${activePreset.title}" copiado com sucesso!`);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium text-xs rounded-lg transition-colors shadow-md shadow-red-950/40 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 max-w-full">
          {filterOptions.map(filter => (
            <button
              key={filter}
              onClick={() => {
                playTacticalClick();
                setSelectedFilter(filter);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-red-600/20 text-red-400 border border-red-500/50'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>Preset ativo: <strong className="text-slate-200">{activePreset.title}</strong></span>
        </div>
      </div>

      {/* Preset Cards Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {filteredPresets.map(preset => {
          const isSelected = preset.id === activePreset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#151a24] border-red-500/80 shadow-lg shadow-red-950/30 ring-1 ring-red-500/40'
                  : 'bg-[#0f131c] border-slate-800/80 hover:border-slate-700 hover:bg-[#121620]'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isSelected ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {preset.fingerCount}
                  </span>
                  <span className="text-[10px] text-slate-500 border border-slate-800 rounded px-1.5 py-0.5">
                    {preset.difficulty}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white leading-snug">
                  {preset.title}
                </h3>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Botões: {preset.buttons.length}</span>
                {isSelected ? (
                  <span className="flex items-center gap-1 text-red-400 font-semibold text-[10px]">
                    <Check className="w-3 h-3" /> Selecionado
                  </span>
                ) : (
                  <span className="text-slate-500 text-[10px]">Ver layout</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive HUD Simulator Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Screen Bezel & Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Smartphone className="w-4 h-4 text-red-400" />
                Simulador de Tela Interativo (Landscape)
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 hidden sm:inline">Toque em qualquer botão na tela para inspecionar</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                  showGrid
                    ? 'bg-slate-800 text-slate-200 border-slate-700'
                    : 'bg-slate-900/60 text-slate-500 border-slate-800'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Grade de Apoio</span>
              </button>
              <button
                onClick={handleResetLayout}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title="Restaurar posições originais do preset"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Resetar</span>
              </button>
            </div>
          </div>

          {/* Smartphone / Tablet Frame */}
          <div className={`relative w-full mx-auto bg-[#0a0d14] rounded-2xl p-2 sm:p-3 border-2 border-slate-800 shadow-2xl shadow-black/80 transition-all ${
            screenOrientation === 'tablet' ? 'aspect-[4/3] max-w-4xl' : 'aspect-[19.5/9] max-w-full'
          }`}>
            
            {/* Screen Inner Viewport */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#07090f] border border-slate-900 select-none">
              
              {/* Subtle background game canvas with grid lines */}
              <div 
                className={`absolute inset-0 transition-opacity ${showGrid ? 'opacity-25' : 'opacity-5'} pointer-events-none`}
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '10% 10%'
                }}
              />

              {/* Center Screen Crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center opacity-60">
                <div className="w-6 h-6 border border-red-500/80 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1 uppercase tracking-widest">
                  Centro de Mira
                </span>
              </div>

              {/* Notches / Screen Cutouts decoration for realism */}
              <div className="absolute top-1/2 left-1 -translate-y-1/2 w-1 h-12 bg-slate-800/80 rounded-r-md pointer-events-none" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-slate-800/80 rounded-full pointer-events-none" />

              {/* Interactive Buttons */}
              {currentButtons.map(button => {
                const isSelected = button.id === selectedButtonId;
                const sizePx = Math.max(34, (button.size / 100) * 48);

                return (
                  <div
                    key={button.id}
                    onClick={() => {
                      playTacticalClick(750, 0.03);
                      setSelectedButtonId(button.id);
                    }}
                    style={{
                      left: `${button.x}%`,
                      top: `${button.y}%`,
                      width: `${sizePx}px`,
                      height: `${sizePx}px`,
                      opacity: button.opacity / 100,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute flex flex-col items-center justify-center rounded-xl p-1 text-center transition-transform hover:scale-105 cursor-pointer border select-none group shadow-md ${
                      button.color || 'bg-slate-800/80 text-white border-slate-600'
                    } ${
                      isSelected
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110 z-30 shadow-red-500/50'
                        : 'z-20 hover:border-slate-300'
                    }`}
                    title={`${button.label} (${button.action}) - ${button.fingerTag || ''}`}
                  >
                    <span className="text-[10px] sm:text-[11px] font-bold leading-tight truncate px-1">
                      {button.label}
                    </span>
                    {button.fingerTag && (
                      <span className="text-[8px] font-mono opacity-80 leading-none truncate mt-0.5">
                        {button.fingerTag.split(' ')[0]}
                      </span>
                    )}

                    {/* Quick indicator badge */}
                    {button.isPrimaryFire && (
                      <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 border border-white rounded-full flex items-center justify-center text-[8px] font-bold text-white">
                        !
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Touch Zone Guide Overlay Labels */}
              <div className="absolute bottom-2 left-3 text-[9px] font-mono text-slate-500 pointer-events-none">
                ZONA ESQUERDA (MOVIMENTO / TIRO)
              </div>
              <div className="absolute bottom-2 right-3 text-[9px] font-mono text-slate-500 pointer-events-none">
                ZONA DIREITA (MIRA / SALTO / SLIDE)
              </div>
            </div>
          </div>

          {/* Quick HUD Advantage note */}
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-300">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="flex-1">
              <span className="text-slate-400">Vantagem Tática deste HUD: </span>
              <strong className="text-white">{activePreset.tacticalAdvantage}</strong>
            </div>
          </div>
        </div>

        {/* Button Inspector & Details Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Selected Button Customizer */}
          <div className="p-5 bg-[#0f141e] border border-slate-800 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Inspetor de Botão
                </h3>
              </div>
              {selectedButton?.fingerTag && (
                <span className="text-[11px] font-mono text-red-400 bg-red-950/40 border border-red-900/60 px-2 py-0.5 rounded">
                  {selectedButton.fingerTag}
                </span>
              )}
            </div>

            {selectedButton ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 text-[11px]">Botão Selecionado</label>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {selectedButton.label}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Função: <span className="text-slate-200">{selectedButton.action}</span>
                  </div>
                </div>

                {/* Size slider */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between text-slate-300">
                    <span>Tamanho do Botão:</span>
                    <span className="font-mono text-red-400 font-bold">{selectedButton.size}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="160"
                    value={selectedButton.size}
                    onChange={(e) => handleButtonUpdate('size', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>60% (Compacto)</span>
                    <span>160% (Gigante)</span>
                  </div>
                </div>

                {/* Opacity slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Opacidade / Transparência:</span>
                    <span className="font-mono text-red-400 font-bold">{selectedButton.opacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={selectedButton.opacity}
                    onChange={(e) => handleButtonUpdate('opacity', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                {/* Position X / Y sliders */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-300 text-[11px]">
                      <span>Posição X:</span>
                      <span className="font-mono text-slate-200">{selectedButton.x}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="95"
                      value={selectedButton.x}
                      onChange={(e) => handleButtonUpdate('x', Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-300 text-[11px]">
                      <span>Posição Y:</span>
                      <span className="font-mono text-slate-200">{selectedButton.y}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="95"
                      value={selectedButton.y}
                      onChange={(e) => handleButtonUpdate('y', Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                  </div>
                </div>

                {/* Fast select other buttons */}
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-2">Alternar Botão:</span>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                    {currentButtons.map(btn => (
                      <button
                        key={btn.id}
                        onClick={() => setSelectedButtonId(btn.id)}
                        className={`px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                          btn.id === selectedButtonId
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-800/80 text-slate-300 hover:text-white'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Tips Box */}
          <div className="p-4 bg-[#0d1118] border border-slate-800/80 rounded-2xl space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Hand className="w-4 h-4 text-red-500" />
              <span>Dicas de Execução & Pegada</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activePreset.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-red-500 font-bold shrink-0">›</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
