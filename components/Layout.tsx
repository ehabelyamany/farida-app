
import React, { useState } from 'react';
import * as Router from 'react-router-dom';
import { Menu, X, Bell, Search } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { AppSettings } from '../types';

// Destructure from Router cast as any to bypass the "no exported member NavLink" error.
const { NavLink } = Router as any;

interface LayoutProps {
  children: React.ReactNode;
  settings: AppSettings;
}

const Layout: React.FC<LayoutProps> = ({ children, settings }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-black border-l border-slate-900 transition-all duration-500 flex flex-col fixed h-full z-40 overflow-hidden shadow-2xl shadow-blue-500/5`}>
        <div className="p-8 flex items-center justify-between h-24">
          <div className={`flex items-center gap-4 ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] rotate-3">
              <span className="font-black text-2xl">ف</span>
            </div>
            <span className="font-black text-2xl text-white tracking-tighter">فريدة</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-900 rounded-xl text-slate-600 transition-all">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={`/${item.id === 'dashboard' ? '' : item.id}`}
              className={({ isActive }: { isActive: boolean }) => `
                flex items-center gap-5 px-5 py-4 rounded-[1.25rem] transition-all duration-300 group
                ${isActive 
                  ? 'bg-blue-600 text-white font-black shadow-lg shadow-blue-600/20' 
                  : 'text-slate-500 hover:bg-slate-900 hover:text-slate-200'}
              `}
            >
              <span className={`${isSidebarOpen ? '' : 'mx-auto'} group-hover:scale-110 transition-transform`}>{item.icon}</span>
              {isSidebarOpen && <span className="whitespace-nowrap text-sm">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-900">
          <div className="bg-slate-900/40 rounded-3xl p-5 border border-slate-800 group cursor-pointer hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-slate-800 overflow-hidden border border-slate-700 shadow-inner">
                  <img src="https://picsum.photos/100" alt="Admin" className="w-full h-full object-cover" />
               </div>
               {isSidebarOpen && (
                 <div className="flex-1 overflow-hidden">
                   <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Super Admin</p>
                   <p className="text-sm font-black text-white truncate">إيهاب اليمني</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col transition-all duration-500 ${isSidebarOpen ? 'mr-80' : 'mr-24'}`}>
        <header className="h-24 bg-black/80 backdrop-blur-2xl border-b border-slate-900 flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 px-6 py-3 rounded-2xl w-[450px] focus-within:border-blue-500/50 transition-all shadow-inner">
            <Search size={20} className="text-slate-600" />
            <input 
              type="text" 
              placeholder="ابحث عن أي شيء..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-100 placeholder-slate-700"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-3 bg-slate-900 border border-slate-800 text-slate-500 hover:text-blue-400 rounded-2xl transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <Bell size={24} />
              <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-[3px] border-black"></span>
            </button>
            <div className="h-10 w-[1px] bg-slate-800"></div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-black text-slate-600 text-left uppercase tracking-tighter">Current Org</p>
              <p className="text-sm font-black text-white">{settings.companyName}</p>
            </div>
          </div>
        </header>

        <div className="p-10 bg-black min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
