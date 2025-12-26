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
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Spinner } from '@/components/Spinner';

const serviceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().min(1, "Long description is required"),
  icon: z.string().min(1, "Icon name is required"), // Assuming icon is a string name from lucide-react
  image: z.object({
    imageUrl: z.string().url("Must be a valid URL"),
    imageHint: z.string().min(1, "Image hint is required"),
  }),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export function ServicesEditor() {
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<ServiceFormData>(servicesCollection);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceFormData | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const handleAddNew = () => {
    reset({
      title: '',
      slug: '',
      description: '',
      longDescription: '',
      icon: '',
      image: { imageUrl: '', imageHint: '' },
    });
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: ServiceFormData) => {
    reset(service);
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const serviceDoc = doc(firestore, 'services', id);
      await deleteDocumentNonBlocking(serviceDoc);
    }
  };

  const onSubmit: SubmitHandler<ServiceFormData> = async (data) => {
    const id = editingService?.id || doc(collection(firestore, 'services')).id;
    const serviceDoc = doc(firestore, 'services', id);
    await setDocumentNonBlocking(serviceDoc, data, { merge: true });
    setIsFormOpen(false);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>Manage the services offered on your website.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="flex justify-center"><Spinner /></div>}
        <div className="grid gap-4">
          {services?.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-2 border rounded-md">
              <span>{service.title}</span>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={handleAddNew} className="mt-6">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
        </Button>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit' : 'Add'} Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto p-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" {...register('slug')} />
                {errors.slug && <p className="text-destructive text-sm mt-1">{errors.slug.message}</p>}
              </div>
              <div>
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" {...register('description')} />
                {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
              </div>
              <div>
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea id="longDescription" {...register('longDescription')} rows={5} />
                {errors.longDescription && <p className="text-destructive text-sm mt-1">{errors.longDescription.message}</p>}
              </div>
              <div>
                <Label htmlFor="icon">Icon Name (from lucide-react)</Label>
                <Input id="icon" {...register('icon')} placeholder="e.g., Share2" />
                {errors.icon && <p className="text-destructive text-sm mt-1">{errors.icon.message}</p>}
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" {...register('image.imageUrl')} />
                {errors.image?.imageUrl && <p className="text-destructive text-sm mt-1">{errors.image.imageUrl.message}</p>}
              </div>
              <div>
                <Label htmlFor="imageHint">Image Hint</Label>
                <Input id="imageHint" {...register('image.imageHint')} />
                {errors.image?.imageHint && <p className="text-destructive text-sm mt-1">{errors.image.imageHint.message}</p>}
              </div>
              <Button type="submit">Save Service</Button>
            </form>
          </DialogContent>
        </Dialog>
      </Content>
    </Card>
  );
}
