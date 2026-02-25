'use server';
/**
 * @fileOverview A Genkit flow for providing AI-powered suggestions to freelancers on how to improve their profile and portfolio.
 *
 * - optimizeProfile - A function that handles the profile optimization process.
 * - ProfileOptimizationInput - The input type for the optimizeProfile function.
 * - ProfileOptimizationOutput - The return type for the optimizeProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileOptimizationInputSchema = z.object({
  currentProfileDescription: z.string().describe("The freelancer's current profile biography or description."),
  skills: z.array(z.string()).describe("A list of skills the freelancer has listed on their profile."),
  portfolioSummary: z.string().describe("A summary of the freelancer's portfolio, including types of projects and achievements."),
  targetJobTypes: z.string().optional().describe("A description of the types of jobs the freelancer is looking to attract."),
  clientFeedbackSummary: z.string().optional().describe("A summary of feedback received from previous clients, if available."),
});
export type ProfileOptimizationInput = z.infer<typeof ProfileOptimizationInputSchema>;

const ProfileOptimizationOutputSchema = z.object({
  overallRecommendations: z.array(z.string()).describe("General high-level recommendations for profile improvement."),
  profileDescriptionSuggestions: z.array(z.string()).describe("Specific suggestions for improving the freelancer's profile description."),
  skillSuggestions: z.array(z.string()).describe("Specific suggestions for optimizing the freelancer's listed skills."),
  portfolioSuggestions: z.array(z.string()).describe("Specific suggestions for enhancing the freelancer's portfolio presentation."),
  callToAction: z.string().describe("A concluding call to action or encouraging message."),
});
export type ProfileOptimizationOutput = z.infer<typeof ProfileOptimizationOutputSchema>;

export async function optimizeProfile(input: ProfileOptimizationInput): Promise<ProfileOptimizationOutput> {
  return profileOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'profileOptimizationPrompt',
  input: {schema: ProfileOptimizationInputSchema},
  output: {schema: ProfileOptimizationOutputSchema},
  prompt: `You are an expert career coach and profile optimization specialist for freelancers.
Your goal is to provide actionable, AI-powered suggestions to improve a freelancer's profile and portfolio to attract more relevant jobs and clients.
Analyze the provided freelancer profile data and generate constructive feedback and concrete tips.

Here is the freelancer's current profile information:

Current Profile Description:
{{{currentProfileDescription}}}

Skills:
{{#each skills}}- {{{this}}}
{{/each}}

Portfolio Summary:
{{{portfolioSummary}}}

{{#if targetJobTypes}}
Target Job Types:
{{{targetJobTypes}}}
{{/if}}

{{#if clientFeedbackSummary}}
Summary of Client Feedback:
{{{clientFeedbackSummary}}}
{{/if}}

Based on this information, provide specific and actionable suggestions in the following categories to help the freelancer optimize their profile and portfolio for success.
Focus on clarity, impact, and attracting desired clients.

Your output must be a JSON object matching the ProfileOptimizationOutputSchema.`,
});

const profileOptimizationFlow = ai.defineFlow(
  {
    name: 'profileOptimizationFlow',
    inputSchema: ProfileOptimizationInputSchema,
    outputSchema: ProfileOptimizationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
