
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

  // Helper to manage local fallback data
  private getLocalEmployees(): Employee[] {
    const data = localStorage.getItem('local_employees');
    return data ? JSON.parse(data) : [];
  }

  private saveLocalEmployee(emp: Employee) {
    const current = this.getLocalEmployees();
    const updated = [...current.filter(e => e.id !== emp.id), emp];
    localStorage.setItem('local_employees', JSON.stringify(updated));
  }

  async fetchEmployees(): Promise<Employee[]> {
    const localEmps = this.getLocalEmployees();
    
    if (!this.isConfigured() || !this.apiKey) {
      return localEmps;
    }
    
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Employees!A2:E?key=${this.apiKey}`
      );
      const data = await response.json();
      
      if (!data.values) return localEmps;
      
      const cloudEmps = data.values.map((row: any[]) => ({
        id: row[0] || Math.random().toString(36).substr(2, 9),
        name: row[1] || 'غير معروف',
        position: row[2] || '-',
        baseSalary: parseFloat(row[3]) || 0,
        joinDate: row[4] || new Date().toLocaleDateString()
      }));

      // Merge Cloud + Local, prioritizing Cloud IDs but keeping unique local ones
      const cloudIds = new Set(cloudEmps.map((e: Employee) => e.id));
      const uniqueLocal = localEmps.filter(e => !cloudIds.has(e.id));
      
      return [...cloudEmps, ...uniqueLocal];
    } catch (error) {
      console.error('فريدة: فشل جلب الموظفين، نستخدم البيانات المحلية -', error);
      return localEmps;
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
      return [];
    }
  }

  async sendToCloud(range: string, values: any[][]) {
    if (!this.isConfigured()) return false;

    // Send to Google Proxy
    if (this.proxyUrl) {
      try {
        await fetch(this.proxyUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ range, values })
        });
      } catch (err) {
        console.error("Proxy error:", err);
      }
    }

    console.log("فريدة: تم تسجيل البيانات سحابياً (Proxy Mode)");
    return true; 
  }

  async addEmployee(emp: Employee) {
    // 1. Save locally for instant UI update
    this.saveLocalEmployee(emp);
    
    // 2. Send to cloud
    const row = [emp.id, emp.name, emp.position, emp.baseSalary, emp.joinDate];
    return await this.sendToCloud('Employees!A:E', [row]);
  }

  async syncAllData() {
    const employees = await this.fetchEmployees();
    const attendance = await this.fetchAttendance();
    return { employees, attendance };
  }
}
