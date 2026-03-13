export const useAIVoice = () => {
    const speak = (text, isVoiceEnabled = true) => {
        // Fallback for non-browser environments or disabled voice
        if (typeof window === 'undefined' || !window.speechSynthesis || !isVoiceEnabled) {
            return;
        }

        // Cancel any ongoing speech immediately before starting a new one
        window.speechSynthesis.cancel();

        // Clean text of UI tags before speaking
        const cleanText = text.replace(/\[.*?\]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        const voices = window.speechSynthesis.getVoices();

        // Find best female/english voice
        const profVoice = voices.find(v =>
            (v.name.includes('Female') || v.name.includes('UK English') || v.name.includes('Zira') || v.name.includes('Samantha')) &&
            v.lang.startsWith('en')
        ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

        if (profVoice) {
            utterance.voice = profVoice;
            utterance.pitch = 1.3; // Sweeter, slightly higher pitch
            utterance.rate = 1.05; // Gentle, clear speed
        } else {
            utterance.pitch = 1.3;
            utterance.rate = 1.05;
        }

        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }

    return { speak, stopSpeaking };
};
