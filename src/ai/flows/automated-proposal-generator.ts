'use server';
/**
 * @fileOverview An AI agent that generates personalized job proposals and cover messages for freelancers.
 *
 * - generateProposal - A function that handles the proposal generation process.
 * - GenerateProposalInput - The input type for the generateProposal function.
 * - GenerateProposalOutput - The return type for the generateProposal function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProposalInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('A detailed description of the job posting the freelancer is applying for.'),
  freelancerProfileSummary: z
    .string()
    .describe(
      "A summary of the freelancer's skills, experience, and key achievements, to be used for personalization."
    ),
});
export type GenerateProposalInput = z.infer<typeof GenerateProposalInputSchema>;

const GenerateProposalOutputSchema = z.object({
  proposal: z
    .string()
    .describe(
      'A detailed and personalized project proposal tailored to the job description and freelancer profile.'
    ),
  coverMessage: z
    .string()
    .describe(
      'A concise and engaging cover message to accompany the application, designed to capture the client\u2019s attention.'
    ),
});
export type GenerateProposalOutput = z.infer<typeof GenerateProposalOutputSchema>;

export async function generateProposal(
  input: GenerateProposalInput
): Promise<GenerateProposalOutput> {
  return generateProposalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProposalPrompt',
  input: { schema: GenerateProposalInputSchema },
  output: { schema: GenerateProposalOutputSchema },
  prompt: `You are an expert proposal writer specializing in connecting freelancers with clients. Your goal is to generate a personalized and compelling proposal and a concise cover message for a freelancer applying to a job.

Here is the job description:
{{{jobDescription}}}

Here is a summary of the freelancer's profile, including their skills and experience:
{{{freelancerProfileSummary}}}

Based on this information, generate a professional proposal that highlights how the freelancer's skills and experience match the job requirements. Also, generate a short and engaging cover message that can be used for the initial application.

Ensure the proposal is detailed and addresses key aspects of the job, demonstrating the freelancer's suitability.
The cover message should be attention-grabbing and encourage the client to read the full proposal.
`,
});

const generateProposalFlow = ai.defineFlow(
  {
    name: 'generateProposalFlow',
    inputSchema: GenerateProposalInputSchema,
    outputSchema: GenerateProposalOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
