import { supabase } from '@/lib/supabase';
import StoryClient from './main';

export async function generateMetadata({ params }: { params: Promise<{ story: string }> }) {
    const { story } = await params;

    const { data } = await supabase
        .from('story')
        .select('title, blog')
        .eq('id', story)
        .single();

    if (!data) {
        return {
            title: 'Not Found',
            description: 'This story could not be found.',
            robots: { index: false, follow: false },
        };
    }

    return {
        title: data.title,
        description: data.blog.slice(0, 150),
        openGraph: {
            title: data.title,
            description: data.blog.slice(0, 150),
            url: `https://shoxruh.vercel.app/b/${story}`,
            type: 'article',
        },
    };
}

export async function generateStaticParams() {
    const { data } = await supabase.from('story').select('id');

    return (data || []).map((story) => ({
        story: story.id,
    }));
}

export default async function StoryPage() {
    return <StoryClient />;
}
