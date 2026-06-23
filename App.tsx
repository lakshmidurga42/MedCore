import React, { useState, useMemo, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Bed, 
  Wind, 
  AlertTriangle, 
  TrendingUp, 
  Brain, 
  ChevronRight, 
  MapPin, 
  Clock, 
  ArrowRight,
  LayoutDashboard,
  ClipboardList,
  History,
  Share2,
  Settings as SettingsIcon,
  Search,
  Filter,
  Bell,
  CheckCircle2,
  X,
  Plus,
  ShieldCheck,
  Smartphone,
  Menu,
  Info,
  LogOut,
  RefreshCw,
  Stethoscope
} from 'lucide-react';
import { 
  RegionAssessment, 
  AIInsight, 
  User, 
  Notification, 
  WardTask, 
  PatientTimelineEvent, 
  TransferRecommendation, 
  AuditLogEntry 
} from './types';
import { mockRegions, mockDoctors } from './data/mockData';
import { getRegionalInsights } from './services/geminiService';
import { StatCard } from './components/StatCard';
import { OutbreakChart } from './components/OutbreakChart';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { PatientAdmission } from './components/PatientAdmission';
import { Toast, ToastType } from './components/Toast';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { AppInfo } from './components/AppInfo';
import { cn, getThemePreference, setThemePreference } from './utils';
import { motion, AnimatePresence } from 'motion/react';
import './locales/i18n';
import { useTranslation } from 'react-i18next';
import { TaskManagement } from './components/TaskManagement';
import { PatientTimeline } from './components/PatientTimeline';
import { TransferRecommendations } from './components/TransferRecommendations';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AuditLog } from './components/AuditLog';
import { DoctorsList } from './components/DoctorsList';
import { Doctor } from './types';

// Mock Data for new features
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Critical ICU Shortage',
    message: 'ICU capacity has reached 95% in the Emergency department.',
    severity: 'critical',
    timestamp: new Date(),
    read: false,
    category: 'Resource'
  },
  {
    id: '2',
    title: 'Oxygen Supply Low',
    message: 'Oxygen levels in Ward B are below 20%. Refill requested.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    category: 'Resource'
  },
  {
    id: '3',
    title: 'Patient Admission Success',
    message: 'Patient John Doe has been successfully admitted to Bed 402.',
    severity: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    category: 'Patient'
  }
];

const MOCK_TASKS: WardTask[] = [
  { id: '1', title: 'Sample Collection', patientName: 'Anita Sharma', bedNumber: '102', status: 'pending', assignedTo: 'Nurse Mary', dueTime: '10:30 AM' },
  { id: '2', title: 'Vitals Check', patientName: 'Rajesh Kumar', bedNumber: '105', status: 'completed', assignedTo: 'Nurse Mary', dueTime: '09:00 AM' },
  { id: '3', title: 'Medication Administration', patientName: 'Sunita Devi', bedNumber: '108', status: 'pending', assignedTo: 'Nurse Mary', dueTime: '11:00 AM' },
];

const MOCK_TIMELINE: PatientTimelineEvent[] = [
  { id: '1', patientId: 'p1', stage: 'Registration', timestamp: new Date(Date.now() - 1000 * 60 * 120), status: 'completed', note: 'Initial registration completed at front desk.' },
  { id: '2', patientId: 'p1', stage: 'Admission', timestamp: new Date(Date.now() - 1000 * 60 * 90), status: 'completed', note: 'Admitted by Dr. Smith. General Ward assigned.' },
  { id: '3', patientId: 'p1', stage: 'Bed/ICU', timestamp: new Date(Date.now() - 1000 * 60 * 60), status: 'current', note: 'Patient moved to Bed 304. Monitoring started.' },
  { id: '4', patientId: 'p1', stage: 'Lab', timestamp: new Date(Date.now() - 1000 * 60 * 30), status: 'pending', note: 'Blood work and X-ray scheduled.' },
];

const MOCK_TRANSFERS: TransferRecommendation[] = [
  { id: 'h2', hospitalName: 'City General Hospital', distance: '4.2 km', availableBeds: 12, availableICUs: 3, oxygenLevel: 'High', eta: '15 min' },
  { id: 'h3', hospitalName: 'St. Mary Medical Center', distance: '6.8 km', availableBeds: 8, availableICUs: 1, oxygenLevel: 'Medium', eta: '25 min' },
];

const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'l1', userId: 'u1', userName: 'Admin Sarah', action: 'Update Bed Status', details: 'Changed Bed 402 from Occupied to Available', timestamp: new Date(), department: 'General Ward' },
  { id: 'l2', userId: 'u2', userName: 'Dr. James', action: 'Patient Admission', details: 'Admitted patient Rajesh Kumar to ICU', timestamp: new Date(Date.now() - 1000 * 60 * 15), department: 'ICU' },
  { id: 'l3', userId: 'u1', userName: 'Admin Sarah', action: 'Inventory Update', details: 'Added 50 units of Oxygen Cylinders', timestamp: new Date(Date.now() - 1000 * 60 * 45), department: 'Pharmacy' },
];

