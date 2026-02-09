import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
    children?: React.ReactNode;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    className,
    children
}: EmptyStateProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center py-16 text-center",
            className
        )}>
            <div className="mb-4 rounded-full bg-primary/10 p-6">
                <Icon className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
            <p className="text-muted-foreground max-w-md leading-relaxed">{description}</p>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
}
