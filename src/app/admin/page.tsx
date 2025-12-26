'use client';

import { useUser } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
    const { user } = useUser();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {user?.displayName || user?.email || 'Admin'}!</CardTitle>
                    <CardDescription>This is your control center for managing the website content.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>You can manage pages, services, and other content from the sidebar navigation.</p>
                </CardContent>
            </Card>
        </div>
    );
}
