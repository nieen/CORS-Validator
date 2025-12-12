import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tool Set",
  description: "专业的工具集，支持多种功能和特性 | Professional tool set with multiple functions and features",
  keywords: "工具集, 工具, Tool Set, Tools",
  authors: [{ name: "Tool Set Team" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-theme flex`}
      >
        {/* 新的 Zustand 状态管理不需要 Provider 包装 */}
        <Sidebar />
        <main className="flex-1 md:ml-0 transition-theme">
          {children}
        </main>
      </body>
    </html>
  );
}