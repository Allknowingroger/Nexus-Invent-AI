import React, { useState } from 'react';
import { AppView } from './types';
import { CATEGORIES, COST_DATA, FINANCIAL_DATA, CHALLENGES } from './constants';
import CategoryCard from './components/CategoryCard';
import ImpactChart from './components/ImpactChart';
import InventorAssistant from './components/InventorAssistant';
import { 
  LayoutDashboard, 
  Bot, 
  Menu, 
  X, 
  BrainCircuit, 
  ArrowRight,
  TrendingDown,
  Clock
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case AppView.ASSISTANT:
        return <InventorAssistant />;
      case AppView.DASHBOARD:
      default:
        return (
          <div className="space-y-12 pb-10">
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="bg-white/20 p-2 rounded-lg"><Clock size={24} /></div>
                        <span className="text-sm font-medium text-indigo-100">Time to Market</span>
                    </div>
                    <div className="text-4xl font-bold mb-1">-70%</div>
                    <div className="text-xs text-indigo-100/80">5 years → 18 months</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="bg-white/20 p-2 rounded-lg"><TrendingDown size={24} /></div>
                        <span className="text-sm font-medium text-cyan-100">Dev Costs</span>
                    </div>
                    <div className="text-4xl font-bold mb-1">-80%</div>
                    <div className="text-xs text-cyan-100/80">$2M → $400k</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm md:col-span-2 flex items-center justify-between group cursor-pointer hover:border-purple-300 transition-all hover:shadow-md"
                     onClick={() => setCurrentView(AppView.ASSISTANT)}>
                    <div>
                        <h3 className="text-xl font-bold text-purple-600 mb-2 flex items-center gap-2">
                            <BrainCircuit size={24} /> Try the AI Assistant
                        </h3>
                        <p className="text-slate-500 text-sm max-w-sm">
                            Validate your idea instantly against the 10-category framework using Gemini 3 Flash.
                        </p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <ArrowRight size={24} />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[450px]">
                <ImpactChart 
                    data={COST_DATA} 
                    title="Time Efficiency (Months)" 
                    colorPrimary="#94a3b8" 
                    colorSecondary="#0891b2" 
                />
                <ImpactChart 
                    data={FINANCIAL_DATA} 
                    title="Capital Efficiency ($1000s)" 
                    colorPrimary="#94a3b8" 
                    colorSecondary="#7c3aed" 
                />
            </div>

            {/* Categories Grid */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-cyan-500 rounded-full"></span>
                    The 10 Tool Categories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {CATEGORIES.map(category => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>

            {/* Challenges Section */}
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-rose-900 mb-6">Challenges & Limitations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CHALLENGES.map((challenge, idx) => (
                        <div key={idx} className="flex gap-4">
                            <div className="w-1 bg-rose-200 rounded-full"></div>
                            <div>
                                <h4 className="text-lg font-bold text-rose-800">{challenge.title}</h4>
                                <p className="text-slate-600 text-sm mt-1 leading-relaxed">{challenge.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans">
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-2 text-cyan-600">
                <BrainCircuit size={32} />
                <h1 className="text-xl font-bold tracking-tight text-slate-900">NEXUS<span className="text-cyan-600">AI</span></h1>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-semibold">Inventor Toolkit</p>
        </div>
        
        <nav className="flex-grow p-4 space-y-1">
            <button 
                onClick={() => setCurrentView(AppView.DASHBOARD)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${currentView === AppView.DASHBOARD ? 'bg-cyan-50 text-cyan-700 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
            </button>
            <button 
                onClick={() => setCurrentView(AppView.ASSISTANT)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${currentView === AppView.ASSISTANT ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
                <Bot size={20} />
                <span>AI Assistant</span>
            </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500">
                <p className="mb-1 font-bold text-slate-600">Source Material</p>
                <p className="leading-tight">"AI Tools Every Inventor Must Know in 2025"</p>
                <p className="mt-2 text-slate-400 italic">AI Labs: Brain Science & Nexus</p>
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-2 text-cyan-600">
                <BrainCircuit size={24} />
                <h1 className="text-lg font-bold text-slate-900">NEXUS</h1>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <div className="md:hidden absolute top-[60px] left-0 w-full bg-white border-b border-slate-200 z-10 p-4 shadow-xl">
                 <button 
                    onClick={() => { setCurrentView(AppView.DASHBOARD); setMobileMenuOpen(false); }}
                    className={`w-full text-left p-4 rounded-lg mb-2 ${currentView === AppView.DASHBOARD ? 'bg-cyan-50 text-cyan-700' : 'text-slate-600'}`}
                >
                    Dashboard
                </button>
                <button 
                    onClick={() => { setCurrentView(AppView.ASSISTANT); setMobileMenuOpen(false); }}
                    className={`w-full text-left p-4 rounded-lg ${currentView === AppView.ASSISTANT ? 'bg-purple-50 text-purple-700' : 'text-slate-600'}`}
                >
                    AI Assistant
                </button>
            </div>
        )}

        {/* Scrollable View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;