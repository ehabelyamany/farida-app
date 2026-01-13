
import React, { useState } from 'react';
import { Search, UserPlus, RefreshCw, CloudSync, X, User, Briefcase, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { Employee } from '../types';
import { SheetsService } from '../services/sheetsService';

interface EmployeeManagerProps {
  employees: Employee[];
  onRefresh: () => void;
}

const EmployeeManager = ({ employees, onRefresh }: EmployeeManagerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: '',
    position: '',
    salary: '5000',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.position) return;

    setLoading(true);
    const service = new SheetsService();
    
    const employee: Employee = {
      id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newEmp.name,
      position: newEmp.position,
      baseSalary: parseFloat(newEmp.salary),
      joinDate: newEmp.joinDate
    };

    try {
      await service.addEmployee(employee);
      setLoading(false);
      setShowSuccess(true);
      
      // Wait for user to see success msg, then refresh
      setTimeout(() => {
        setIsAdding(false);
        setShowSuccess(false);
        setNewEmp({ name: '', position: '', salary: '5000', joinDate: new Date().toISOString().split('T')[0] });
        onRefresh(); // Re-fetch all data
      }, 1500);
    } catch (err) {
      setLoading(false);
      alert('حدث خطأ أثناء المزامنة');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">إدارة الموظفين</h1>
          <p className="text-slate-500 text-sm">أضف موظفيك وقم بمزامنتهم مع السحابة</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-all"
          >
            <RefreshCw size={18} />
            تحديث المزامنة
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
          >
            <UserPlus size={18} />
            إضافة موظف جديد
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-[0_0_100px_rgba(37,99,235,0.1)]">
            <button onClick={() => !loading && setIsAdding(false)} className="absolute top-6 left-6 text-slate-500 hover:text-white"><X size={24} /></button>
            
            {showSuccess ? (
              <div className="py-20 text-center space-y-4 animate-in zoom-in">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-2xl font-black text-white">تم الحفظ بنجاح!</h2>
                <p className="text-slate-500">جاري تحديث القائمة الإدارية لفريدة...</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-white mb-8">إضافة موظف للمنظومة</h2>
                <form onSubmit={handleAddEmployee} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-2"><User size={14} /> اسم الموظف</label>
                    <input 
                      type="text" 
                      value={newEmp.name}
                      onChange={e => setNewEmp({...newEmp, name: e.target.value})}
                      className="w-full bg-black border border-slate-800 rounded-2xl px-5 py-3 text-white focus:ring-1 focus:ring-blue-500 outline-none" 
                      required 
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-2"><Briefcase size={14} /> المسمى الوظيفي</label>
                    <input 
                      type="text" 
                      value={newEmp.position}
                      onChange={e => setNewEmp({...newEmp, position: e.target.value})}
                      className="w-full bg-black border border-slate-800 rounded-2xl px-5 py-3 text-white focus:ring-1 focus:ring-blue-500 outline-none" 
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-2"><DollarSign size={14} /> الراتب</label>
                      <input 
                        type="number" 
                        value={newEmp.salary}
                        onChange={e => setNewEmp({...newEmp, salary: e.target.value})}
                        className="w-full bg-black border border-slate-800 rounded-2xl px-5 py-3 text-white focus:ring-1 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-2"><Calendar size={14} /> تاريخ التعيين</label>
                      <input 
                        type="date" 
                        value={newEmp.joinDate}
                        onChange={e => setNewEmp({...newEmp, joinDate: e.target.value})}
                        className="w-full bg-black border border-slate-800 rounded-2xl px-5 py-3 text-white focus:ring-1 focus:ring-blue-500 outline-none" 
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <RefreshCw className="animate-spin" size={18} /> : 'تأكيد الحفظ والمزامنة'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

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
             {employees.length} موظف متاح
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
                         <CloudSync size={48} className="text-slate-800 animate-pulse" />
                         <p>لا توجد بيانات موظفين حالياً. جرب إضافة موظف أو تحديث المزامنة.</p>
                      </div>
                   </td>
                </tr>
              ) : (
                employees
                  .filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((emp) => (
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
                        <span className="font-bold text-slate-200">{Number(emp.baseSalary).toLocaleString()}</span>
                        <span className="text-[10px] text-slate-600 mr-1">EGP</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-full border border-emerald-500/20">نشط</span>
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
