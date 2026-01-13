
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
    // Filter out if exists and push new
    const filtered = current.filter(e => e.id !== emp.id);
    const updated = [...filtered, emp];
    localStorage.setItem('local_employees', JSON.stringify(updated));
    console.log("فريدة: تم حفظ الموظف محلياً لتسريع الواجهة", emp.name);
  }

  async fetchEmployees(): Promise<Employee[]> {
    const localEmps = this.getLocalEmployees();
    
    if (!this.isConfigured() || !this.apiKey) {
      console.log("فريدة: النظام غير مهيأ، يتم استخدام البيانات المحلية فقط.");
      return localEmps;
    }
    
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Employees!A2:E?key=${this.apiKey}`
      );
      const data = await response.json();
      
      if (!data.values) return localEmps;
      
      const cloudEmps = data.values.map((row: any[]) => ({
        id: row[0] || `ID-${Math.random().toString(36).substr(2, 5)}`,
        name: row[1] || 'غير معروف',
        position: row[2] || '-',
        baseSalary: parseFloat(row[3]) || 0,
        joinDate: row[4] || new Date().toLocaleDateString()
      }));

      // Merge Cloud + Local
      const cloudIds = new Set(cloudEmps.map((e: Employee) => e.id));
      const uniqueLocal = localEmps.filter(e => !cloudIds.has(e.id));
      
      const final = [...cloudEmps, ...uniqueLocal];
      // Keep local in sync with cloud if cloud is more updated
      if (cloudEmps.length > 0) {
        // Option: we could update local storage here too
      }
      
      return final;
    } catch (error) {
      console.error('فريدة: فشل جلب الموظفين سحابياً، نستخدم النسخة المحلية -', error);
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
    if (!this.isConfigured()) {
      console.warn("فريدة: لا يمكن الإرسال للسحابة، النظام غير مهيأ.");
      return false;
    }

    if (this.proxyUrl) {
      try {
        // mode: no-cors is essential for Apps Script unless you have complex setup
        await fetch(this.proxyUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ range, values })
        });
        console.log("فريدة: تم إرسال طلب الكتابة للجسر السحابي بنجاح.");
        return true;
      } catch (err) {
        console.error("فريدة: خطأ في جسر الكتابة -", err);
        return false;
      }
    }

    console.warn("فريدة: لا يوجد رابط Proxy. البيانات ستفقد عند تحديث الصفحة إذا لم تكن في Cloud.");
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
