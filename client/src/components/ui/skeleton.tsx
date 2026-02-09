import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden border border-border/50 bg-card rounded-lg h-full flex flex-col">
      {/* Image skeleton */}
      <Skeleton className="aspect-video w-full" />

      {/* Header skeleton */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    </div>
  )
}

export { Skeleton, ProjectCardSkeleton }
