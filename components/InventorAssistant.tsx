import React, { useState, useRef, useEffect } from 'react';
import { analyzeInventionIdea, chatWithMentor } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const InventorAssistant: React.FC = () => {
  const [ideaMode, setIdeaMode] = useState<'ANALYSIS' | 'CHAT'>('ANALYSIS');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello! I'm your Nexus AI Assistant. Switch to **'Idea Validator'** mode to analyze your invention concept, or ask me anything about the toolkit here!", timestamp: new Date() }
  ]);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, analysisResult, loading]);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await analyzeInventionIdea(input);
    setAnalysisResult(result);
    setLoading(false);
  };

  const handleChat = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await chatWithMentor(chatHistory, userMsg.content);
    
    setChatHistory(prev => [...prev, { role: 'model', content: response, timestamp: new Date() }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-4 border-b border-slate-100 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${ideaMode === 'ANALYSIS' ? 'bg-purple-100 text-purple-600' : 'bg-cyan-100 text-cyan-600'}`}>
                {ideaMode === 'ANALYSIS' ? <Lightbulb size={20} /> : <Bot size={20} />}
            </div>
            <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                    {ideaMode === 'ANALYSIS' ? 'Invention Validator' : 'Expert Mentor'}
                </h2>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Gemini 3 Pro Intelligence</p>
            </div>
        </div>
        
        <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
            <button 
                onClick={() => setIdeaMode('ANALYSIS')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${ideaMode === 'ANALYSIS' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Validator
            </button>
            <button 
                onClick={() => setIdeaMode('CHAT')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${ideaMode === 'CHAT' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Chat
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        
        {ideaMode === 'ANALYSIS' ? (
          <div className="max-w-3xl mx-auto">
             {!analysisResult && !loading && (
                <div className="text-center py-24 text-slate-400">
                    <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles size={40} className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Validate</h3>
                    <p className="max-w-sm mx-auto text-sm leading-relaxed">
                      Provide a detailed description of your concept. I'll evaluate it across the 10 core AI domains and propose a roadmap.
                    </p>
                </div>
             )}

             {analysisResult && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm animate-fade-in">
                    <div className="prose prose-slate prose-sm max-w-none prose-headings:text-slate-900 prose-strong:text-slate-900 prose-cyan">
                        <ReactMarkdown>{analysisResult}</ReactMarkdown>
                    </div>
                    <button 
                        onClick={() => setAnalysisResult(null)}
                        className="mt-8 text-xs font-bold text-purple-600 hover:text-purple-700 underline underline-offset-4"
                    >
                        Start New Analysis
                    </button>
                </div>
             )}
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`}>
                            <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'prose-slate'}`}>
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
          </div>
        )}
        
        {loading && (
            <div className="flex justify-center py-6">
                <div className="bg-white p-3 rounded-full shadow-md border border-slate-100">
                  <Loader2 className="animate-spin text-cyan-600" size={24} />
                </div>
            </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto relative flex gap-3 items-end">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        ideaMode === 'ANALYSIS' ? handleAnalyze() : handleChat();
                    }
                }}
                placeholder={ideaMode === 'ANALYSIS' ? "Describe your invention concept..." : "Ask a follow-up question..."}
                className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all resize-none min-h-[50px] max-h-[150px]"
                rows={1}
            />
            <button 
                onClick={ideaMode === 'ANALYSIS' ? handleAnalyze : handleChat}
                disabled={loading || !input.trim()}
                className={`p-3 rounded-xl transition-all shadow-sm flex-shrink-0 ${ideaMode === 'ANALYSIS' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white'} disabled:opacity-30 disabled:cursor-not-allowed`}
            >
                <Send size={20} />
            </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-tighter">
            Nexus AI outputs should be cross-verified by licensed engineering professionals.
        </p>
      </div>
    </div>
  );
};

export default InventorAssistant;