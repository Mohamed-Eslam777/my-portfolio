import { useEffect, useState } from "react";

interface LoadingScreenProps {
    onComplete?: () => void;
}

const techPhrases = [
    "Initializing...",
    "Loading Modules...",
    "Starting AI Agents...",
    "Ready."
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Cycle through tech phrases
        const phraseInterval = setInterval(() => {
            setCurrentPhrase((prev) => (prev + 1) % techPhrases.length);
        }, 600);

        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        // Trigger fade out and completion
        const completionTimer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                onComplete?.();
            }, 500);
        }, 2500);

        return () => {
            clearInterval(phraseInterval);
            clearInterval(progressInterval);
            clearTimeout(completionTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
                }`}
        >
            {/* Brand Name with Pulse Animation */}
            <div className="mb-8">
                <h1 className="text-6xl md:text-7xl font-bold text-yellow-500 animate-pulse">
                    Mohamed.
                </h1>
            </div>

            {/* Cycling Tech Phrases */}
            <div className="mb-16 h-8">
                <p className="text-sm md:text-base font-mono text-gray-400 text-center transition-opacity duration-300">
                    {techPhrases[currentPhrase]}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="w-64 md:w-96 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-yellow-500 transition-all duration-100 ease-linear rounded-full shadow-lg shadow-yellow-500/50"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
