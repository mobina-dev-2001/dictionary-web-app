import type { Metadata } from 'next';
import type { FontPreference } from '@/types';

import { cookies } from 'next/headers';

import { cn } from '@/lib/utils';
import { lora, inter, inconsolata } from '@/lib/fonts';

import { Providers } from '@/components/providers';

import './globals.css';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Dictionary Web App',
  description: 'A frontendmentor.io challenge',
};

// ----------------------------------------------------------------------

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const fontCookie = cookieStore.get('preferred-font');
  const activeFontCls = (fontCookie?.value as FontPreference) || 'font-sans';

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={cn(
        'bg-background text-foreground h-full antialiased',
        activeFontCls,
        lora.variable,
        inconsolata.variable,
        inter.variable
      )}
    >
      <body className="bg-background text-foreground h-full">
        <Providers defaultFont={activeFontCls}>{children}</Providers>
      </body>
    </html>
  );
}
