import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-context";
import { I18nProvider } from "./i18n-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CORS Validator - 专业的跨域资源共享配置验证工具 | Professional CORS Configuration Validation Tool",
  description: "专业的跨域资源共享(CORS)配置验证工具，支持多种HTTP方法、智能响应解析、主题切换等功能 | Professional Cross-Origin Resource Sharing (CORS) configuration validation tool with multiple HTTP methods, intelligent response parsing, theme switching and more",
  keywords: "CORS, 跨域, 验证工具, API测试, HTTP请求, Cross-Origin, Validation Tool, API Testing, HTTP Request",
  authors: [{ name: "CORS Validator Team" }],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-theme`}
      >
        <I18nProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
