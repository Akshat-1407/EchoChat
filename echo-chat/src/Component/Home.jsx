import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "./AuthWrapper";
import ChatPanel from './ChatPanel.jsx';
import ChatWindow from "./ChatWindow.jsx"
import Profile from './Profile.jsx';
import { useState, useEffect } from 'react';

function Home() {
  const { currUser } = useAuth();
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [mobileView, setMobileView] = useState('chatPanel'); // 'chatPanel', 'chatWindow', 'profile'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('appTheme');
    return savedTheme ?? 'light';
  }); // 'light' or 'dark'


  if (currUser == null) {
    navigate("/login")
  }


  // Update mobile view when chatId changes
  useEffect(() => {
    if (chatId && window.innerWidth < 768) {
      setMobileView('chatWindow');
    }
  }, [chatId]);


  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const handleOpenProfile = () => {
    setMobileView('profile');
  };

  const handleOpenChat = () => {
    setMobileView('chatWindow');
  };

  const handleBackFromChat = () => {
    setMobileView('chatPanel');
  };

  const handleBackFromProfile = () => {
    setMobileView('chatPanel');
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };


  return (
    <div className={`flex h-screen overflow-y-hidden ${theme === 'dark'
        ? 'bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e3a4a]'
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
      }`}>
        
      {/* Desktop/Tablet View */}
      <div className="hidden md:flex w-full">
        <ChatPanel onOpenProfile={handleOpenProfile} onOpenChat={handleOpenChat} theme={theme} onThemeToggle={toggleTheme}></ChatPanel>
        <ChatWindow onBack={handleBackFromChat} theme={theme}></ChatWindow>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full">
        {mobileView === 'chatPanel' && (
          <ChatPanel onOpenProfile={handleOpenProfile} onOpenChat={handleOpenChat} theme={theme} onThemeToggle={toggleTheme}></ChatPanel>
        )}
        {mobileView === 'chatWindow' && (
          <ChatWindow onBack={handleBackFromChat} theme={theme}></ChatWindow>
        )}
        {mobileView === 'profile' && (
          <Profile onBack={handleBackFromProfile}></Profile>
        )}
      </div>
    </div>
  )
}

export default Home