'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GetQuoteButton } from './get-quote-button';

const headlines = [
  'Drive Growth with Expert SEO Services.',
  'Captivate Audiences with Social Media.',
  'Build Your Vision with Modern Web Design.',
  'Define Your Identity with a Branding Agency.',
];

export function HomeHero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-background bg-[length:400%_400%] animate-gradient-move"></div>
        <div className="absolute inset-0 bg-background opacity-50"></div>
        <div className="container relative z-10 px-4 animate-fade-in-up">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                <span className="text-gradient block">{headlines[headlineIndex]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl">
                Transforming Ideas Into Digital Growth. We are Markify Digital, a full-service digital marketing agency ready to elevate your brand.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <GetQuoteButton size="lg">Get a Free Quote</GetQuoteButton>
                <Button size="lg" variant="outline" asChild>
                    <Link href="/services">Our Services</Link>
                </Button>
            </div>
        </div>
    </section>
  );
}
