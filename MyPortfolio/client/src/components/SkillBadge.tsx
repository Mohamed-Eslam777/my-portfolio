import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

export function SkillBadge({ name, level = "intermediate" }: SkillBadgeProps) {
  const sizeClasses = {
    beginner: "text-xs",
    intermediate: "text-sm",
    advanced: "text-sm font-medium",
    expert: "text-base font-semibold",
  };

  return (
    <Badge
      variant="secondary"
      className={`${sizeClasses[level]} px-3 py-1 hover:shadow-md transition-all duration-300 relative overflow-hidden`}
      data-testid={`badge-skill-${name.toLowerCase().replace(/\s/g, "-")}`}
    >
      <span className="relative z-10">{name}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
    </Badge>
  );
}