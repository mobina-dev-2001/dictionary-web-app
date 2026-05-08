export type FontPreference = 'font-sans' | 'font-serif' | 'font-mono';

export type WordSearchResponse = { word: string; score: number }[];

export type WordDefinitionResponse = {
  word: string;
  phonetic?: string;
  phonetics: {
    text?: string;
    audio: string;
    sourceUrl?: string;
    license?: { name: string; url: string };
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
      antonyms: string[];
      example?: string;
    }[];
    synonyms: string[];
    antonyms: string[];
  }[];
  license: { name: string; url: string };
  sourceUrls: string[];
}[];
