import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioItems, clientLogos } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Markify Digital',
  description: 'See the results we have delivered. View our portfolio of website design, branding, and digital marketing projects.',
};

export default function PortfolioPage() {
  return (
    <div className="animate-fade-in">
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">Our Work</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            We take pride in the results we deliver. Explore some of our successful projects and see how we've helped businesses like yours grow.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container space-y-16">
          {portfolioItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <Badge variant="secondary">{item.category}</Badge>
                  <CardHeader className="p-0 pt-4">
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 pt-6">
                    <div className="text-lg font-semibold">Results: <span className="text-primary">{item.results}</span></div>
                  </CardContent>
                </div>
                <div className="grid grid-cols-2 gap-2 p-4 bg-muted/50">
                  {item.beforeImage && item.afterImage && (
                    <>
                      <div>
                        <p className="mb-2 text-center text-sm font-semibold text-muted-foreground">Before</p>
                        <Image src={item.beforeImage.imageUrl} alt="Before" width={600} height={400} className="rounded-md shadow-md" data-ai-hint={item.beforeImage.imageHint} />
                      </div>
                      <div>
                        <p className="mb-2 text-center text-sm font-semibold text-foreground">After</p>
                        <Image src={item.afterImage.imageUrl} alt="After" width={600} height={400} className="rounded-md shadow-md" data-ai-hint={item.afterImage.imageHint} />
                      </div>
                    </>
                  )}
                   {item.mainImage && (
                     <div className="col-span-2">
                        <Image src={item.mainImage.imageUrl} alt={item.title} width={600} height={400} className="rounded-md shadow-md" data-ai-hint={item.mainImage.imageHint} />
                     </div>
                   )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">Trusted by Indian Brands</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                We are proud to exclusively partner with Indian businesses. Our diverse clientele includes engineering firms, hospitals, health and wellness brands, and more.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {clientLogos.map((logo) => (
                    <div key={logo.id} className="grayscale transition hover:grayscale-0">
                        <Image
                            src={logo.imageUrl}
                            alt={logo.description}
                            width={150}
                            height={75}
                            className="object-contain"
                            data-ai-hint={logo.imageHint}
                        />
                    </div>
                ))}
            </div>
          </div>
      </section>
    </div>
  );
}
