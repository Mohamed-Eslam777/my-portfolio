import { useState, useEffect } from "react";

interface TypewriterProps {
    texts: string[];
    speed?: number;
    deleteSpeed?: number;
    pauseDuration?: number;
    className?: string;
}

export function Typewriter({
    texts,
    speed = 100,
    deleteSpeed = 50,
    pauseDuration = 2000,
    className = "",
}: TypewriterProps) {
    const [displayText, setDisplayText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    // Typing
                    if (displayText.length < currentText.length) {
                        setDisplayText(currentText.slice(0, displayText.length + 1));
                    } else {
                        // Pause before deleting
                        setTimeout(() => setIsDeleting(true), pauseDuration);
                    }
                } else {
                    // Deleting
                    if (displayText.length > 0) {
                        setDisplayText(currentText.slice(0, displayText.length - 1));
                    } else {
                        // Move to next text
                        setIsDeleting(false);
                        setTextIndex((prev) => (prev + 1) % texts.length);
                    }
                }
            },
            isDeleting ? deleteSpeed : speed
        );

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseDuration]);

    return (
        <span className={className}>
            {displayText}
            <span className="animate-pulse ml-1">|</span>
        </span>
    );
}
