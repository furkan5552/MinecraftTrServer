import React, { useState } from 'react';
import { POPULAR_PLUGINS } from '../../data/mockData';
import { Download, Check, Trash2, Search, Sparkles, Layers, Box } from 'lucide-react';

export default function PluginsTab({ server, onUpdateServer, lang }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const installedPlugins = server.plugins || [];

  const handleTogglePlugin = (pluginId, pluginName) => {
    let updatedPlugins;
    let logMessage;

    if (installedPlugins.includes(pluginId)) {
      updatedPlugins = installedPlugins.filter(p => p !== pluginId);
      logMessage = `[SYSTEM]: Uninstalled plugin ${pluginName}`;
    } else {
      updatedPlugins = [...installedPlugins, pluginId];
      logMessage = `[SYSTEM]: Installed plugin ${pluginName} to plugins/ directory`;
    }

    onUpdateServer({
      ...server,
      plugins: updatedPlugins,
      consoleLogs: [
        ...server.consoleLogs,
        { id: Date.now(), type: 'info', text: logMessage }
      ]
    });
  };

  const categories = ['All', 'Genel / Admin', 'Yapı / Harita', 'Ekonomi / Altyapı', 'Performans'];

  const filteredPlugins = POPULAR_PLUGINS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'tr' ? 'Eklenti ara (Essentials, WorldEdit...)' : 'Search plugin...'}
            className="custom-input pl-9 py-2 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-emerald-500 text-black font-extrabold' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Installed Count Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Box className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="font-bold text-sm text-white">
              {lang === 'tr' ? 'Kurulu Eklentiler' : 'Installed Plugins'}
            </div>
            <div className="text-xs text-emerald-400 font-mono">
              /plugins/ ({installedPlugins.length} {lang === 'tr' ? 'eklenti aktif' : 'active'})
            </div>
          </div>
        </div>

        <span className="text-xs font-bold bg-emerald-500 text-black px-3 py-1 rounded-full uppercase">
          Paper / Spigot Compatible
        </span>
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlugins.map((plugin) => {
          const isInstalled = installedPlugins.includes(plugin.id);

          return (
            <div
              key={plugin.id}
              className={`glass-panel p-5 flex flex-col justify-between transition-all ${
                isInstalled ? 'border-emerald-500/40 bg-emerald-950/20' : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-white text-base flex items-center gap-2">
                      {plugin.name}
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 text-gray-300 rounded">
                        v{plugin.version}
                      </span>
                    </h4>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {plugin.category}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-gray-500">
                    ⬇ {plugin.installs}
                  </span>
                </div>

                <p className="text-xs text-gray-300 my-3 leading-relaxed">
                  {plugin.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-mono">
                  {isInstalled ? '✓ Kurulu' : 'Hazır'}
                </span>

                <button
                  onClick={() => handleTogglePlugin(plugin.id, plugin.name)}
                  className={`py-1.5 px-4 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isInstalled
                      ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30'
                      : 'btn-primary'
                  }`}
                >
                  {isInstalled ? (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === 'tr' ? 'Kaldır' : 'Uninstall'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === 'tr' ? '1-Tıkla Yükle' : '1-Click Install'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
