import Link from 'next/link';

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
          <Link
            key={word}
            href={`/${encodeURIComponent(word)}`}
            className="text-primary border-border border-e pe-2 text-[clamp(1rem,3vw,1.25rem)] leading-[1.2] font-bold underline-offset-2 last:border-none last:pe-0 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            {word}
          </Link>
        ))}
      </div>
    </div>
  );
};
