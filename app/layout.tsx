import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
    title: "Shoxruh Abdumannobov's blog",
    description:
        "Shoxruh Abdumannobov is a software developer, learner of innovative web platforms, and builder of scalable AI-powered SaaS applications in the future.",
    openGraph: {
        title: "Shoxruh Abdumannobov's blog",
        description:
            "Follow the thoughts and projects of Shoxruh Abdumannobov — creator of OneTime, Apineo, Portfolio and more. Explore modern web development, AI tools, and startup building.",
        url: "https://shx404.vercel.app",
        siteName: "Shoxruh Abdumannobov's blog",
        images: ["/opengraph-image"],
    },
    metadataBase: new URL("https://shx404.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Navbar />
        {children}
        <Toaster/>
      </ThemeProvider>
      <Analytics />
      </body>
    </html>
  );
}
