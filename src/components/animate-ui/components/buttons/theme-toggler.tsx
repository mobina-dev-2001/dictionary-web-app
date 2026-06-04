'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { MoonIcon } from '@/lib/icons';

import {
  type Resolved,
  type ThemeSelection,
  ThemeToggler as ThemeTogglerPrimitive,
  type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
} from '@/components/animate-ui/primitives/effects/theme-toggler';

// ----------------------------------------------------------------------

const getNextTheme = (effective: ThemeSelection, modes: ThemeSelection[]): ThemeSelection => {
  const i = modes.indexOf(effective);
  if (i === -1) return modes[0];
  return modes[(i + 1) % modes.length];
};

type ThemeTogglerButtonProps = Omit<React.ComponentProps<'button'>, 'className'> & {
  className?: string;
  modes?: ThemeSelection[];
  onImmediateChange?: ThemeTogglerPrimitiveProps['onImmediateChange'];
  direction?: ThemeTogglerPrimitiveProps['direction'];
};

function ThemeTogglerButton({
  modes = ['light', 'dark'],
  direction = 'ltr',
  onImmediateChange,
  onClick,
  className,
  ...props
}: ThemeTogglerButtonProps) {
  const [mounted, setMounted] = React.useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <ThemeTogglerPrimitive
      theme={theme as ThemeSelection}
      resolvedTheme={resolvedTheme as Resolved}
      setTheme={setTheme}
      direction={direction}
      onImmediateChange={onImmediateChange}
    >
      {({ effective, toggleTheme }) => {
        const isDark = mounted ? effective === 'dark' : false;

        return (
          <div className={cn('flex items-center gap-[clamp(0.625rem,2.5vw,1.25rem)]', className)}>
            <button
              type="button"
              role="switch"
              aria-label="Toggle dark theme"
              aria-checked={isDark}
              data-slot="theme-toggler-button"
              data-state={isDark ? 'checked' : 'unchecked'}
              onClick={(e) => {
                onClick?.(e);
                toggleTheme(getNextTheme(effective, modes));
              }}
              className="bg-muted-foreground hover:bg-primary data-[state=checked]:bg-primary focus-styles relative inline-flex h-5 w-10 shrink-0 items-center rounded-lg"
              {...props}
            >
              <span
                data-state={isDark ? 'checked' : 'unchecked'}
                className="bg-neutral-0 pointer-events-none block size-3.5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-5.75 data-[state=unchecked]:translate-x-0.75"
              />
            </button>

            <MoonIcon
              aria-hidden="true"
              className="text-muted-foreground dark:text-primary size-5 transition-colors"
            />
          </div>
        );
      }}
    </ThemeTogglerPrimitive>
  );
}

// ----------------------------------------------------------------------

export { ThemeTogglerButton, type ThemeTogglerButtonProps };
