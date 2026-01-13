
import { Employee, AttendanceRecord } from '../types';

export class SheetsService {
  private sheetId: string;
  private apiKey: string;
  private proxyUrl: string;

  constructor() {
    this.sheetId = localStorage.getItem('sheet_id') || '';
    this.apiKey = localStorage.getItem('sheets_api_key') || '';
    this.proxyUrl = localStorage.getItem('proxy_url') || '';
  }

  private isConfigured(): boolean {
    return !!this.sheetId;
  }

  async fetchEmployees(): Promise<Employee[]> {
    if (!this.isConfigured() || !this.apiKey) return [];
    
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Employees!A2:E?key=${this.apiKey}`
      );
      const data = await response.json();
      
      if (!data.values) return [];
      
      return data.values.map((row: any[]) => ({
        id: row[0] || Math.random().toString(36).substr(2, 9),
        name: row[1] || 'غير معروف',
        position: row[2] || '-',
        baseSalary: parseFloat(row[3]) || 0,
        joinDate: row[4] || new Date().toLocaleDateString()
      }));
    } catch (error) {
      console.error('فريدة: فشل جلب الموظفين -', error);
      return [];
    }
  }

  async fetchAttendance(): Promise<AttendanceRecord[]> {
    if (!this.isConfigured() || !this.apiKey) return [];
    
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Attendance!A2:H?key=${this.apiKey}`
      );
      const data = await response.json();
      
      if (!data.values) return [];
      
      return data.values.map((row: any[]) => ({
        id: row[0],
        employeeId: row[1],
        date: row[2],
        clockIn: row[3],
        clockOut: row[4],
        delayMinutes: parseInt(row[5]) || 0,
        status: row[6] as any
      }));
    } catch (error) {
      console.error('فريدة: فشل جلب السجلات -', error);
      return [];
    }
  }

  async sendToCloud(range: string, values: any[][]) {
    if (!this.isConfigured()) return false;

    if (this.proxyUrl) {
      try {
        const response = await fetch(this.proxyUrl, {
          method: 'POST',
          mode: 'no-cors', // Common for Apps Script
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ range, values })
        });
        return true; 
      } catch (err) {
        console.error("Proxy error:", err);
      }
    }

    console.warn("فريدة: لا يوجد رابط Proxy للكتابة. سيتم طباعة البيانات في Console فقط.");
    console.table(values);
    return true; 
  }

  async addEmployee(emp: Employee) {
    const row = [emp.id, emp.name, emp.position, emp.baseSalary, emp.joinDate];
    return await this.sendToCloud('Employees!A:E', [row]);
  }

  async syncAllData() {
    const employees = await this.fetchEmployees();
    const attendance = await this.fetchAttendance();
    return { employees, attendance };
  }
}
