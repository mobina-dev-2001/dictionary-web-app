'use client';

import { TailChase } from 'ldrs/react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { SearchIcon } from '@/lib/icons';

import { useWordSearch } from '@/services/dictionary-api';

import { Button } from '@/components/ui/button';
import { Item, ItemContent } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

import 'ldrs/react/TailChase.css';

// ----------------------------------------------------------------------

const useDebounce = (value: string, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

// ----------------------------------------------------------------------

type SearchbarProps = { onWordSelect: (word: string) => void };

export const Searchbar = ({ onWordSelect }: SearchbarProps) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ search: string }>({ defaultValues: { search: '' } });

  // eslint-disable-next-line react-hooks/incompatible-library
  const query = watch('search');

  const debouncedQuery = useDebounce(query);
  const { data, isLoading } = useWordSearch(debouncedQuery);

  const hasResults = !isLoading && !!data && data.length > 0;
  const isOpen = debouncedQuery.trim().length > 0;

  const selectWord = (word: string) => {
    setValue('search', word);
    onWordSelect(word);
  };

  const onSubmit = (values: { search: string }) => {
    const word = values.search.trim();
    if (!word) return;

    if (hasResults) {
      selectWord(data[0].word);
    } else {
      selectWord(word);
    }
  };

  const hasError = !!errors.search;

  return (
    <div className="w-full space-y-2">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Popover open={isOpen}>
          <PopoverTrigger asChild>
            <InputGroup className="px-6 py-[clamp(0.5rem,2vw,1rem)]">
              <InputGroupInput
                {...register('search', { required: 'Whoops, can’t be empty…' })}
                role="combobox"
                aria-label="Search for a word"
                aria-expanded={isOpen}
                aria-invalid={hasError || undefined}
                aria-controls="search-results-list"
                aria-autocomplete="list"
                autoComplete="off"
                placeholder="Search for any word…"
                className="text-[clamp(1rem,3vw,1.25rem)] leading-6 font-bold"
              />

              <InputGroupAddon align="inline-end" className="p-0">
                <Button
                  variant="ghost"
                  size="icon"
                  type="submit"
                  className="focus-visible:ring-primary border-none px-1 focus-visible:ring-2"
                >
                  <SearchIcon className="text-primary size-4" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </PopoverTrigger>

          <PopoverContent
            id="search-results-list"
            align="start"
            sideOffset={10}
            role="listbox"
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="bg-input w-(--radix-popover-trigger-width) gap-1 py-[clamp(0.5rem,2vw,1rem)] text-[clamp(0.875rem,2.5vw,1rem)] font-medium"
          >
            {!hasResults && debouncedQuery.length === 1 && (
              <p className="py-2">Need more to search...</p>
            )}

            {isLoading && debouncedQuery.length > 1 && (
              <div className="flex items-center gap-4 py-2">
                <TailChase size="16" speed="2" color="var(--foreground)" />
                <p>Search in progress</p>
              </div>
            )}

            {hasResults && (
              <ScrollArea className="h-50">
                {data?.map((word) => (
                  <Item
                    key={`${word.word}-${word.score}`}
                    role="option"
                    tabIndex={0}
                    onClick={() => selectWord(word.word)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') selectWord(word.word);
                    }}
                    className="hover:text-primary focus-visible:text-primary cursor-pointer border-none px-0 ring-0!"
                  >
                    <ItemContent className="text-[clamp(1rem,3vw,1.25rem)]">
                      {word.word}
                    </ItemContent>
                  </Item>
                ))}
              </ScrollArea>
            )}

            {!isLoading && !hasResults && debouncedQuery.length > 1 && (
              <p className="py-2">No search result found!</p>
            )}
          </PopoverContent>
        </Popover>
      </form>

      {hasError && (
        <p role="alert" className="text-destructive text-[clamp(1rem,3vw,1.25rem)]">
          {errors.search?.message}
        </p>
      )}
    </div>
  );
};
