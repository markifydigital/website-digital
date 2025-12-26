'use server';

/**
 * @fileOverview An AI tool that suggests dynamic adjustments to website content.
 *
 * - generateSeoOptimizedContent - A function that handles the content optimization process.
 * - GenerateSeoOptimizedContentInput - The input type for the generateSeoOptimizedContent function.
 * - GenerateSeoOptimizedContentOutput - The return type for the generateSeoOptimizedContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoOptimizedContentInputSchema = z.object({
  content: z.string().describe('The website content to be optimized.'),
  focusKeywords: z
    .string()
    .default(
      'digital marketing agency, SEO services, social media expert, website design, branding agency, Markify Digital'
    )
    .describe(
      'A comma-separated list of focus keywords for SEO optimization.'
    ),
});
export type GenerateSeoOptimizedContentInput = z.infer<
  typeof GenerateSeoOptimizedContentInputSchema
>;

const GenerateSeoOptimizedContentOutputSchema = z.object({
  optimizedContent: z
    .string()
    .describe('The SEO-optimized website content.'),
  suggestions: z.array(z.string()).describe('Suggestions for content improvement.'),
});
export type GenerateSeoOptimizedContentOutput = z.infer<
  typeof GenerateSeoOptimizedContentOutputSchema
>;

export async function generateSeoOptimizedContent(
  input: GenerateSeoOptimizedContentInput
): Promise<GenerateSeoOptimizedContentOutput> {
  return generateSeoOptimizedContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoOptimizedContentPrompt',
  input: {schema: GenerateSeoOptimizedContentInputSchema},
  output: {schema: GenerateSeoOptimizedContentOutputSchema},
  prompt: `You are an SEO expert. Optimize the given website content for better search engine ranking.

  Incorporate the following focus keywords naturally throughout the content: {{{focusKeywords}}}.

  Consider current search engine trends and suggest dynamic adjustments to improve SEO.

  Original Content: {{{content}}}

  Provide the optimized content and a list of suggestions for further improvement.
  Ensure the optimized content is engaging and maintains a professional, result-driven, and creative tone, in line with the brand: Markify Digital. Brand tagline: Transforming Ideas Into Digital Growth.
  `,
});

const generateSeoOptimizedContentFlow = ai.defineFlow(
  {
    name: 'generateSeoOptimizedContentFlow',
    inputSchema: GenerateSeoOptimizedContentInputSchema,
    outputSchema: GenerateSeoOptimizedContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
