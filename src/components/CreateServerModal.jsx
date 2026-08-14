import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  SOFTWARE_OPTIONS, 
  MINECRAFT_VERSIONS, 
  TEMPLATES 
} from '../data/mockData';
import { 
  X, 
  Check, 
  Server, 
  Cpu, 
  Globe, 
  Layers, 
  Sparkles, 
  Zap, 
  Loader2, 
  ArrowRight,
  HardDrive,
  Terminal,
  CheckCircle2
} from 'lucide-react';

export default function CreateServerModal({ onClose, onCreateServer, initialPlan, lang }) {
  const [step, setStep] = useState(1);
  const [serverName, setServerName] = useState('Benim Minecraft Sunucum');
  const [subdomain, setSubdomain] = useState('myserver' + Math.floor(Math.random() * 900 + 100));
  const [motd, setMotd] = useState('§a§lEFSANE SURVIVAL §7| §fSunucumuza Hoşgeldiniz!');
  
  const [software, setSoftware] = useState('paper');
  const [version, setVersion] = useState('1.20.4');
  const [template, setTemplate] = useState('survival');
  const [ram, setRam] = useState(initialPlan ? initialPlan.ram : 4);
  const [region, setRegion] = useState('Istanbul (TR)');

  // Provisioning state
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);

  const stepsList = [
    { num: 1, label: lang === 'tr' ? 'Genel Bilgiler' : 'General Info' },
    { num: 2, label: lang === 'tr' ? 'Yazılım & Sürüm' : 'Software & Version' },
    { num: 3, label: lang === 'tr' ? 'Şablon Seçimi' : 'Gamemode Template' },
    { num: 4, label: lang === 'tr' ? 'Donanım & Bölge' : 'Hardware & Region' }
  ];

  const handleStartDeploy = () => {
    setIsDeploying(true);
    setDeployStep(1);

    // Simulate 5 step provisioning loader
    setTimeout(() => setDeployStep(2), 700);
    setTimeout(() => setDeployStep(3), 1500);
    setTimeout(() => setDeployStep(4), 2300);
    setTimeout(() => {
      setDeployStep(5);
      
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch(e) {}

      // Create new server object
      const newServer = {
        id: 'srv-' + Math.random().toString(36).substring(2, 9),
        name: serverName || 'Minecraft Server',
        subdomain: `${subdomain.toLowerCase().replace(/[^a-z0-9]/g, '')}.crafthost.net`,
        ip: `185.240.10.${Math.floor(Math.random() * 200 + 10)}:25565`,
        software: software,
        version: version,
        ram: Number(ram),
        cpu: ram >= 8 ? 4 : 2,
        disk: ram * 10,
        status: 'online',
        motd: motd,
        region: region,
        createdDate: new Date().toISOString().split('T')[0],
        maxPlayers: ram * 10,
        onlinePlayers: 1,
        tps: 20.0,
        ramUsage: (ram * 0.35).toFixed(1),
        cpuUsage: 12,
        plugins: ['essentials', 'worldedit', 'vault'],
        players: [
          { name: 'Kurucu_Player', uuid: 'p1-owner', ping: 12, isOp: true, isBanned: false }
        ],
        properties: {
          gamemode: template === 'creative' ? 'creative' : 'survival',
          difficulty: 'normal',
          pvp: true,
          maxPlayers: ram * 10,
          onlineMode: true,
          spawnProtection: 16,
          allowFlight: template === 'creative',
          enableCommandBlock: true,
          viewDistance: 10
        },
        consoleLogs: [
          { id: 1, type: 'info', text: `[SYSTEM]: Initializing server allocation in ${region}...` },
          { id: 2, type: 'info', text: `[SYSTEM]: Reserved subdomain ${subdomain}.crafthost.net` },
          { id: 3, type: 'info', text: `[SYSTEM]: Downloading ${software.toUpperCase()} v${version} build...` },
          { id: 4, type: 'success', text: `[SYSTEM]: Auto-accepted EULA & initialized server.properties` },
          { id: 5, type: 'info', text: `[SYSTEM]: Generated world seed with template preset: ${template}` },
          { id: 6, type: 'success', text: `[SYSTEM]: Done! Server online and listening on port 25565` }
        ]
      };

      setTimeout(() => {
        onCreateServer(newServer);
      }, 1000);

    }, 3200);
  };

  return (
    <div className="modal-backdrop">
      <div className="glass-panel w-full max-w-3xl overflow-hidden relative border-emerald-500/30 shadow-2xl shadow-emerald-500/10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {lang === 'tr' ? 'Yeni Minecraft Sunucusu Aç' : 'Create Minecraft Server'}
              </h2>
              <p className="text-xs text-gray-400">
                {lang === 'tr' ? 'Birkaç adımda ücretsiz sunucunu hemen aktifleştir.' : 'Deploy your server in 4 quick steps.'}
              </p>
            </div>
          </div>
          
          {!isDeploying && (
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Wizard Steps Bar */}
        {!isDeploying && (
          <div className="grid grid-cols-4 border-b border-white/10 bg-black/40 text-xs font-semibold text-center">
            {stepsList.map(s => (
              <div 
                key={s.num} 
                className={`py-3 px-2 border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  step === s.num 
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10' 
                    : step > s.num 
                    ? 'border-emerald-500/40 text-gray-300' 
                    : 'border-transparent text-gray-500'
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  step === s.num ? 'bg-emerald-400 text-black' : step > s.num ? 'bg-emerald-800 text-white' : 'bg-white/10 text-gray-400'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* PROVISIONING ANIMATION LOADER */}
          {isDeploying ? (
            <div className="py-10 space-y-6 text-center max-w-md mx-auto">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                <Server className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">
                  {lang === 'tr' ? 'Sunucu Hazırlanıyor...' : 'Deploying Your Server...'}
                </h3>
                <p className="text-xs text-emerald-400 font-mono">
                  {subdomain}.crafthost.net
                </p>
              </div>

              <div className="terminal-window p-4 text-left space-y-2 text-xs font-mono text-gray-300">
                <div className={`flex items-center gap-2 ${deployStep >= 1 ? 'text-emerald-400' : 'text-gray-600'}`}>
                  {deployStep >= 1 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>1. IP & Subdomain Tahsis Ediliyor...</span>
                </div>
                <div className={`flex items-center gap-2 ${deployStep >= 2 ? 'text-emerald-400' : deployStep === 1 ? 'text-amber-400' : 'text-gray-600'}`}>
                  {deployStep >= 2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : deployStep === 1 ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span className="w-3.5 h-3.5" />}
                  <span>2. {software.toUpperCase()} v{version} Çekirdeği İndiriliyor...</span>
                </div>
                <div className={`flex items-center gap-2 ${deployStep >= 3 ? 'text-emerald-400' : deployStep === 2 ? 'text-amber-400' : 'text-gray-600'}`}>
                  {deployStep >= 3 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : deployStep === 2 ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span className="w-3.5 h-3.5" />}
                  <span>3. eula.txt Onaylanıyor & Ayarlar Yapılandırılıyor...</span>
                </div>
                <div className={`flex items-center gap-2 ${deployStep >= 4 ? 'text-emerald-400' : deployStep === 3 ? 'text-amber-400' : 'text-gray-600'}`}>
                  {deployStep >= 4 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : deployStep === 3 ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span className="w-3.5 h-3.5" />}
                  <span>4. Dünya Seed Haritası Oluşturuluyor...</span>
                </div>
                <div className={`flex items-center gap-2 ${deployStep >= 5 ? 'text-emerald-400 font-bold' : 'text-gray-600'}`}>
                  {deployStep >= 5 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>5. Sunucu Başarıyla Çevrimiçi Yapıldı! 🚀</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: GENERAL INFO */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                      {lang === 'tr' ? 'Sunucu İsmi' : 'Server Name'}
                    </label>
                    <input 
                      type="text" 
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                      className="custom-input font-semibold"
                      placeholder="Örn: Efsane Survival TR"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                      {lang === 'tr' ? 'Özel Subdomain Adresi' : 'Custom Subdomain Address'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                        className="custom-input font-mono text-emerald-400 font-bold"
                        placeholder="sunucuadi"
                      />
                      <span className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-xs font-mono text-gray-300 shrink-0">
                        .crafthost.net
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {lang === 'tr' ? 'Oyuncularınız bu ücretsiz adres ile sunucunuza katılabilecek.' : 'Players will join using this free subdomain.'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                      {lang === 'tr' ? 'Sunucu MOTD (Açıklama Mesajı)' : 'Server MOTD Slogan'}
                    </label>
                    <input 
                      type="text" 
                      value={motd}
                      onChange={(e) => setMotd(e.target.value)}
                      className="custom-input font-mono text-xs"
                      placeholder="§aHoşgeldiniz!"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: SOFTWARE & VERSION */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-3">
                      {lang === 'tr' ? 'Sunucu Çekirdek Yazılımı' : 'Server Core Software'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SOFTWARE_OPTIONS.map((opt) => (
                        <div
                          key={opt.id}
                          onClick={() => setSoftware(opt.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                            software === opt.id 
                              ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md' 
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-xl p-1.5 bg-black/30 rounded-lg">{opt.icon}</span>
                          <div>
                            <div className="font-bold text-sm flex items-center gap-1.5">
                              {opt.name}
                              {opt.recommended && <span className="text-[9px] bg-emerald-500 text-black px-1.5 rounded font-extrabold">ÖNERİLEN</span>}
                            </div>
                            <div className="text-[11px] text-gray-400 line-clamp-2 mt-0.5">{opt.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-3">
                      {lang === 'tr' ? 'Minecraft Sürümü' : 'Minecraft Version'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {MINECRAFT_VERSIONS.map((v) => (
                        <button
                          key={v.version}
                          type="button"
                          onClick={() => setVersion(v.version)}
                          className={`p-3 rounded-xl border text-left font-mono transition-all ${
                            version === v.version 
                              ? 'bg-emerald-500 text-black font-extrabold border-emerald-400' 
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-sm">{v.version}</div>
                          <div className={`text-[10px] ${version === v.version ? 'text-slate-900' : 'text-gray-400'}`}>{v.tag}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: TEMPLATES */}
              {step === 3 && (
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
                    {lang === 'tr' ? 'Hazır Oyun Şablonu Seçin' : 'Select Ready Game Preset'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TEMPLATES.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => setTemplate(tmpl.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          template === tmpl.id 
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg' 
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-sm text-white">{tmpl.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md font-bold">
                            {tmpl.badge}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{tmpl.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: HARDWARE & REGION */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-gray-300 uppercase">
                        RAM {lang === 'tr' ? 'Kapasitesi' : 'Allocation'}
                      </label>
                      <span className="text-lg font-mono font-extrabold text-emerald-400">
                        {ram} GB DDR5 RAM
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-3 my-3">
                      {[2, 4, 8, 16].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRam(r)}
                          className={`p-3 rounded-xl border text-center font-mono font-bold transition-all ${
                            ram === r 
                              ? 'bg-emerald-500 text-black border-emerald-400' 
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {r} GB {r === 2 ? '(Free)' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-3">
                      {lang === 'tr' ? 'Sunucu Düğüm Bölgesi' : 'Node Region'}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'Istanbul (TR)', ping: '12ms', icon: '🇹🇷' },
                        { name: 'Frankfurt (EU)', ping: '24ms', icon: '🇩🇪' },
                        { name: 'N. Virginia (US)', ping: '84ms', icon: '🇺🇸' },
                        { name: 'Singapore (AS)', ping: '140ms', icon: '🇸🇬' }
                      ].map((reg) => (
                        <div
                          key={reg.name}
                          onClick={() => setRegion(reg.name)}
                          className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            region === reg.name 
                              ? 'bg-emerald-500/20 border-emerald-400 text-white' 
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{reg.icon}</span>
                            <span className="font-bold text-xs">{reg.name}</span>
                          </div>
                          <span className="text-xs font-mono text-emerald-400">{reg.ping}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Wizard Footer Navigation Controls */}
        {!isDeploying && (
          <div className="flex items-center justify-between p-6 border-t border-white/10 bg-white/[0.02]">
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)}
                className="btn-secondary py-2.5 px-5 text-xs font-bold"
              >
                {lang === 'tr' ? 'Geri' : 'Back'}
              </button>
            ) : <div />}

            {step < 4 ? (
              <button 
                onClick={() => setStep(step + 1)}
                className="btn-primary py-2.5 px-6 text-xs font-bold flex items-center gap-2"
              >
                <span>{lang === 'tr' ? 'İleri' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleStartDeploy}
                className="btn-primary py-3 px-8 text-xs font-extrabold shadow-lg shadow-emerald-500/30 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>{lang === 'tr' ? 'Sunucuyu Başlat ve Kur' : 'Deploy Server Now'}</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
