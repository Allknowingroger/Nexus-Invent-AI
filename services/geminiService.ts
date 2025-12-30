import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in the environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeInventionIdea = async (idea: string): Promise<string> => {
  try {
    const ai = getClient();
    const systemInstruction = `
      You are an expert Innovation Consultant and Senior Engineer. 
      Your goal is to help an inventor validate and expand their idea using the "10 AI Categories for Inventors" framework.
      
      The framework categories are:
      1. Patent Analysis
      2. Generative Design
      3. Materials Discovery
      4. Market Research
      5. Prototyping
      6. NLP Interfaces
      7. IP Strategy
      8. Collaboration
      9. Manufacturing
      10. Sustainability

      Analyze the user's idea. Provide a structured response in Markdown.
      1. **Executive Summary**: A brief assessment of feasibility.
      2. **Key Category Insights**: Pick the 3-4 most relevant categories from the list above and explain how AI tools in those specific categories could accelerate this specific invention. Suggest specific types of simulations or searches.
      3. **Risk Assessment**: Briefly mention potential challenges (Technical or Market).
      4. **Next Steps**: 3 concrete actions the inventor should take immediately.
      
      Keep the tone professional, encouraging, and highly technical but accessible.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: idea,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Error analyzing idea:", error);
    return "I encountered an error while analyzing your idea. Please ensure your API key is configured correctly and try again.";
  }
};

export const chatWithMentor = async (history: {role: string, content: string}[], message: string): Promise<string> => {
    try {
        const ai = getClient();
        
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: "You are a helpful AI invention mentor. Answer questions about the invention process, AI tools, and engineering concepts concisely and professionally.",
            },
            history: history.map(h => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.content }]
            }))
        });

        const result = await chat.sendMessage({ message: message });
        return result.text || "No response generated.";

    } catch (error) {
        console.error("Chat error:", error);
        return "I am having trouble connecting to the knowledge base right now.";
    }
}