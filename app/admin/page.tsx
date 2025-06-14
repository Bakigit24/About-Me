'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { PluggableList } from 'unified'
import { supabase } from '@/lib/supabase'
import { generateSlug } from '@/lib/slug'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { CalendarIcon, BadgePlus } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function AdminPage() {
    const [remarkPlugins, setRemarkPlugins] = useState<PluggableList>([])
    const [secret, setSecret] = useState('')
    const [title, setTitle] = useState('')
    const [blog, setBlog] = useState('')
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [saving, setSaving] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        import('remark-breaks')
            .then((mod) => {
                setRemarkPlugins([mod.default])
            })
            .catch(() => {
                setRemarkPlugins([])
            })
    }, [])

    const saveStory = async () => {
        if (!title || !blog || !selectedDate || !secret) return

        const slug = generateSlug(title)
        const newStory = {
            id: slug,
            title,
            date: selectedDate.toISOString(),
            views: 1,
            blog,
        }

        setSaving(true)

        const { data: appKey, error: appError } = await supabase.from("app").select("key").single()
        if (appError) {
            toast.error("Error fetching app key")
            setSaving(false)
            return
        }

        if (appKey?.key !== secret) {
            toast.warning('Invalid secret key')
            setSaving(false)
            return
        }

        const { error: insertError } = await supabase.from("story").insert(newStory)
        if (insertError) {
            toast.error('❌ Failed to save: ' + insertError.message)
        } else {
            toast.success('✅ Story saved!')
            setTitle('')
            setBlog('')
            setSelectedDate(undefined)
            setSecret('')
        }

        setSaving(false)
    }

    const allFieldsFilled = title && blog && selectedDate && secret

    return (
        <div className="space-y-6 px-4 md:px-12 lg:px-[20%] py-10">
            <Card>
                <CardHeader className="flex items-center gap-2 px-4 md:px-6">
                    <BadgePlus />
                    <h1 className="text-xl md:text-2xl font-bold">Create New Story</h1>
                </CardHeader>

                <CardContent className="px-4 md:px-6 space-y-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="space-y-2 w-full md:w-1/2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Your blog title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2 w-full md:w-1/2">
                            <Label htmlFor="date">Date</Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !selectedDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            setSelectedDate(date)
                                            setOpen(false)
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="blog">Blog</Label>
                        <div className="rounded-md overflow-hidden border border-input">
                            <MDEditor
                                value={blog}
                                onChange={(val) => setBlog(val || '')}
                                previewOptions={{
                                    remarkPlugins,
                                }}
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col md:flex-row items-center justify-end gap-2 px-4 md:px-6">
                    <Input
                        placeholder="Secret"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        className="w-full md:w-32"
                    />
                    <Button
                        onClick={saveStory}
                        disabled={saving || !allFieldsFilled}
                        className="w-full md:w-auto"
                    >
                        {saving ? 'Saving...' : 'Save Story'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
