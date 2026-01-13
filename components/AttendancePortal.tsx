
import React, { useState } from 'react';
import { LogIn, Calendar as CalendarIcon, Clock as ClockIcon, Save, User, CheckCircle, AlertCircle } from 'lucide-react';
import { Employee } from '../types';
import { SheetsService } from '../services/sheetsService';

interface AttendancePortalProps {
  employees: Employee[];
}

const AttendancePortal: React.FC<AttendancePortalProps> = ({ employees }) => {
  const [formData, setFormData] = useState({
    empId: '',
    date: new Date().toISOString().split('T')[0],
    timeIn: '09:00',
    timeOut: '17:00',
    status: 'حاضر' as const
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.empId) return;

    setLoading(true);
    const service = new SheetsService();
    
    const record = [
      `REC-${Math.floor(Math.random() * 10000)}`,
      formData.empId,
      formData.date,
      formData.timeIn,
      formData.timeOut,
      0, // delay
      formData.status
    ];

    const success = await service.sendToCloud('Attendance!A:G', [record]);
    
    setLoading(false);
    if (success) {
      setMsg({ type: 'success', text: 'تم تسجيل السجل الإداري بنجاح!' });
      setTimeout(() => setMsg(null), 3000);
    } else {
      setMsg({ type: 'error', text: 'فشل في إرسال البيانات للسحابة.' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="text-right">
        <h1 className="text-3xl font-black text-white">تسجيل حضور وإحصاء يدوي</h1>
        <p className="text-slate-500 mt-2">بصفتك مديراً، يمكنك إدخال بيانات الموظفين بأي تاريخ ووقت</p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-3xl border border-slate-800 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px]"></div>
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Employee Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <User size={16} className="text-blue-500" /> اختيار الموظف
              </label>
              <select 
                value={formData.empId}
                onChange={e => setFormData({...formData, empId: e.target.value})}
                className="w-full bg-black/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                required
              >
                <option value="">-- اختر من القائمة --</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.position})</option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <CalendarIcon size={16} className="text-blue-500" /> تاريخ اليوم
              </label>
              <input 
                type="date"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-black/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            {/* Clock In */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <ClockIcon size={16} className="text-emerald-500" /> وقت الحضور
              </label>
              <input 
                type="time"
                value={formData.timeIn}
                onChange={e => setFormData({...formData, timeIn: e.target.value})}
                className="w-full bg-black/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>

            {/* Clock Out */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <ClockIcon size={16} className="text-rose-500" /> وقت الانصراف
              </label>
              <input 
                type="time"
                value={formData.timeOut}
                onChange={e => setFormData({...formData, timeOut: e.target.value})}
                className="w-full bg-black/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4">
             <button 
              type="submit"
              disabled={loading || !formData.empId}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 rounded-2xl font-black text-xl shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
             >
               {loading ? <RefreshCw className="animate-spin" /> : <Save size={24} />}
               تسجيل السجل يدوياً
             </button>
          </div>

          {msg && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2 ${msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
              {msg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <p className="font-bold">{msg.text}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const RefreshCw = ({className}: {className?: string}) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>
);

export default AttendancePortal;
