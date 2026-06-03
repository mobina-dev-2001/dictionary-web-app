import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

// ----------------------------------------------------------------------

export const LoadingSkeleton = () => {
  return (
    <div aria-label="Loading definition…">
      <div className="mb-[clamp(1.75rem,6vw,2.5rem)] flex items-center justify-between gap-4">
        <div className="w-75 space-y-2 max-sm:w-38">
          <Skeleton className="h-19.25 w-full max-sm:h-9.5" />
          <Skeleton className="h-7.25 w-1/2 max-sm:h-6" />
        </div>

        <Skeleton className="size-[clamp(3rem,10vw,4.688rem)] rounded-full" />
      </div>

      <div className="mb-[clamp(2rem,6.5vw,3rem)] grid gap-[clamp(2rem,6vw,2.5rem)]">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index}>
            <div className="mb-[clamp(2rem,6vw,2.5rem)] flex items-center gap-5">
              <Skeleton className="h-7.25 w-15 shrink-0 max-sm:h-5.5 max-sm:w-11.25" />
              <Separator className="flex-1" />
            </div>

            <div className="space-y-6">
              <Skeleton className="h-6 w-21 max-sm:h-4.75 max-sm:w-16.5" />

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
              <Skeleton className="h-6 w-24.5 max-sm:h-4.75 max-sm:w-19.75" />
              <Skeleton className="h-6 w-48.75 max-sm:h-4.75 max-sm:w-39" />
            </div>
          </div>
        ))}
      </div>

      <Separator className="mb-5 max-sm:mb-8" />

      <div className="flex flex-wrap gap-5">
        <Skeleton className="h-4.25 w-11.75" />
        <Skeleton className="h-4.25 w-70" />
      </div>
    </div>
  );
};
