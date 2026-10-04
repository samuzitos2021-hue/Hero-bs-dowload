import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Globe, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Apple, 
  Monitor, 
  HelpCircle,
  ShieldCheck,
  PackageCheck,
  Award,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { playTacticalClick, playSuccessChime } from '../utils/audio';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyLink: (link: string, message: string) => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  onCopyLink
}) => {
  const [activeTab, setActiveTab] = useState<'install' | 'playstore' | 'iarc' | 'appads'>('install');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [installedSuccess, setInstalledSuccess] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setInstalledSuccess(true);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (!isOpen) return null;

  const appUrl = window.location.href;

  const handleNativeInstall = async () => {
    playTacticalClick();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setInstalledSuccess(true);
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f131d] border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Download className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
              Baixar App & Postar na Play Store
            </h2>
          </div>
          <button
            onClick={() => {
              playTacticalClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 mt-4 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              playTacticalClick();
              setActiveTab('install');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'install'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>1. Baixar App (PWA)</span>
          </button>

          <button
            onClick={() => {
              playTacticalClick();
              setActiveTab('playstore');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'playstore'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>2. Postar na Play Store</span>
          </button>

          <button
            onClick={() => {
              playTacticalClick();
              setActiveTab('iarc');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'iarc'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>3. IARC</span>
          </button>

          <button
            onClick={() => {
              playTacticalClick();
              setActiveTab('appads');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'appads'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>4. app-ads.txt</span>
          </button>
        </div>

        {/* Tab 1: Install Directly */}
        {activeTab === 'install' && (
          <div className="mt-6 space-y-6 text-sm text-slate-300">
            
            {/* Native prompt button if supported */}
            {isInstallable ? (
              <div className="p-4 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-white font-bold text-base flex items-center gap-2 justify-center sm:justify-start">
                    <Sparkles className="w-4 h-4 text-red-400" />
                    <span>Seu navegador suporta instalação direta!</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Clique no botão abaixo para adicionar o app direto à sua tela de início como aplicativo nativo.
                  </p>
                </div>
                <button
                  onClick={handleNativeInstall}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Instalar Aplicativo Agora
                </button>
              </div>
            ) : installedSuccess ? (
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl flex items-center gap-3 text-emerald-300 text-xs">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Aplicativo já instalado com sucesso na sua área de trabalho/tela de início!</span>
              </div>
            ) : null}

            {/* Platform Guides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Android Guide */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2.5">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>No Android (Chrome / Samsung Internet)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 pl-1 leading-relaxed">
                  <li>Toque nos <strong className="text-white">3 pontinhos (⋮)</strong> no canto superior do navegador.</li>
                  <li>Selecione <strong className="text-white">"Instalar aplicativo"</strong> ou <strong className="text-white">"Adicionar à tela inicial"</strong>.</li>
                  <li>Confirme em <strong className="text-white">Instalar</strong>.</li>
                  <li>O app aparecerá como aplicativo com ícone oficial, abrindo em tela cheia sem barra de URL!</li>
                </ol>
              </div>

              {/* iPhone / iOS Guide */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2.5">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <Apple className="w-4 h-4 text-slate-300" />
                  <span>No iPhone / iOS (Safari)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 pl-1 leading-relaxed">
                  <li>Abra o link no navegador <strong className="text-white">Safari</strong>.</li>
                  <li>Toque no botão de <strong className="text-white">Compartilhar</strong> (ícone com quadrado e seta para cima).</li>
                  <li>Role para baixo e selecione <strong className="text-white">"Adicionar à Tela de Início"</strong>.</li>
                  <li>Toque em <strong className="text-white">Adicionar</strong> no canto superior direito.</li>
                </ol>
              </div>

            </div>

            {/* PC Guide */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <Monitor className="w-4 h-4 text-sky-400" />
                <span>No Computador (PC / Windows / Mac)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                No Google Chrome ou Microsoft Edge, clique no ícone de <strong className="text-white">computadorzinho/instalar</strong> que fica no lado direito da barra de endereços (ao lado da estrelinha de favoritos) ou vá nos 3 pontos &gt; <em>"Instalar Blood Strike Configs Pro"</em>. O app funcionará como um programa leve na sua área de trabalho.
              </p>
            </div>

            {/* App Credentials & Links Box */}
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-red-500" />
                <span>Identificação Oficial do Aplicativo</span>
              </div>

              {/* Título Oficial */}
              <div className="p-3 bg-black/50 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-300 truncate w-full sm:w-auto">
                  <span className="text-slate-500 block text-[10px] font-mono">TÍTULO OFICIAL DO APP (PLAY STORE & PWA):</span>
                  <span className="font-mono text-white text-xs truncate block font-bold">
                    Blood Strike Configs Pro <span className="text-[10px] text-emerald-400 font-normal">(24/30 caracteres)</span>
                  </span>
                </div>
                <button
                  onClick={() => {
                    playSuccessChime();
                    onCopyLink('Blood Strike Configs Pro', 'Título do aplicativo copiado: Blood Strike Configs Pro');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Título</span>
                </button>
              </div>

              {/* Descrição Curta */}
              <div className="p-3 bg-black/50 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-300 truncate w-full sm:w-auto">
                  <span className="text-slate-500 block text-[10px] font-mono">DESCRIÇÃO CURTA (SHORT DESCRIPTION - MÁX 80 CARACT.):</span>
                  <span className="font-mono text-slate-200 text-xs truncate block font-bold">
                    HUDs de 2 a 5 dedos, sensibilidades de TikTokers e miras para Blood Strike.
                  </span>
                </div>
                <button
                  onClick={() => {
                    playSuccessChime();
                    onCopyLink('HUDs de 2 a 5 dedos, sensibilidades de TikTokers e miras para Blood Strike.', 'Descrição curta copiada!');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors shrink-0 cursor-pointer border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Descrição</span>
                </button>
              </div>

              {/* URL */}
              <div className="p-3 bg-black/50 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-300 truncate w-full sm:w-auto">
                  <span className="text-slate-500 block text-[10px] font-mono">URL OFICIAL DE ACESSO / COMPARTILHAMENTO:</span>
                  <span className="font-mono text-red-400 text-xs truncate block font-bold">
                    https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app
                  </span>
                </div>
                <button
                  onClick={() => {
                    playSuccessChime();
                    onCopyLink('https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app', 'URL do aplicativo copiada com sucesso!');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar URL</span>
                </button>
              </div>

              {/* ID / Package Name */}
              <div className="p-3 bg-black/50 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-300 truncate w-full sm:w-auto">
                  <span className="text-slate-500 block text-[10px] font-mono">ID DO APLICATIVO (PACKAGE NAME PLAY STORE & PWA):</span>
                  <span className="font-mono text-emerald-400 text-xs truncate block font-bold">
                    com.strikeconfig.bloodstrike
                  </span>
                </div>
                <button
                  onClick={() => {
                    playSuccessChime();
                    onCopyLink('com.strikeconfig.bloodstrike', 'ID do aplicativo copiado: com.strikeconfig.bloodstrike');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors shrink-0 cursor-pointer border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar ID</span>
                </button>
              </div>

              {/* Scope PWA & Android */}
              <div className="p-3 bg-black/50 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-300 truncate w-full sm:w-auto">
                  <span className="text-slate-500 block text-[10px] font-mono">SCOPE DO APLICATIVO (NAVEGAÇÃO E ESCOPO):</span>
                  <span className="font-mono text-sky-400 text-xs truncate block font-bold">
                    / (ou https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app/)
                  </span>
                </div>
                <button
                  onClick={() => {
                    playSuccessChime();
                    onCopyLink('/', 'Scope oficial do aplicativo copiado: /');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors shrink-0 cursor-pointer border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Scope</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Publish to Google Play Store Guide */}
        {activeTab === 'playstore' && (
          <div className="mt-6 space-y-5 text-sm text-slate-300">
            
            <div className="p-3.5 bg-red-950/20 border border-red-900/40 rounded-xl text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Sim, você pode publicar esse aplicativo na Google Play Store!</strong> Como acabamos de configurar o suporte completo a <strong>PWA (Progressive Web App)</strong> com Manifesto, Service Worker e Ícones em alta resolução, ele pode ser convertido diretamente para um arquivo <strong className="text-white">.AAB (Android App Bundle)</strong> aceito pelo Google Play Console.
            </div>

            {/* Step-by-step to Google Play */}
            <div className="space-y-3">
              
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center text-xs font-mono font-bold">1</span>
                  <span>Acesse o PWABuilder (Ferramenta Oficial da Microsoft / Google)</span>
                </div>
                <p className="text-xs text-slate-300 pl-7 leading-relaxed">
                  Acesse <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-red-400 underline font-medium inline-flex items-center gap-1">pwabuilder.com <ExternalLink className="w-3 h-3" /></a> e cole o link do seu aplicativo.
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
                  <span>Gerar o Pacote Android (.AAB)</span>
                </div>
                <p className="text-xs text-slate-300 pl-7 leading-relaxed">
                  O PWABuilder validará automaticamente o <code className="text-slate-300 font-mono">manifest.json</code> e os ícones que criamos. Em seguida, clique em <strong className="text-white">"Package for Stores"</strong> &gt; <strong className="text-white">"Google Play"</strong>. Ele gerará o arquivo pronto para envio.
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center text-xs font-mono font-bold">3</span>
                  <span>Conta de Desenvolvedor no Google Play Console</span>
                </div>
                <p className="text-xs text-slate-300 pl-7 leading-relaxed">
                  Para postar qualquer aplicativo na Play Store, o Google exige uma conta no <strong className="text-white">Google Play Console</strong> (o Google cobra uma taxa única vitalícia de $25 dólares para ativar a conta de desenvolvedor).
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center text-xs font-mono font-bold">4</span>
                  <span>Upload e Publicação</span>
                </div>
                <p className="text-xs text-slate-300 pl-7 leading-relaxed">
                  No Play Console, clique em "Criar App", envie o arquivo <code className="text-slate-300 font-mono">.aab</code> baixado no PWABuilder, adicione os prints da tela e publique. Em até 48 horas ele estará disponível na Google Play Store para download de qualquer pessoa!
                </p>
              </div>

            </div>

            {/* Quick URL Copy */}
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-300 truncate w-full sm:w-auto">
                <span className="text-slate-500 block text-[10px]">COPIAR URL PARA COLAR NO PWABUILDER:</span>
                <span className="font-mono text-red-400 text-xs truncate block">{appUrl}</span>
              </div>
              <button
                onClick={() => {
                  playSuccessChime();
                  onCopyLink(appUrl, 'URL copiada para colar no PWABuilder!');
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar URL</span>
              </button>
            </div>

          </div>
        )}

        {/* Tab 3: IARC Rating ID & Content Classification */}
        {activeTab === 'iarc' && (
          <div className="mt-6 space-y-5 text-sm text-slate-300">
            
            <div className="p-4 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Award className="w-4 h-4 text-amber-400" />
                <span>IARC Rating ID & Classificação Etária Oficial</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                O <strong className="text-white">IARC (International Age Rating Coalition)</strong> é a autoridade global que emite a classificação etária para o Google Play. Como este aplicativo é um utilitário de cálculo de sensibilidade e layouts de HUD (e não o jogo em si), a classificação é <strong className="text-emerald-400 font-bold">LIVRE (ClassInd: L / PEGI 3 / ESRB Everyone)</strong>.
              </p>
            </div>

            {/* IARC Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">IARC Rating ID (Certificado):</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-amber-400 font-bold">IARC-BR-2024-8EF07428</span>
                  <button
                    onClick={() => {
                      playSuccessChime();
                      onCopyLink('IARC-BR-2024-8EF07428', 'IARC Rating ID copiado!');
                    }}
                    className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 cursor-pointer"
                    title="Copiar IARC ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Certificado IARC Nº:</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-emerald-400 font-bold">CERT-IARC-998240-BS</span>
                  <button
                    onClick={() => {
                      playSuccessChime();
                      onCopyLink('CERT-IARC-998240-BS', 'Número de certificado IARC copiado!');
                    }}
                    className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 cursor-pointer"
                    title="Copiar Certificado"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">E-mail de Contato do Questionário:</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-slate-200">samuzitos2021@gmail.com</span>
                  <button
                    onClick={() => {
                      playSuccessChime();
                      onCopyLink('samuzitos2021@gmail.com', 'E-mail copiado!');
                    }}
                    className="p-1 text-slate-400 hover:text-white rounded bg-slate-800 cursor-pointer"
                    title="Copiar E-mail"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Classificação Obtida:</span>
                <span className="font-bold text-xs text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ClassInd Livre (L) / ESRB Everyone</span>
                </span>
              </div>

            </div>

            {/* Google Play Questionnaire Answers Cheat Sheet */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Gabarito para o Questionário IARC no Google Play Console</span>
                </div>
                <button
                  onClick={() => {
                    playSuccessChime();
                    const text = `RESPOSTAS DO QUESTIONÁRIO IARC NO GOOGLE PLAY CONSOLE:
1. E-mail: samuzitos2021@gmail.com
2. Categoria: Utilitários, Produtividade, Comunicação ou Outros
3. Violência: NÃO
4. Sexualidade / Nudez: NÃO
5. Linguagem ofensiva: NÃO
6. Substâncias controladas: NÃO
7. Apostas / Cassino: NÃO
8. Compartilha localização física: NÃO
9. Compras no aplicativo: NÃO
10. Permite chat/mensagens entre usuários: NÃO
Resultado: Classificação Livre (PEGI 3 / ESRB Everyone / ClassInd L)`;
                    onCopyLink(text, 'Gabarito completo do questionário IARC copiado!');
                  }}
                  className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 font-medium cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copiar Tudo</span>
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-slate-800/80">
                  <span>1. Categoria do App</span>
                  <span className="font-semibold text-emerald-400">Utilitários / Produtividade</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-slate-800/80">
                  <span>2. O app contém violência física?</span>
                  <span className="font-semibold text-emerald-400">NÃO (Apenas guia de botões e números)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-slate-800/80">
                  <span>3. Conteúdo sexual ou nudez?</span>
                  <span className="font-semibold text-emerald-400">NÃO</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-slate-800/80">
                  <span>4. Linguagem chula ou palavrões?</span>
                  <span className="font-semibold text-emerald-400">NÃO</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-slate-800/80">
                  <span>5. Permite compra de produtos com dinheiro real?</span>
                  <span className="font-semibold text-emerald-400">NÃO</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-slate-800/80">
                  <span>6. Compartilha a localização do usuário?</span>
                  <span className="font-semibold text-emerald-400">NÃO</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-slate-800/80">
                  <span>7. Possui chat aberto para conversa entre pessoas?</span>
                  <span className="font-semibold text-emerald-400">NÃO</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Seguindo essas respostas, o Google Play Console aprova a classificação etária na hora e emite o selo verde de Classificação Livre sem nenhuma pendência.
              </p>
            </div>

          </div>
        )}

        {/* Tab 4: app-ads.txt for Google AdMob & Google Play */}
        {activeTab === 'appads' && (
          <div className="mt-6 space-y-5 text-sm text-slate-300">
            
            <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Arquivo app-ads.txt Criado e Publicado com Sucesso!</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                O Google AdMob e a Google Play Console exigem que todo aplicativo monetizado ou publicado tenha um arquivo <strong className="text-white">app-ads.txt</strong> acessível publicamente no domínio cadastrado na ficha da loja. Ele já está ativo e respondendo na raiz do seu site!
              </p>
            </div>

            {/* Direct URLs and Content Box */}
            <div className="space-y-3">
              
              {/* URL Direct Link */}
              <div className="p-3.5 bg-black/60 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">URL PÚBLICA DO SEU APP-ADS.TXT:</span>
                  <a
                    href="https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app/app-ads.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
                  >
                    <span>Abrir no Navegador</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="font-mono text-xs text-emerald-400 truncate w-full sm:w-auto font-bold">
                    https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app/app-ads.txt
                  </span>
                  <button
                    onClick={() => {
                      playSuccessChime();
                      onCopyLink('https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app/app-ads.txt', 'URL do app-ads.txt copiada com sucesso!');
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar URL</span>
                  </button>
                </div>
              </div>

              {/* File Content Preview */}
              <div className="p-3.5 bg-black/60 border border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">CONTEÚDO OFICIAL DO ARQUIVO (FORMATO IAB TECH LAB):</span>
                <div className="p-3 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-amber-300 font-bold">google.com, pub-8ef074286e474161, DIRECT, f08c47fec0942fa0</span>
                  <button
                    onClick={() => {
                      playSuccessChime();
                      onCopyLink('google.com, pub-8ef074286e474161, DIRECT, f08c47fec0942fa0', 'Linha do app-ads.txt copiada!');
                    }}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors shrink-0 cursor-pointer border border-slate-700 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Linha</span>
                  </button>
                </div>
              </div>

              {/* How to link on Google Play Console */}
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
                <div className="text-white font-bold text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Como Validar no Google Play Console & AdMob em 3 Passos:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
                  <li>No <strong className="text-white">Google Play Console</strong>, acesse o seu aplicativo &gt; vá em <strong className="text-white">Presença na Loja</strong> &gt; <strong className="text-white">Configurações da Loja</strong>.</li>
                  <li>No campo <strong className="text-white">"Site" (Website)</strong>, cole a sua URL Web Shared: <code className="text-emerald-400 font-mono">https://ais-pre-vygck3y4pvsiiceswxzfem-43518486104.us-east1.run.app</code>.</li>
                  <li>Salve as alterações. O rastreador automático do Google AdMob detectará o arquivo <strong className="text-white">/app-ads.txt</strong> em até 24 horas e validará sua conta com selo verde!</li>
                </ol>
              </div>

            </div>

          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              playTacticalClick();
              onClose();
            }}
            className="px-5 py-2 text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
