import React, { useState } from 'react';
import { HardDrive, Download, RotateCcw, Plus, Trash2, Check, RefreshCw, ShieldCheck } from 'lucide-react';

export default function BackupsTab({ server, onUpdateServer, lang }) {
  const [backups, setBackups] = useState([
    { id: 'b1', name: 'Otomatik Saatlik Yedek', date: '2026-08-14 12:00', size: '142 MB', type: 'auto' },
    { id: 'b2', name: 'Plugin Yükleme Öncesi', date: '2026-08-14 09:30', size: '138 MB', type: 'manual' }
  ]);

  const [creating, setCreating] = useState(false);
  const [newBackupName, setNewBackupName] = useState('');

  const handleCreateBackup = (e) => {
    e.preventDefault();
    setCreating(true);

    setTimeout(() => {
      const newBackup = {
        id: 'b-' + Date.now(),
        name: newBackupName || 'Manuel Dünya Yedeği',
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        size: Math.floor(Math.random() * 30 + 130) + ' MB',
        type: 'manual'
      };

      setBackups([newBackup, ...backups]);
      setCreating(false);
      setNewBackupName('');

      onUpdateServer({
        ...server,
        consoleLogs: [
          ...server.consoleLogs,
          { id: Date.now(), type: 'success', text: `[SYSTEM]: Successfully created backup snapshot "${newBackup.name}"` }
        ]
      });
    }, 1200);
  };

  const handleRestoreBackup = (bName) => {
    if (confirm(`${bName} yedeğine geri dönmek istediğinizden emin misiniz?`)) {
      onUpdateServer({
        ...server,
        consoleLogs: [
          ...server.consoleLogs,
          { id: Date.now(), type: 'warn', text: `[SYSTEM]: Restored server world state from backup "${bName}"` }
        ]
      });
    }
  };

  const handleDeleteBackup = (id) => {
    setBackups(backups.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Create Backup Form */}
      <form onSubmit={handleCreateBackup} className="glass-panel p-6 border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'tr' ? 'Yeni Anlık Yedek (Snapshot) Al' : 'Create New World Snapshot'}</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {lang === 'tr' ? 'Dünyanızın, oyuncu verilerinin ve eklentilerin tam kopyasını kaydedin.' : 'Create an instant backup copy of your world and player data.'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newBackupName}
            onChange={(e) => setNewBackupName(e.target.value)}
            placeholder={lang === 'tr' ? 'Yedek ismi (ör. Harita Güncellemesi Öncesi)' : 'Backup snapshot name...'}
            className="custom-input text-xs"
          />
          <button
            type="submit"
            disabled={creating}
            className="btn-primary py-2.5 px-6 text-xs font-bold shrink-0 flex items-center gap-2"
          >
            {creating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            <span>{creating ? (lang === 'tr' ? 'Yedekleniyor...' : 'Backing up...') : (lang === 'tr' ? 'Yedek Oluştur' : 'Create Snapshot')}</span>
          </button>
        </div>
      </form>

      {/* Backups List */}
      <div className="glass-panel p-6 border-white/10 space-y-4">
        <h4 className="font-bold text-white text-sm">
          {lang === 'tr' ? 'Kayıtlı Anlık Yedekler' : 'Saved Backups'} ({backups.length})
        </h4>

        {backups.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-xs">
            {lang === 'tr' ? 'Henüz kaydedilmiş yedek yok.' : 'No backups saved yet.'}
          </div>
        ) : (
          <div className="space-y-3">
            {backups.map((b) => (
              <div key={b.id} className="bg-black/30 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <span>{b.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                      b.type === 'auto' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {b.type === 'auto' ? 'Otomatik' : 'Manuel'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-1 flex items-center gap-3">
                    <span>Tarih: {b.date}</span>
                    <span>Boyut: {b.size}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRestoreBackup(b.name)}
                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{lang === 'tr' ? 'Geri Yükle' : 'Restore'}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteBackup(b.id)}
                    className="p-2 bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 rounded-lg text-xs transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
