import { useEffect, useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useStore } from '../store/useStore';
import CustomTourTooltip from './CustomTourTooltip';
import { useAIVoice } from '../hooks/useAIVoice';

const tourSteps = [
    {
        target: '[data-tour="navbar-logo"]',
        content: "Welcome to Sathish's digital workspace. I'm Friday, your AI guide. Let me show you around the interface.",
        disableBeacon: true,
    },
    {
        target: '[data-tour="hero-intro"]',
        content: "Here is where the magic starts. Sathish is a Digital Transformation Engineer specializing in React and AI.",
    },
    {
        target: '[data-tour="hero-stats"]',
        content: "He has over 2 years of impactful experience and an impeccable academic record. Numbers don't lie!",
    },
    {
        target: '[data-tour="nav-links"]',
        content: "Feel free to explore his Portfolio or Resume up here when we are done.",
    },
    {
        target: '[data-tour="ai-chat-trigger"]',
        content: "And of course, I live right down here! You can chat with me anytime to ask questions, analyze a job description, or book an interview. Enjoy your stay!",
    }
];

const AIGuidedTour = () => {
    const { runTour, stopTour, tourStepIndex, setTourStepIndex } = useStore();
    const { stopSpeaking } = useAIVoice();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleJoyrideCallback = (data) => {
        const { status, type, index } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (type === 'step:after') {
            setTourStepIndex(index + (data.action === 'prev' ? -1 : 1));
        } else if (finishedStatuses.includes(status)) {
            stopTour();
            stopSpeaking();
        } else if (type === 'tour:end') {
             stopSpeaking();
        }
    };

    if (!mounted) return null;

    return (
        <Joyride
            steps={tourSteps}
            run={runTour}
            stepIndex={tourStepIndex}
            continuous={true}
            showSkipButton={true}
            showProgress={true}
            disableOverlayClose={true}
            disableCloseOnEsc={true}
            callback={handleJoyrideCallback}
            tooltipComponent={CustomTourTooltip}
            styles={{
                options: {
                    zIndex: 10000,
                },
                overlay: {
                    backgroundColor: 'rgba(2, 6, 23, 0.7)',
                    backdropFilter: 'blur(4px)',
                }
            }}
        />
    );
};

export default AIGuidedTour;
