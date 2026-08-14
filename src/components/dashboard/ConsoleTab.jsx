import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, Trash2, Copy, Check, Send, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ConsoleTab({ server, onExecuteCommand, onClearLogs, lang }) {
  const [commandInput, setCommandInput] = useState('');
  const [copied, setCopied] = useState(false);
  const logContainerRef = useRef(null);

  // Auto scroll terminal to bottom on new log
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [server.consoleLogs]);

  const handleSubmitCommand = (e) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    onExecuteCommand(commandInput.trim());
    setCommandInput('');
  };

  const handleCopyLogs = () => {
    const rawText = server.consoleLogs.map(l => l.text).join('\n');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickCommands = [
    { cmd: 'op CraftMaster_TR', label: '/op' },
    { cmd: 'gamemode creative', label: '/gamemode' },
    { cmd: 'weather clear', label: '/weather' },
    { cmd: 'tp @a 0 100 0', label: '/tp' },
    { cmd: 'say Sunucu bakımı 5dk içinde başlıyor!', label: '/say' },
    { cmd: 'plugins', label: '/plugins' }
  ];

  return (
    <div className="space-y-4">
      
      {/* Console Top Toolbar */}
      <div className="flex items-center justify-between bg-black/40 border border-white/10 p-3 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white">paper-1.20.4.jar</span>
          <span className="text-gray-500">|</span>
          <span className="text-emerald-400">LOG STREAM ACTIVE</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLogs}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300 flex items-center gap-1 transition-all"
            title="Kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
          <button
            onClick={onClearLogs}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 transition-all"
            title="Temizle"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'tr' ? 'Temizle' : 'Clear'}</span>
          </button>
        </div>
      </div>

      {/* Terminal View Container */}
      <div 
        ref={logContainerRef}
        className="terminal-window p-4 h-[380px] overflow-y-auto space-y-1.5 text-xs text-gray-300"
      >
        {server.consoleLogs.length === 0 ? (
          <div className="text-gray-600 font-mono italic p-4 text-center">
            {lang === 'tr' ? 'Konsol kaydı bulunmuyor...' : 'No console logs available...'}
          </div>
        ) : (
          server.consoleLogs.map((log) => {
            let textColor = 'text-gray-300';
            if (log.type === 'error' || log.text.includes('ERROR')) textColor = 'text-rose-400 font-bold';
            else if (log.type === 'warn' || log.text.includes('WARN')) textColor = 'text-amber-400 font-semibold';
            else if (log.type === 'success' || log.text.includes('SUCCESS')) textColor = 'text-emerald-400 font-bold';
            else if (log.type === 'command') textColor = 'text-cyan-400 font-bold';
            else if (log.type === 'join') textColor = 'text-purple-300';

            return (
              <div key={log.id} className={`font-mono leading-relaxed break-all ${textColor}`}>
                {log.text}
              </div>
            );
          })
        )}
      </div>

      {/* Quick Command Shortcuts */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          {lang === 'tr' ? 'Hızlı Komutlar:' : 'Quick Cmds:'}
        </span>
        {quickCommands.map((qc, idx) => (
          <button
            key={idx}
            onClick={() => onExecuteCommand(qc.cmd)}
            disabled={server.status !== 'online'}
            className="px-2.5 py-1 bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 rounded-lg text-xs font-mono text-emerald-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {qc.label}
          </button>
        ))}
      </div>

      {/* Command Input Bar */}
      <form onSubmit={handleSubmitCommand} className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-emerald-400 font-bold text-sm">
            &gt;
          </span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            disabled={server.status !== 'online'}
            placeholder={
              server.status === 'online'
                ? (lang === 'tr' ? "Komut girin (örn: /op player, /say Hello)" : "Enter command (e.g. /op player, /say Hello)")
                : (lang === 'tr' ? "Komut göndermek için sunucuyu başlatın" : "Start server to send commands")
            }
            className="custom-input pl-8 font-mono text-xs py-3 disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={server.status !== 'online' || !commandInput.trim()}
          className="btn-primary py-3 px-5 text-xs font-bold rounded-xl flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === 'tr' ? 'Gönder' : 'Send'}</span>
        </button>
      </form>

    </div>
  );
}
