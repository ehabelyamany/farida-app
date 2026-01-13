
import React, { useState } from 'react';
import { Search, UserPlus, RefreshCw, CloudSync } from 'lucide-react';
import { Employee } from '../types';

interface EmployeeManagerProps {
  employees: Employee[];
  onRefresh: () => void;
}

const EmployeeManager = ({ employees, onRefresh }: EmployeeManagerProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">إدارة الموظفين</h1>
          <p className="text-slate-500 text-sm">يتم جلب البيانات حالياً من السحابة لضمان الدقة</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-all active:rotate-180"
          >
            <RefreshCw size={18} />
            تحديث البيانات
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">
            <UserPlus size={18} />
            إضافة موظف
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute right-3 top-3 text-slate-600" />
            <input 
              type="text" 
              placeholder="ابحث بالاسم أو المسمى الوظيفي..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-2 text-xs text-slate-500 font-bold uppercase">
             {employees.length} موظف متصل سحابياً
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">الموظف</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">المنصب</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">تاريخ الانضمام</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">الراتب الأساسي</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {employees.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-20 text-center text-slate-600 font-bold">
                      <div className="flex flex-col items-center gap-4">
                         <CloudSync size={48} className="text-slate-800" />
                         <p>لا توجد بيانات موظفين حالياً. يرجى التأكد من ربط Google Sheets وإضافة بيانات.</p>
                      </div>
                   </td>
                </tr>
              ) : (
                employees.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold border border-blue-500/10">
                          {emp.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-200">{emp.name}</p>
                          <p className="text-xs text-slate-600">ID: {emp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{emp.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{emp.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-200">{(emp.baseSalary || 0).toLocaleString()}</span>
                      <span className="text-[10px] text-slate-600 mr-1">EGP</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full border border-emerald-500/20">سحابي</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManager;
