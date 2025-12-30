import { ToolCategory, ChartData } from './types';

export const CATEGORIES: ToolCategory[] = [
  {
    id: 1,
    title: "Patent Analysis & Prior Art",
    description: "NLP tools to analyze millions of patents, identifying novelty and existing art in seconds.",
    tools: ["Patent Pal", "Specifio"],
    stats: "Higher accuracy in minutes vs. hundreds of human hours.",
    timestamp: "00:52",
    icon: "Search"
  },
  {
    id: 2,
    title: "Generative Design & CAD",
    description: "Algorithms inspired by natural selection generate thousands of design candidates based on constraints.",
    tools: ["Autodesk Fusion 360", "SolidWorks AI"],
    stats: "Topology optimization minimizes material usage.",
    timestamp: "01:35",
    icon: "Cpu"
  },
  {
    id: 3,
    title: "Materials Discovery",
    description: "ML models predict material properties like tensile strength without physical prototyping.",
    tools: ["Citrine Informatics", "The Materials Project", "AFL"],
    stats: "90-95% accuracy for many properties.",
    timestamp: "02:28",
    icon: "Atom"
  },
  {
    id: 4,
    title: "Market Research",
    description: "Analyze consumer reviews and social media to spot 'white space' opportunities.",
    tools: ["CB Insights", "Gartner AI"],
    stats: "Quantitative scores for growth potential.",
    timestamp: "03:38",
    icon: "TrendingUp"
  },
  {
    id: 5,
    title: "Prototyping & Simulation",
    description: "Virtual testing of design variations to drastically reduce physical prototyping costs.",
    tools: ["ANSYS Discovery", "Siemens Simcenter"],
    stats: "$50 & 2 hours vs. $5,000 & 2 weeks.",
    timestamp: "04:23",
    icon: "Box"
  },
  {
    id: 6,
    title: "Natural Language Interfaces",
    description: "Describe technical needs in plain language to generate CAD geometry or docs.",
    tools: ["ChatGPT", "Claude"],
    stats: "Democratizes complex engineering tasks.",
    timestamp: "05:36",
    icon: "MessageSquare"
  },
  {
    id: 7,
    title: "IP Strategy",
    description: "Map competitive landscapes and identify gaps for strategic filing.",
    tools: ["Patnap", "Qua Orbit"],
    stats: "Identifies valuable, specific claim language.",
    timestamp: "06:26",
    icon: "Shield"
  },
  {
    id: 8,
    title: "Collaboration & PM",
    description: "Coordinate distributed teams and predict bottlenecks with intelligent automation.",
    tools: ["monday.com", "Asana", "Notion"],
    stats: "Optimizes task assignments automatically.",
    timestamp: "07:31",
    icon: "Users"
  },
  {
    id: 9,
    title: "Manufacturing Optimization",
    description: "Optimize parameters for quality and cost; monitor global supply chains.",
    tools: [],
    stats: "15-30% reduction in production costs.",
    timestamp: "08:19",
    icon: "Factory"
  },
  {
    id: 10,
    title: "Sustainability Assessment",
    description: "Calculate carbon footprint and suggest eco-friendly design modifications.",
    tools: [],
    stats: "Full life-cycle impact analysis.",
    timestamp: "09:24",
    icon: "Leaf"
  }
];

export const COST_DATA: ChartData[] = [
  { name: 'Time to Market (Months)', Traditional: 60, AI_Enhanced: 18, unit: 'Months' },
];

export const FINANCIAL_DATA: ChartData[] = [
  { name: 'Dev Cost ($K)', Traditional: 2000, AI_Enhanced: 400, unit: '$' },
];

export const CHALLENGES = [
  { title: "Data Quality", desc: "Biased or incomplete data leads to 'Garbage in, garbage out'." },
  { title: "Black Boxes", desc: "Lack of explainability in AI recommendations is risky for critical decisions." },
  { title: "Cost & Learning", desc: "Enterprise tools are expensive; prompt engineering requires skill." },
  { title: "Trust", desc: "AI must augment human judgment, not replace it." }
];