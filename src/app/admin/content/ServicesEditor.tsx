'use client';

import React, { useState } from 'react';
import { collection, doc } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusCircle, Trash2 } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  setDocumentNonBlocking,
  deleteDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';

import { Spinner } from '@/components/Spinner';

const serviceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().min(1),
  icon: z.string().min(1),
  image: z.object({
    imageUrl: z.string().url(),
    imageHint: z.string().min(1),
  }),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export function ServicesEditor() {
  const firestore = useFirestore();
  const servicesCollection = useMemoFirebase(
    () => collection(firestore, 'services'),
    [firestore]
  );

  const { data: services, isLoading } =
    useCollection<ServiceFormData>(servicesCollection);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceFormData | null>(null);

  const { register, handleSubmit, reset } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const submit = async (data: ServiceFormData) => {
    const id = editing?.id || doc(collection(firestore, 'services')).id;
    await setDocumentNonBlocking(
      doc(firestore, 'services', id),
      { ...data, id },
      { merge: true }
    );
    setOpen(false);
    reset();
  };

  const remove = async (id?: string) => {
    if (!id) return;
    if (confirm('Delete service?')) {
      await deleteDocumentNonBlocking(doc(firestore, 'services', id));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>Manage services</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading && <Spinner />}

        <div className="space-y-3">
          {services?.map((s) => (
            <div key={s.id} className="flex justify-between border p-3 rounded">
              <span>{s.title}</span>
              <div className="space-x-2">
                <Button size="sm" onClick={() => { reset(s); setEditing(s); setOpen(true); }}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => remove(s.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button className="mt-6" onClick={() => { reset(); setEditing(null); setOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Service
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit' : 'Add'} Service</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(submit)} className="space-y-3">
              <Input placeholder="Title" {...register('title')} />
              <Input placeholder="Slug" {...register('slug')} />
              <Textarea placeholder="Description" {...register('description')} />
              <Textarea placeholder="Long description" {...register('longDescription')} />
              <Input placeholder="Icon name" {...register('icon')} />
              <Input placeholder="Image URL" {...register('image.imageUrl')} />
              <Input placeholder="Image hint" {...register('image.imageHint')} />
              <Button type="submit" className="w-full">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
