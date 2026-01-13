
import React, { useState } from 'react';
import { ShieldCheck, ArrowRightLeft, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl w-full max-w-md border border-white/20 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">فريدة</h1>
          <p className="text-blue-100/60 text-sm">أهلاً بك إيهاب في واجهتك الإدارية الذكية</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="text-xs font-semibold text-blue-200 uppercase mb-2 block mr-1">اسم المستخدم</label>
            <input 
              type="text" 
              placeholder="ehab_admin"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div className="relative">
            <label className="text-xs font-semibold text-blue-200 uppercase mb-2 block mr-1">كلمة المرور</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
              <Lock size={18} className="absolute left-3 top-3.5 text-white/30" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>دخول آمن</span>
                <ArrowRightLeft size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-white/40 text-xs">
          نظام فريدة المطور لإيهاب اليمني &copy; 2024
        </div>
      </div>
    </div>
  );
};

export default Login;
