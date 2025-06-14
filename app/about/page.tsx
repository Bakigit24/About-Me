import type { Metadata } from "next";

import { showCurrentAge } from "@/lib/myage";

export const metadata: Metadata = {
    title: 'Shoxruh Abdumannobov',
    description: 'An overview of my journey, projects, and contributions in software development and AI',
    openGraph: {
        title: 'Shoxruh Abdumannobov | Portfolio',
        description: 'Explore my projects, technical writing, startups, and AI-powered innovations.',
        images: [
            {
                url: '/about/opengraph-image',
            },
        ],
    },
};


export default function About() {
    return (
        <main className="px-4 sm:px-6 md:px-12 lg:px-[15%] xl:px-[20%] py-12 space-y-16">
            {/* Header */}
            <section className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary">About</h1>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    I’m a <strong className="text-primary">{showCurrentAge()} year old developer</strong> and future tech entrepreneur from Uzbekistan. I started learning IT at just <strong>12 years old</strong>, driven by a deep desire to build meaningful digital tools that help people.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    Since then, I’ve completed over <strong className="text-primary">500 projects</strong> — ranging from basic websites to full-stack applications. I’ve participated in <strong className="text-primary">30+ team projects</strong> across schools, IT centers, and remote teams, and successfully led <strong>10+ major projects</strong> with a team I built through persistence and leadership.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    I started with frontend development and expanded to backend with Python. I’ve built AI-powered apps like <strong className="text-primary">OneTime</strong>, and I’m currently building a <strong className="text-primary">multifunctional AI API platform</strong> that includes grammar correction, sentiment analysis, CEFR detection, and more.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    In 9th grade, I taught JavaScript to younger students for 5 months, sharing practical coding knowledge. I’ve actively attended <strong>INSIGHTS sessions</strong> and other learning opportunities to stay in sync with global tech trends.
                </p>
            </section>

            {/* Personal Journey */}
            <section className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Personal Journey</h2>

                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    I’ve worked in diverse environments — from small classroom teams to local IT centers and global remote teams. I faced many failures forming teams but eventually succeeded, developing leadership, communication, and team-building skills.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    My learning isn’t limited to code. I study product design, AI, psychology, leadership, productivity, and marketing. I believe real innovation happens at the intersection of these skills.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    I mentor others through 1-on-1 guidance, group sessions, and informal support. I’ve led peer groups and love seeing others grow through collaboration and shared learning.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    For personal growth, I read books like <em>Atomic Habits</em>, <em>Deep Work</em>, and <em>Show Your Work</em>. I journal regularly to reflect on progress, refine strategies, and improve both technically and emotionally.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    I’m proud of projects like <strong className="text-primary">OneTime</strong> — an AI-powered time capsule app — and my AI API platform that helps developers build smarter apps faster.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    My mission is to launch a startup that solves everyday problems with thoughtful, AI-enhanced tools that are accessible, scalable, and emotionally intelligent.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    Whether it’s 1 AM coding or leading team calls, I stay focused on my goal: <strong className="text-primary">To build tools that inspire, empower, and truly make a difference.</strong>
                </p>
            </section>

            {/* Technical Contributions */}
            <section className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Technical Contributions</h2>
                <ul className="space-y-4 list-disc list-inside text-lg md:text-xl text-muted-foreground">
                    <li>
                        Built <strong className="text-primary">OneTime</strong> — an emotional time capsule messaging app using AI for text analysis.
                    </li>
                    <li>
                        Developing a robust <strong className="text-primary">AI API platform</strong> for developers: grammar correction, summarization, tone analysis, emotion detection, and more.
                    </li>
                    <li>
                        Completed <strong className="text-primary">500+ projects</strong> using React, Next.js, TypeScript, Tailwind, and Python.
                    </li>
                    <li>
                        Designed clean, user-centered <strong className="text-primary">UI/UX interfaces</strong> focused on clarity, emotion, and responsiveness.
                    </li>
                    <li>
                        Built multiple real-time apps and REST APIs from scratch.
                    </li>
                </ul>
            </section>
        </main>
    );
}