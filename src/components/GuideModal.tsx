import React from 'react';
import { X, CheckCircle2, Copy, Sparkles, Smartphone, Settings } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f141e] border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
              Como Aplicar Códigos no Blood Strike
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

        <div className="mt-6 space-y-6 text-sm text-slate-300">
          
          {/* HUD Import section */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-6 h-6 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center text-xs font-mono font-bold">1</span>
              <span>Importar Código de Layout de HUD</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 pl-1 leading-relaxed">
              <li>Abra o Blood Strike no celular ou PC (Steam / Emulador).</li>
              <li>Toque na <strong className="text-white">Engrenagem de Configurações</strong> no canto superior direito do lobby.</li>
              <li>Vá até a aba <strong className="text-white">Controles</strong> e toque em <strong className="text-white">Personalizar Layout</strong>.</li>
              <li>No topo da tela de edição do HUD, selecione a opção <strong className="text-white">Compartilhar / Importar Layout</strong>.</li>
              <li>Cole o código copiado aqui (ex: <code className="text-red-400 font-mono text-xs">NA/SA-HUD3-Ab26JzuXTQIAqBb+-0-2</code>) e clique em <strong className="text-white">Aplicar</strong>.</li>
              <li>Salve as alterações e clique em Sair.</li>
            </ol>
          </div>

          {/* Sens Import section */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-6 h-6 rounded-full bg-amber-600/30 text-amber-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
              <span>Importar Sensibilidade de TikToker</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 pl-1 leading-relaxed">
              <li>Vá em Configurações &gt; <strong className="text-white">Sensibilidade</strong>.</li>
              <li>No canto superior direito, toque no ícone de <strong className="text-white">Nuvem / Gerenciamento de Nuvem</strong>.</li>
              <li>Toque em <strong className="text-white">Importar Código</strong>.</li>
              <li>Cole o código copiado do criador (ex: <code className="text-amber-400 font-mono text-xs">NA/SA-SENS-An3T2cP6MQMCO/4v-2-3</code>).</li>
              <li>Você também pode ajustar manualmente a <strong className="text-white">DPI / Menor Largura</strong> indicada em cada card para obter 100% da precisão.</li>
            </ol>
          </div>

          {/* Stretched tip */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">3</span>
              <span>Dica de Ouro para Tela Esticada</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Ao usar tela esticada (4:3 ou 5:4), lembre-se de que a sensibilidade horizontal parecerá mais rápida.
              Use nossa <strong className="text-white">Calculadora de Sensibilidade Esticada</strong> na aba de Tela Esticada para aplicar a compensação de mira ideal!
            </p>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              playTacticalClick();
              onClose();
            }}
            className="px-5 py-2 text-sm font-semibold bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer"
          >
            Entendido, Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
