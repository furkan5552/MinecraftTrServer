import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CreateServerModal from './components/CreateServerModal';
import Dashboard from './components/Dashboard';

import { 
  getStoredServers, 
  saveStoredServers, 
  getStoredActiveServerId, 
  setStoredActiveServerId, 
  getStoredLang, 
  setStoredLang 
} from './utils/storage';

export default function App() {
  const [servers, setServers] = useState(() => getStoredServers());
  const [activeServerId, setActiveServerId] = useState(() => getStoredActiveServerId());
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'dashboard'
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState(null);
  
  const [lang, setLang] = useState(() => getStoredLang());

  // Save servers on state change
  useEffect(() => {
    saveStoredServers(servers);
  }, [servers]);

  // Save active server id
  useEffect(() => {
    setStoredActiveServerId(activeServerId);
  }, [activeServerId]);

  // Save lang preference
  useEffect(() => {
    setStoredLang(lang);
  }, [lang]);

  const handleToggleLang = () => {
    setLang(prev => prev === 'tr' ? 'en' : 'tr');
  };

  const handleOpenCreateModal = (plan = null) => {
    setSelectedPlanForModal(plan);
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setSelectedPlanForModal(null);
  };

  const handleCreateServer = (newServer) => {
    const updatedServers = [newServer, ...servers];
    setServers(updatedServers);
    setActiveServerId(newServer.id);
    setIsCreateModalOpen(false);
    setSelectedPlanForModal(null);
    setCurrentView('dashboard');
  };

  const handleSelectServer = (serverId) => {
    setActiveServerId(serverId);
    setCurrentView('dashboard');
  };

  const handleUpdateServer = (updatedServer) => {
    const updatedList = servers.map(s => s.id === updatedServer.id ? updatedServer : s);
    setServers(updatedList);
  };

  const activeServer = servers.find(s => s.id === activeServerId) || servers[0];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        servers={servers}
        activeServer={activeServer}
        onNavigateHome={() => setCurrentView('home')}
        onNavigateDashboard={(id) => handleSelectServer(id)}
        onOpenCreateModal={() => handleOpenCreateModal()}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' || !activeServer ? (
          <LandingPage
            servers={servers}
            onOpenCreateModal={handleOpenCreateModal}
            onSelectServer={handleSelectServer}
            lang={lang}
          />
        ) : (
          <Dashboard
            server={activeServer}
            onUpdateServer={handleUpdateServer}
            onBackToHome={() => setCurrentView('home')}
            lang={lang}
          />
        )}
      </main>

      {/* Server Creation Modal */}
      {isCreateModalOpen && (
        <CreateServerModal
          onClose={handleCloseCreateModal}
          onCreateServer={handleCreateServer}
          initialPlan={selectedPlanForModal}
          lang={lang}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-xs text-gray-500 bg-[#06090e]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-300">CraftHost</span>
            <span>© 2026 Minecraft Server Hosting & Node Management</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400 font-mono">
            <span>AMD Ryzen™ 9 7950X</span>
            <span>•</span>
            <span>PaperMC / Spigot / Forge</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">100% Free Tier</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
