
import React from 'react';
import { Building2, Coins, Calendar, Clock, Save } from 'lucide-react';
import { AppSettings, AccountingPeriod } from '../types';

interface SettingsProps {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
}

const SettingsView: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const handleChange = (field: keyof AppSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">إعدادات النظام</h1>
          <p className="text-slate-500 text-sm">إدارة هوية الشركة، القواعد المحاسبية والمواعيد</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">
          <Save size={18} />
          حفظ التغييرات
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 mb-2 text-blue-400">
            <Building2 size={22} />
            <h3 className="font-bold text-lg text-white">بيانات الشركة</h3>
          </div>
          <div className="space-y-4">
            <input 
              type="text" 
              value={settings.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <Calendar size={22} />
            <h3 className="font-bold text-lg text-white">الفترة المحاسبية</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: AccountingPeriod.WEEKLY_SAT_THU, label: 'أسبوعية (السبت - الخميس)' },
              { id: AccountingPeriod.MONTHLY, label: 'شهرية ميلادية' },
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => handleChange('accountingPeriod', period.id)}
                className={`text-right px-4 py-3 rounded-xl text-sm transition-all border ${
                  settings.accountingPeriod === period.id 
                    ? 'bg-blue-600/10 border-blue-600/30 text-blue-400 font-bold' 
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
