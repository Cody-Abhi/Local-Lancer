'use server';
/**
 * @fileOverview This file implements an AI flow for matching jobs with freelancers.
 *
 * - aiSkillMatching - A function that handles the AI-powered job-freelancer matching process.
 * - AiSkillMatchingInput - The input type for the aiSkillMatching function.
 * - AiSkillMatchingOutput - The return type for the aiSkillMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSkillMatchingInputSchema = z.object({
  jobRequirements: z
    .string()
    .describe('Detailed description of the job requirements, skills needed, and project scope.'),
  freelancerProfiles: z
    .array(
      z.object({
        id: z.string().describe('Unique identifier for the freelancer.'),
        skills: z.array(z.string()).describe('List of skills possessed by the freelancer.'),
        bio: z.string().describe('A brief biography or summary of the freelancer.'),
        location: z.string().describe('The geographical location of the freelancer.'),
      })
    )
    .describe('An array of freelancer profiles to match against the job requirements.'),
});
export type AiSkillMatchingInput = z.infer<typeof AiSkillMatchingInputSchema>;

const AiSkillMatchingOutputSchema = z.object({
  suggestedMatches: z
    .array(
      z.object({
        freelancerId: z.string().describe('The unique identifier of the matched freelancer.'),
        matchScore: z
          .number()
          .describe(
            'A score between 0 and 100 indicating the relevance of the freelancer to the job requirements, where 100 is a perfect match.'
          ),
        reasoning: z
          .string()
          .describe(
            'A detailed explanation of why this freelancer is a good match for the job, considering skills, bio, and location relevancy.'
          ),
      })
    )
    .describe(
      'A list of freelancers suggested as matches for the job requirements, ordered by match score in descending order.'
    ),
});
export type AiSkillMatchingOutput = z.infer<typeof AiSkillMatchingOutputSchema>;

export async function aiSkillMatching(
  input: AiSkillMatchingInput
): Promise<AiSkillMatchingOutput> {
  return aiSkillMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSkillMatchingPrompt',
  input: {schema: AiSkillMatchingInputSchema},
  output: {schema: AiSkillMatchingOutputSchema},
  prompt: `You are an expert job-freelancer matching AI. Your goal is to find the best freelancers for a given job based on skills, location, and overall profile.

Job Requirements:
{{{jobRequirements}}}

Consider the following freelancer profiles and provide a match score and reasoning for each:

{{#each freelancerProfiles}}
Freelancer ID: {{{id}}}
Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Bio: {{{bio}}}
Location: {{{location}}}
---
{{/each}}

Based on the job requirements, evaluate each freelancer profile and return a list of suggested matches, including a matchScore (0-100) and reasoning for each. Order the matches by score in descending order.`,
});

const aiSkillMatchingFlow = ai.defineFlow(
  {
    name: 'aiSkillMatchingFlow',
    inputSchema: AiSkillMatchingInputSchema,
    outputSchema: AiSkillMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
