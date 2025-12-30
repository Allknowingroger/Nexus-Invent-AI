import React from 'react';
import { ToolCategory } from '../types';
import { 
  Search, Cpu, Atom, TrendingUp, Box, 
  MessageSquare, Shield, Users, Factory, Leaf 
} from 'lucide-react';

interface CategoryCardProps {
  category: ToolCategory;
}

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search size={24} />,
  Cpu: <Cpu size={24} />,
  Atom: <Atom size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Box: <Box size={24} />,
  MessageSquare: <MessageSquare size={24} />,
  Shield: <Shield size={24} />,
  Users: <Users size={24} />,
  Factory: <Factory size={24} />,
  Leaf: <Leaf size={24} />
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full shadow-sm">
      <div className="absolute top-4 right-4 text-slate-400 font-mono text-[10px] group-hover:text-cyan-600 transition-colors bg-slate-50 px-1.5 py-0.5 rounded">
        {category.timestamp}
      </div>
      
      <div className="mb-5 text-cyan-600 bg-cyan-50 p-3 rounded-xl w-fit group-hover:bg-cyan-600 group-hover:text-white transition-all">
        {iconMap[category.icon] || <Box size={24} />}
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
        {category.title}
      </h3>
      
      <p className="text-slate-600 text-sm mb-5 leading-relaxed flex-grow">
        {category.description}
      </p>

      {category.stats && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 mb-5">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Potential Impact</span>
            <span className="text-xs text-emerald-900 font-medium leading-tight block">{category.stats}</span>
        </div>
      )}

      {category.tools.length > 0 && (
        <div className="border-t border-slate-100 pt-4 mt-auto">
          <p className="text-[10px] text-slate-400 uppercase font-bold mb-2 tracking-tight">Key Ecosystem Tools</p>
          <div className="flex flex-wrap gap-1.5">
            {category.tools.map((tool, idx) => (
              <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-1 rounded-md border border-slate-200 font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;