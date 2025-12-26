import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPages() {
  return (
    <div>
        <h1 className="text-3xl font-bold mb-4">Manage Pages</h1>
         <Card>
            <CardHeader>
                <CardTitle>Your Pages</CardTitle>
                <CardDescription>Here you can create, edit, and delete website pages.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Page management functionality coming soon!</p>
            </CardContent>
        </Card>
    </div>
  );
}
