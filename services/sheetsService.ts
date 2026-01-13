
import { Employee, AttendanceRecord } from '../types';

export class SheetsService {
  private sheetId: string;
  private apiKey: string;

  constructor() {
    this.sheetId = localStorage.getItem('sheet_id') || '';
    this.apiKey = localStorage.getItem('sheets_api_key') || '';
  }

  private isConfigured(): boolean {
    return !!this.sheetId && !!this.apiKey;
  }

  async fetchEmployees(): Promise<Employee[]> {
    if (!this.isConfigured()) return [];
    
    try {
      // Range 'Employees!A2:E' assumes a sheet named Employees
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Employees!A2:E?key=${this.apiKey}`
      );
      const data = await response.json();
      
      if (!data.values) return [];
      
      return data.values.map((row: any[]) => ({
        id: row[0],
        name: row[1],
        position: row[2],
        baseSalary: parseFloat(row[3]) || 0,
        joinDate: row[4]
      }));
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  }

  async fetchAttendance(): Promise<AttendanceRecord[]> {
    if (!this.isConfigured()) return [];
    
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
      console.error('Error fetching attendance:', error);
      return [];
    }
  }

  async syncAllData() {
    console.log("فريدة: تبدأ المزامنة التلقائية...");
    const employees = await this.fetchEmployees();
    const attendance = await this.fetchAttendance();
    
    // Cache for quick access, but main source remains the Cloud
    localStorage.setItem('cached_employees', JSON.stringify(employees));
    localStorage.setItem('cached_attendance', JSON.stringify(attendance));
    
    return { employees, attendance };
  }
}
