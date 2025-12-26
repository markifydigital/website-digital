
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

import { HomeHero } from '@/components/home-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { services_hardcoded, whyChooseUs, testimonials_hardcoded, ICONS, Service, Testimonial } from '@/lib/data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Spinner } from '@/components/Spinner';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServiceHighlights />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}

function ServiceHighlights() {
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<Service>(servicesCollection);
  const displayServices = services && services.length > 0 ? services : services_hardcoded;
  
  const getIcon = (iconName: string) => {
    return ICONS[iconName] || (() => <div />);
  }

  return (
    <section id="services" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Our Core Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            As a leading digital marketing agency, we offer a comprehensive suite of services to help your business thrive online.
          </p>
        </div>
        {isLoading && <div className="flex justify-center mt-12"><Spinner /></div>}
        {!isLoading && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayServices.map((service) => {
              const ServiceIcon = getIcon(service.icon);
              return (
                <Link href={`/services/${service.slug}`} key={service.slug} className="group">
                  <Card className="text-center transition-transform group-hover:scale-105 group-hover:shadow-lg h-full bg-gradient-to-br from-card to-secondary">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ServiceIcon className="h-8 w-8" />
                      </div>
                      <CardTitle className="mt-4">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
    return (
        <section id="why-us" className="py-16 md:py-24">
            <div className="container">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold md:text-4xl">Why Partner with Markify Digital?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        We're not just another branding agency. We're your partners in growth, committed to delivering creative solutions and tangible results.
                    </p>
                </div>
                <div className="mt-12 grid gap-12 items-center md:grid-cols-2">
                    <div>
                        <Image src="https://picsum.photos/seed/digital/800/600" alt="Digital Marketing" width={800} height={600} className="rounded-lg shadow-lg" data-ai-hint="digital marketing" />
                    </div>
                    <div className="space-y-8">
                        {whyChooseUs.map((usp) => (
                            <div key={usp.title} className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                                    <usp.icon className="h-6 w-6"/>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{usp.title}</h3>
                                    <p className="mt-1 text-muted-foreground">{usp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
  const firestore = useFirestore();
  const testimonialsCollection = useMemoFirebase(() => collection(firestore, 'testimonials'), [firestore]);
  const { data: testimonials, isLoading } = useCollection<Testimonial>(testimonialsCollection);
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : testimonials_hardcoded;

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Hear from businesses we've helped transform with our expert website design, SEO, and social media services.
          </p>
        </div>
        {isLoading && <div className="flex justify-center mt-12"><Spinner /></div>}
        {!isLoading && (
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-4xl mx-auto mt-12"
        >
          <CarouselContent>
            {displayTestimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full bg-background">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <div className="flex">
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="mt-4 text-muted-foreground italic">"{testimonial.comment}"</p>
                      <div className="mt-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        )}
      </div>
    </section>
  );
}
