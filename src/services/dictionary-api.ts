import type { WordSearchResponse, WordDefinitionResponse } from '@/types';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// ----------------------------------------------------------------------

const SEARCH_SUGGESTION_API = process.env.NEXT_PUBLIC_SEARCH_SUGGESTION_API;
const DICTIONARY_API = process.env.NEXT_PUBLIC_DICTIONARY_API;

export const useWordSearch = (query: string) => {
  return useQuery({
    queryKey: ['words', query],
    queryFn: async (): Promise<WordSearchResponse> => {
      const { data } = await axios.get(`${SEARCH_SUGGESTION_API}sug?s=${query}`);
      return data || [];
    },
    enabled: !!query && query.trim().length > 1,
  });
};

export const useWordDefinition = (word: string) => {
  return useQuery({
    queryKey: ['definitions', word],
    queryFn: async (): Promise<WordDefinitionResponse> => {
      const { data } = await axios.get(`${DICTIONARY_API}${word}`);
      return data;
    },
    enabled: !!word,
    retry: false,
  });
};
