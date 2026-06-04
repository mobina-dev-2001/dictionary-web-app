import Link from 'next/link';

import { Separator } from '@/components/ui/separator';

// ----------------------------------------------------------------------

export const RelatedWords = ({ label, words }: { label: string; words: string[] }) => {
  if (words.length === 0) return null;

  const uniqueWords = Array.from(new Set(words));

  return (
    <div className="flex flex-wrap items-baseline gap-6">
      <span className="text-muted-foreground text-[clamp(1rem,3vw,1.25rem)] leading-[1.2]">
        {label}
      </span>

      <div className="flex flex-wrap gap-2">
        {uniqueWords.map((word) => (
          <div key={word} className="flex items-center gap-2 last:*:data-[slot=separator]:hidden">
            <Link
              href={`/${encodeURIComponent(word)}`}
              className="text-primary focus-styles rounded-xs text-[clamp(1rem,3vw,1.25rem)] leading-[1.2] font-bold underline-offset-2 hover:underline"
            >
              {word}
            </Link>

            <Separator orientation="vertical" />
          </div>
        ))}
      </div>
    </div>
  );
};
