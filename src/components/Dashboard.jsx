import React, { useState, useEffect } from 'react';
import ConsoleTab from './dashboard/ConsoleTab';
import PlayersTab from './dashboard/PlayersTab';
import PluginsTab from './dashboard/PluginsTab';
import FilesTab from './dashboard/FilesTab';
import BackupsTab from './dashboard/BackupsTab';

import { 
  Play, 
  Square, 
  RotateCw, 
  Zap, 
  Copy, 
  Check, 
  Terminal, 
  Users, 
  Box, 
  FileText, 
  HardDrive, 
  Activity,
  Globe,
  Cpu,
  Gauge,
  ArrowLeft
} from 'lucide-react';

const BACKEND_URL = 'http://localhost:3001';

export default function Dashboard({ 
  server, 
  onUpdateServer, 
  onBackToHome, 
  lang 
}) {
  const [activeTab, setActiveTab] = useState('console'); // 'console', 'players', 'plugins', 'files', 'backups'
  const [copiedIp, setCopiedIp] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Poll real backend status every 1.5 seconds
  useEffect(() => {
    let isMounted = true;

    const syncWithRealBackend = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/status`);
        if (!res.ok) return;
        const data = await res.json();

        if (isMounted) {
          onUpdateServer({
            ...server,
            status: data.status,
            ramUsage: parseFloat(data.ramUsage),
            ram: parseFloat(data.ramMax),
            cpuUsage: data.cpuUsage,
            tps: data.tps,
            onlinePlayers: data.onlinePlayers,
            maxPlayers: data.maxPlayers,
            consoleLogs: data.logs && data.logs.length > 0 ? data.logs : server.consoleLogs
          });
        }
      } catch (err) {
        // Backend offline fallback
      }
    };

    syncWithRealBackend();
    const interval = setInterval(syncWithRealBackend, 1500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [server.id]);

  if (!server) return null;

  // Power action handlers with Real Backend Sync
  const handleStartServer = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/start`, { method: 'POST' });
    } catch (e) {
      onUpdateServer({ ...server, status: 'starting' });
    }
  };

  const handleStopServer = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/stop`, { method: 'POST' });
    } catch (e) {
      onUpdateServer({ ...server, status: 'stopping' });
    }
  };

  const handleRestartServer = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/restart`, { method: 'POST' });
    } catch (e) {
      onUpdateServer({ ...server, status: 'stopping' });
    }
  };

  const handleCopyIp = () => {
    navigator.clipboard.writeText('localhost');
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  const handleExecuteCommand = async (cmdText) => {
    try {
      await fetch(`${BACKEND_URL}/api/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmdText })
      });
    } catch (e) {
      // Mock fallback if backend offline
    }
  };

  const handleClearLogs = () => {
    onUpdateServer({ ...server, consoleLogs: [] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      
      {/* Back Button & Server Name Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 transition-all"
            title="Ana Sayfaya Dön"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{server.name}</h1>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold rounded-lg border border-emerald-500/30 uppercase">
                REAL MINECRAFT 1.12.2
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-0.5 flex items-center gap-2">
              <span>Node: Yerel PC (Localhost)</span>
              <span>•</span>
              <span>Port: 25565</span>
            </p>
          </div>
        </div>

        {/* IP Copy Pill & Connection Troubleshooting Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div 
            onClick={handleCopyIp}
            className="bg-black/40 border border-white/10 hover:border-emerald-500/40 p-3 rounded-2xl flex items-center gap-3 cursor-pointer group transition-all"
          >
            <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                {lang === 'tr' ? 'Sunucu Adresi (IP)' : 'Server Address'}
              </span>
              <span className="font-mono text-sm font-extrabold text-emerald-400 group-hover:underline">
                localhost
              </span>
            </div>
            <div className="ml-2 p-2 bg-white/5 group-hover:bg-emerald-500 group-hover:text-black text-gray-300 rounded-xl transition-all">
              {copiedIp ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </div>
          </div>

          <button
            onClick={() => setShowHelpModal(true)}
            className="p-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-2xl text-amber-400 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>{lang === 'tr' ? 'Bilinmeyen Sunucu Hatası mı Alıyorsun?' : 'Unknown Host Fix?'}</span>
          </button>
        </div>
      </div>

      {/* SERVER STATUS HERO CARD & LIVE PERFORMANCE METRICS */}
      <div className="glass-panel p-6 border-white/10 space-y-6">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Status Badge & Power Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`status-dot ${
                server.status === 'online' ? 'status-online' : 
                server.status === 'starting' || server.status === 'stopping' ? 'status-starting' : 'status-offline'
              }`} />
              
              <span className="text-xl font-bold uppercase tracking-wide text-white">
                {server.status === 'online' ? (lang === 'tr' ? 'Çevrimiçi (Gerçek Minecraft Sunucusu Açık)' : 'ONLINE') :
                 server.status === 'starting' ? (lang === 'tr' ? 'Gerçek Sunucu Başlatılıyor...' : 'STARTING...') :
                 server.status === 'stopping' ? (lang === 'tr' ? 'Durduruluyor...' : 'STOPPING...') :
                 (lang === 'tr' ? 'Çevrimdışı' : 'OFFLINE')}
              </span>
            </div>

            {/* Power Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {server.status === 'offline' ? (
                <button
                  onClick={handleStartServer}
                  className="btn-primary py-2.5 px-6 text-xs font-extrabold rounded-xl shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{lang === 'tr' ? 'Gerçek Sunucuyu Başlat' : 'Start Server'}</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleStopServer}
                    disabled={server.status !== 'online'}
                    className="btn-danger py-2.5 px-5 text-xs font-bold rounded-xl disabled:opacity-40"
                  >
                    <Square className="w-4 h-4 fill-white" />
                    <span>{lang === 'tr' ? 'Gerçek Sunucuyu Durdur' : 'Stop'}</span>
                  </button>

                  <button
                    onClick={handleRestartServer}
                    disabled={server.status !== 'online'}
                    className="btn-warning py-2.5 px-5 text-xs font-bold rounded-xl disabled:opacity-40"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>{lang === 'tr' ? 'Yeniden Başlat' : 'Restart'}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            
            {/* RAM Meter */}
            <div className="bg-black/40 border border-white/10 p-3.5 rounded-xl text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-gray-400 mb-1">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>GERÇEK RAM</span>
              </div>
              <div className="text-lg font-mono font-extrabold text-white">
                {server.status === 'online' ? server.ramUsage : '0.0'} / {server.ram || 2} GB
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-500" 
                  style={{ width: `${server.status === 'online' ? ((server.ramUsage || 0.8) / (server.ram || 2)) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* CPU Meter */}
            <div className="bg-black/40 border border-white/10 p-3.5 rounded-xl text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-gray-400 mb-1">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>CPU YÜKÜ</span>
              </div>
              <div className="text-lg font-mono font-extrabold text-cyan-400">
                {server.status === 'online' ? `${server.cpuUsage}%` : '0%'}
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-500" 
                  style={{ width: `${server.status === 'online' ? server.cpuUsage : 0}%` }}
                />
              </div>
            </div>

            {/* TPS Meter */}
            <div className="bg-black/40 border border-white/10 p-3.5 rounded-xl text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-gray-400 mb-1">
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                <span>TPS</span>
              </div>
              <div className="text-lg font-mono font-extrabold text-amber-400">
                {server.status === 'online' ? (server.tps || 20.0) : '0.0'}
              </div>
              <span className="text-[10px] text-emerald-400 font-bold block mt-1">Target: 20.0</span>
            </div>

            {/* Players Meter */}
            <div className="bg-black/40 border border-white/10 p-3.5 rounded-xl text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-gray-400 mb-1">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>OYUNCU</span>
              </div>
              <div className="text-lg font-mono font-extrabold text-white">
                {server.status === 'online' ? (server.onlinePlayers || 0) : 0} / {server.maxPlayers || 20}
              </div>
              <span className="text-[10px] text-gray-400 font-bold block mt-1">Aktif Sınır</span>
            </div>

          </div>

        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'console', label: lang === 'tr' ? 'Gerçek Canlı Konsol' : 'Live Console', icon: Terminal },
            { id: 'players', label: lang === 'tr' ? 'Oyuncular' : 'Players', icon: Users, badge: server.onlinePlayers },
            { id: 'plugins', label: lang === 'tr' ? 'Eklentiler / Plugins' : 'Plugins', icon: Box, badge: server.plugins ? server.plugins.length : 0 },
            { id: 'files', label: lang === 'tr' ? 'Dosyalar & Ayarlar' : 'Files & Config', icon: FileText },
            { id: 'backups', label: lang === 'tr' ? 'Yedekleme' : 'Backups', icon: HardDrive }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-500 text-black font-extrabold shadow-lg shadow-emerald-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-emerald-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* ACTIVE TAB CONTENT VIEW */}
      <div>
        {activeTab === 'console' && (
          <ConsoleTab
            server={server}
            onExecuteCommand={handleExecuteCommand}
            onClearLogs={handleClearLogs}
            lang={lang}
          />
        )}

        {activeTab === 'players' && (
          <PlayersTab
            server={server}
            onUpdateServer={onUpdateServer}
            lang={lang}
          />
        )}

        {activeTab === 'plugins' && (
          <PluginsTab
            server={server}
            onUpdateServer={onUpdateServer}
            lang={lang}
          />
        )}

        {activeTab === 'files' && (
          <FilesTab
            server={server}
            onUpdateServer={onUpdateServer}
            lang={lang}
          />
        )}

        {activeTab === 'backups' && (
          <BackupsTab
            server={server}
            onUpdateServer={onUpdateServer}
            lang={lang}
          />
        )}
      </div>

      {/* CONNECTION TROUBLESHOOTING HELP MODAL */}
      {showHelpModal && (
        <div className="modal-backdrop">
          <div className="glass-panel w-full max-w-xl p-6 relative border-amber-500/40 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold">
                  ⚠️
                </div>
                <h3 className="font-bold text-lg text-white">
                  {lang === 'tr' ? 'Bilinmeyen Sunucu (Unknown Host) Çözüm Rehberi' : 'Unknown Host Troubleshooting'}
                </h3>
              </div>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300">
                <strong className="block text-sm mb-1 text-amber-400">Neden "Bilinmeyen Sunucu" Hatası Veriyor?</strong>
                Minecraft'a girerken adres kısmına <code className="bg-black/60 px-2 py-0.5 rounded text-emerald-400 font-mono">localhost</code> yazmalısınız.
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">1. Oyundan Katılma Adresi:</h4>
                <p>Minecraft'ı açıp IP kısmına <code className="bg-black/60 px-2 py-0.5 rounded text-emerald-400 font-mono">localhost</code> veya <code className="bg-black/60 px-2 py-0.5 rounded text-emerald-400 font-mono">127.0.0.1</code> yazarak bağlanabilirsiniz.</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">2. Sürüm Uyumsuzluğu:</h4>
                <p>Minecraft oyununuzu <strong>1.12.2</strong> sürümü ile açtığınızdan emin olun.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-right">
              <button
                onClick={() => setShowHelpModal(false)}
                className="btn-primary py-2 px-5 text-xs font-bold rounded-xl"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
