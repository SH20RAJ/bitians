'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import { CreatePostForm } from '@/components/create/CreatePostForm';
import { useToast } from '@/components/ui/Toast';

export default function CreatePage() {
    const { addToast } = useToast();

    const handlePostSubmit = (data: any) => {
        // In a real app, this would send to an API
        console.log('Post data:', data);
        
        addToast({
            type: 'success',
            title: 'Post Created!',
            message: 'Your post has been shared with the BITians community.',
        });
    };

    return (
        <PageLayout title="Create" showBack={false}>
            <div className="p-4">
                <CreatePostForm onSubmit={handlePostSubmit} />
            </div>
        </PageLayout>
    );
}
