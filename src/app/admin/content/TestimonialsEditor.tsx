'use client';

import React, { useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';
import { setDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Spinner } from '@/components/Spinner';

const testimonialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company/Shop name is required"),
  comment: z.string().min(1, "Comment is required"),
  rating: z.coerce.number().min(1).max(5, "Rating must be between 1 and 5"),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

export function TestimonialsEditor() {
  const firestore = useFirestore();
  const testimonialsCollection = useMemoFirebase(() => collection(firestore, 'testimonials'), [firestore]);
  const { data: testimonials, isLoading } = useCollection<TestimonialFormData>(testimonialsCollection);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialFormData | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
  });

  const handleAddNew = () => {
    reset({ name: '', company: '', comment: '', rating: 5 });
    setEditingTestimonial(null);
    setIsFormOpen(true);
  };

  const handleEdit = (testimonial: TestimonialFormData) => {
    reset(testimonial);
    setEditingTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const testimonialDoc = doc(firestore, 'testimonials', id);
      await deleteDocumentNonBlocking(testimonialDoc);
    }
  };

  const onSubmit: SubmitHandler<TestimonialFormData> = async (data) => {
    const id = editingTestimonial?.id || doc(collection(firestore, 'testimonials')).id;
    const testimonialDoc = doc(firestore, 'testimonials', id);
    await setDocumentNonBlocking(testimonialDoc, data, { merge: true });
    setIsFormOpen(false);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonials</CardTitle>
        <CardDescription>Manage the client reviews on your website.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="flex justify-center"><Spinner /></div>}
        <div className="grid gap-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial.id} className="flex items-center justify-between p-2 border rounded-md">
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={handleAddNew} className="mt-6">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Testimonial
        </Button>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit' : 'Add'} Testimonial</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto p-4">
              <div>
                <Label htmlFor="name">Client Name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="company">Company / Shop Name</Label>
                <Input id="company" {...register('company')} />
                {errors.company && <p className="text-destructive text-sm mt-1">{errors.company.message}</p>}
              </div>
              <div>
                <Label htmlFor="comment">Comment</Label>
                <Textarea id="comment" {...register('comment')} rows={4} />
                {errors.comment && <p className="text-destructive text-sm mt-1">{errors.comment.message}</p>}
              </div>
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input id="rating" type="number" {...register('rating')} />
                {errors.rating && <p className="text-destructive text-sm mt-1">{errors.rating.message}</p>}
              </div>
              <Button type="submit">Save Testimonial</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
