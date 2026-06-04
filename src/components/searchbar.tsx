'use client';

import { TailChase } from 'ldrs/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useDebounce } from '@/hooks/use-debounce';

import { SearchIcon } from '@/lib/icons';

import { useWordSearch } from '@/services/dictionary-api';

import { Button } from '@/components/ui/button';
import { Item, ItemContent } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

import 'ldrs/react/TailChase.css';

// ----------------------------------------------------------------------

export const Searchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ search: string }>({ defaultValues: { search: '' } });

  const { ref: registerRef, ...registerRest } = register('search', {
    required: 'Whoops, can’t be empty…',
    onChange: (e) => setIsOpen(e.target.value.trim().length > 0),
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const query = watch('search');

  const debouncedQuery = useDebounce(query);
  const { data, isLoading } = useWordSearch(debouncedQuery);

  const hasResults = !isLoading && !!data && data.length > 0;
  const hasError = !!errors.search;

  const selectWord = (word: string) => {
    setValue('search', '');
    setIsOpen(false);
    router.push(`/${encodeURIComponent(word)}`);
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

  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    word: string,
    index: number
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectWord(word);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (index + 1 < (data?.length ?? 0)) {
        optionsRef.current[index + 1]?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index - 1 >= 0) {
        optionsRef.current[index - 1]?.focus();
      } else {
        inputRef.current?.focus();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="w-full space-y-2">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Popover
          open={isOpen}
          onOpenChange={(open) => {
            if (open && debouncedQuery.trim().length === 0) return;
            setIsOpen(open);
          }}
        >
          <PopoverTrigger asChild>
            <InputGroup className="px-6 py-[clamp(0.5rem,2vw,1rem)]">
              <InputGroupInput
                {...registerRest}
                ref={(el) => {
                  registerRef(el);
                  inputRef.current = el;
                }}
                onFocus={(e) => {
                  if (e.target.value.trim().length > 0) {
                    setIsOpen(true);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    optionsRef.current[0]?.focus();
                  }
                }}
                role="combobox"
                aria-label="Search for a word"
                aria-expanded={isOpen}
                aria-invalid={hasError || undefined}
                aria-describedby={hasError ? 'search-error' : undefined}
                aria-controls="search-results-list"
                aria-autocomplete="list"
                autoComplete="off"
                placeholder="Search for any word…"
                className="caret-primary text-[clamp(1rem,3vw,1.25rem)] leading-6 font-bold"
              />

              <InputGroupAddon align="inline-end" className="p-0">
                <Button
                  variant="ghost"
                  size="icon"
                  type="submit"
                  aria-label="Search"
                  className="focus-styles w-auto rounded-xs border-none px-1.25"
                >
                  <SearchIcon aria-hidden="true" className="text-primary size-4" />
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
                {data?.map((word, index) => (
                  <Item
                    key={`${word.word}-${word.score}`}
                    ref={(el) => {
                      optionsRef.current[index] = el;
                    }}
                    id={`option-${index}`}
                    role="option"
                    tabIndex={0}
                    onClick={() => selectWord(word.word)}
                    onKeyDown={(e) => handleItemKeyDown(e, word.word, index)}
                    className="hover:text-primary focus-visible:text-primary cursor-pointer border-none px-0"
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
        <p
          role="alert"
          id="search-error"
          className="text-destructive text-[clamp(1rem,3vw,1.25rem)]"
        >
          {errors.search?.message}
        </p>
      )}
    </div>
  );
};
