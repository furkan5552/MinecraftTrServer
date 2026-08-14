import React, { useState } from 'react';
import { Users, Shield, UserX, UserCheck, ShieldAlert, Plus, Trash2, Search, Zap } from 'lucide-react';

export default function PlayersTab({ server, onUpdateServer, lang }) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [whitelistActive, setWhitelistActive] = useState(false);
  const [whitelistedUsers, setWhitelistedUsers] = useState(['CraftMaster_TR', 'Ahmet_PvP']);

  const handleToggleOp = (uuid) => {
    const updatedPlayers = server.players.map(p => {
      if (p.uuid === uuid) {
        return { ...p, isOp: !p.isOp };
      }
      return p;
    });

    const targetPlayer = server.players.find(p => p.uuid === uuid);
    const logText = targetPlayer.isOp 
      ? `[SYSTEM]: De-opped player ${targetPlayer.name}`
      : `[SYSTEM]: Made player ${targetPlayer.name} a server operator (OP)`;

    onUpdateServer({
      ...server,
      players: updatedPlayers,
      consoleLogs: [...server.consoleLogs, { id: Date.now(), type: 'info', text: logText }]
    });
  };

  const handleKickPlayer = (name) => {
    const updatedPlayers = server.players.filter(p => p.name !== name);
    onUpdateServer({
      ...server,
      onlinePlayers: Math.max(0, server.onlinePlayers - 1),
      players: updatedPlayers,
      consoleLogs: [
        ...server.consoleLogs,
        { id: Date.now(), type: 'warn', text: `[SERVER]: Kicked player ${name} from server` }
      ]
    });
  };

  const handleBanPlayer = (name) => {
    const updatedPlayers = server.players.map(p => {
      if (p.name === name) return { ...p, isBanned: true };
      return p;
    });

    onUpdateServer({
      ...server,
      players: updatedPlayers,
      consoleLogs: [
        ...server.consoleLogs,
        { id: Date.now(), type: 'error', text: `[SERVER]: Banned player ${name} from server` }
      ]
    });
  };

  const handleAddWhitelist = (e) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;
    if (!whitelistedUsers.includes(newPlayerName.trim())) {
      setWhitelistedUsers([...whitelistedUsers, newPlayerName.trim()]);
    }
    setNewPlayerName('');
  };

  const handleRemoveWhitelist = (name) => {
    setWhitelistedUsers(whitelistedUsers.filter(n => n !== name));
  };

  return (
    <div className="space-y-6">
      
      {/* Active Online Players List */}
      <div className="glass-panel p-6 border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg text-white">
              {lang === 'tr' ? 'Çevrimiçi Oyuncular' : 'Online Players'}
            </h3>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs rounded-full">
              {server.onlinePlayers} / {server.maxPlayers}
            </span>
          </div>

          <div className="text-xs text-gray-400 font-mono">
            TPS: <span className="text-emerald-400 font-bold">{server.tps}</span>
          </div>
        </div>

        {server.players.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            {lang === 'tr' ? 'Şu anda sunucuda oyuncu yok.' : 'No players currently online.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {server.players.map((player) => (
              <div 
                key={player.uuid}
                className="bg-black/30 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  {/* Minecraft Head Avatar */}
                  <img
                    src={`https://mc-heads.net/avatar/${player.name}/40`}
                    alt={player.name}
                    className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/30"
                    onError={(e) => { e.target.src = 'https://mc-heads.net/avatar/MHF_Steve/40'; }}
                  />
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{player.name}</span>
                      {player.isOp && (
                        <span className="px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold rounded uppercase">
                          OP
                        </span>
                      )}
                      {player.isBanned && (
                        <span className="px-1.5 py-0.5 bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-bold rounded uppercase">
                          BANNED
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono flex items-center gap-2 mt-0.5">
                      <span>Ping: {player.ping}ms</span>
                    </div>
                  </div>
                </div>

                {/* Player Admin Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleOp(player.uuid)}
                    className={`p-2 rounded-lg text-xs font-bold transition-all ${
                      player.isOp 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                        : 'bg-white/5 hover:bg-white/10 text-gray-400'
                    }`}
                    title={player.isOp ? 'OP Yetkisini Al' : 'OP Yetkisi Ver'}
                  >
                    <Shield className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleKickPlayer(player.name)}
                    className="p-2 bg-white/5 hover:bg-amber-500/20 text-gray-400 hover:text-amber-400 rounded-lg text-xs transition-all"
                    title="Sunucudan At (Kick)"
                  >
                    <UserX className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleBanPlayer(player.name)}
                    className="p-2 bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 rounded-lg text-xs transition-all"
                    title="Yasakla (Ban)"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Whitelist Manager */}
      <div className="glass-panel p-6 border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white text-base">
              {lang === 'tr' ? 'Whitelist (Beyaz Liste)' : 'Whitelist Manager'}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              {lang === 'tr' ? 'Sadece listeye eklediğiniz oyuncular sunucuya katılabilir.' : 'Only added players can connect to the server.'}
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={whitelistActive} 
              onChange={() => setWhitelistActive(!whitelistActive)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
          </label>
        </div>

        {whitelistActive && (
          <div className="space-y-3 pt-2">
            <form onSubmit={handleAddWhitelist} className="flex gap-2">
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder={lang === 'tr' ? 'Oyuncu adı ekle...' : 'Add player name...'}
                className="custom-input text-xs py-2"
              />
              <button type="submit" className="btn-primary py-2 px-4 text-xs font-bold rounded-lg flex items-center gap-1 shrink-0">
                <Plus className="w-4 h-4" />
                <span>{lang === 'tr' ? 'Ekle' : 'Add'}</span>
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {whitelistedUsers.map((name) => (
                <div key={name} className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <span>{name}</span>
                  <button 
                    onClick={() => handleRemoveWhitelist(name)}
                    className="text-gray-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
