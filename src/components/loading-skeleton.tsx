import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

// ----------------------------------------------------------------------

export const LoadingSkeleton = () => {
  return (
    <div role="status" aria-label="Loading definition" aria-live="polite" aria-busy="true">
      <div className="mb-[clamp(1.75rem,6vw,2.5rem)] flex items-center justify-between gap-4">
        <div className="w-37.5 space-y-2 md:w-75">
          <Skeleton className="h-9.5 w-full md:h-19.25" />
          <Skeleton className="h-6 w-1/2 md:h-7.25" />
        </div>

        <Skeleton className="size-[clamp(3rem,10vw,4.688rem)] rounded-full" />
      </div>

      <div className="mb-[clamp(2rem,6.5vw,3rem)] grid gap-[clamp(2rem,6vw,2.5rem)]">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index}>
            <div className="mb-[clamp(2rem,6vw,2.5rem)] flex items-center gap-5">
              <Skeleton className="h-5.5 w-11.25 shrink-0 md:h-7.25 md:w-15" />
              <Separator className="flex-1" />
            </div>

            <div className="space-y-6">
              <Skeleton className="h-4.75 w-16.5 md:h-6 md:w-21" />

              <div className="space-y-3 lg:pl-5.5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-6.25">
                    <Skeleton className="size-1.25 rounded-full" />
                    <Skeleton className="h-6 flex-1" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-[clamp(1.5rem,6vw,4rem)] flex items-baseline gap-6">
              <Skeleton className="h-4.75 w-19.75 md:h-6 md:w-24.5" />
              <Skeleton className="h-4.75 w-39 md:h-6 md:w-48.75" />
            </div>
          </div>
        ))}
      </div>

      <Separator className="mb-8 md:mb-5" />

      <div className="flex flex-wrap gap-5">
        <Skeleton className="h-4.25 w-11.75" />
        <Skeleton className="h-4.25 w-70" />
      </div>
    </div>
  );
};
