"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LinkedinIcon } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
    const router = useRouter()

    return (
        <header className="w-full py-4">
            <nav className="w-full px-4 md:px-12 lg:px-[20%] py-3 flex md:flex-row items-center justify-between gap-3 md:gap-0">
                {/* Left: Logo / Name */}
                <div className="flex items-center gap-2">
                    ✦
                    <Button
                        variant="ghost"
                        aria-label="Home"
                        className="cursor-pointer text-base font-semibold px-2"
                        onClick={() => router.push("/")}
                    >
                        <span className="block md:hidden">ShA</span>
                        <span className="hidden md:block">Shoxruh Abdumannobov</span>
                    </Button>
                </div>

                {/* Right: Links */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        aria-label="About"
                        className="cursor-pointer"
                        onClick={() => router.push("/about")}
                    >
                        About
                    </Button>

                    <Link
                        href="https://www.linkedin.com/in/shoxruh-abdumannobov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <LinkedinIcon size={20} />
                    </Link>

                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}
