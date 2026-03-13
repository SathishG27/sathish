import { useEffect, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useStore } from '../store/useStore';
import { useAIVoice } from '../hooks/useAIVoice';

const tourSteps = [
    {
        element: '[data-tour="navbar-logo"]',
        popover: {
            title: 'Friday Assistant',
            description: "Welcome to Sathish's digital workspace. I'm Friday, your AI guide. Let me show you around the interface.",
            side: "bottom",
            align: 'start'
        }
    },
    {
        element: '[data-tour="hero-intro"]',
        popover: {
            title: 'Friday Assistant',
            description: "Here is where the magic starts. Sathish is a Digital Transformation Engineer specializing in React and AI.",
            side: "bottom",
            align: 'center'
        }
    },
    {
        element: '[data-tour="hero-stats"]',
        popover: {
            title: 'Friday Assistant',
            description: "He has over 2 years of impactful experience and an impeccable academic record. Numbers don't lie!",
            side: "top",
            align: 'center'
        }
    },
    {
        element: '[data-tour="nav-links"]',
        popover: {
            title: 'Friday Assistant',
            description: "Feel free to explore his Portfolio or Resume up here when we are done.",
            side: "bottom",
            align: 'end'
        }
    },
    {
        element: '[data-tour="ai-chat-trigger"]',
        popover: {
            title: 'Friday Assistant',
            description: "And of course, I live right down here! You can chat with me anytime to ask questions, analyze a job description, or book an interview. Enjoy your stay!",
            side: "left",
            align: 'end'
        }
    }
];

const AIGuidedTour = () => {
    const { runTour, stopTour } = useStore();
    const { speak, stopSpeaking } = useAIVoice();
    const driverObj = useRef(null);

    useEffect(() => {
        driverObj.current = driver({
            showProgress: true,
            animate: true,
            allowClose: false,
            overlayOpacity: 0.75,
            steps: tourSteps,
            onDestroyStarted: () => {
                stopTour();
                stopSpeaking();
            },
            onHighlightStarted: (element, step) => {
                // Trigger Friday's voice for each step
                speak(step.popover.description);
            }
        });
    }, []);

    useEffect(() => {
        if (runTour && driverObj.current) {
            driverObj.current.drive();
        } else if (!runTour && driverObj.current) {
            driverObj.current.destroy();
        }
    }, [runTour]);

    return null; // Driver.js handles its own overlay in the DOM
};

export default AIGuidedTour;
