import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
const inter = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taskify",
  description: "Task Manager for Student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <main></main>
        <Toaster />
      </body>
      

    </html>
  );
}
