
export enum AccountingPeriod {
  WEEKLY_SAT_THU = 'WEEKLY_SAT_THU',
  WEEKLY_MON_SAT = 'WEEKLY_MON_SAT',
  MONTHLY = 'MONTHLY'
}

export interface CloudDBConfig {
  sheetId: string;
  apiKey: string;
  isConnected: boolean;
  lastSync?: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  baseSalary: number;
  joinDate: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut: string;
  delayMinutes: number;
  status: 'حاضر' | 'غائب' | 'تأخير' | 'إجازة';
}

export interface AppSettings {
  companyName: string;
  currency: string;
  workingHoursStart: string;
  workingHoursEnd: string;
  accountingPeriod: AccountingPeriod;
  themeColor: string;
  accentColor: string;
}
