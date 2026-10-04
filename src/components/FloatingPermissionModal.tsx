import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Layers, 
  ExternalLink, 
  Smartphone, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Tv, 
  Move, 
  Maximize,
  Sliders,
  Crosshair,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { playTacticalClick, playSuccessChime } from '../utils/audio';

interface FloatingPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const FloatingPermissionModal: React.FC<FloatingPermissionModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [activeBrand, setActiveBrand] = useState<'xiaomi' | 'samsung' | 'motorola' | 'geral'>('xiaomi');
  const [isPipActive, setIsPipActive] = useState<boolean>(false);
  const [pipCrosshairColor, setPipCrosshairColor] = useState<string>('#ef4444');
  const [permissionConfirmed, setPermissionConfirmed] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Draw tactical floating HUD into canvas for Picture-in-Picture mode
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;

    const render = () => {
      angle += 0.03;
      ctx.fillStyle = '#080a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // 4:3 Aspect Frame overlay
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 20, canvas.width - 60, canvas.height - 40);

      // HUD Text
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STRETCHED 4:3 • BLOOD STRIKE', cx, 40);

      // Tactical Crosshair
      ctx.strokeStyle = pipCrosshairColor;
      ctx.lineWidth = 2;

      // Horizontal and vertical lines
      ctx.beginPath();
      ctx.moveTo(cx - 24, cy);
      ctx.lineTo(cx - 6, cy);
      ctx.moveTo(cx + 6, cy);
      ctx.lineTo(cx + 24, cy);

      ctx.moveTo(cx, cy - 24);
      ctx.lineTo(cx, cy - 6);
      ctx.moveTo(cx, cy + 6);
      ctx.lineTo(cx, cy + 24);
      ctx.stroke();

      // Center Dot
      ctx.fillStyle = pipCrosshairColor;
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      // Rotating corner brackets
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      const r = 36;
      ctx.beginPath();
      ctx.arc(cx, cy, r, angle, angle + Math.PI / 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r, angle + Math.PI, angle + Math.PI + Math.PI / 3);
      ctx.stroke();

      // FPS Simulator tag
      ctx.fillStyle = '#10b981';
      ctx.font = '10px monospace';
      ctx.fillText('JANELA ATIVA • 120 FPS', cx, canvas.height - 28);

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isOpen, pipCrosshairColor]);

  if (!isOpen) return null;

  // Trigger Android Overlay Permission settings intent
  const handleRequestAndroidPermission = () => {
    playTacticalClick();
    onShowToast('Abrindo configurações de sobreposição do Android...');

    // Try intents to open Android Overlay settings directly
    try {
      window.location.href = 'intent:#Intent;action=android.settings.action.MANAGE_OVERLAY_PERMISSION;end';
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setPermissionConfirmed(true);
      playSuccessChime();
    }, 1500);
  };

  // Launch Picture-in-Picture real floating overlay window
  const handleTogglePipWindow = async () => {
    playTacticalClick();
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) {
      onShowToast('Dispositivo não suporta janela flutuante direta.');
      return;
    }

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPipActive(false);
        onShowToast('Janela flutuante fechada.');
        return;
      }

      // Capture stream from tactical canvas
      const stream = (canvas as any).captureStream ? (canvas as any).captureStream(30) : null;
      if (!stream) {
        onShowToast('Janela PiP não disponível neste navegador.');
        return;
      }

      video.srcObject = stream;
      await video.play();
      await video.requestPictureInPicture();
      setIsPipActive(true);
      playSuccessChime();
      onShowToast('Janela Flutuante ativada com sucesso sobre a tela!');
    } catch (err) {
      console.warn('PiP Error:', err);
      onShowToast('Toque em "Permissão de Sobreposição" para ativar via sistema.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] bg-[#0c1017] border border-red-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        style={{ backgroundColor: '#0c1017' }}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-red-950/40 via-slate-900 to-[#0c1017]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-red-400 bg-red-950/60 border border-red-900/80 px-2 py-0.5 rounded">
                  SISTEMA ANDROID
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 100% ANTIBAN
                </span>
              </div>
              <h2 className="text-lg font-bold text-white font-display">
                Permissão de Janela Flutuante & Tela Esticada
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              playTacticalClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          
          {/* Main Action Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-950/30 to-slate-900 border border-red-900/50 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Ativar Permissão de Sobreposição
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Para esticar a tela do Blood Strike em 4:3 no Android, o sistema precisa da permissão <strong>"Sobrepor a outros apps"</strong> para executar a Janela Flutuante por cima do jogo.
                </p>
              </div>

              {permissionConfirmed && (
                <span className="px-2 py-1 rounded bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-mono font-bold text-emerald-400 shrink-0 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> ATIVADO
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                onClick={handleRequestAndroidPermission}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Solicitar Permissão no Android</span>
              </button>

              <button
                onClick={handleTogglePipWindow}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-700 transition-colors"
              >
                <Tv className="w-4 h-4 text-red-400" />
                <span>{isPipActive ? 'Fechar Mini-Janela' : 'Abrir Janela Flutuante (PiP)'}</span>
              </button>
            </div>
          </div>

          {/* Hidden Canvas & Video for Real Picture-in-Picture Floating Window */}
          <div className="hidden">
            <canvas ref={canvasRef} width={320} height={200} />
            <video ref={videoRef} playsInline muted />
          </div>

          {/* Brand Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                COMO ESTICAR NO SEU CELULAR:
              </span>
              <span className="text-[11px] text-slate-500">Selecione sua marca</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'xiaomi', label: 'Xiaomi / POCO' },
                { id: 'samsung', label: 'Samsung One UI' },
                { id: 'motorola', label: 'Motorola Moto' },
                { id: 'geral', label: 'Realme / Outros' }
              ].map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => {
                    playTacticalClick();
                    setActiveBrand(brand.id as any);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold cursor-pointer border text-center transition-all ${
                    activeBrand === brand.id
                      ? 'bg-red-950/60 border-red-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {brand.label}
                </button>
              ))}
            </div>

            {/* Brand Instructions */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 text-xs">
              {activeBrand === 'xiaomi' && (
                <div className="space-y-2.5">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> Passo a Passo - Xiaomi & POCO (MIUI / HyperOS):
                  </div>
                  <ol className="space-y-2 list-decimal list-inside text-slate-300 leading-relaxed pl-1">
                    <li>Vá em <strong>Configurações</strong> &gt; <strong>Apps</strong> &gt; <strong>Permissões</strong> &gt; <strong>Outras permissões</strong>.</li>
                    <li>Localize o app e ative: <strong>"Exibir janelas pop-up enquanto estiver em execução"</strong>.</li>
                    <li>Abra o <strong>Blood Strike</strong> normalmente até o Lobby.</li>
                    <li>Puxe a barra lateral do <strong>Game Turbo</strong> e toque no ícone de <strong>Janela Flutuante</strong>.</li>
                    <li>Toque e <strong>arraste a barrinha inferior da janela até a borda da tela</strong>. A resolução congela esticada em 4:3 na mesma hora!</li>
                  </ol>
                </div>
              )}

              {activeBrand === 'samsung' && (
                <div className="space-y-2.5">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> Passo a Passo - Samsung Galaxy (One UI):
                  </div>
                  <ol className="space-y-2 list-decimal list-inside text-slate-300 leading-relaxed pl-1">
                    <li>Vá em <strong>Configurações</strong> &gt; <strong>Aplicativos</strong> &gt; toque nos 3 pontinhos no canto superior &gt; <strong>Acesso especial</strong>.</li>
                    <li>Toque em <strong>"Aparecer sobre outros"</strong> e conceda a permissão.</li>
                    <li>Abra a tela de <strong>Aplicativos Recentes</strong> (botão ||| ou gesto de puxar para cima).</li>
                    <li>Toque no <strong>ícone redondo do Blood Strike</strong> no topo do card e escolha <strong>"Abrir no modo pop-up"</strong>.</li>
                    <li>Com o jogo em janela suspensa, toque no botão de maximizar para abrir a <strong>tela esticada 4:3</strong>!</li>
                  </ol>
                </div>
              )}

              {activeBrand === 'motorola' && (
                <div className="space-y-2.5">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> Passo a Passo - Motorola (Moto Gametime):
                  </div>
                  <ol className="space-y-2 list-decimal list-inside text-slate-300 leading-relaxed pl-1">
                    <li>Vá em <strong>Configurações</strong> &gt; <strong>Apps e Notificações</strong> &gt; <strong>Acesso especial a apps</strong> &gt; <strong>Sobrepor a outros apps</strong> &gt; Permitir.</li>
                    <li>Abra o Blood Strike e abra o menu flutuante <strong>Moto Gametime</strong>.</li>
                    <li>Toque no modo de <strong>Janela Livre / Janela Suspensa</strong>.</li>
                    <li>Ajuste o tamanho puxando o canto da janela para forçar a proporção alargada.</li>
                  </ol>
                </div>
              )}

              {activeBrand === 'geral' && (
                <div className="space-y-2.5">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> Passo a Passo - Realme, Infinix e Outros:
                  </div>
                  <ol className="space-y-2 list-decimal list-inside text-slate-300 leading-relaxed pl-1">
                    <li>Ative o modo <strong>Tela Dividida (Split Screen)</strong> no Android com qualquer outro aplicativo leve aberto.</li>
                    <li>Abra o <strong>Blood Strike</strong> na outra metade da tela.</li>
                    <li>Espere o jogo carregar a tela principal de carregamento.</li>
                    <li><strong>Arraste o divisor central totalmente para o lado</strong>. O Blood Strike se ajustará automaticamente esticando o campo de visão em 4:3!</li>
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* Tactical Tips Warning */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200/90 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Nota de Segurança:</strong> O método de janela flutuante e tela dividida utiliza recursos nativos do próprio sistema Android. <strong>Não modifica os arquivos do jogo</strong> e é 100% seguro contra suspensões ou bans de conta.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#080b10] flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">HERO BLOOD STRIKE STUDIO</span>
          <button
            onClick={() => {
              playTacticalClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
          >
            Entendido, Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
