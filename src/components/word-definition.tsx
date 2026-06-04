'use client';

import { useRef, useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { PlayIcon, NewWindowIcon } from '@/lib/icons';

import { useWordDefinition } from '@/services/dictionary-api';

import { NotFound } from '@/components/not-found';
import { Separator } from '@/components/ui/separator';
import { RelatedWords } from '@/components/related-words';
import { LoadingSkeleton } from '@/components/loading-skeleton';

// ----------------------------------------------------------------------

export const WordDefinition = ({ word }: { word: string }) => {
  const { data, isLoading, isError } = useWordDefinition(word);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const firstEntry = data?.[0];
  const audioSrc = firstEntry
    ? firstEntry.phonetics.find((p) => p.audio?.endsWith('.mp3'))?.audio ||
      firstEntry.phonetics.find((p) => !!p.audio)?.audio
    : undefined;

  useEffect(() => {
    if (!audioSrc) {
      audioRef.current = null;
      return;
    }

    const audio = new Audio(audioSrc);

    const handleLoadStart = () => setIsAudioLoading(true);
    const handleWaiting = () => setIsAudioLoading(true);
    const handleCanPlay = () => setIsAudioLoading(false);
    const handlePlaying = () => setIsAudioLoading(false);
    const handlePause = () => setIsAudioLoading(false);
    const handleEnded = () => setIsAudioLoading(false);
    const handleError = () => setIsAudioLoading(false);

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
      setIsAudioLoading(false);
    };
  }, [audioSrc]);

  if (!word) return null;
  if (isLoading) return <LoadingSkeleton />;
  if (isError || !data || data.length === 0) return <NotFound />;

  const entry = data[0];

  const phoneticText = entry.phonetic || entry.phonetics.find((p) => !!p.text)?.text;

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.readyState < 3) {
      setIsAudioLoading(true);
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => setIsAudioLoading(false));
  };

  return (
    <section aria-label={`Definition of ${entry.word}`}>
      {/* Word + Phonetic + Audio */}
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
              'group text-primary focus-styles shrink-0 rounded-full',
              isAudioLoading && 'ring-primary/50 animate-pulse ring-2'
            )}
          >
            <PlayIcon aria-hidden="true" className="size-[clamp(3rem,10vw,4.688rem)]" />
          </button>
        )}
      </div>

      {/* Meanings */}
      {entry.meanings.map((meaning, mIdx) => (
        <div
          key={`${meaning.partOfSpeech}-${mIdx}`}
          className="space-y-[clamp(1.5rem,6.25vw,4rem)]"
        >
          <div className="my-[clamp(2rem,5.25vw,2.5rem)] flex items-center gap-5">
            <h2 className="shrink-0 text-[clamp(1.125rem,4vw,1.5rem)] leading-[1.2] font-bold italic">
              {meaning.partOfSpeech}
            </h2>

            <Separator className="flex-1" />
          </div>

          {/* Meaning label + Definitions list */}
          <div className="space-y-6">
            <p className="text-muted-foreground text-[clamp(1rem,3vw,1.25rem)] leading-[1.2]">
              Meaning
            </p>

            <ul role="list" className="space-y-3 lg:pl-5.5">
              {meaning.definitions.map((def, dIdx) => (
                <li
                  key={dIdx}
                  className="before:text-primary relative pl-6.25 text-[clamp(0.938rem,3vw,1.125rem)] leading-[1.33] before:absolute before:top-2 before:left-0 before:size-1.25 before:rounded-full before:bg-current before:content-[''] max-sm:leading-[1.6] max-sm:before:top-2.5"
                >
                  <p className="text-foreground">{def.definition}</p>

                  {def.example && (
                    <p className="text-muted-foreground mt-3">&ldquo;{def.example}&rdquo;</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Synonyms */}
          <RelatedWords label="Synonyms" words={meaning.synonyms} />

          {/* Antonyms */}
          <RelatedWords label="Antonyms" words={meaning.antonyms} />
        </div>
      ))}

      {/* Source URLs */}
      {entry.sourceUrls?.length > 0 && (
        <>
          <Separator className="mt-[clamp(2rem,6.5vw,3rem)] mb-8 md:mb-5" />

          <div className="flex flex-wrap items-start gap-5 text-sm leading-[1.2]">
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
                  className="focus-styles flex items-center gap-2.5 rounded-sm underline underline-offset-2 hover:opacity-75"
                >
                  {url}
                  <span className="sr-only"> (opens in new window)</span>
                  <NewWindowIcon
                    aria-hidden="true"
                    className="text-muted-foreground size-3 shrink-0"
                  />
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
