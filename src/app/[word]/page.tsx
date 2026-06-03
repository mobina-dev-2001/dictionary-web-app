import { WordDefinition } from '@/components/word-definition';

// ----------------------------------------------------------------------

export default async function WordPage({ params }: { params: Promise<{ word: string }> }) {
  const { word } = await params;
  const decodedWord = decodeURIComponent(word);

  return <WordDefinition word={decodedWord} />;
}
