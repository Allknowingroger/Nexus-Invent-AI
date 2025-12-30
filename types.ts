export interface ToolCategory {
  id: number;
  title: string;
  description: string;
  tools: string[];
  stats?: string;
  timestamp: string;
  icon: string;
}

export interface ChartData {
  name: string;
  Traditional: number;
  AI_Enhanced: number;
  unit: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  ASSISTANT = 'ASSISTANT',
  ABOUT = 'ABOUT'
}