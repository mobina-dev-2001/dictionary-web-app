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

  const selectItemCls = 'text-[clamp(0.875rem,3vw,1.125rem)] leading-6 font-bold [&_svg]:hidden';

  return (
    <header className="flex w-full max-w-184 items-center justify-between gap-4">
      <Image
        src="images/logo.svg"
        alt="Dictionary Web App"
        width={34}
        height={38}
        className="h-auto w-[clamp(1.75rem,5vw,2rem)]"
      />

      <div className="flex items-center gap-[clamp(1rem,3.5vw,1.5rem)]">
        <Select value={font} onValueChange={(value) => setFont(value as FontPreference)}>
          <SelectTrigger className="focus:ring-primary focus:ring-offset-background text-[clamp(0.875rem,3vw,1.125rem)] leading-6 font-bold focus:ring-2 focus:ring-offset-4">
            <SelectValue />
          </SelectTrigger>

          <SelectContent
            position="popper"
            align="end"
            sideOffset={12}
            className="w-[clamp(7.625rem,24vw,11.438rem)] rounded-3xl shadow-[0_5px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_30px_#A445ED]"
          >
            <SelectGroup className="grid gap-4 px-[clamp(1rem,3.5vw,1.5rem)] py-6">
              <SelectItem value="font-sans" className={cn('font-sans', selectItemCls)}>
                Sans Serif
              </SelectItem>

              <SelectItem value="font-serif" className={cn('font-serif', selectItemCls)}>
                Serif
              </SelectItem>

              <SelectItem value="font-mono" className={cn('font-mono', selectItemCls)}>
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
