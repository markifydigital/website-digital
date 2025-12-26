'use server';

import { generateSeoOptimizedContent } from '@/ai/flows/generate-seo-optimized-content';
import { z } from 'zod';

/**
 * ✅ Schema now MATCHES the function requirement
 * generateSeoOptimizedContent expects:
 * { content: string; focusKeywords: string }
 */
const SeoFormSchema = z.object({
  content: z
    .string()
    .min(50, { message: 'Content must be at least 50 characters.' }),
  focusKeywords: z
    .string()
    .min(1, { message: 'Focus keywords are required.' }),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: {
    optimizedContent: string;
    suggestions: string[];
  };
};

export async function optimizeContentAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SeoFormSchema.safeParse({
    content: formData.get('content'),
    focusKeywords: formData.get('focusKeywords'),
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.flatten().fieldErrors;
    return {
      message: 'Validation error.',
      issues: [
        ...(issues.content ?? []),
        ...(issues.focusKeywords ?? []),
      ],
    };
  }

  try {
    // ✅ FIX: pass BOTH required fields
    const result = await generateSeoOptimizedContent({
      content: validatedFields.data.content,
      focusKeywords: validatedFields.data.focusKeywords,
    });

    if (!result.optimizedContent) {
      return {
        message: 'Optimization failed. The AI could not generate content.',
      };
    }

    return {
      message: 'Content optimized successfully!',
      data: result,
    };
  } catch (error) {
    console.error('Error optimizing content:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
