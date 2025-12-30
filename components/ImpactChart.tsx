import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartData } from '../types';

interface ImpactChartProps {
  data: ChartData[];
  title: string;
  colorPrimary: string;
  colorSecondary: string;
}

const ImpactChart: React.FC<ImpactChartProps> = ({ data, title, colorPrimary, colorSecondary }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        {title}
      </h3>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                tick={{fill: '#64748b', fontSize: 12}}
                axisLine={{stroke: '#e2e8f0'}} 
                tickLine={false}
            />
            <YAxis 
                stroke="#64748b" 
                tick={{fill: '#64748b', fontSize: 12}}
                axisLine={{stroke: '#e2e8f0'}}
                tickLine={false}
            />
            <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: '#e2e8f0', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  padding: '12px'
                }}
                itemStyle={{ color: '#1e293b', fontSize: '13px' }}
                cursor={{fill: '#f8fafc'}}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: '20px' }} />
            <Bar dataKey="Traditional" name="Traditional Process" fill={colorPrimary} radius={[4, 4, 0, 0]} barSize={40} />
            <Bar dataKey="AI_Enhanced" name="AI Enhanced" fill={colorSecondary} radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-50 text-sm text-slate-500 italic">
        {data[0].unit === 'Months' 
            ? "Drastic reduction in time-to-market observed across core engineering sectors."
            : "Significant capital efficiency improvement lowered the average barrier to innovation."
        }
      </div>
    </div>
  );
};

export default ImpactChart;