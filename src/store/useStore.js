import { create } from 'zustand';

// Existing store wrapped around the new properties
export const useStore = create((set) => ({
    // Theme State
    theme: localStorage.getItem('theme') || 'dark',
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        return { theme: newTheme };
    }),

    // AI Chat State
    isChatOpen: false,
    hasWelcomed: false,
    setHasWelcomed: (val) => set({ hasWelcomed: val }),
    toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
    setChatOpen: (val) => set({ isChatOpen: val }),

    messages: [
        {
            role: 'assistant',
            content: "Hi! I'm Sathish's AI assistant. I can help you explore his projects, experience, and skills. What would you like to know?"
        }
    ],
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
    })),
    clearMessages: () => set({
        messages: [{
            role: 'assistant',
            content: "Hi! I'm Sathish's AI assistant. I can help you explore his projects, experience, and skills. What would you like to know?"
        }]
    }),

    // Error handling state
    aiError: null,
    setAiError: (error) => set({ aiError: error }),

    // AI Tour State (React Joyride)
    runTour: false,
    tourStepIndex: 0,
    startTour: () => set({ runTour: true, tourStepIndex: 0, hasWelcomed: true }),
    stopTour: () => set({ runTour: false }),
    setTourStepIndex: (index) => set({ tourStepIndex: index })
}));

// Initialize theme on load
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}
