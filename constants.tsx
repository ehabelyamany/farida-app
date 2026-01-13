
import React from 'react';
import { LayoutDashboard, Users, Clock, Zap, Cpu, Share2, Database, BarChart3, ShieldCheck, MessageSquare, Settings, Palette } from 'lucide-react';
import { AccountingPeriod, AppSettings } from './types';

export const INITIAL_SETTINGS: AppSettings = {
  companyName: "شركة إيهاب المتميزة",
  currency: "EGP",
  workingHoursStart: "09:00",
  workingHoursEnd: "17:00",
  accountingPeriod: AccountingPeriod.MONTHLY,
  themeColor: "#3b82f6",
  accentColor: "#10b981"
};

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'الرئيسية', icon: <LayoutDashboard size={20} /> },
  { id: 'employees', label: 'الموظفين', icon: <Users size={20} /> },
  { id: 'attendance', label: 'الحضور والانصراف', icon: <Clock size={20} /> },
  { id: 'automation', label: 'الأتمتة', icon: <Zap size={20} /> },
  { id: 'ai-config', label: 'إعدادات الذكاء الاصطناعي', icon: <Cpu size={20} /> },
  { id: 'integrations', label: 'الدمج والمنصات', icon: <Share2 size={20} /> },
  { id: 'cloud-db', label: 'قاعدة البيانات السحابية', icon: <Database size={20} /> },
  { id: 'reports', label: 'التقارير', icon: <BarChart3 size={20} /> },
  { id: 'users', label: 'مستخدمي النظام', icon: <ShieldCheck size={20} /> },
  { id: 'ai-chat', label: 'مساعد فريدة الذكي', icon: <MessageSquare size={20} /> },
  { id: 'settings', label: 'الإعدادات العامة', icon: <Settings size={20} /> },
  { id: 'theme', label: 'تخصيص المظهر', icon: <Palette size={20} /> },
];
