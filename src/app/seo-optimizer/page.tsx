'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Bot, Lightbulb } from 'lucide-react';

type OptimizerResult = {
  optimizedContent: string;
  suggestions: string[];
};

export default function SeoOptimizerPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OptimizerResult | null>(null);

  const optimizeContent = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 🔹 Simulated SEO optimization
      await new Promise((r) => setTimeout(r, 1200));

      setResult({
        optimizedContent:
          content +
          '\n\n[Optimized with improved keywords, headings & readability]',
        suggestions: [
          'Add primary keyword in H1',
          'Improve meta description',
          'Increase internal linking',
          'Use schema markup',
        ],
      });
    } catch {
      setError('Failed to optimize content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            AI SEO Optimizer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Optimize your website content with AI-powered SEO suggestions.
          </p>
        </div>

        <Card className="mx-auto mt-12 max-w-4xl">
          <CardHeader>
            <CardTitle>Content Input</CardTitle>
            <CardDescription>
              Paste the content you want to optimize.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your website content here..."
              />
            </div>

            <Button
              size="lg"
              onClick={optimizeContent}
              disabled={loading || !content.trim()}
            >
              {loading ? 'Optimizing…' : 'Optimize Content'}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mx-auto mt-8 max-w-4xl">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="mx-auto mt-12 max-w-4xl space-y-8">
            <Alert className="border-primary/20 bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
              <AlertTitle>Optimized Content</AlertTitle>
              <AlertDescription>
                <p className="whitespace-pre-wrap">
                  {result.optimizedContent}
                </p>
              </AlertDescription>
            </Alert>

            <Alert className="border-accent/20 bg-accent/10">
              <Lightbulb className="h-4 w-4 text-accent" />
              <AlertTitle>Improvement Suggestions</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 space-y-1">
                  {result.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
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
