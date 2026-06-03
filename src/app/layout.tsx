import type { Metadata } from 'next';
import type { FontPreference } from '@/types';

import { cookies } from 'next/headers';

import { cn } from '@/lib/utils';
import { lora, inter, inconsolata } from '@/lib/fonts';

import { Header } from '@/components/header';
import { Providers } from '@/components/providers';
import { Searchbar } from '@/components/searchbar';

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
        inter.variable,
        inconsolata.variable
      )}
    >
      <body className="bg-background text-foreground h-full">
        <Providers defaultFont={activeFontCls}>
          <div className="grid w-full max-w-204 gap-[clamp(1.5rem,6vw,3.5rem)] justify-self-center px-[clamp(1.5rem,6vw,2.5rem)] py-[clamp(1.5rem,6vw,3.625rem)]">
            <Header />

            <main className="grid gap-[clamp(1.563rem,6.25vw,3rem)]">
              <Searchbar />
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
