
import React from 'react';
import { Palette, Layers, MousePointer2, Smartphone } from 'lucide-react';
import { AppSettings } from '../types';

interface ThemeProps {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
}

const ThemeEditor: React.FC<ThemeProps> = ({ settings, setSettings }) => {
  const handleChange = (field: keyof AppSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ffffff', '#64748b'
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-right">
        <h1 className="text-3xl font-black text-white">محرر الهوية البصرية</h1>
        <p className="text-slate-500 mt-2">تحكم في كل بكسل من تجربة المستخدم الخاصة بك</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-sm space-y-8">
            <h3 className="font-bold flex items-center gap-3 text-white text-lg">
              <Palette size={20} className="text-blue-500" />
              لوحة الألوان
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 mb-4 block mr-1 uppercase">اللون الأساسي</label>
                <div className="flex flex-wrap gap-3">
                  {colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => handleChange('themeColor', color)}
                      className={`w-12 h-12 rounded-2xl transition-all ${settings.themeColor === color ? 'ring-4 ring-offset-4 ring-offset-black ring-blue-500 scale-110 shadow-lg shadow-blue-500/20' : 'opacity-70 hover:opacity-100'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <div className="relative group">
                    <input 
                      type="color" 
                      value={settings.themeColor} 
                      onChange={(e) => handleChange('themeColor', e.target.value)}
                      className="w-12 h-12 rounded-2xl cursor-pointer bg-slate-800 border-none appearance-none" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 mb-4 block mr-1 uppercase">لون التمييز (Glow)</label>
                <div className="flex flex-wrap gap-3">
                  {colors.slice().reverse().map(color => (
                    <button 
                      key={color}
                      onClick={() => handleChange('accentColor', color)}
                      className={`w-12 h-12 rounded-2xl transition-all ${settings.accentColor === color ? 'ring-4 ring-offset-4 ring-offset-black ring-emerald-500 scale-110 shadow-lg shadow-emerald-500/20' : 'opacity-70 hover:opacity-100'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
             <h3 className="font-bold flex items-center gap-3 text-white text-lg">
              <Layers size={20} className="text-emerald-500" />
              تخطيط الواجهة
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-slate-800 transition-colors cursor-pointer group hover:border-slate-600">
                 <div className="flex items-center gap-3">
                   <Smartphone size={18} className="text-slate-500" />
                   <span className="text-sm font-bold text-slate-300">الوضع المتجاوب</span>
                 </div>
                 <div className="w-12 h-6 bg-slate-800 rounded-full relative border border-slate-700">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-black rounded-[4rem] p-2 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center border border-slate-800">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-900 rounded-full border border-slate-800"></div>
          <div className="w-full h-[600px] bg-black rounded-[3rem] mt-6 overflow-hidden relative border-8 border-slate-900 flex flex-col">
             <div className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                   <div className="h-10 w-40 rounded-2xl" style={{ backgroundColor: settings.themeColor }}></div>
                   <div className="w-12 h-12 rounded-full bg-slate-900"></div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="h-32 bg-slate-900 rounded-[2rem] border border-slate-800 p-6 space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800"></div>
                      <div className="h-2 w-full bg-slate-800 rounded"></div>
                      <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
                   </div>
                   <div className="h-32 bg-slate-900 rounded-[2rem] border border-slate-800 p-6 space-y-4">
                      <div className="w-10 h-10 rounded-xl" style={{ backgroundColor: settings.accentColor + '20' }}></div>
                      <div className="h-2 w-full bg-slate-800 rounded"></div>
                      <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
                   </div>
                </div>
                <div className="h-48 bg-slate-900/50 rounded-[3rem] border border-slate-800 border-dashed flex items-center justify-center">
                   <p className="text-xs text-slate-600 font-bold tracking-widest uppercase">Live View Mode</p>
                </div>
             </div>
             <div className="mt-auto p-10">
                <div className="h-16 w-full rounded-3xl shadow-2xl flex items-center justify-center text-white text-lg font-black tracking-tighter" style={{ backgroundColor: settings.themeColor }}>
                   حفظ الهوية الجديدة
                </div>
             </div>
          </div>
          <p className="mt-6 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Prototype UI Preview</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditor;
