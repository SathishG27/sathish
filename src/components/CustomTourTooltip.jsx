import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIVoice } from '../hooks/useAIVoice';
import { Volume2, VolumeX, FastForward, CheckCircle2, Navigation } from 'lucide-react';

const FRIDAY_AVATAR = "/friday_female_3d_avatar.png";

const CustomTourTooltip = ({ step, tooltipProps, index, isLastStep, backProps, primaryProps, skipProps }) => {
    const { speak, stopSpeaking } = useAIVoice();
    const [displayedText, setDisplayedText] = useState('');
    const [isMuted, setIsMuted] = useState(false);

    const fullText = step.content;

    // Typewriter effect & Voice Triggers
    useEffect(() => {
        setDisplayedText('');
        let currentText = '';
        let i = 0;

        if (!isMuted) {
            speak(fullText);
        }

        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                currentText += fullText.charAt(i);
                setDisplayedText(currentText);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 30); // Speed of typing

        return () => {
            clearInterval(typingInterval);
            stopSpeaking();
        };
    }, [fullText, isMuted]);

    const handleSkip = (e) => {
        stopSpeaking();
        skipProps.onClick(e);
    }

    const handleNext = (e) => {
        stopSpeaking();
        primaryProps.onClick(e);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="w-[340px] sm:w-[400px] bg-card/95 backdrop-blur-xl border border-primary/30 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            {...tooltipProps}
        >
            {/* Glowing orb background effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl z-0" />

            <div className="relative z-10 space-y-5">
                {/* Header Profile */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg bg-secondary">
                            <img src={FRIDAY_AVATAR} alt="Friday" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="text-[17px] font-black italic tracking-wide text-foreground">Friday</h4>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] animate-pulse flex items-center gap-1">
                                <Navigation size={10} /> Guided Tour
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            if (isMuted) speak(fullText); else stopSpeaking();
                            setIsMuted(!isMuted);
                        }} 
                        className="p-2.5 rounded-full bg-secondary text-primary/70 hover:text-primary hover:bg-primary/10 transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                </div>

                {/* Body Content - Animated Typing Text */}
                <div className="min-h-[70px]">
                     <p className="text-[15px] font-bold text-muted-foreground leading-relaxed">
                        {displayedText}
                        <span className="inline-block w-1.5 h-4 ml-1 bg-primary animate-pulse" />
                    </p>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <button 
                        {...skipProps} 
                        onClick={handleSkip}
                        className="text-xs font-black uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Skip Tour
                    </button>

                    <div className="flex items-center gap-2">
                         <span className="text-[10px] font-bold text-primary/50 mr-2">{index + 1} / 5</span>
                         {index > 0 && (
                             <button {...backProps} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                                 {'<'}
                             </button>
                         )}
                         <button 
                            {...primaryProps} 
                            onClick={handleNext}
                            className="bg-primary text-white px-5 py-2.5 rounded-full text-xs font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                        >
                            {isLastStep ? (
                                <>Finish <CheckCircle2 size={14} /></>
                            ) : (
                                <>Next <FastForward size={14} /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CustomTourTooltip;
