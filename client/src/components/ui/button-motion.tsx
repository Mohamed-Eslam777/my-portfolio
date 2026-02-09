import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonMotionProps {
    children: React.ReactNode;
    variant?: "primary" | "outline" | "ghost";
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

export function ButtonMotion({
    children,
    variant = "primary",
    className,
    onClick,
    disabled,
    type = "button",
}: ButtonMotionProps) {
    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border-2 border-primary text-primary hover:bg-primary/10",
        ghost: "text-primary hover:bg-primary/10",
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={cn(
                "touch-target px-6 py-3 rounded-md font-medium transition-colors",
                "focus:ring-2 focus:ring-primary focus:outline-none",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                className
            )}
        >
            {children}
        </motion.button>
    );
}
