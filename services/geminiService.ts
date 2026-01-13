
import { GoogleGenAI } from "@google/genai";

// AIService provides integration with Gemini for analysis and chat.
// It follows the latest @google/genai guidelines.
export class AIService {
  // Analyzes attendance data using the gemini-3-flash-preview model.
  async analyzeAttendance(data: any): Promise<string> {
    // Initialize inside the method as per guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `قم بتحليل بيانات الحضور هذه واقترح حلولاً للمشاكل أو لخص الأداء: ${JSON.stringify(data)}`,
        config: {
          systemInstruction: "أنتِ فريدة، مساعدة إيهاب اليمني الذكية. وظيفتك تحليل بيانات الموظفين واقتراح حلول إدارية ذكية ومبتكرة بلغة عربية راقية.",
        }
      });
      // Use .text property (not a method).
      return response.text || "لم يتم الحصول على تحليل.";
    } catch (error) {
      console.error(error);
      return "حدث خطأ أثناء التحليل.";
    }
  }

  // General chat functionality for AI assistant.
  async chat(message: string, context?: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `${context ? `سياق البيانات: ${context}\n` : ''}المستخدم: ${message}`,
        config: {
          systemInstruction: "أنتِ فريدة، مساعدة إيهاب اليمني الجميلة. لا توجد حدود لأفكارك، ناقشي أي فكرة بذكاء وابداع. نفذي الأوامر البرمجية أو الإدارية باحترافية تامة.",
        }
      });
      // Use .text property.
      return response.text || "عذراً، لم أستطع معالجة الطلب.";
    } catch (error) {
      console.error(error);
      return "عذراً إيهاب، واجهت مشكلة تقنية بسيطة.";
    }
  }
}
