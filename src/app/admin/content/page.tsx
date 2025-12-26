'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServicesEditor } from './ServicesEditor';
import { TestimonialsEditor } from './TestimonialsEditor';

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Website Content</h1>
      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>
        <TabsContent value="services">
          <ServicesEditor />
        </TabsContent>
        <TabsContent value="testimonials">
          <TestimonialsEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
