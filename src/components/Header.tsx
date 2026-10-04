import React from 'react';
import { NavTab } from '../types';
import { LayoutGrid, Target, Maximize2, Crosshair, HelpCircle, Download, Share2, Layers } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

interface HeaderProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenGuide: () => void;
  onOpenInstall: () => void;
  onShareApp: () => void;
  onOpenFloatingModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenGuide,
  onOpenInstall,
  onShareApp,
  onOpenFloatingModal
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#080a0f]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('hud');
            }}
            className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-wider uppercase text-white font-display"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
            <span className="text-white">Strike</span>
            <span className="text-red-500 font-extrabold">Config</span>
            <span className="text-[11px] font-mono font-normal normal-case text-slate-400 border border-slate-700/60 rounded px-1.5 py-0.5 ml-1 hidden md:inline">
              Blood Strike Hub
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation controls (4 core options) */}
        <nav className="flex items-center gap-1 sm:gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-[55vw] sm:max-w-none">
          <button
            onClick={() => {
              playTacticalClick();
              onTabChange('hud');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
              currentTab === 'hud'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>HUD</span>
          </button>

          <button
            onClick={() => {
              playTacticalClick();
              onTabChange('sense');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
              currentTab === 'sense'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Sense</span>
          </button>

          <button
            onClick={() => {
              playTacticalClick();
              onTabChange('scope');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
              currentTab === 'scope'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-emerald-400" />
            <span>Scopes & Miras</span>
          </button>

          <button
            onClick={() => {
              playTacticalClick();
              onTabChange('stretched');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
              currentTab === 'stretched'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Tela Esticada</span>
          </button>
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onOpenFloatingModal && (
            <button
              onClick={() => {
                playTacticalClick();
                onOpenFloatingModal();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-700/60 rounded-lg transition-all whitespace-nowrap cursor-pointer shadow-sm"
              title="Permissão de Janela Flutuante & Tela Esticada"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Janela Flutuante</span>
            </button>
          )}

          <button
            onClick={() => {
              playTacticalClick();
              onShareApp();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg transition-all whitespace-nowrap cursor-pointer shadow-sm"
            title="Compartilhar aplicativo"
          >
            <Share2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="hidden sm:inline">Compartilhar</span>
          </button>

          <button
            onClick={() => {
              playTacticalClick();
              onOpenInstall();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-md shadow-red-950/40"
            title="Baixar App ou Postar na Play Store"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Baixar App</span>
          </button>

          <button
            onClick={() => {
              playTacticalClick();
              onOpenGuide();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/90 hover:bg-slate-700/90 hover:text-white border border-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            title="Como importar códigos no Blood Strike"
          >
            <HelpCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="hidden md:inline">Ajuda</span>
          </button>
        </div>

      </div>
    </header>
  );
};

