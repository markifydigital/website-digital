'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services_hardcoded, ICONS, Service } from '@/lib/data';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Spinner } from '@/components/Spinner';

// export const metadata: Metadata = {
//   title: 'Our Services | Markify Digital',
//   description: 'Explore the services offered by Markify Digital, including SEO, social media marketing, website design, branding, paid ads, and content creation.',
// };

export default function ServicesPage() {
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<Service>(servicesCollection);
  const displayServices = services && services.length > 0 ? services : services_hardcoded;

  const getIcon = (iconName: string) => {
    return ICONS[iconName] || (() => <div />);
  }

  return (
    <div className="animate-fade-in">
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">Our Digital Marketing Services</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            From SEO services to complete website design, we provide everything you need to succeed online. We are a full-service digital marketing agency.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          {isLoading && <div className="flex justify-center"><Spinner /></div>}
          {!isLoading && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayServices.map((service) => {
                const ServiceIcon = getIcon(service.icon);
                return (
                <Link href={`/services/${service.slug}`} key={service.slug} className="group">
                  <Card className="flex flex-col h-full group-hover:shadow-lg transition-shadow">
                    <CardHeader className="flex-row items-center gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <ServiceIcon className="h-6 w-6" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )})}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
