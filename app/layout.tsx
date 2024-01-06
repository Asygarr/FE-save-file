"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const disableNavbar = ["/login", "/register", "/"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <ReactQueryProvider>
        <html lang="en">
          <body>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
          </body>
        </html>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
