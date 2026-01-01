import { Request, Response } from "express";
import Thumbnail from "../models/thumbnail.js";
import { generateImage } from "../configs/ai.js";
import path from "path";
import fs from "fs/promises";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const stylePrompts: Record<string, string> = {
    "Bold & Graphic": "bold, graphic design with strong visual impact, vibrant colors",
    "Tech/Futuristic": "futuristic, tech-inspired aesthetic with digital elements and modern design",
    "Minimalist": "clean, simple, uncluttered design with minimal elements",
    "Photorealistic": "photorealistic, detailed, high-quality realistic imagery",
    "Illustrated": "artistic illustration style, creative hand-drawn aesthetic"
};

const colorSchemeDescription: Record<string, string> = {
    vibrant: "bold, saturated colors that make a strong visual impact",
    pastel: "soft, muted tones that create a gentle, calming feel",
    monochrome: "single color with various shades and tones",
    warm: "reds, oranges, yellows that feel energetic and inviting",
    cool: "blues, greens, purples that feel calm and sophisticated",
    sunset: "warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow",
    earthy: "natural browns, greens, and terracotta tones that feel grounded and organic",
    neon: "neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow"
};

export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;

        if (!userId) {
            return res.status(401).json({ error: "User must be logged in" });
        }

        const {
            title,
            prompt: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay
        } = req.body;

        if (!title || !style) {
            return res
                .status(400)
                .json({ error: "Title and style are required" });
        }

        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used: user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true
        });

        let prompt = `Create a ${stylePrompts[style]} for: ${title}`;
        if (
            color_scheme &&
            colorSchemeDescription[color_scheme]
        ) {
            prompt += ` Use a ${colorSchemeDescription[color_scheme]}`;
        }
        if (user_prompt) {
            prompt += ` based on the user's prompt: "${user_prompt}"`;
        }
        prompt += ` The thumbnail should be ${aspect_ratio || "16:9"} aspect ratio`;
        if (text_overlay) {
            prompt += ` with text overlay: "${text_overlay}"`;
        } else {
            prompt += ` with no text overlay`;
        }
        prompt += `. Make it bold, professional and impossible to ignore`;

        const response = await generateImage(prompt);

        // Gemini returns text response, not image data directly
        if (!response || !response[0]) {
            return res
                .status(500)
                .json({ error: "No response from Gemini API" });
        }

        // Since Gemini doesn't generate images directly, we'll use a placeholder
        // In a real implementation, you'd use the text response to call an image API
        const imageData = response[0];
        let finalBuffer: Buffer | null = null;
        
        if (imageData && imageData.image) {
            finalBuffer = Buffer.from(imageData.image, 'base64');
        }

        if (!finalBuffer) {
            return res
                .status(500)
                .json({ error: "No image data generated" });
        }

        const filename = `final-output-${Date.now()}.png`;
        const uploadsDir = path.join(__dirname, "..", "uploads");
        const filePath = path.join(uploadsDir, filename);
        await fs.mkdir(uploadsDir, { recursive: true });
        await fs.writeFile(filePath, finalBuffer);

        const uploadResult = await cloudinary.uploader.upload(filePath, {
            folder: "nail_thumbnails",
            resource_type: "image"
        });

        thumbnail.image_url = uploadResult.url;
        thumbnail.isGenerating = false;
        await thumbnail.save();

        res.status(200).json({
            message: "Thumbnail generated successfully",
            thumbnailId: thumbnail._id,
            imageUrl: uploadResult.url
        });
    } catch (error) {
        console.error("Error in generateThumbnail:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;
        await Thumbnail.findByIdAndDelete({ _id: id, userId });
        res.status(200).json({ message: "Thumbnail deleted successfully" });
    } catch (error) {
        console.error("Error in deleteThumbnail:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};