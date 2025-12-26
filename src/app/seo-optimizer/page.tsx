'use client';

import { useActionState, useFormStatus } from 'react-dom';
import { optimizeContentAction, type FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Bot, Lightbulb } from 'lucide-react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? 'Optimizing...' : 'Optimize Content'}
    </Button>
  );
}

export default function SeoOptimizerPage() {
  const [state, formAction] = useActionState(optimizeContentAction, initialState);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="text-center">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">AI SEO Optimizer</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Leverage our AI to refine your content. This tool dynamically adjusts content for SEO based on focus keywords like 'digital marketing agency', 'SEO services', and current search trends.
            </p>
        </div>

        <Card className="mx-auto mt-12 max-w-4xl">
            <CardHeader>
                <CardTitle>Content Input</CardTitle>
                <CardDescription>Enter the content you wish to optimize for search engines.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    <div>
                        <Label htmlFor="content" className="sr-only">Content</Label>
                        <Textarea 
                            id="content"
                            name="content"
                            rows={10}
                            placeholder="Paste your website content here..."
                            required
                        />
                         {state.issues && (
                            <p className="mt-2 text-sm text-destructive">{state.issues.join(', ')}</p>
                        )}
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>

        {state.message && !state.data && (
            <Alert variant={state.issues ? "destructive" : "default"} className="mx-auto mt-8 max-w-4xl">
                <Terminal className="h-4 w-4" />
                <AlertTitle>{state.issues ? "Error" : "Status"}</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
        )}

        {state.data && (
            <div className="mx-auto mt-12 max-w-4xl space-y-8">
                <Alert variant="default" className="bg-primary/10 border-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-primary">Optimized Content</AlertTitle>
                    <AlertDescription className="prose prose-sm max-w-none text-foreground">
                        <p>{state.data.optimizedContent}</p>
                    </AlertDescription>
                </Alert>
                <Alert variant="default" className="bg-accent/10 border-accent/20">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    <AlertTitle className="text-accent">Improvement Suggestions</AlertTitle>
                    <AlertDescription>
                       <ul className="list-disc pl-5 space-y-1">
                          {state.data.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                       </ul>
                    </AlertDescription>
                </Alert>
            </div>
        )}
      </div>
    </div>
  );
}
