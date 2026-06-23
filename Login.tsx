import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { 
  Shield, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Building2, 
  Stethoscope, 
  Moon, 
  Sun,
  Smartphone,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { validatePassword, cn, getThemePreference, setThemePreference } from '../utils';
import { UserRole, User } from '../types';
import { mockRegions } from '../data/mockData';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

interface LoginProps {
  onLogin: (user: User) => void;
}

const DEPARTMENTS = ['Emergency', 'ICU', 'Ward', 'OPD', 'Lab'];
const ROLES: UserRole[] = ['Doctor', 'Nurse', 'Administrator', 'Lab Technician', 'Ward Staff'];

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('Administrator');
  const [hospitalId, setHospitalId] = useState(mockRegions[0].id);
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [rememberMe, setRememberMe] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(getThemePreference());
  
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordStrength = useMemo(() => validatePassword(password), [password]);

  useEffect(() => {
    setThemePreference(theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem('medcore-remember');
    if (saved) {
      const data = JSON.parse(saved);
      setEmail(data.email || '');
      setRole(data.role || 'Administrator');
      setHospitalId(data.hospitalId || mockRegions[0].id);
      setDepartment(data.department || DEPARTMENTS[0]);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, otpTimer]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (passwordStrength.score < 3) {
      setError(t('password_strength_error', { defaultValue: 'Please use a stronger password.' }));
      return;
    }

    setIsLoading(true);
    
    // Simulate initial login success and move to OTP
    setTimeout(() => {
      setStep('otp');
      setIsLoading(false);
      setOtpTimer(30);
    }, 1200);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (otp.some(v => v === '')) {
      setError(t('otp_error', { defaultValue: 'Please enter the full 6-digit OTP.' }));
      setIsLoading(false);
      return;
    }

    // Simulate OTP verification
    setTimeout(() => {
      const userData: User = {
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role,
        hospitalId,
        department,
        language: i18n.language
      };

      if (rememberMe) {
        localStorage.setItem('medcore-remember', JSON.stringify({
          email,
          role,
          hospitalId,
          department,
          language: i18n.language
        }));
      } else {
        localStorage.removeItem('medcore-remember');
      }

      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-xl relative z-10">
        {/* Top Controls */}
        <div className="flex items-center justify-between mb-8">
          <LanguageSelector />
          <button 
            onClick={toggleTheme}
            className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl text-zinc-600 dark:text-zinc-400 hover:scale-110 transition-all active:scale-95"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-emerald-600 to-blue-600 p-10 text-white text-center relative">
            <div className="flex justify-center mb-6">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/30 shadow-xl"
              >
                <Logo className="text-white" size={48} />
              </motion.div>
            </div>
            <h1 className="text-3xl font-black tracking-tight">{t('app_name')}</h1>
            <p className="text-white/80 text-sm mt-2 font-medium uppercase tracking-widest">{t('tagline')}</p>
          </div>

          <div className="p-10">
            <AnimatePresence mode="wait">
              {step === 'login' ? (
                <motion.div
                  key="login-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('login')}</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Authorized personnel only. Please sign in.</p>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl flex items-start gap-3 text-rose-600 dark:text-rose-400 text-sm"
                    >
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <p>{error}</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-8">
                    {/* Access Details Group */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield size={16} className="text-emerald-600" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Access Credentials</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1">{t('email')}</label>
                          <div className="relative group">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <input 
                              type="email" 
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="admin@medcore.gov"
                              className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all text-sm dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1">{t('password')}</label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <input 
                              type={showPassword ? "text" : "password"} 
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full pl-12 pr-12 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all text-sm dark:text-white"
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Password Strength Meter */}
                      {password && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2 mt-3 px-1"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{t('password_strength')}: {t(passwordStrength.label.toLowerCase())}</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map(i => (
                                <div 
                                  key={i} 
                                  className={cn(
                                    "h-1 w-8 rounded-full transition-all duration-500",
                                    i <= passwordStrength.score ? passwordStrength.color : "bg-zinc-200 dark:bg-zinc-800"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Organization Details Group */}
                    <div className="space-y-6 pt-4 border-t border-zinc-50 dark:border-zinc-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 size={16} className="text-emerald-600" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Organization Context</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1">{t('role')}</label>
                          <select 
                            value={role}
                            onChange={(e) => setRole(e.target.value as UserRole)}
                            className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all text-sm appearance-none cursor-pointer dark:text-white"
                          >
                            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1">{t('hospital')}</label>
                          <select 
                            value={hospitalId}
                            onChange={(e) => setHospitalId(e.target.value)}
                            className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all text-sm appearance-none cursor-pointer dark:text-white"
                          >
                            {mockRegions.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1">{t('department')}</label>
                          <select 
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all text-sm appearance-none cursor-pointer dark:text-white"
                          >
                            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="peer sr-only" 
                          />
                          <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-700 rounded-lg peer-checked:bg-emerald-600 peer-checked:border-emerald-600 transition-all" />
                          <CheckCircle2 className="absolute top-0.5 left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={16} />
                        </div>
                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">{t('remember_me')}</span>
                      </label>
                      <button type="button" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">{t('forgot_password')}</button>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full py-5 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-900/20 dark:shadow-white/5 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <RefreshCw className="animate-spin" size={20} />
                      ) : (
                        <>
                          {t('sign_in')}
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Smartphone size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('otp_title')}</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">{t('otp_desc')}</p>
                  </div>

                  {error && (
                    <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl flex items-start gap-3 text-rose-600 dark:text-rose-400 text-sm">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <p>{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleOtpSubmit} className="space-y-8">
                    <div className="flex justify-between gap-2">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className="w-12 h-14 text-center text-xl font-bold bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:bg-white dark:focus:bg-zinc-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all dark:text-white"
                        />
                      ))}
                    </div>

                    <div className="text-center space-y-4">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Resend code in <span className="font-bold text-zinc-900 dark:text-white">{otpTimer}s</span>
                      </p>
                      <button 
                        type="button"
                        disabled={otpTimer > 0}
                        onClick={() => setOtpTimer(30)}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {t('resend_otp')}
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setStep('login')}
                        className="flex-1 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-[1.25rem] font-bold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="flex-[2] py-4 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-[1.25rem] font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-900/20 dark:shadow-white/5 flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {isLoading ? (
                          <RefreshCw className="animate-spin" size={20} />
                        ) : (
                          <>
                            {t('verify')}
                            <CheckCircle2 size={20} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="text-center text-zinc-400 dark:text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] mt-12">
          Government of Health & Family Welfare • Secure Access
        </p>
      </div>
    </div>
  );
};
