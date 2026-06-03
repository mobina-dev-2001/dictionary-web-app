'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { PlayIcon, NewWindowIcon } from '@/lib/icons';

import { useWordDefinition } from '@/services/dictionary-api';

import { NotFound } from '@/components/not-found';
import { Separator } from '@/components/ui/separator';
import { LoadingSkeleton } from '@/components/loading-skeleton';

// ----------------------------------------------------------------------

export const WordDefinition = ({ word }: { word: string }) => {
  const { data, isLoading, isError } = useWordDefinition(word);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!word) return null;
  if (isLoading) return <LoadingSkeleton />;
  if (isError || !data || data.length === 0) return <NotFound />;

  const entry = data[0];

  const audioSrc =
    entry.phonetics.find((p) => p.audio?.endsWith('.mp3'))?.audio ||
    entry.phonetics.find((p) => !!p.audio)?.audio;

  const phoneticText = entry.phonetic || entry.phonetics.find((p) => !!p.text)?.text;

  const handlePlay = () => {
    if (!audioSrc) return;

    if (!audioRef.current) {
      const audio = new Audio(audioSrc);

      audio.addEventListener('loadstart', () => setIsAudioLoading(true));
      audio.addEventListener('waiting', () => setIsAudioLoading(true));
      audio.addEventListener('canplay', () => setIsAudioLoading(false));
      audio.addEventListener('playing', () => setIsAudioLoading(false));
      audio.addEventListener('pause', () => setIsAudioLoading(false));
      audio.addEventListener('ended', () => setIsAudioLoading(false));
      audio.addEventListener('error', () => setIsAudioLoading(false));

      audioRef.current = audio;
    } else {
      if (audioRef.current.readyState < 3) {
        setIsAudioLoading(true);
      }
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => setIsAudioLoading(false));
  };

  return (
    <section aria-label={`Definition of ${entry.word}`}>
      {/* ── Word + Phonetic + Audio ── */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2.75">
          <h1 className="text-[clamp(2rem,8.5vw,4rem)] leading-[1.2] font-bold">{entry.word}</h1>

          {phoneticText && (
            <p className="text-primary font-sans text-[clamp(1.125rem,4vw,1.5rem)] leading-[1.2]">
              {phoneticText}
            </p>
          )}
        </div>

        {audioSrc && (
          <button
            type="button"
            aria-label={`Play pronunciation of ${entry.word}`}
            onClick={handlePlay}
            className={cn(
              'group text-primary focus-visible:ring-primary shrink-0 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none',
              isAudioLoading
                ? 'ring-primary ring-offset-background animate-pulse ring-2 ring-offset-2'
                : ''
            )}
          >
            <PlayIcon className="size-[clamp(3rem,10vw,4.688rem)]" />
          </button>
        )}
      </div>

      {/* ── Meanings ── */}
      {entry.meanings.map((meaning, mIdx) => (
        <div
          key={`${meaning.partOfSpeech}-${mIdx}`}
          className="space-y-[clamp(1.5rem,6.25vw,4rem)]"
        >
          <div className="my-[clamp(2rem,5.25vw,2.5rem)] flex items-center gap-5">
            <h2 className="shrink-0 text-[clamp(1.125rem,4vw,1.5rem)] leading-[120%] font-bold italic">
              {meaning.partOfSpeech}
            </h2>

            <Separator className="flex-1" />
          </div>

          {/* Meaning label + definitions list */}
          <div className="space-y-6">
            <p className="text-muted-foreground text-[clamp(1rem,3vw,1.25rem)] leading-[120%]">
              Meaning
            </p>

            <ul role="list" className="space-y-3 lg:pl-5.5">
              {meaning.definitions.map((def, dIdx) => (
                <li
                  key={dIdx}
                  className="before:text-primary relative pl-6.25 before:absolute before:top-2 before:left-0 before:size-1.25 before:rounded-full before:bg-current before:content-[''] max-sm:before:top-2.5"
                >
                  <p className="text-foreground text-[clamp(0.938rem,3vw,1.125rem)] leading-[133%] max-sm:leading-[160%]">
                    {def.definition}
                  </p>

                  {def.example && (
                    <p className="text-muted-foreground mt-3 text-[clamp(0.938rem,3vw,1.125rem)] leading-[133%] max-sm:leading-[160%]">
                      &ldquo;{def.example}&rdquo;
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Synonyms */}
          {meaning.synonyms.length > 0 && (
            <div className="flex flex-wrap items-baseline gap-6">
              <span className="text-muted-foreground text-[clamp(1rem,3vw,1.25rem)] leading-[120%]">
                Synonyms
              </span>

              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(meaning.synonyms)).map((syn) => (
                  <div key={syn} className="flex gap-2">
                    <Link
                      href={`/${encodeURIComponent(syn)}`}
                      className="text-primary text-[clamp(1rem,3vw,1.25rem)] leading-[120%] font-bold hover:underline hover:underline-offset-3"
                    >
                      {syn}
                    </Link>

                    <Separator orientation="vertical" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Antonyms */}
          {meaning.antonyms.length > 0 && (
            <div className="flex flex-wrap items-baseline gap-6">
              <span className="text-muted-foreground text-[clamp(1rem,3vw,1.25rem)] leading-[120%]">
                Antonyms
              </span>

              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(meaning.antonyms)).map((ant) => (
                  <Link
                    href={`/${encodeURIComponent(ant)}`}
                    key={ant}
                    className="text-primary focus-visible:ring-primary text-[clamp(1rem,3vw,1.25rem)] leading-[120%] font-bold hover:underline hover:underline-offset-3 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                  >
                    {ant}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* ── Source URLs ── */}
      {entry.sourceUrls?.length > 0 && (
        <>
          <Separator className="mt-[clamp(2rem,6.5vw,3rem)] mb-5 max-sm:mb-8" />

          <div className="flex flex-wrap items-start gap-5 text-sm leading-[120%]">
            <span className="text-muted-foreground shrink-0 underline underline-offset-2">
              Source
            </span>

            <div className="flex flex-col gap-1">
              {entry.sourceUrls.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 underline underline-offset-2 hover:opacity-75"
                >
                  {url}
                  <NewWindowIcon className="text-muted-foreground size-3 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
