'use client';

import { useActionState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Clock, MessageCircle, Terminal, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { sendQuoteRequestAction, type FormState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useEffect, useRef, useActionState as useReactActionState } from 'react';


// We can't export metadata from a client component.
// This should be moved to a parent layout if we need dynamic metadata.
// export const metadata: Metadata = {
//   title: 'Contact Us | Markify Digital',
//   description: 'Get in touch with Markify Digital. Contact our digital marketing agency for a quote on our SEO, website design, or social media services.',
// };

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useReactActionState(sendQuoteRequestAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="animate-fade-in">
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">Get in Touch</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Ready to start your project? Have a question? We're here to help. Reach out to our digital marketing agency today.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold">Contact Form</h2>
            <p className="mt-2 text-muted-foreground">Send us a message and we'll get back to you shortly.</p>
            <form ref={formRef} action={formAction} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" type="text" placeholder="Your Name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" type="text" placeholder="e.g., SEO Services Inquiry" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Tell us about your project..." rows={5} required />
              </div>
               
              {state.message && (
                  <Alert variant={state.success ? 'default' : 'destructive'}>
                      {state.success ? <CheckCircle className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
                      <AlertTitle>{state.success ? 'Success' : 'Error'}</AlertTitle>
                      <AlertDescription>
                          {state.message}
                          {state.issues && (
                              <ul className="list-disc pl-5 mt-2">
                                  {state.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                              </ul>
                          )}
                      </AlertDescription>
                  </Alert>
              )}
              
              <SubmitButton />
            </form>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <a href="https://maps.app.goo.gl/eeVsx1Kexu1xG4Hb6" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    3, Prakash Row House, Ritanagar, Vastral Road, Amraiwadi, Ahmedabad - 380026
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <p>+91 8160058845</p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <p>Mon - Fri: 9:30 AM - 6:30 PM</p>
                </div>
              </CardContent>
            </Card>
            <a href="https://wa.me/918160058845" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
