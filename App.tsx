
import React, { useState, useEffect } from 'react';
import * as Router from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EmployeeManager from './components/EmployeeManager';
import AttendancePortal from './components/AttendancePortal';
import AIInterface from './components/AIInterface';
import SettingsView from './components/SettingsView';
import ThemeEditor from './components/ThemeEditor';
import CloudDBView from './components/CloudDBView';
import { INITIAL_SETTINGS } from './constants';
import { AppSettings, Employee, AttendanceRecord } from './types';
import { SheetsService } from './services/sheetsService';
import { CloudSync, ShieldCheck } from 'lucide-react';

// Destructure from Router cast as any to fix the "no exported member" errors in restrictive TS environments.
const { BrowserRouter, Routes, Route, Navigate } = Router as any;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [data, setData] = useState<{employees: Employee[], attendance: AttendanceRecord[]}>({
    employees: [],
    attendance: []
  });

  const performSync = async () => {
    const sheetId = localStorage.getItem('sheet_id');
    if (!sheetId) return;

    setIsSyncing(true);
    const service = new SheetsService();
    try {
      const syncedData = await service.syncAllData();
      setData(syncedData);
    } catch (err) {
      console.error("فشل في المزامنة التلقائية");
    } finally {
      // Added artificial delay for smooth transition and showing off the UI
      setTimeout(() => setIsSyncing(false), 1500);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      performSync();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', settings.themeColor);
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
  }, [settings]);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  if (isSyncing) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-10">
        <div className="relative mb-10">
           <div className="w-32 h-32 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
           <CloudSync className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-pulse" size={48} />
        </div>
        <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">فريدة تقوم بالمزامنة...</h2>
        <p className="text-slate-500 text-center max-w-md leading-relaxed">
          إيهاب، نحن نقوم بجلب أحدث بيانات الموظفين والسجلات من السحابة لضمان دقة النظام بنسبة 100%.
        </p>
        <div className="mt-20 flex items-center gap-2 text-slate-800 font-bold uppercase tracking-[0.4em] text-[10px]">
           <ShieldCheck size={14} />
           Secure Cloud Connection Active
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Layout settings={settings}>
        <Routes>
          <Route path="/" element={<Dashboard employees={data.employees} attendance={data.attendance} />} />
          <Route path="/employees" element={<EmployeeManager employees={data.employees} onRefresh={performSync} />} />
          <Route path="/attendance" element={<AttendancePortal employees={data.employees} />} />
          <Route path="/cloud-db" element={<CloudDBView onSyncRequested={performSync} />} />
          <Route path="/ai-chat" element={<AIInterface context={JSON.stringify(data)} />} />
          <Route path="/settings" element={<SettingsView settings={settings} setSettings={setSettings} />} />
          <Route path="/theme" element={<ThemeEditor settings={settings} setSettings={setSettings} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
