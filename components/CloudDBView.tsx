
import React, { useState } from 'react';
import { Database, Link2, ShieldCheck, CheckCircle2, AlertCircle, Copy, Code, ExternalLink, RefreshCw, Terminal } from 'lucide-react';
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
  const [copyStatus, setCopyStatus] = useState(false);

  const handleConnect = () => {
    localStorage.setItem('sheet_id', config.sheetId);
    localStorage.setItem('sheets_api_key', config.apiKey);
    localStorage.setItem('proxy_url', config.proxyUrl);
    setConfig({ ...config, isConnected: true });
    onSyncRequested(); 
  };

  const scriptCode = `function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = JSON.parse(e.postData.contents);
  var range = data.range; 
  var values = data.values;

  var sheetName = range.split('!')[0];
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return ContentService.createTextOutput("Sheet not found: " + sheetName)
      .setMimeType(ContentService.MimeType.TEXT);
  }

  values.forEach(function(row) {
    sheet.appendRow(row);
  });

  return ContentService.createTextOutput("Success")
    .setMimeType(ContentService.MimeType.TEXT);
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-right space-y-2">
        <h1 className="text-4xl font-black text-white">مركز القيادة السحابي</h1>
        <p className="text-slate-500 text-lg">اربط نظام "فريدة" بمحرك بيانات جوجل لضمان الأمان والخصوصية المطلقة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Config */}
          <div className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner">
                <Database size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">إعدادات الاتصال المباشر</h3>
                <p className="text-sm text-slate-500 italic">أدخل بيانات جدول Google Sheets الخاص بك</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 mr-2 flex justify-between">
                  <span>معرف الجدول (Sheet ID)</span>
                  <a href="https://docs.google.com/spreadsheets" target="_blank" className="text-blue-500 text-[10px] hover:underline flex items-center gap-1"><ExternalLink size={10}/> فتح الجداول</a>
                </label>
                <input 
                  type="text" 
                  value={config.sheetId}
                  onChange={(e) => setConfig({...config, sheetId: e.target.value})}
                  placeholder="مثال: 1a2b3c4d5e6f7g8h9i0j..."
                  className="w-full bg-black/60 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-400 mr-2">مفتاح API الخاص بك (API Key)</label>
                <input 
                  type="password" 
                  value={config.apiKey}
                  onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                  placeholder="أدخل مفتاح جوجل للحصول على صلاحيات القراءة"
                  className="w-full bg-black/60 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
                />
              </div>

              <div className="space-y-3 p-6 bg-blue-500/5 border border-blue-500/20 rounded-3xl">
                <label className="text-sm font-black text-blue-400 mr-2 flex items-center gap-2 mb-2">
                  <ShieldCheck size={16} /> رابط جسر الكتابة (Proxy App Script)
                </label>
                <input 
                  type="text" 
                  value={config.proxyUrl}
                  onChange={(e) => setConfig({...config, proxyUrl: e.target.value})}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full bg-black border border-blue-500/30 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-xs"
                />
                <p className="text-[10px] text-slate-500 mt-2 px-2 italic">مطلوب لحفظ الموظفين الجدد وسجلات الحضور يدوياً.</p>
              </div>

              <button 
                onClick={handleConnect}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-blue-900/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-4"
              >
                <RefreshCw size={24} className={config.isConnected ? 'animate-spin-slow' : ''} />
                {config.isConnected ? 'تحديث ومزامنة البيانات الآن' : 'بدء المزامنة السحابية'}
              </button>
            </div>
          </div>

          {/* Script Instructions */}
          <div className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Terminal size={20} className="text-emerald-500" />
                  برمجة "جسر الكتابة" (إجباري للحفظ)
                </h3>
                <button 
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${copyStatus ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {copyStatus ? <CheckCircle2 size={14}/> : <Copy size={14}/>}
                  {copyStatus ? 'تم النسخ!' : 'نسخ الكود'}
                </button>
             </div>
             <p className="text-sm text-slate-500 leading-relaxed">
               يا إيهاب، اتبع هذه الخطوات البسيطة لتفعيل الحفظ:
               <br/> 1. من ملف Sheets، اختر <span className="text-blue-500 font-bold">Extensions</span> ثم <span className="text-blue-500 font-bold">Apps Script</span>.
               <br/> 2. امسح أي كود موجود والصق الكود الموجود في الأسفل.
               <br/> 3. اضغط <span className="text-blue-500 font-bold">Deploy</span> ثم <span className="text-blue-500 font-bold">New Deployment</span>.
               <br/> 4. اختر النوع <span className="text-blue-500 font-bold">Web App</span> واجعل الوصول لـ <span className="text-rose-500 font-bold">Anyone</span>.
               <br/> 5. انسخ الرابط الناتج وضعه في خانة "رابط جسر الكتابة" أعلاه.
             </p>
             <div className="bg-black rounded-2xl p-6 border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto h-48 custom-scrollbar">
                <pre>{scriptCode}</pre>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 sticky top-28">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
               حالة الاتصال بالموظفين
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-black/40 rounded-[1.5rem] border border-slate-800">
                <div className="space-y-1">
                   <p className="text-xs text-slate-500 font-bold">اتصال القراءة</p>
                   <p className="text-sm font-black text-white">{config.apiKey ? 'مفعل' : 'مطلوب'}</p>
                </div>
                {config.apiKey ? <CheckCircle2 className="text-emerald-500" size={20} /> : <AlertCircle className="text-rose-500" size={20} />}
              </div>
              <div className="flex items-center justify-between p-5 bg-black/40 rounded-[1.5rem] border border-slate-800">
                <div className="space-y-1">
                   <p className="text-xs text-slate-500 font-bold">اتصال الكتابة (Proxy)</p>
                   <p className="text-sm font-black text-white">{config.proxyUrl ? 'جاهز' : 'غير متوفر'}</p>
                </div>
                {config.proxyUrl ? <CheckCircle2 className="text-blue-500" size={20} /> : <AlertCircle className="text-slate-700" size={20} />}
              </div>
              
              <div className="p-6 bg-slate-800/30 rounded-3xl border border-dashed border-slate-700 mt-6 text-center">
                 <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                   عند اكتمال الإعداد، سيقوم نظام "فريدة" بمزامنة كل إضافة تقوم بها فوراً مع إكسيل الخاص بك.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudDBView;
