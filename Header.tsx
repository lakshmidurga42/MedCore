import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  User as UserIcon, 
  Info, 
  MapPin, 
  Bell, 
  Moon, 
  Sun, 
  ChevronDown, 
  LogOut, 
  Settings,
  Shield,
  Building2
} from 'lucide-react';
import { User, Notification, UserRole } from '../types';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
import { motion, AnimatePresence } from 'motion/react';
import { NotificationsCenter } from './NotificationsCenter';
import { cn } from '../utils';

interface HeaderProps {
  hospitalName: string;
  location: string;
  user: User | null;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onInfoClick: () => void;
  onLogout: () => void;
  notifications: Notification[];
  onMarkNotificationRead: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  hospitalName, 
  location, 
  user, 
  theme,
  onThemeToggle,
  onInfoClick,
  onLogout,
  notifications,
  onMarkNotificationRead
}) => {
  const { t } = useTranslation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-900 dark:to-blue-900 text-white shadow-lg relative z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo + App Name */}
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30"
            >
              <Logo className="text-white" size={32} />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-black leading-tight tracking-tight">{t('app_name')}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{t('tagline')}</span>
            </div>
          </div>

          {/* Middle: Current hospital location/facility */}
          <div className="hidden lg:flex items-center gap-6 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3 border-r border-white/20 pr-6">
              <Building2 size={16} className="text-emerald-300" />
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 leading-none mb-1">{t('hospital')}</p>
                <p className="text-sm font-bold truncate max-w-[150px]">{hospitalName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-blue-300" />
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 leading-none mb-1">Location</p>
                <p className="text-sm font-bold">{location}</p>
              </div>
            </div>
          </div>

          {/* Right: User profile + system info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <LanguageSelector />
            </div>

            <button 
              onClick={onThemeToggle}
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-emerald-600 animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <NotificationsCenter 
                    notifications={notifications}
                    onMarkRead={onMarkNotificationRead}
                    onClose={() => setShowNotifications(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={onInfoClick}
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10"
            >
              <Info size={20} />
            </button>

            <div className="h-10 w-px bg-white/20 mx-1" />

            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-1.5 pr-4 rounded-2xl transition-all border border-white/10 group"
              >
                <div className="w-9 h-9 bg-white text-emerald-600 rounded-xl flex items-center justify-center font-black shadow-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black leading-none mb-1">{user?.name || 'User'}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">
                    {user?.role} • {user?.department}
                  </p>
                </div>
                <ChevronDown size={14} className={cn("text-white/60 transition-transform", showProfileMenu && "rotate-180")} />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute top-full right-0 mt-3 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden text-zinc-900 dark:text-white"
                  >
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Logged in as</p>
                      <p className="text-sm font-black truncate">{user?.name}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 px-2 py-0.5 rounded-full">
                          {user?.role}
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                        <UserIcon size={16} className="text-zinc-400" />
                        My Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                        <Settings size={16} className="text-zinc-400" />
                        Account Settings
                      </button>
                      <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />
                      <button 
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
