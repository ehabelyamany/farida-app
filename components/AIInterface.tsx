
import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Sparkles } from 'lucide-react';
import { AIService } from '../services/geminiService';

interface AIInterfaceProps {
  context?: string;
}

const AIInterface: React.FC<AIInterfaceProps> = ({ context }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: 'أهلاً بك إيهاب. أنا فريدة، كيف يمكنني مساعدتك في تطوير العمل اليوم؟ يمكننا تحليل الرواتب أو مراجعة أداء الموظفين معاً.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // AIService now handles API key retrieval from process.env internally
  const aiService = new AIService();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    // Passing context to the chat method for smarter responses
    const response = await aiService.chat(userMsg, context);
    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setIsTyping(false);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col lg:flex-row gap-6">
      {/* Chat Area */}
      <div className="flex-1 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-sm flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="font-bold text-white">فريدة الذكية</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-slate-500 font-medium">متصلة الآن</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`
                max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-slate-800 text-slate-200 rounded-br-none border border-slate-700' 
                  : 'bg-blue-600 text-white rounded-bl-none shadow-[0_0_15px_rgba(37,99,235,0.2)]'}
              `}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-end">
               <div className="bg-slate-800 p-4 rounded-3xl rounded-bl-none flex gap-1 border border-slate-700">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-950/20">
          <div className="relative flex items-center gap-2">
            <input 
              type="text" 
              placeholder="تحدثي معي يا فريدة..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              <Send size={20} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 space-y-6 overflow-y-auto pr-1">
        <div className="bg-slate-900 p-6 rounded-[2.5rem] border border-slate-800">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <Cpu size={20} className="text-blue-500" />
            تهيئة النظام
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 mb-2 block mr-1">رابط النهاية</label>
              <input type="text" placeholder="https://api..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
            {/* Note: API Key management is handled by the system environment variables */}
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
               <p className="text-[10px] text-blue-400 font-bold leading-relaxed uppercase">
                 نظام فريدة يستخدم مفاتيح API آمنة مدمجة في البيئة السحابية لإيهاب اليمني. لا حاجة لإدخال مفاتيح يدوية هنا.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterface;
