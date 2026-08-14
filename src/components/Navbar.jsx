import React from 'react';
import { Server, Plus, Globe, Shield, Terminal, Zap, Coins, HardDrive } from 'lucide-react';

export default function Navbar({ 
  servers, 
  activeServer, 
  onNavigateHome, 
  onNavigateDashboard, 
  onOpenCreateModal, 
  lang, 
  onToggleLang 
}) {
  const onlineCount = servers.filter(s => s.status === 'online').length;

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/80 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-all">
            <Server className="w-6 h-6 text-slate-950 font-bold" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Craft<span className="text-emerald-400">Host</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-md uppercase tracking-wider">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium hidden sm:block">
              {lang === 'tr' ? 'Minecraft Sunucu Hosting' : 'Minecraft Server Hosting'}
            </p>
          </div>
        </div>

        {/* Center Quick Stats */}
        <div className="hidden md:flex items-center gap-6 bg-white/[0.03] border border-white/5 px-4 py-1.5 rounded-full text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <span className="status-dot status-online" />
            <span className="font-semibold text-white">{onlineCount} / {servers.length}</span>
            <span className="text-gray-400">{lang === 'tr' ? 'Çevrimiçi Sunucu' : 'Online Servers'}</span>
          </div>
          <div className="w-px h-3.5 bg-white/10" />
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <Zap className="w-3.5 h-3.5" />
            <span>NVMe SSD Turbo Node</span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* User Servers Switcher Dropdown / Dashboard Button */}
          {servers.length > 0 && (
            <button
              onClick={() => onNavigateDashboard(servers[0].id)}
              className="flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-200 transition-all"
            >
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">
                {lang === 'tr' ? 'Sunucularım' : 'My Servers'} ({servers.length})
              </span>
            </button>
          )}

          {/* Create New Server Button */}
          <button
            onClick={onOpenCreateModal}
            className="btn-primary py-2 px-4 text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'tr' ? 'Sunucu Aç' : 'Create Server'}</span>
          </button>

          {/* Language Switcher Button */}
          <button
            onClick={onToggleLang}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 transition-all flex items-center gap-1.5"
            title="Dil Değiştir / Change Language"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="uppercase text-[11px] font-bold">{lang}</span>
          </button>

        </div>

      </div>
    </header>
  );
}
