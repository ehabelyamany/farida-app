
import React, { useState } from 'react';
import { Database, Link2, ShieldCheck, CheckCircle2, AlertCircle, HelpCircle, Code, ExternalLink, RefreshCw } from 'lucide-react';
import { CloudDBConfig } from '../types';

interface CloudDBViewProps {
  onSyncRequested: () => void;
}

const CloudDBView: React.FC<CloudDBViewProps> = ({ onSyncRequested }) => {
  const [config, setConfig] = useState<any>({
    sheetId: localStorage.getItem('sheet_id') || '',
    apiKey: localStorage.getItem('sheets_api_key') || '',
    proxyUrl: localStorage.getItem('proxy_url') || '',
    isConnected: !!localStorage.getItem('sheet_id')
  });

  const handleConnect = () => {
    localStorage.setItem('sheet_id', config.sheetId);
    localStorage.setItem('sheets_api_key', config.apiKey);
    localStorage.setItem('proxy_url', config.proxyUrl);
    setConfig({ ...config, isConnected: true });
    onSyncRequested(); 
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-right space-y-2">
        <h1 className="text-4xl font-black text-white">قاعدة البيانات السحابية</h1>
        <p className="text-slate-500 text-lg">اربط تطبيقك بـ Google Sheets لضمان بقاء بياناتك آمنة وسحابية للأبد.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <Database size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">إعدادات Google Sheets</h3>
                <p className="text-sm text-slate-500">استخدم جداول بيانات جوجل كمحرك قاعدة بيانات</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 mr-2">معرف الجدول (Sheet ID)</label>
                <input 
                  type="text" 
                  value={config.sheetId}
                  onChange={(e) => setConfig({...config, sheetId: e.target.value})}
                  className="w-full bg-black/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 mr-2">مفتاح API (للقراءة)</label>
                <input 
                  type="password" 
                  value={config.apiKey}
                  onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                  className="w-full bg-black/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-blue-400 mr-2 flex items-center gap-2">
                  رابط جسر الكتابة (Google Apps Script Proxy)
                  <span className="text-[10px] bg-blue-500/10 px-2 py-1 rounded text-blue-500">موصى به للكتابة</span>
                </label>
                <input 
                  type="text" 
                  value={config.proxyUrl}
                  onChange={(e) => setConfig({...config, proxyUrl: e.target.value})}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full bg-black/50 border border-blue-900/30 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                />
              </div>

              <button 
                onClick={handleConnect}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
              >
                <Link2 size={24} />
                {config.isConnected ? 'تحديث ومزامنة البيانات' : 'بدء المزامنة السحابية'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
               <Code size={18} className="text-blue-400" />
               تفعيل الكتابة
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
               لتمكين "فريدة" من تسجيل الحضور مباشرة في جدولك، يرجى إنشاء Google Apps Script بسيط يقوم بوظيفة <code>appendRow</code> وتفعيله كـ Web App.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-slate-800">
                <span className="text-sm text-slate-400">حالة الاتصال</span>
                {config.isConnected ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-3 py-1 rounded-full">
                    <CheckCircle2 size={12} /> متصل
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1 bg-rose-400/10 px-3 py-1 rounded-full">
                    <AlertCircle size={12} /> غير متصل
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudDBView;
