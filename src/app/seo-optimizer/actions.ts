'use server';

import { generateSeoOptimizedContent } from '@/ai/flows/generate-seo-optimized-content';
import { z } from 'zod';

const SeoFormSchema = z.object({
  content: z.string().min(50, { message: "Content must be at least 50 characters." }),
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
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.flatten().fieldErrors;
    return {
      message: 'Validation error.',
      issues: issues.content,
    };
  }

  try {
    const result = await generateSeoOptimizedContent({
      content: validatedFields.data.content,
    });
    
    if (!result.optimizedContent) {
        return { message: 'Optimization failed. The AI could not generate content.' };
    }

    return { 
        message: 'Content optimized successfully!',
        data: result
    };
  } catch (error) {
    console.error('Error optimizing content:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
