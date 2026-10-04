import React, { useState, useEffect } from 'react';
import { X, FileText, Plus, Trash2, Copy, Save, Sparkles, Check } from 'lucide-react';
import { playTacticalClick, playSuccessChime } from '../utils/audio';

interface NoteItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface TacticalNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyText: (text: string, message: string) => void;
}

export const TacticalNotesModal: React.FC<TacticalNotesModalProps> = ({
  isOpen,
  onClose,
  onCopyText
}) => {
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('strike_config_notes');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: '1',
        title: 'Minha Sensibilidade da MP5 & Kala',
        content: 'Câmera: 140%\nRed Dot: 128%\nScope 2x: 115%\nAceleração: Desativada\nDPI: 480',
        createdAt: new Date().toLocaleDateString('pt-BR')
      },
      {
        id: '2',
        title: 'Códigos Rápidos Atualizados (Itusk & Speedyx)',
        content: 'HUD Itusk: NA/SA-HUD1-An3T2cP6MQMCO/4v-0-3\nSense Itusk: NA/SA-SENS-An3T2cP6MQMCO/4v-2-3\nHUD Speedyx: NA/SA-HUD1-AnxzIMEJNAECN7uJ-1-1\nSense Speedyx: NA/SA-SENS-AnxzIMEJNAECN7uJ-1-1',
        createdAt: new Date().toLocaleDateString('pt-BR')
      }
    ];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('strike_config_notes', JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  if (!isOpen) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() && !newContent.trim()) return;

    playSuccessChime();
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: newTitle.trim() || 'Sem título',
      content: newContent.trim(),
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    setNotes([newNote, ...notes]);
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  const handleDeleteNote = (id: string) => {
    playTacticalClick();
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0d1017] border border-slate-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-display font-bold text-lg uppercase tracking-wider">
            <FileText className="w-5 h-5 text-red-500" />
            <span>Adicionar Texto & Anotações Táticas</span>
          </div>
          <button
            onClick={() => {
              playTacticalClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action button to show form */}
        {!isAdding ? (
          <button
            onClick={() => {
              playTacticalClick();
              setIsAdding(true);
            }}
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/40"
          >
            <Plus className="w-4 h-4" />
            <span>+ Adicionar Novo Texto / Anotação</span>
          </button>
        ) : (
          <form onSubmit={handleAddNote} className="p-4 bg-slate-900/90 border border-slate-700 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Criar Nova Anotação Tática:</span>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Cancelar
              </button>
            </div>

            <input
              type="text"
              placeholder="Título (ex: Sensibilidade de AK, Anotação de Treino...)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 bg-black/60 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
              autoFocus
            />

            <textarea
              placeholder="Digite o texto, código, DPI ou configurações que você quer salvar..."
              rows={4}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full px-3 py-2 bg-black/60 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500 font-mono resize-y"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5 shadow-md shadow-red-950/40"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Texto</span>
              </button>
            </div>
          </form>
        )}

        {/* Notes List */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Seus Textos Salvos ({notes.length}):
          </span>

          {notes.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              Nenhum texto salvo ainda. Clique em "+ Adicionar Novo Texto" para salvar suas notas!
            </div>
          ) : (
            notes.map((note) => (
              <div 
                key={note.id} 
                className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-white">{note.title}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{note.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        playSuccessChime();
                        onCopyText(note.content, `Anotação "${note.title}" copiada!`);
                      }}
                      className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
                      title="Copiar texto"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 rounded bg-slate-800/80 hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Excluir anotação"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-mono whitespace-pre-line bg-black/40 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                  {note.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              playTacticalClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
