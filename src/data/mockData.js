export const SOFTWARE_OPTIONS = [
  { id: 'paper', name: 'PaperMC', desc: 'En popüler, yüksek performanslı ve eklenti destekli sunucu çekirdeği.', icon: '⚡', recommended: true },
  { id: 'spigot', name: 'Spigot', desc: 'Geleneksel Bukkit/Spigot eklenti ekosistemi desteği.', icon: '🛠️' },
  { id: 'purpur', name: 'Purpur', desc: 'Paper tabanlı ultra yüksek özelleştirilebilir performans çekirdeği.', icon: '💜' },
  { id: 'fabric', name: 'Fabric', desc: 'Hafif ve modern mod desteği sunan yeni nesil çekirdek.', icon: '🧵' },
  { id: 'forge', name: 'Forge', desc: 'Kapsamlı mod paketleri (Pixelmon, RLcraft vb.) için ideal.', icon: '🔨' },
  { id: 'vanilla', name: 'Vanilla', desc: 'Mojang orijinal saf Minecraft sunucu yazılımı.', icon: '🟩' },
  { id: 'bedrock', name: 'Bedrock / Geyser', desc: 'Mobil, Console ve PC Bedrock oyuncuları için çapraz destek.', icon: '📱' }
];

export const MINECRAFT_VERSIONS = [
  { version: '1.20.4', tag: 'En Yeni Kararlı', release: '2024' },
  { version: '1.20.1', tag: 'Popüler Mod Sürümü', release: '2023' },
  { version: '1.19.4', tag: 'Wild Update', release: '2023' },
  { version: '1.16.5', tag: 'Nether Update (Mod Klasik)', release: '2021' },
  { version: '1.12.2', tag: 'Efsane ModPaketleri', release: '2017' },
  { version: '1.8.8', tag: 'PvP & BedWars Klasik', release: '2015' }
];

export const TEMPLATES = [
  { id: 'survival', name: 'Gelişmiş Survival', desc: 'Ekonomi, Arazi İddiası (Claim), Market ve EssentialsX hazır.', badge: 'En Çok Tercih Edilen' },
  { id: 'skyblock', name: 'Skyblock Nexus', desc: 'Özel adalar, Görevler, Minionlar ve Açık Artırma sistemi.', badge: 'Popüler' },
  { id: 'bedwars', name: 'BedWars Arenası', desc: 'Çoklu arena sistemi, Kitler, Jeneratörler ve Köylü Market.', badge: 'Minigame' },
  { id: 'factions', name: 'Factions / Klanlar', desc: 'Klan savaşları, Orman, Toprak ele geçirme ve Savaş alanı.', badge: 'Hardcore' },
  { id: 'creative', name: 'Yaratıcı / Arsa', desc: 'Sınırsız blok, PlotSquared arsa sistemi ve WorldEdit.', badge: 'Yapı' },
  { id: 'vanilla_raw', name: 'Saf Saf Survival', desc: 'Eklentisiz, arkadaşlarınla saf varsayılan Minecraft deneyimi.', badge: 'Orijinal' }
];

export const HOSTING_PLANS = [
  {
    id: 'free',
    name: 'Ücretsiz Deneme',
    price: '0₺',
    period: 'Sonsuza Kadar Ücretsiz',
    ram: 2,
    cpu: 1,
    ssd: 10,
    players: 10,
    features: ['2 GB DDR5 RAM', '1 vCPU Çekirdek', '10 GB NVMe Disk', 'DDoS Koruması', 'Ücretsiz Subdomain'],
    badge: '100% Ücretsiz',
    recommended: false,
    color: 'emerald'
  },
  {
    id: 'starter',
    name: 'Başlangıç Paket',
    price: '89₺',
    period: '/ay',
    ram: 4,
    cpu: 2,
    ssd: 25,
    players: 30,
    features: ['4 GB DDR5 RAM', '2 vCPU Çekirdek', '25 GB NVMe Disk', '7/24 Kesintisiz', 'Otomatik Saatlik Yedek', 'Tüm Eklentiler Desteklenir'],
    badge: 'Başlangıç',
    recommended: true,
    color: 'cyan'
  },
  {
    id: 'pro',
    name: 'Pro Gamer',
    price: '169₺',
    period: '/ay',
    ram: 8,
    cpu: 4,
    ssd: 60,
    players: 100,
    features: ['8 GB High-Perf RAM', '4 vCPU Çekirdek', '60 GB High-Speed NVMe', 'Özel Domain Bağlama', 'Öncelikli Destek', 'Sınırsız Eklenti'],
    badge: 'Popüler Seçim',
    recommended: false,
    color: 'purple'
  },
  {
    id: 'extreme',
    name: 'Extreme Dedicated',
    price: '299₺',
    period: '/ay',
    ram: 16,
    cpu: 8,
    ssd: 120,
    players: 500,
    features: ['16 GB DDR5 Enterprise RAM', '8 vCPU AMD Ryzen 9', '120 GB NVMe Gen4 SSD', 'Özel IP Adresi', 'Sınırsız Oyuncu Kapasitesi', '7/24 Canlı Destek'],
    badge: 'Maksimum Güç',
    recommended: false,
    color: 'amber'
  }
];

