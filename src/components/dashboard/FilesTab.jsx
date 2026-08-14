import React, { useState } from 'react';
import { FileText, Folder, Save, FileCode, Check, RefreshCw, Lock } from 'lucide-react';

export default function FilesTab({ server, onUpdateServer, lang }) {
  const [activeSubTab, setActiveSubTab] = useState('properties'); // 'properties' or 'filetree'
  const [propsForm, setPropsForm] = useState(server.properties || {
    gamemode: 'survival',
    difficulty: 'normal',
    pvp: true,
    maxPlayers: 30,
    onlineMode: true,
    spawnProtection: 16,
    allowFlight: false,
    enableCommandBlock: true,
    viewDistance: 10
  });

  const [isSaved, setIsSaved] = useState(false);

  const handlePropChange = (key, val) => {
    setPropsForm(prev => ({ ...prev, [key]: val }));
  };

  const handleSaveProperties = (e) => {
    e.preventDefault();
    onUpdateServer({
      ...server,
      properties: propsForm,
      maxPlayers: Number(propsForm.maxPlayers),
      consoleLogs: [
        ...server.consoleLogs,
        { id: Date.now(), type: 'info', text: '[SYSTEM]: Saved server.properties modifications. Restart required to apply.' }
      ]
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const mockFileTree = [
    { name: 'server.properties', type: 'config', size: '1.2 KB', modified: '2026-08-14' },
    { name: 'eula.txt', type: 'text', size: '160 B', modified: '2026-08-14' },
    { name: 'spigot.yml', type: 'config', size: '4.8 KB', modified: '2026-08-14' },
    { name: 'paper.yml', type: 'config', size: '8.2 KB', modified: '2026-08-14' },
    { name: 'ops.json', type: 'json', size: '320 B', modified: '2026-08-14' },
    { name: 'whitelist.json', type: 'json', size: '410 B', modified: '2026-08-14' },
    { name: 'plugins/', type: 'folder', count: server.plugins ? server.plugins.length : 0 },
    { name: 'world/', type: 'folder', count: 12 },
    { name: 'world_nether/', type: 'folder', count: 8 },
    { name: 'world_the_end/', type: 'folder', count: 6 },
    { name: 'logs/', type: 'folder', count: 24 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveSubTab('properties')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'properties' 
              ? 'bg-emerald-500 text-black font-extrabold shadow-lg shadow-emerald-500/20' 
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>server.properties {lang === 'tr' ? 'Düzenleyici' : 'Editor'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('filetree')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'filetree' 
              ? 'bg-emerald-500 text-black font-extrabold shadow-lg shadow-emerald-500/20' 
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          <Folder className="w-4 h-4" />
          <span>{lang === 'tr' ? 'Dosya Tarayıcısı' : 'File Manager'}</span>
        </button>
      </div>

      {/* TAB 1: SERVER.PROPERTIES EDITOR */}
      {activeSubTab === 'properties' ? (
        <form onSubmit={handleSaveProperties} className="glass-panel p-6 border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-400" />
                <span>server.properties Visual Editor</span>
              </h3>
              <p className="text-xs text-gray-400">
                {lang === 'tr' ? 'Oyun modunu, zorluğu ve ana sunucu tercihlerini yapılandırın.' : 'Configure game modes, difficulty and server flags.'}
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary py-2.5 px-5 text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              {isSaved ? <Check className="w-4 h-4 text-black" /> : <Save className="w-4 h-4" />}
              <span>{isSaved ? (lang === 'tr' ? 'Kaydedildi!' : 'Saved!') : (lang === 'tr' ? 'Kaydet' : 'Save Config')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Gamemode */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                Oyun Modu (gamemode)
              </label>
              <select
                value={propsForm.gamemode}
                onChange={(e) => handlePropChange('gamemode', e.target.value)}
                className="custom-input text-xs py-2.5"
              >
                <option value="survival">Survival (Hayatta Kalma)</option>
                <option value="creative">Creative (Yaratıcı)</option>
                <option value="adventure">Adventure (Macera)</option>
                <option value="spectator">Spectator (İzleyici)</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                Zorluk Derecesi (difficulty)
              </label>
              <select
                value={propsForm.difficulty}
                onChange={(e) => handlePropChange('difficulty', e.target.value)}
                className="custom-input text-xs py-2.5"
              >
                <option value="peaceful">Peaceful (Barışçıl)</option>
                <option value="easy">Easy (Kolay)</option>
                <option value="normal">Normal (Normal)</option>
                <option value="hard">Hard (Zor)</option>
              </select>
            </div>

            {/* Max Players */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                Maksimum Oyuncu Kapasitesi (max-players)
              </label>
              <input
                type="number"
                value={propsForm.maxPlayers}
                onChange={(e) => handlePropChange('maxPlayers', e.target.value)}
                className="custom-input font-mono text-xs py-2.5"
                min="1"
                max="500"
              />
            </div>

            {/* View Distance */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                Görüş Mesafesi Çizim Mesafesi (view-distance)
              </label>
              <input
                type="number"
                value={propsForm.viewDistance}
                onChange={(e) => handlePropChange('viewDistance', e.target.value)}
                className="custom-input font-mono text-xs py-2.5"
                min="4"
                max="32"
              />
            </div>

            {/* PVP Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-black/30 rounded-xl border border-white/10">
              <div>
                <span className="font-bold text-xs text-white block">Oyuncular Arası Savaş (pvp)</span>
                <span className="text-[11px] text-gray-400">Oyuncuların birbirine hasar vermesini sağlar</span>
              </div>
              <input
                type="checkbox"
                checked={propsForm.pvp}
                onChange={(e) => handlePropChange('pvp', e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Online Mode */}
            <div className="flex items-center justify-between p-3.5 bg-black/30 rounded-xl border border-white/10">
              <div>
                <span className="font-bold text-xs text-white block">Orijinal Minecraft Doğrulaması (online-mode)</span>
                <span className="text-[11px] text-gray-400">Korsan/Crack oyuncular için kapalı tutulabilir</span>
              </div>
              <input
                type="checkbox"
                checked={propsForm.onlineMode}
                onChange={(e) => handlePropChange('onlineMode', e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Command Blocks */}
            <div className="flex items-center justify-between p-3.5 bg-black/30 rounded-xl border border-white/10">
              <div>
                <span className="font-bold text-xs text-white block">Komut Blokları (enable-command-block)</span>
                <span className="text-[11px] text-gray-400">Komut bloğu kullanımını aktifleştirir</span>
              </div>
              <input
                type="checkbox"
                checked={propsForm.enableCommandBlock}
                onChange={(e) => handlePropChange('enableCommandBlock', e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Allow Flight */}
            <div className="flex items-center justify-between p-3.5 bg-black/30 rounded-xl border border-white/10">
              <div>
                <span className="font-bold text-xs text-white block">Uçmaya İzin Ver (allow-flight)</span>
                <span className="text-[11px] text-gray-400">Survival uçuş anti-cheat engellerini kaldırır</span>
              </div>
              <input
                type="checkbox"
                checked={propsForm.allowFlight}
                onChange={(e) => handlePropChange('allowFlight', e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>

          </div>
        </form>
      ) : (
        /* TAB 2: FILE SYSTEM TREE */
        <div className="glass-panel p-6 border-white/10 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-white text-base font-mono">
              /home/minecraft/server/
            </h4>
            <span className="text-xs text-gray-400 font-mono">
              Total Disk: {server.disk} GB NVMe
            </span>
          </div>

          <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden font-mono text-xs">
            {mockFileTree.map((item, idx) => (
              <div key={idx} className="p-3 bg-black/20 hover:bg-white/5 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-2.5">
                  {item.type === 'folder' ? (
                    <Folder className="w-4 h-4 text-amber-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-emerald-400" />
                  )}
                  <span className="font-semibold text-white">{item.name}</span>
                </div>

                <div className="text-gray-400">
                  {item.type === 'folder' ? `${item.count} öğe` : item.size}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
