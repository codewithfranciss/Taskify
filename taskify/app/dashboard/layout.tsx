
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
const inter = JetBrains_Mono({ subsets: ["latin"] });

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  </div>
  );
}
