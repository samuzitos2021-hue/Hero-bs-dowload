import React, { useState } from 'react';
import { NavTab } from './types';
import { Header } from './components/Header';
import { HUDSection } from './components/HUDSection';
import { SenseSection } from './components/SenseSection';
import { ScopeSection } from './components/ScopeSection';
import { StretchedSection } from './components/StretchedSection';
import { Toast } from './components/Toast';
import { GuideModal } from './components/GuideModal';
import { InstallModal } from './components/InstallModal';
import { TacticalNotesModal } from './components/TacticalNotesModal';
import { FloatingPermissionModal } from './components/FloatingPermissionModal';
import { 
  LayoutGrid, 
  Target, 
  Maximize2, 
  Crosshair, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  Smartphone,
  Sliders,
  ChevronRight,
  Download,
  PackageCheck,
  Copy,
  FileText,
  Layers
} from 'lucide-react';
import { playTacticalClick, playSuccessChime } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('hud');
  const [toastData, setToastData] = useState<{ message: string; code?: string } | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isInstallOpen, setIsInstallOpen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isFloatingModalOpen, setIsFloatingModalOpen] = useState<boolean>(false);

  const sharedUrl = 'https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app';

  const handleCopyCode = (code: string, message: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setToastData({ message, code });
  };

  const handleShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Blood Strike Configs Pro',
          text: 'Confira os melhores HUDs, Sensibilidades (Speedyx e Itusk) e Scopes do Blood Strike! Acesse:',
          url: sharedUrl
        });
        setToastData({ message: 'Compartilhado com sucesso!' });
      } catch {
        // User dismissed share window
      }
    } else {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(sharedUrl).catch(() => {});
      }
      setToastData({
        message: 'URL Web Shared copiada com sucesso!',
        code: sharedUrl
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-red-200">
      
      {/* Top Bar (adheres to Top Bar Contract) */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenInstall={() => setIsInstallOpen(true)}
        onShareApp={handleShareApp}
        onOpenFloatingModal={() => setIsFloatingModalOpen(true)}
      />

      {/* Hero Header Area */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-[#0a0d14]">
        {/* Cinematic Tactical Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/src/assets/images/bloodstrike_hero_banner_1791126429237.jpg"
            alt="Blood Strike Tactical Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-transparent to-[#07090e]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-3xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>BLOOD STRIKE CONFIGURATOR v2.4</span>
              <span className="text-slate-600">·</span>
              <span>SEASON COMPETITIVA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-display leading-tight">
              Configurações <span className="text-red-500">Pro</span> Para Blood Strike
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Domine as partidas ranqueadas. Selecione entre os melhores layouts de HUD customizáveis, copie a sensibilidade dos maiores TikTokers e ative a resolução esticada para acertar capas sem esforço.
            </p>

            {/* Quick Install / Play Store Banner */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  playTacticalClick();
                  setIsInstallOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/50 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Baixar App no Celular / PC</span>
              </button>

              <button
                onClick={() => {
                  playTacticalClick();
                  setIsInstallOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                <PackageCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Como Postar na Play Store</span>
              </button>

              <button
                onClick={() => {
                  playTacticalClick();
                  setIsNotesOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+ Adicionar Texto / Notas</span>
              </button>
            </div>

            {/* Quick 3 Feature Selector Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              
              <button
                onClick={() => {
                  playTacticalClick();
                  setCurrentTab('hud');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  currentTab === 'hud'
                    ? 'bg-red-600/20 border-red-500/80 shadow-lg shadow-red-950/40 text-white'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">1. HUD Layouts</div>
                    <div className="text-[11px] text-slate-400">2, 3, 4 e 5 Dedos</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${currentTab === 'hud' ? 'text-red-400 translate-x-0.5' : 'text-slate-600'}`} />
              </button>

              <button
                onClick={() => {
                  playTacticalClick();
                  setCurrentTab('sense');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  currentTab === 'sense'
                    ? 'bg-red-600/20 border-red-500/80 shadow-lg shadow-red-950/40 text-white'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">2. Sense TikTokers</div>
                    <div className="text-[11px] text-slate-400">Diguinho, GodPai, etc.</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${currentTab === 'sense' ? 'text-amber-400 translate-x-0.5' : 'text-slate-600'}`} />
              </button>

              <button
                onClick={() => {
                  playTacticalClick();
                  setCurrentTab('stretched');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  currentTab === 'stretched'
                    ? 'bg-red-600/20 border-red-500/80 shadow-lg shadow-red-950/40 text-white'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">3. Tela Esticada</div>
                    <div className="text-[11px] text-slate-400">4:3, 5:4, PC & Mobile</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${currentTab === 'stretched' ? 'text-emerald-400 translate-x-0.5' : 'text-slate-600'}`} />
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {currentTab === 'hud' && (
          <HUDSection onCopyCode={handleCopyCode} />
        )}
        
        {currentTab === 'sense' && (
          <SenseSection onCopyCode={handleCopyCode} />
        )}

        {currentTab === 'scope' && (
          <ScopeSection onCopyCode={handleCopyCode} />
        )}

        {currentTab === 'stretched' && (
          <StretchedSection 
            onCopyCode={handleCopyCode} 
            onOpenFloatingModal={() => setIsFloatingModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080a0f] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="font-bold text-slate-300 uppercase font-display tracking-wider">
                Blood Strike Configs Pro
              </span>
              <span>·</span>
              <span>Comunidade Brasileira & Global</span>
            </div>

            <p className="text-center sm:text-right text-[11px] text-slate-500">
              Aplicativo independente para otimização de sensibilidade e controle. Blood Strike é marca registrada da NetEase Games.
            </p>
          </div>

          {/* Quick ID & URL Bar */}
          <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                <span className="text-slate-500">App ID:</span>
                <span className="font-mono text-emerald-400 font-semibold">com.strikeconfig.bloodstrike</span>
                <button
                  onClick={() => handleCopyCode('com.strikeconfig.bloodstrike', 'ID do App copiado: com.strikeconfig.bloodstrike')}
                  className="ml-1 text-slate-400 hover:text-white cursor-pointer"
                  title="Copiar ID"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                <span className="text-slate-500">URL:</span>
                <span className="font-mono text-red-400 font-semibold truncate max-w-[220px] sm:max-w-none">
                  https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app
                </span>
                <button
                  onClick={() => handleCopyCode('https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app', 'URL do aplicativo copiada!')}
                  className="ml-1 text-slate-400 hover:text-white cursor-pointer"
                  title="Copiar URL"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                <span className="text-slate-500">IARC ID:</span>
                <span className="font-mono text-amber-400 font-semibold">IARC-BR-2024-8EF07428</span>
                <button
                  onClick={() => handleCopyCode('IARC-BR-2024-8EF07428', 'IARC Rating ID copiado: IARC-BR-2024-8EF07428')}
                  className="ml-1 text-slate-400 hover:text-white cursor-pointer"
                  title="Copiar IARC ID"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                <span className="text-slate-500">Scope:</span>
                <span className="font-mono text-sky-400 font-semibold">/</span>
                <button
                  onClick={() => handleCopyCode('/', 'Scope copiado: /')}
                  className="ml-1 text-slate-400 hover:text-white cursor-pointer"
                  title="Copiar Scope"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsNotesOpen(true)}
                className="text-amber-400 hover:text-amber-300 hover:underline cursor-pointer flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                <span>Minhas Anotações / Textos</span>
              </button>

              <button
                onClick={() => setIsInstallOpen(true)}
                className="text-red-400 hover:text-red-300 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Ver Guia Play Store & IARC</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Toast Feedback */}
      {toastData && (
        <Toast
          message={toastData.message}
          code={toastData.code}
          onClose={() => setToastData(null)}
        />
      )}

      {/* How to import guide modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Download / Play Store modal */}
      <InstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        onCopyLink={handleCopyCode}
      />

      {/* Tactical Notes / Add Text modal */}
      <TacticalNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        onCopyText={handleCopyCode}
      />

      {/* Floating Window & Stretched Res Android Overlay Permission modal */}
      <FloatingPermissionModal
        isOpen={isFloatingModalOpen}
        onClose={() => setIsFloatingModalOpen(false)}
        onShowToast={(msg) => handleCopyCode('', msg)}
      />

    </div>
  );
}
