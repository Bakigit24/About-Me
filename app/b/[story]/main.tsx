'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Story } from '@/app/types'
import { Skeleton } from '@/components/ui/skeleton'
import { useRef } from 'react';
import dynamic from 'next/dynamic'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview').then(mod => mod.default), {
    ssr: false,
})

export default function StoryClient() {
    const { story } = useParams()
    const [data, setData] = useState<Story | null>(null)
    const [loading, setLoading] = useState(true)
    const hasRun = useRef(false);

    useEffect(() => {
        const run = async () => {
            const id = story as string;
            setLoading(true);
            const { data: newViews } = await supabase.rpc('increment_story_views', { story_id: id });
            const local = JSON.parse(localStorage.getItem('stories') || '[]');
            const cached = local.find((s: Story) => s.id === id);
            if (cached) {
                const updated = { ...cached, views: newViews?.[0]?.views ?? cached.views };
                const updatedLocal = local.map((s: Story) => (s.id === id ? updated : s));
                localStorage.setItem('stories', JSON.stringify(updatedLocal));
                setData(updated);
            } else {
                const { data: dbStory } = await supabase.from('story').select('*').eq('id', id).single();
                if (dbStory) {
                    setData({ ...dbStory, views: newViews?.[0]?.views ?? dbStory.views });
                }
            }
            setLoading(false);
        };

        if (story && !hasRun.current) {
            hasRun.current = true;
            run();
        }
    }, [story]);

    if (loading) {
        return (
            <main className="py-6 px-4 sm:px-8 md:px-12 lg:px-32 xl:px-[20%]">
                <Skeleton className="h-10 w-1/2 mb-4" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-full mb-2" />
            </main>
        )
    }

    if (!data) {
        return (
            <main className="py-6 px-4 sm:px-8 md:px-12 lg:px-32 xl:px-[20%]">
                <p className="text-destructive">Story not found.</p>
            </main>
        )
    }

    return (
        <main className="py-6 px-4 sm:px-8 md:px-12 lg:px-32 xl:px-[20%]">
            <h1 className="text-2xl font-bold mb-2">{data.title}</h1>

            <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground mb-6">
                    {new Date(data.date).toDateString()}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                    {data.views.toLocaleString()} views
                </p>
            </div>

            <div data-color-mode="auto" className="bg-background">
                <MarkdownPreview source={data.blog} style={{ background: 'transparent' }} />
            </div>
        </main>
    )
}