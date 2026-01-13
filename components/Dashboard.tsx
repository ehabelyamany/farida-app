
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Users, Clock, AlertCircle, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Employee, AttendanceRecord } from '../types';

interface DashboardProps {
  employees: Employee[];
  attendance: AttendanceRecord[];
}

const data = [
  { name: 'السبت', presence: 40, absence: 2 },
  { name: 'الأحد', presence: 38, absence: 4 },
  { name: 'الاثنين', presence: 42, absence: 0 },
  { name: 'الثلاثاء', presence: 35, absence: 7 },
  { name: 'الأربعاء', presence: 41, absence: 1 },
  { name: 'الخميس', presence: 39, absence: 3 },
];

const pieData = [
  { name: 'حاضر', value: 85 },
  { name: 'غائب', value: 10 },
  { name: 'إجازة', value: 5 },
];

const COLORS = ['#3b82f6', '#f43f5e', '#10b981'];

const StatCard = ({ title, value, sub, icon, trend, positive }: any) => (
  <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm hover:border-slate-700 transition-all relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-2xl ${positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-slate-500 text-xs mt-2">{sub}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ employees, attendance }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">نظرة عامة</h1>
          <p className="text-slate-500 mt-1">إليك تقرير سريع عن حالة العمل اليوم</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-900 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors">تصدير PDF</button>
          <button className="bg-blue-600 px-6 py-2 rounded-xl text-sm font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-colors">سجل جديد</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي الموظفين" value={employees.length || 128} sub="+3 موظفين جدد هذا الشهر" icon={<Users size={20} />} trend={5} positive />
        <StatCard title="نسبة الحضور اليوم" value="94.2%" sub="121 موظف حاضر الآن" icon={<Clock size={20} />} trend={-2} />
        <StatCard title="متوسط التأخير" value="18د" sub="-4د عن الأسبوع الماضي" icon={<AlertCircle size={20} />} trend={12} positive />
        <StatCard title="إجمالي الرواتب" value="450k" sub="العملة: EGP" icon={<DollarSign size={20} />} trend={8} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-sm">
          <h3 className="font-bold text-lg text-white mb-8">إحصائيات الأسبوع</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', padding: '12px'}}
                  itemStyle={{color: '#f8fafc'}}
                />
                <Bar dataKey="presence" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="absence" fill="#334155" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-sm flex flex-col items-center">
           <h3 className="font-bold text-lg text-white self-start mb-4">توزيـع الـحالة</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={pieData} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                   {pieData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px'}} />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="grid grid-cols-1 w-full gap-4 mt-4">
             {pieData.map((item, i) => (
               <div key={item.name} className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                   <span className="text-slate-400">{item.name}</span>
                 </div>
                 <span className="font-bold text-white">{item.value}%</span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
