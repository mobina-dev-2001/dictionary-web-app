'use client';

import type { FontPreference } from '@/types';

import Image from 'next/image';

import { cn } from '@/lib/utils';

import { useFont } from '@/components/providers';
import { Separator } from '@/components/ui/separator';
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';

// ----------------------------------------------------------------------

export const Header = () => {
  const { font, setFont } = useFont();

  const itemClass = 'text-[clamp(0.875rem,3vw,1.125rem)] leading-6 font-bold';

  return (
    <header className="flex w-full items-center justify-between gap-4">
      <Image
        src="images/logo.svg"
        alt="Dictionary Web App logo"
        width={34}
        height={38}
        className="h-auto w-[clamp(1.75rem,5vw,2rem)]"
      />

      <div className="flex items-center gap-[clamp(1rem,3.5vw,1.5rem)]">
        <Select value={font} onValueChange={(value) => setFont(value as FontPreference)}>
          <SelectTrigger
            aria-label="Select font family"
            className={cn('focus-styles rounded-xs', itemClass)}
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent
            position="popper"
            align="end"
            sideOffset={12}
            className="shadow-popover w-[clamp(7.625rem,24vw,11.438rem)] rounded-3xl"
          >
            <SelectGroup className="grid gap-4 px-[clamp(1rem,3.5vw,1.5rem)] py-6">
              <SelectItem value="font-sans" className={cn('font-sans [&_svg]:hidden', itemClass)}>
                Sans Serif
              </SelectItem>

              <SelectItem value="font-serif" className={cn('font-serif [&_svg]:hidden', itemClass)}>
                Serif
              </SelectItem>

              <SelectItem value="font-mono" className={cn('font-mono [&_svg]:hidden', itemClass)}>
                Mono
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-8" />

        <ThemeTogglerButton />
      </div>
    </header>
  );
};
