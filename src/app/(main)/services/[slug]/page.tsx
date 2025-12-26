'use client';
import { services_hardcoded, ICONS, Service } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next'
import { GetQuoteButton } from '@/components/get-quote-button';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/Spinner';

// Dynamic metadata generation can be tricky in client components.
// It's often better to handle this in a parent server component or layout if possible.

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const firestore = useFirestore();

  const [service, setService] = useState<Service | null | undefined>(undefined);
  const [otherServices, setOtherServices] = useState<Service[]>([]);
  
  const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: allServices, isLoading: isLoadingAll } = useCollection<Service>(servicesCollection);

  useEffect(() => {
    if (allServices) {
      const currentService = allServices.find(s => s.slug === slug) ?? services_hardcoded.find(s => s.slug === slug);
      if (currentService) {
        setService(currentService);
        const others = allServices.filter((s) => s.slug !== slug);
        setOtherServices(others);
      } else {
        setService(null); // Not found
      }
    } else if (!isLoadingAll) {
       // Fallback to hardcoded data if firestore is empty
       const currentService = services_hardcoded.find(s => s.slug === slug);
       if(currentService) {
        setService(currentService);
        setOtherServices(services_hardcoded.filter((s) => s.slug !== slug));
       } else {
        setService(null);
       }
    }
  }, [slug, allServices, isLoadingAll]);


  if (isLoadingAll || service === undefined) {
    return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
  }

  if (!service) {
    notFound();
  }

  const getIcon = (iconName: string) => {
    return ICONS[iconName] || (() => <div />);
  }

  const isSocialMediaPage = service.slug === 'social-media-management';

  return (
    <div className="animate-fade-in">
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={isSocialMediaPage ? 'md:order-2' : ''}>
              <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">{service.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{service.longDescription}</p>
              <GetQuoteButton size="lg" className="mt-8">Get a Quote</GetQuoteButton>
            </div>
            <div className={isSocialMediaPage ? 'md:order-1' : ''}>
              <Image
                src={service.image.imageUrl}
                alt={service.title}
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
                data-ai-hint={service.image.imageHint}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Explore Our Other Services</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              We offer a full range of digital marketing solutions to help your business grow.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherServices.slice(0, 3).map((s) => {
              const ServiceIcon = getIcon(s.icon);
              return (
              <Link href={`/services/${s.slug}`} key={s.slug} className="group">
                <Card className="flex flex-col h-full group-hover:shadow-lg transition-shadow">
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ServiceIcon className="h-6 w-6" />
                    </div>
                    <CardTitle>{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{s.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )})}
          </div>
        </div>
      </section>
    </div>
  );
}

// generateStaticParams may not work as expected with client-side data fetching.
// Consider server-side generation if pre-rendering all service pages is a requirement.
// export async function generateStaticParams() {
//   // This needs to fetch from firestore at build time
//   return services_hardcoded.map((service) => ({
//     slug: service.slug,
//   }));
// }
