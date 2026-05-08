'use client';

import { useState } from 'react';

import { Header } from '@/components/header';
import { Searchbar } from '@/components/searchbar';

// ----------------------------------------------------------------------

export default function Home() {
  const [selectedWord, setSelectedWord] = useState('');

  return (
    <div className="grid w-full max-w-184 gap-[clamp(1.5rem,6vw,3.5rem)] justify-self-center px-[clamp(1.5rem,6vw,2.5rem)] py-[clamp(1.5rem,6vw,3.625rem)]">
      <Header />
      <Searchbar onWordSelect={setSelectedWord} />
    </div>
  );
}
