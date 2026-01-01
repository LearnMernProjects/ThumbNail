import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "Access to all 50 AI Thumbnails",
            "Community support",
            "10 free credits for AI video generation",
            "Basic Templates included",
            "No watermarks on generated content"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "Unlimited access to  thumbnails",
            "Premium Thumbnails",
            "4K Resoulution",
            "Priority support",
            "Free updates and patches",
            "Custom branding options",
            "Custom Fonts"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Everything in Pro plan",
            "Dedicated support",
            "Free Thumblify software access",
            "Free usage of all AI tools",
            "Custom Editing as per your preferences",
            "Custom integrations"
        ],
        mostPopular: false
    }
];