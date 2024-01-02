import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";

export const metadata: Metadata = {
  title: "My App Post",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
