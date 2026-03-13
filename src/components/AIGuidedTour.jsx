import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useStore } from '../store/useStore';
import { useAIVoice } from '../hooks/useAIVoice';

const tourSteps = [
    // HOME PAGE
    {
        element: '[data-tour="navbar-logo"]',
        path: '/',
        popover: {
            title: 'Friday: Welcome',
            description: "Hello! I'm Friday. Let me take you on a quick tour of Sathish's digital world.",
            side: "bottom",
            align: 'start'
        }
    },
    {
        element: '[data-tour="hero-intro"]',
        path: '/',
        popover: {
            title: 'Friday: The Vision',
            description: "Sathish is a Digital Transformation Engineer. He builds products that are intelligent and human-centric.",
            side: "bottom",
            align: 'center'
        }
    },
    {
        element: '[data-tour="hero-stats"]',
        path: '/',
        popover: {
            title: 'Friday: The Impact',
            description: "Notice the experience and projects here. He's been delivering high-value solutions for over 2 years.",
            side: "top",
            align: 'center'
        }
    },
    // ABOUT PAGE
    {
        element: '[data-tour="about-identity"]',
        path: '/about',
        popover: {
            title: 'Friday: Deep Dive',
            description: "Now we're in the About section. Here you can see his identity and professional philosophy.",
            side: "right",
            align: 'start'
        }
    },
    {
        element: '[data-tour="about-skills"]',
        path: '/about',
        popover: {
            title: 'Friday: The Arsenal',
            description: "From Frontend Mastery to System Design—this is the tech stack he uses to build the future.",
            side: "left",
            align: 'start'
        }
    },
    // RESUME PAGE
    {
        element: '[data-tour="resume-experience"]',
        path: '/resume',
        popover: {
            title: 'Friday: Career Path',
            description: "His journey involves building scalable enterprise platforms and mentoring teams. Check out the timeline!",
            side: "right",
            align: 'start'
        }
    },
    {
        element: '[data-tour="resume-download"]',
        path: '/resume',
        popover: {
            title: 'Friday: Takeaway',
            description: "You can download his full CV right here for your records. I've optimized it for easy reading!",
            side: "left",
            align: 'center'
        }
    },
    // PORTFOLIO PAGE
    {
        element: '[data-tour="portfolio-projects"]',
        path: '/portfolio',
        popover: {
            title: 'Friday: Artifacts',
            description: "These are the Selected Works. Each project represents a unique challenge solved with engineering precision.",
            side: "top",
            align: 'center'
        }
    },
    {
        element: '[data-tour="portfolio-contact"]',
        path: '/portfolio',
        popover: {
            title: 'Friday: Collaboration',
            description: "Have a vision? Sathish is ready to collaborate. Let's make something incredible together.",
            side: "top",
            align: 'center'
        }
    },
    // CLOSING
    {
        element: '[data-tour="ai-chat-trigger"]',
        path: '/portfolio',
        popover: {
            title: 'Friday: Always Here',
            description: "And that's the end of my tour! I live right here if you want to chat, analyze a job description, or just say hello. See you soon!",
            side: "left",
            align: 'end'
        }
    }
];

const AIGuidedTour = () => {
    const { runTour, stopTour, setTourStepIndex } = useStore();
    const { speak, stopSpeaking } = useAIVoice();
    const navigate = useNavigate();
    const location = useLocation();
    const driverObj = useRef(null);

    useEffect(() => {
        driverObj.current = driver({
            showProgress: true,
            animate: true,
            allowClose: false,
            overlayOpacity: 0.8,
            steps: tourSteps,
            onDeselected: () => {
                stopSpeaking();
            },
            onDestroyStarted: () => {
                stopTour();
                stopSpeaking();
            },
            onHighlightStarted: (element, step, { driver }) => {
                // Ensure we are on the right path
                if (step.path && step.path !== window.location.pathname) {
                    navigate(step.path);
                    // Give React a moment to render the new page
                    setTimeout(() => {
                        driver.moveNext();
                    }, 600);
                    return;
                }
                
                speak(step.popover.description);
                setTourStepIndex(driver.getActiveIndex());
            },
            onNextClick: (element, step, { driver }) => {
                const nextIndex = driver.getActiveIndex() + 1;
                const nextStep = tourSteps[nextIndex];
                
                if (nextStep && nextStep.path && nextStep.path !== window.location.pathname) {
                    navigate(nextStep.path);
                    // Recursive wait for element usually handled by driver.js if we moveNext
                    setTimeout(() => {
                        driver.moveNext();
                    }, 600);
                } else {
                    driver.moveNext();
                }
            },
            onPrevClick: (element, step, { driver }) => {
                const prevIndex = driver.getActiveIndex() - 1;
                const prevStep = tourSteps[prevIndex];
                
                if (prevStep && prevStep.path && prevStep.path !== window.location.pathname) {
                    navigate(prevStep.path);
                    setTimeout(() => {
                        driver.movePrevious();
                    }, 600);
                } else {
                    driver.movePrevious();
                }
            }
        });
    }, [navigate]);

    useEffect(() => {
        if (runTour && driverObj.current) {
            // Check if we started from a non-home page but the first step is home
            if (tourSteps[0].path !== location.pathname) {
                navigate(tourSteps[0].path);
                setTimeout(() => driverObj.current.drive(), 600);
            } else {
                driverObj.current.drive();
            }
        } else if (!runTour && driverObj.current) {
            driverObj.current.destroy();
        }
    }, [runTour]);

    return null;
};

export default AIGuidedTour;
