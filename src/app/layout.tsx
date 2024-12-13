import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components/ui/provider";

const inter = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Pilter | World Largest AI Platform",
  description:
    "Spark your creativity by exploring over 1,000 similar images inspired by your idea and others' work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${inter.variable} antialiased `}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
