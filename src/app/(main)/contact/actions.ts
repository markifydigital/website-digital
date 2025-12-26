'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const QuoteFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success?: boolean;
};

export async function sendQuoteRequestAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = QuoteFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.flatten().fieldErrors;
    return {
      message: 'Validation error. Please check the fields.',
      issues: Object.values(issues).flat(),
      success: false,
    };
  }

  try {
    const { firestore } = initializeFirebase();
    const contactFormEntriesCollection = collection(firestore, 'contact_form_entries');
    
    await addDoc(contactFormEntriesCollection, {
        ...validatedFields.data,
        timestamp: serverTimestamp(),
    });

    return { 
        message: 'Thank you! Your message has been sent successfully.',
        success: true,
    };
  } catch (error) {
    console.error('Error sending quote request:', error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      success: false,
    };
  }
}
