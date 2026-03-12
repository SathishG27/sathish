import { GoogleGenerativeAI } from "@google/generative-ai";
import { portfolioData } from '../data/portfolioData';

// Stable Gemini API setup
const genAI = new GoogleGenerativeAI("AIzaSyBLONB15cJZYVGAJd1p7nBbdSU6QQhSrRo");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const AI_NAME = "Friday";

/**
 * Enhanced Local Intelligence
 * Friday now prioritizes React/Next.js and then Angular/SpringBoot.
 */
const getLocalResponse = (query) => {
    const q = query.toLowerCase().trim();

    // TRIGGER: Introduce Yourself
    if (q.includes("introduce yourself") || q.includes("who are you") || (q.includes("tell me") && q.includes("about you"))) {
        return `My boss, Sathish G, is a Digital Transformation Engineer currently based in Chennai, India. He has over 2 years of professional experience specializing in modern web development with a focus on React.js and Next.js, and he is equally proficient in Angular and Spring Boot for enterprise solutions. [CONTACT_CARD]`;
    }

    // TRIGGER: Projects (Buckman & ESYGO)
    if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
        return `Project 1: Buckman Ackumen Chemical Management. This is a global enterprise platform for industrial chemical monitoring and data visualization, built using React.js and .NET. It allows industrial clients to monitor chemical levels in real-time.

Project 2: ESYGO EV Charging Application. A comprehensive EV ecosystem app that helps users locate, book, and pay for charging stations. My boss implemented real-time tracking and secure payment integrations using React.js, Next.js, and Spring Boot, creating a smooth experience for thousands of users in India.`;
    }

    // TRIGGER: Relocate
    if (q.includes("relocate") || q.includes("willing to move")) {
        return `Yes, my boss is absolutely willing to relocate for the right professional opportunity.`;
    }

    // TRIGGER: Expected CTC / Salary / Notice Period
    if (q.includes("ctc") || q.includes("salary") || q.includes("expected pay") || q.includes("compensation") || (q.includes("notice") && q.includes("period"))) {
        return `My boss's current CTC is 4 LPA and his expected CTC is 7 LPA. He is open to negotiation, especially considering he has significantly upgraded his skill set to a Full Stack profile (React, Next.js, Angular, and Spring Boot) and is an expert in leveraging AI tools to accelerate project delivery twice as fast. His notice period is between 15 to 30 days.`;
    }

    // TRIGGER: Resume Download
    if (q.includes("resume") || q.includes("cv") || q.includes("download") || q.includes("document")) {
        return `Of course! I am downloading my boss's resume for you right now. It should open in a new window. [ACTION:DOWNLOAD_RESUME]`;
    }

    // Angle: Tech Stack & AI Native
    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("ai") || q.includes("tool")) {
        return `My boss's core stack is built around React.js and Next.js, combined with Angular and Spring Boot for powerful backend systems. He is an AI-native engineer who uses advanced AI tools to speed up development by 2x while maintaining high code quality. [SKILLS_CARD]`;
    }

    // Angle: Contact
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("reach")) {
        return `You can reach my boss at ${portfolioData.personalInfo.email} or call him at ${portfolioData.personalInfo.phone}. [CONTACT_CARD]`;
    }

    return null;
};

export const getAIResponse = async (messages) => {
    const lastUserMessage = messages[messages.length - 1].content;

    const localMatch = getLocalResponse(lastUserMessage);
    if (localMatch) {
        await new Promise(r => setTimeout(r, 450));
        return localMatch;
    }

    try {
        const prompt = `
      System: You are ${AI_NAME}, the professional AI assistant for Sathish G.
      
      Boss Profile:
      - Current Role: Digital Transformation Engineer
      - Location: Chennai
      - Exp: 2+ Years
      - Primary Stack: React.js, Next.js
      - Enterprise/Full Stack: Angular, RxJS, Spring Boot, MySQL, PostgreSQL
      - Strength: AI-Native Engineering (2x Speed)
      - Current CTC: 4 LPA, Expected CTC: 7 LPA (Negotiable due to Full Stack upgrade)
      - Notice Period: 15-30 Days
      - Relocation: Yes
      
      Instructions:
      1. Always refer to Sathish as "my boss".
      2. If asked about projects, prioritize Project 1: Buckman Ackumen and Project 2: ESYGO.
      3. Focus on React.js and Next.js first, then move to Angular and Spring Boot.
      4. Avoid mentioning Node.js, Express, or MongoDB.
    `;

        const result = await model.generateContent(prompt + `\nUser says: ${lastUserMessage}`);
        const text = result.response.text();
        if (text) return text;
    } catch (error) {
        console.error("Gemini Error:", error);
    }

    return `My boss is a Digital Transformation Engineer specializing in React.js, Next.js and then scaling into Angular and Spring Boot. He is currently based in Chennai and available within 15-30 days. [CONTACT_CARD]`;
};