export const POPULAR_PLUGINS = [
  { id: 'essentials', name: 'EssentialsX', version: '2.20.1', category: 'Genel / Admin', desc: '/spawn, /tpa, /warp, /home ve ekonomi komutları.', installs: '4.2M' },
  { id: 'worldedit', name: 'WorldEdit', version: '7.3.0', category: 'Yapı / Harita', desc: 'Oyun içi hızlı blok koyma ve küre/silindir harita düzenleyici.', installs: '5.1M' },
  { id: 'vault', name: 'Vault', version: '1.7.3', category: 'Ekonomi / Altyapı', desc: 'Eklentiler arası ekonomi ve yetki köprüsü altyapısı.', installs: '3.8M' },
  { id: 'luckperms', name: 'LuckPerms', version: '5.4.102', category: 'Yetki / VIP', desc: 'Gelişmiş rütbe, VIP ve oyuncu yetki yönetim sistemi.', installs: '2.9M' },
  { id: 'dynmap', name: 'Dynmap', version: '3.6', category: 'Harita / Web', desc: 'Sunucu dünyanızı tarayıcıda canlı 2D/3D harita olarak görüntüler.', installs: '1.9M' },
  { id: 'viaversion', name: 'ViaVersion', version: '4.9.2', category: 'Çapraz Sürüm', desc: 'Farklı Minecraft sürümlerindeki oyuncuların katılmasına izin verir.', installs: '3.1M' },
  { id: 'clearlag', name: 'ClearLag', version: '3.1.6', category: 'Performans', desc: 'Yere düşen eşyaları temizleyerek sunucu TPS performansını artırır.', installs: '2.4M' },
  { id: 'multiverse', name: 'Multiverse-Core', version: '4.3.1', category: 'Dünya Yönetimi', desc: 'Aynı sunucuda birden fazla dünya (Nether, End, Arsa) oluşturma.', installs: '2.7M' },
  { id: 'holograms', name: 'HolographicDisplays', version: '3.0.4', category: 'Görsel', desc: 'Havada süzülen renkli 3D metin yazıları ve istatistik panoları.', installs: '1.8M' },
  { id: 'citizens', name: 'Citizens', version: '2.0.32', category: 'NPC / Köylü', desc: 'Tıklanabilir özel görev verici ve tüccar NPC karakterleri.', installs: '1.6M' }
];

export const INITIAL_SERVERS = [
  {
    id: 'srv-efsane-01',
    name: 'Efsane Survival TR',
    subdomain: 'efsanesurvival.crafthost.net',
    ip: '185.240.10.42:25565',
    software: 'paper',
    version: '1.20.4',
    ram: 4,
    cpu: 2,
    disk: 25,
    status: 'online', // 'online', 'offline', 'starting', 'stopping'
    motd: '§a§lEFSANE SURVIVAL §7| §e1.20.4 §7| §fEtkinlik Başladı!',
    region: 'Istanbul (TR)',
    createdDate: '2026-08-14',
    maxPlayers: 30,
    onlinePlayers: 12,
    tps: 20.0,
    ramUsage: 2.1,
    cpuUsage: 14,
    plugins: ['essentials', 'worldedit', 'vault', 'luckperms', 'clearlag'],
    players: [
      { name: 'CraftMaster_TR', uuid: 'a1-b2-c3', ping: 14, isOp: true, isBanned: false },
      { name: 'Ahmet_PvP', uuid: 'd4-e5-f6', ping: 22, isOp: false, isBanned: false },
      { name: 'CreeperHunter99', uuid: 'g7-h8-i9', ping: 35, isOp: false, isBanned: false },
      { name: 'Mehmet123', uuid: 'j1-k2-l3', ping: 18, isOp: false, isBanned: false },
      { name: 'Ece_Builder', uuid: 'm4-n5-o6', ping: 26, isOp: false, isBanned: false }
    ],
    properties: {
      gamemode: 'survival',
      difficulty: 'normal',
      pvp: true,
      maxPlayers: 30,
      onlineMode: true,
      spawnProtection: 16,
      allowFlight: false,
      enableCommandBlock: true,
      viewDistance: 10
    },
    consoleLogs: [
      { id: 1, type: 'info', text: '[12:00:01 INFO]: Loading libraries, please wait...' },
      { id: 2, type: 'info', text: '[12:00:04 INFO]: Starting minecraft server version 1.20.4' },
      { id: 3, type: 'info', text: '[12:00:05 INFO]: Loading properties & eula.txt' },
      { id: 4, type: 'success', text: '[12:00:07 SUCCESS]: PaperMC Server successfully initialized!' },
      { id: 5, type: 'info', text: '[12:00:08 INFO]: Preparing level "world"' },
      { id: 6, type: 'info', text: '[12:00:10 INFO]: Enabling plugin EssentialsX v2.20.1' },
      { id: 7, type: 'info', text: '[12:00:11 INFO]: Enabling plugin WorldEdit v7.3.0' },
      { id: 8, type: 'success', text: '[12:00:12 SUCCESS]: Done (7.432s)! For help, type "help"' },
      { id: 9, type: 'join', text: '[12:05:22 INFO]: CraftMaster_TR[/185.240.10.42:52104] logged in with entity id 104' },
      { id: 10, type: 'join', text: '[12:06:14 INFO]: Ahmet_PvP[/88.230.12.19:60211] logged in with entity id 108' }
    ]
  }
];
