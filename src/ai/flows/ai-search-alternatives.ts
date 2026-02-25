'use server';
/**
 * @fileOverview This file provides an AI flow for suggesting alternative search terms or broader categories
 * when a user's initial search for jobs or freelancers yields no results.
 *
 * - searchAlternatives - A function that handles the generation of search alternatives.
 * - SearchAlternativesInput - The input type for the searchAlternatives function.
 * - SearchAlternativesOutput - The return type for the searchAlternatives function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SearchAlternativesInputSchema = z.object({
  originalQuery: z
    .string()
    .describe('The original search query that yielded no results.'),
  searchType: z
    .enum(['job', 'freelancer'])
    .describe('The type of search being performed (job or freelancer).'),
});
export type SearchAlternativesInput = z.infer<typeof SearchAlternativesInputSchema>;

const SearchAlternativesOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'An array of suggested alternative search terms or broader categories.'
    ),
});
export type SearchAlternativesOutput = z.infer<typeof SearchAlternativesOutputSchema>;

export async function searchAlternatives(
  input: SearchAlternativesInput
): Promise<SearchAlternativesOutput> {
  return searchAlternativesFlow(input);
}

const searchAlternativesPrompt = ai.definePrompt({
  name: 'searchAlternativesPrompt',
  input: { schema: SearchAlternativesInputSchema },
  output: { schema: SearchAlternativesOutputSchema },
  prompt: `You are an AI assistant specialized in optimizing search queries for a platform connecting clients and freelancers.
A user performed a search for a {{{searchType}}} with the query "{{{originalQuery}}}", and this search yielded no results.

Your task is to provide 3-5 alternative search terms or broader categories that the user could try.
These suggestions should help the user find relevant {{{searchType}}} listings.
Focus on:
- Broader categories related to the original query.
- Synonyms or alternative phrasing for keywords.
- Generalizing specific terms.

Do not suggest the exact original query. Ensure the suggestions are distinct and potentially more encompassing.
Format your output as a JSON object containing an array of strings, where each string is a suggestion.`,
});

const searchAlternativesFlow = ai.defineFlow(
  {
    name: 'searchAlternativesFlow',
    inputSchema: SearchAlternativesInputSchema,
    outputSchema: SearchAlternativesOutputSchema,
  },
  async (input) => {
    const { output } = await searchAlternativesPrompt(input);
    return output!;
  }
);
