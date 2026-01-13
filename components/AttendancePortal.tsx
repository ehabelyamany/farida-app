
import React from 'react';
import { LogIn, LogOut, Coffee, MapPin } from 'lucide-react';

const AttendancePortal: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-1000">
      <div className="bg-gradient-to-br from-blue-600 via-indigo-900 to-black p-12 rounded-[3.5rem] text-white shadow-[0_0_50px_rgba(37,99,235,0.1)] relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div className="space-y-4">
            <p className="text-blue-200/70 font-bold tracking-widest uppercase text-xs">{currentDate}</p>
            <h1 className="text-7xl font-black">{currentTime}</h1>
            <div className="flex items-center gap-3 text-blue-100/60 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl w-fit border border-white/10">
              <MapPin size={20} className="text-blue-400" />
              <span className="text-sm font-bold">بوابة تسجيل الدخول - المكتب الذكي</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 w-full md:w-auto">
             <button className="flex items-center justify-center gap-4 bg-white text-black px-12 py-6 rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
               <LogIn size={28} />
               <span>تسجيل حضور</span>
             </button>
             <button className="flex items-center justify-center gap-4 bg-black/40 border border-white/10 text-white px-12 py-6 rounded-[2rem] font-black text-xl backdrop-blur-xl hover:bg-black/60 active:scale-95 transition-all">
               <LogOut size={28} />
               <span>انصراف</span>
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-sm flex flex-col items-center text-center group hover:border-orange-500/30 transition-all">
          <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Coffee size={32} /></div>
          <h3 className="font-bold text-white text-lg">وقت الراحة</h3>
          <p className="text-slate-500 text-sm mt-2">هل حان وقت القهوة؟</p>
          <button className="mt-6 px-6 py-2 bg-slate-800 rounded-full text-xs font-bold text-orange-400 hover:bg-orange-500 hover:text-white transition-all">ابدأ الآن</button>
        </div>
        
        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-sm flex flex-col items-center text-center group hover:border-emerald-500/30 transition-all">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><LogIn size={32} /></div>
          <h3 className="font-bold text-white text-lg">الحالة الحالية</h3>
          <div className="mt-4 px-6 py-2 bg-emerald-500 text-black text-xs font-black rounded-full shadow-lg shadow-emerald-500/20 uppercase tracking-tighter">نشط</div>
          <p className="text-slate-600 text-[10px] mt-4 font-bold">حضورك اليوم في 09:00 ص</p>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-sm flex flex-col items-center text-center group hover:border-blue-500/30 transition-all">
          <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><LogOut size={32} /></div>
          <h3 className="font-bold text-white text-lg">إجمالي العمل</h3>
          <p className="text-4xl font-black text-white mt-4">07:22</p>
          <p className="text-slate-500 text-[10px] mt-2 font-bold uppercase">ساعات العمل المتراكمة</p>
        </div>
      </div>
    </div>
  );
};

export default AttendancePortal;
