"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Story } from "@/app/types";
import {
    Table,
    TableBody,
    TableCell, TableHead,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadStories = async () => {
            setLoading(true);
            const { data, error } = await supabase.from("story").select("*");
            if (error) console.error(error);
            else setStories(data as Story[]);
            setLoading(false);
        };

        loadStories();
    }, []);

    const openStory = (story: Story) => {
        const saved = JSON.parse(localStorage.getItem("stories") || "[]");
        const updated = [...saved.filter((s: { id: string }) => s.id !== story.id), story];
        localStorage.setItem("stories", JSON.stringify(updated));
        router.push(`/b/${story.id}`);
    };

    const storiesByYear = stories.reduce((acc: Record<number, Story[]>, story) => {
        const year = new Date(story.date).getFullYear();
        acc[year] = acc[year] || [];
        acc[year].push(story);
        return acc
    }, {});

    return (
        <main className="min-h-screen py-8 px-4 md:px-10 lg:px-[20%] font-mono">
            <Table className="w-full">
                <TableHead className="p-0">
                <TableRow className="w-full justify-between">
                    <TableCell className="text-muted-foreground font-light min-w-[70px]">date</TableCell>
                    <TableCell className="text-muted-foreground font-light w-full">title</TableCell>
                    <TableCell className="text-right text-muted-foreground font-light">views</TableCell>
                </TableRow>
                </TableHead>
            </Table>
            {loading ? (
                <div className="space-y-10">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-6 items-start">
                            {/* Year label skeleton */}
                            <Skeleton className="h-5 w-10 mt-2" />

                            {/* Table skeleton */}
                            <Table className="flex-1">
                                <TableBody>
                                    {Array.from({ length: 3 }).map((_, j) => (
                                        <TableRow key={j}>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[60%]" />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Skeleton className="h-4 w-10 ml-auto" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ))}
                </div>
            ) : (
                Object.entries(storiesByYear)
                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                    .map(([year, list]) => (
                         <div className="flex gap-6 items-start mb-10" key={year}>
                                <h2 className="text-sm m-2 text-accent-foreground/50 w-[30px]">{year}</h2>
                                <Table className="flex-1">
                                    <TableBody>
                                        {list
                                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                            .map((story) => (
                                                <TableRow
                                                    key={story.id}
                                                    onClick={() => openStory(story)}
                                                    className="cursor-pointer transition-colors hover:bg-muted"
                                                >
                                                    <TableCell className="hover:underline font-bold">{story.title}</TableCell>
                                                    <TableCell className="text-right text-muted-foreground">
                                                        {story.views.toLocaleString()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </div>
                    ))
            )}
        </main>
    );
}
