'use server';
/**
 * @fileOverview A Genkit flow for dynamically translating chat messages.
 *
 * - dynamicChatTranslation - A function that handles the dynamic translation of chat messages.
 * - DynamicChatTranslationInput - The input type for the dynamicChatTranslation function.
 * - DynamicChatTranslationOutput - The return type for the dynamicChatTranslation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicChatTranslationInputSchema = z.object({
  message: z.string().describe('The chat message to translate.'),
  targetLanguage: z
    .string()
    .describe('The target language for translation (e.g., "Hindi", "Spanish").'),
});
export type DynamicChatTranslationInput = z.infer<
  typeof DynamicChatTranslationInputSchema
>;

const DynamicChatTranslationOutputSchema = z.object({
  translatedMessage: z.string().describe('The translated chat message.'),
});
export type DynamicChatTranslationOutput = z.infer<
  typeof DynamicChatTranslationOutputSchema
>;

export async function dynamicChatTranslation(
  input: DynamicChatTranslationInput
): Promise<DynamicChatTranslationOutput> {
  return dynamicChatTranslationFlow(input);
}

const translateChatPrompt = ai.definePrompt({
  name: 'translateChatPrompt',
  input: {schema: DynamicChatTranslationInputSchema},
  output: {schema: DynamicChatTranslationOutputSchema},
  prompt: `Translate the following chat message into {{targetLanguage}}.
      
Message: {{{message}}}`,
});

const dynamicChatTranslationFlow = ai.defineFlow(
  {
    name: 'dynamicChatTranslationFlow',
    inputSchema: DynamicChatTranslationInputSchema,
    outputSchema: DynamicChatTranslationOutputSchema,
  },
  async (input) => {
    const {output} = await translateChatPrompt(input);
    return output!;
  }
);