export default function App() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [regions, setRegions] = useState<RegionAssessment[]>(mockRegions);
  const [selectedRegion, setSelectedRegion] = useState<RegionAssessment>(mockRegions[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isWardMode, setIsWardMode] = useState(false);
  const [showAdmission, setShowAdmission] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(getThemePreference());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'doctors' | 'tasks' | 'transfers' | 'analytics' | 'audit'>('dashboard');

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Feature States
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [tasks, setTasks] = useState<WardTask[]>(MOCK_TASKS);
  const [timeline, setTimeline] = useState<PatientTimelineEvent[]>(MOCK_TIMELINE);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);

  useEffect(() => {
    setThemePreference(theme);
  }, [theme]);

  const fetchInsights = async () => {
    if (!selectedRegion) return;
    setIsAiLoading(true);
    const insight = await getRegionalInsights(selectedRegion);
    setAiInsight(insight);
    setIsAiLoading(false);
    showToast('AI Insights generated', 'success');
  };

  useEffect(() => {
    if (isAuthenticated && selectedRegion) {
      fetchInsights();
    }
  }, [selectedRegion, isAuthenticated]);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    showToast(`Welcome back, ${userData.name}!`, 'success');
    
    const region = mockRegions.find(r => r.id === userData.hospitalId);
    if (region) setSelectedRegion(region);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
  };

  const updateFacilityCount = (facilityKey: keyof RegionAssessment['facilities'], subKey: string, delta: number) => {
    const updatedRegion = { ...selectedRegion };
    const facility = updatedRegion.facilities[facilityKey] as any;
    if (facility && typeof facility[subKey] === 'number') {
      facility[subKey] = Math.max(0, facility[subKey] + delta);
      setRegions(prev => prev.map(r => r.id === updatedRegion.id ? updatedRegion : r));
      setSelectedRegion(updatedRegion);
    }
  };

  const handleAdmit = (patientData: any) => {
    const updatedRegion = { ...selectedRegion };
    const f = updatedRegion.facilities;
    
    if (f.beds.available > 0) {
      f.beds.available -= 1;
      // If required represents demand, decrement it as one patient is now served
      if (f.beds.required > 0) {
        f.beds.required -= 1;
      }
      
      setRegions(prev => prev.map(r => r.id === updatedRegion.id ? updatedRegion : r));
      setSelectedRegion(updatedRegion);
      setShowAdmission(false);
      showToast(`Patient ${patientData.name} admitted successfully.`, 'success');
      
      // Add to audit log
      const newLog: AuditLogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user?.name || 'system',
        userName: user?.name || 'System',
        action: 'Patient Admission',
        details: `Admitted ${patientData.name} to ${patientData.department}`,
        timestamp: new Date(),
        department: patientData.department
      };
      setAuditLogs([newLog, ...auditLogs]);
    } else {
      showToast('No beds available for admission.', 'error');
    }
  };

  const handleAddTask = () => {
    const newTask: WardTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Task',
      patientName: 'New Patient',
      bedNumber: 'TBD',
      status: 'pending',
      assignedTo: user?.name || 'Nurse',
      dueTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTasks([...tasks, newTask]);
    showToast('New task added', 'success');
  };

  const handleExportReport = () => {
    showToast('Report exported successfully', 'success');
  };

  if (!isAuthenticated) {
    return (
      <div className={cn(theme === 'dark' ? 'dark' : '')}>
        <Login onLogin={handleLogin} />
        <Toast 
          message={toast.message} 
          type={toast.type} 
          isVisible={toast.isVisible} 
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
        />
      </div>
    );
  }

  if (showAdmission) {
    return <PatientAdmission onAdmit={handleAdmit} onCancel={() => setShowAdmission(false)} />;
  }

  return (
    <div className={cn(
      "min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-500",
      theme === 'dark' ? 'dark' : ''
    )}>
      <Header 
        hospitalName={selectedRegion.name}
        location={`${selectedRegion.coordinates.lat.toFixed(2)}, ${selectedRegion.coordinates.lng.toFixed(2)}`}
        user={user}
        theme={theme}
        onThemeToggle={toggleTheme}
        onInfoClick={() => setIsInfoOpen(true)}
        onLogout={handleLogout}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.aside 
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 z-30 transition-colors duration-300"
            >
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                    <ShieldCheck size={18} />
                  </div>
                  <h1 className="font-bold text-lg tracking-tight">{t('app_name')}</h1>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-400">
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 flex-1 overflow-y-auto">
                <div className="space-y-1 mb-8">
                  {[
                    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
                    { id: 'patients', label: t('patients'), icon: Users },
                    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
                    { id: 'tasks', label: t('tasks'), icon: ClipboardList },
                    { id: 'transfers', label: t('transfer'), icon: Share2 },
                    { id: 'analytics', label: t('analytics'), icon: TrendingUp },
                    { id: 'audit', label: t('audit_log'), icon: History },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                        activeTab === item.id 
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                          : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      )}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t('ward_mode')}</span>
                      <button 
                        onClick={() => setIsWardMode(!isWardMode)}
                        className={cn(
                          "w-10 h-5 rounded-full transition-colors relative",
                          isWardMode ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                          isWardMode ? "left-6" : "left-1"
                        )} />
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-relaxed">Simplified view for ward-duty staff members.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                  <SettingsIcon size={18} />
                  {t('settings')}
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative">
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="absolute top-6 left-6 z-20 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Menu size={20} />
            </button>
          )}

          <div className="max-w-7xl mx-auto p-6 lg:p-10">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Header Actions */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">{t('dashboard')}</h2>
                      <p className="text-zinc-500 dark:text-zinc-400 font-medium">Real-time resource monitoring for {selectedRegion.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setShowAdmission(true)}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                      >
                        <Plus size={18} />
                        {t('admit_patient')}
                      </button>
                      <button 
                        onClick={handleExportReport}
                        className="px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm flex items-center gap-2 text-zinc-700 dark:text-white"
                      >
                        <Share2 size={18} />
                        {t('export_report')}
                      </button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <StatCard 
                      label="Available Beds" 
                      value={selectedRegion.facilities.beds.available} 
                      unit={`/ ${selectedRegion.facilities.beds.total}`} 
                      required={selectedRegion.facilities.beds.required}
                      icon={Bed}
                      onIncrement={() => updateFacilityCount('beds', 'available', 1)}
                      onDecrement={() => updateFacilityCount('beds', 'available', -1)}
                    />
                    <StatCard 
                      label="ICU Units" 
                      value={selectedRegion.facilities.icus.available} 
                      unit={`/ ${selectedRegion.facilities.icus.total}`} 
                      required={selectedRegion.facilities.icus.required}
                      icon={Activity}
                      onIncrement={() => updateFacilityCount('icus', 'available', 1)}
                      onDecrement={() => updateFacilityCount('icus', 'available', -1)}
                    />
                    <StatCard 
                      label="Oxygen Supply" 
                      value={selectedRegion.facilities.oxygen.available} 
                      unit="Cylinders" 
                      required={selectedRegion.facilities.oxygen.required}
                      icon={Wind}
                      onIncrement={() => updateFacilityCount('oxygen', 'available', 1)}
                      onDecrement={() => updateFacilityCount('oxygen', 'available', -1)}
                    />
                    <StatCard 
                      label="Medical Staff" 
                      value={selectedRegion.facilities.staffMembers.available} 
                      unit={`/ ${selectedRegion.facilities.staffMembers.total}`} 
                      required={selectedRegion.facilities.staffMembers.required}
                      icon={Users}
                      onIncrement={() => updateFacilityCount('staffMembers', 'available', 1)}
                      onDecrement={() => updateFacilityCount('staffMembers', 'available', -1)}
                    />
                    <StatCard 
                      label="Doctors" 
                      value={selectedRegion.facilities.doctors.available} 
                      unit={`/ ${selectedRegion.facilities.doctors.total}`} 
                      required={selectedRegion.facilities.doctors.required}
                      icon={Stethoscope}
                      onIncrement={() => updateFacilityCount('doctors', 'available', 1)}
                      onDecrement={() => updateFacilityCount('doctors', 'available', -1)}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h3 className="text-xl font-bold">Occupancy History</h3>
                            <p className="text-xs text-zinc-500">Historical bed occupancy and resource strain</p>
                          </div>
                        </div>
                        <OutbreakChart data={selectedRegion.trends} />
                      </div>
                      
                      {/* Quick Timeline for Dashboard */}
                      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h3 className="text-xl font-bold">{t('timeline')}</h3>
                            <p className="text-sm text-zinc-500">Recent patient flow activity</p>
                          </div>
                          <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest">View All</button>
                        </div>
                        <PatientTimeline events={timeline} />
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-emerald-900 dark:to-zinc-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                        <Brain className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold mb-2">AI Resource Intelligence</h3>
                          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Get real-time predictions and resource allocation strategies powered by Gemini AI.</p>
                          <button 
                            onClick={fetchInsights}
                            disabled={isAiLoading}
                            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-black rounded-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                          >
                            {isAiLoading ? <RefreshCw className="animate-spin" size={20} /> : (
                              <>
                                Generate Insights
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <AIInsightsPanel insight={aiInsight} loading={isAiLoading} />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'patients' && (
                <motion.div
                  key="patients"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Patient Management</h3>
                    <p className="text-zinc-500">Patient list and management features coming soon...</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'doctors' && (
                <motion.div
                  key="doctors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <DoctorsList doctors={doctors} />
                </motion.div>
              )}

              {activeTab === 'tasks' && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <TaskManagement tasks={tasks} onToggleTask={handleToggleTask} onAddTask={handleAddTask} />
                  </div>
                </motion.div>
              )}

              {activeTab === 'transfers' && (
                <motion.div
                  key="transfers"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <TransferRecommendations 
                    recommendations={MOCK_TRANSFERS} 
                    onInitiateTransfer={(id) => showToast(`Transfer request initiated to ${id}`, 'info')} 
                  />
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <AnalyticsDashboard />
                </motion.div>
              )}

              {activeTab === 'audit' && (
                <motion.div
                  key="audit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <AuditLog logs={auditLogs} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />

      <AppInfo isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}
