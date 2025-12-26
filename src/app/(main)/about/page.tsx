import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Gem } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Markify Digital',
  description: 'Learn about Markify Digital, our mission, our expert team of social media and SEO specialists, and what makes our digital marketing agency unique.',
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">About Markify Digital</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            We are a team of passionate creators, strategists, and innovators dedicated to helping businesses grow in the digital world.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container grid gap-12 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Target className="h-8 w-8" />
            </div>
            <h2 className="mt-6 font-headline text-2xl font-bold">Our Mission</h2>
            <p className="mt-2 text-muted-foreground">To empower businesses with creative and result-driven digital marketing solutions that foster sustainable growth and build lasting brand equity.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Eye className="h-8 w-8" />
            </div>
            <h2 className="mt-6 font-headline text-2xl font-bold">Our Vision</h2>
            <p className="mt-2 text-muted-foreground">To be the most trusted and innovative digital marketing agency, known for transforming ideas into remarkable digital success stories.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
