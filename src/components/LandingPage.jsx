import React, { useState } from 'react';
import { 
  HOSTING_PLANS, 
  SOFTWARE_OPTIONS, 
  POPULAR_PLUGINS 
} from '../data/mockData';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Check, 
  Server, 
  ArrowRight, 
  Sparkles, 
  Activity, 
  Radio, 
  Download, 
  Layers, 
  Play, 
  Globe,
  Gauge
} from 'lucide-react';

export default function LandingPage({ 
  servers, 
  onOpenCreateModal, 
  onSelectServer, 
  lang 
}) {
  const [testingPing, setTestingPing] = useState(false);
  const [pingData, setPingData] = useState([
    { region: 'Istanbul, TR', ms: 14, status: 'Ultra Low' },
    { region: 'Frankfurt, DE', ms: 24, status: 'Optimal' },
    { region: 'N. Virginia, US', ms: 86, status: 'Good' },
    { region: 'Singapore, SG', ms: 142, status: 'Fair' }
  ]);

  const handleRunPingTest = () => {
    setTestingPing(true);
    setTimeout(() => {
      setPingData(prev => prev.map(p => ({
        ...p,
        ms: Math.floor(Math.random() * 10) + (p.region.includes('TR') ? 10 : p.region.includes('DE') ? 20 : 80)
      })));
      setTestingPing(false);
    }, 800);
  };

  return (
    <div className="min-h-screen pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Background Decorative Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold tracking-wide uppercase shadow-inner">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>{lang === 'tr' ? 'Yeni Nesil DDR5 NVMe Sunucular' : 'Next-Gen DDR5 NVMe Servers'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
            {lang === 'tr' ? (
              <>
                Saniyeler İçinde <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500 bg-clip-text text-transparent">Minecraft Sunucunu</span> Kur!
              </>
            ) : (
              <>
                Deploy Your <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500 bg-clip-text text-transparent">Minecraft Server</span> in Seconds
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-normal max-w-2xl mx-auto leading-relaxed">
            {lang === 'tr' 
              ? ' PaperMC, Spigot, Forge ve Bedrock desteği, 1-Tıkla eklenti marketi, ücretsiz subdomain ve gelişmiş web konsolu ile arkadaşlarınla hemen oyna.'
              : ' Full PaperMC, Spigot, Forge & Bedrock support. 1-Click plugin store, free subdomain and web console. Play with friends instantly.'
            }
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenCreateModal()}
              className="btn-primary py-4 px-8 text-base font-extrabold rounded-2xl shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all flex items-center gap-3"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>{lang === 'tr' ? 'Ücretsiz Sunucu Oluştur' : 'Create Free Server'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {servers.length > 0 && (
              <button
                onClick={() => onSelectServer(servers[0].id)}
                className="btn-secondary py-4 px-8 text-base font-bold rounded-2xl flex items-center gap-3"
              >
                <Server className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'tr' ? 'Paneline Git' : 'Go to Control Panel'}</span>
              </button>
            )}
          </div>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-white/10 max-w-3xl mx-auto">
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-white font-mono">14,250+</div>
              <div className="text-xs text-gray-400 font-medium">{lang === 'tr' ? 'Kurulan Sunucu' : 'Servers Created'}</div>
            </div>
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono">99.99%</div>
              <div className="text-xs text-gray-400 font-medium">{lang === 'tr' ? 'Uptime Süresi' : 'Guaranteed Uptime'}</div>
            </div>
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-cyan-400 font-mono">0.2s</div>
              <div className="text-xs text-gray-400 font-medium">{lang === 'tr' ? 'Kurulum Hızı' : 'Deployment Time'}</div>
            </div>
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono">4.8 Tbps</div>
              <div className="text-xs text-gray-400 font-medium">{lang === 'tr' ? 'DDoS Koruması' : 'DDoS Protection'}</div>
            </div>
          </div>

        </div>
      </section>

      {/* USER'S EXISTING SERVERS SECTION (if any) */}
      {servers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">
                {lang === 'tr' ? 'Mevcut Sunucularım' : 'My Active Servers'}
              </h2>
            </div>
            <span className="text-xs text-gray-400">
              {servers.length} {lang === 'tr' ? 'adet sunucu kayıtlı' : 'server(s) registered'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servers.map(server => (
              <div
                key={server.id}
                onClick={() => onSelectServer(server.id)}
                className="glass-panel p-5 cursor-pointer glass-panel-hover group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                      {server.name}
                    </h3>
                    <p className="text-xs text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                      <Globe className="w-3 h-3" />
                      {server.subdomain || server.ip}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-dot ${
                      server.status === 'online' ? 'status-online' : 
                      server.status === 'starting' ? 'status-starting' : 'status-offline'
                    }`} />
                    <span className="text-xs font-semibold capitalize text-gray-300">
                      {server.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-black/30 p-2.5 rounded-xl text-xs text-gray-300 my-3 font-mono">
                  <div>
                    <span className="text-[10px] text-gray-500 block">SÜRÜM</span>
                    <span className="font-bold text-white">{server.version}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">RAM</span>
                    <span className="font-bold text-emerald-400">{server.ram} GB</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">OYUNCU</span>
                    <span className="font-bold text-white">{server.onlinePlayers}/{server.maxPlayers}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold pt-2 border-t border-white/5">
                  <span>{lang === 'tr' ? 'Yönetim Paneline Git' : 'Open Dashboard'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HOSTING TIERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 my-20">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'tr' ? 'Esnek Hosting Paketleri' : 'Flexible Server Hosting Plans'}
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            {lang === 'tr'
              ? 'İster arkadaşlarınla eğlenmek için ücretsiz sunucu aç, ister binlerce oyuncuya hitap eden gelişmiş topluluk sunucunu kur.'
              : 'Choose a plan that fits your community, from free servers for friends to dedicated high-performance nodes.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOSTING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`glass-panel p-6 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1 ${
                plan.recommended 
                  ? 'border-emerald-500/60 shadow-xl shadow-emerald-500/10 bg-emerald-950/20' 
                  : 'hover:border-white/20'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <span className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-300 font-mono">
                    {plan.ram} GB RAM
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-extrabold text-white font-mono">{plan.price}</span>
                  <span className="text-xs text-gray-400 font-medium">{plan.period}</span>
                </div>

                <ul className="space-y-3 my-6 text-xs text-gray-300">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenCreateModal(plan)}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  plan.id === 'free'
                    ? 'btn-primary'
                    : plan.recommended
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                    : 'btn-secondary'
                }`}
              >
                <span>{plan.id === 'free' ? (lang === 'tr' ? 'Ücretsiz Kur' : 'Create Free') : (lang === 'tr' ? 'Paketi Seç' : 'Select Plan')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PING TEST & NODES SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 my-20">
        <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
                <span>{lang === 'tr' ? 'Küresel Sunucu Lokasyonları' : 'Global Low-Latency Nodes'}</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                {lang === 'tr' ? '0 Lag & Ultra Düşük Gecikme' : 'Zero Lag & Ultra Low Ping'}
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {lang === 'tr'
                  ? 'Türkiye (İstanbul) ve Avrupa (Frankfurt) lokasyonlu AMD Ryzen 9 7950X sunucularımız ile kesintisiz Minecraft deneyimini yaşayın.'
                  : 'Experience lag-free gaming powered by AMD Ryzen 9 7950X CPUs hosted in Europe and Turkey.'}
              </p>

              <button
                onClick={handleRunPingTest}
                disabled={testingPing}
                className="btn-secondary py-2.5 px-5 text-xs font-bold rounded-xl flex items-center gap-2"
              >
                <Activity className={`w-4 h-4 text-emerald-400 ${testingPing ? 'animate-spin' : ''}`} />
                <span>{testingPing ? (lang === 'tr' ? 'Ölçülüyor...' : 'Testing...') : (lang === 'tr' ? 'Canlı Ping Testi Yap' : 'Test Node Ping')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pingData.map((p, idx) => (
                <div key={idx} className="bg-black/40 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-sm block">{p.region}</span>
                    <span className="text-[11px] text-gray-400">{p.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-extrabold text-emerald-400">{p.ms} ms</span>
                    <span className="block w-2 h-2 bg-emerald-400 rounded-full ml-auto mt-1 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SOFTWARE OPTIONS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 my-20">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-extrabold text-white">
            {lang === 'tr' ? 'Tüm Minecraft Yazılımları Desteklenir' : 'Supported Server Softwares'}
          </h2>
          <p className="text-sm text-gray-400">
            {lang === 'tr' ? 'Tek tıkla istediğin Minecraft çekirdeğini yükle ve değiştir.' : 'Switch between Paper, Spigot, Fabric and Forge with 1-click.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {SOFTWARE_OPTIONS.map((soft) => (
            <div key={soft.id} className="glass-panel p-4 flex items-start gap-3">
              <span className="text-2xl p-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
                {soft.icon}
              </span>
              <div>
                <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                  {soft.name}
                  {soft.recommended && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono uppercase">En İyisi</span>}
                </h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{soft.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
