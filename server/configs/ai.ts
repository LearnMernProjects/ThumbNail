import { GoogleGenerativeAI } from "@google/generative-ai";

console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateImage = async (prompt: string): Promise<any[]> => {
    try {
        const model = genAI.getGenerativeModel({ model: "imagen-4.0-generate-001" });
        
        const result = await model.generateContent([
            "Generate an image for this prompt: " + prompt
        ]);
        
        const response = await result.response;
        const text = response.text();
        
        // For now, return a placeholder since Gemini doesn't directly generate images
        // You'll need to integrate with a different image generation API
        return [{ image: "placeholder_base64_data" }];
    } catch (error) {
        console.error("Error generating image with Gemini:", error);
        throw error;
    }
};

export default { generateImage };