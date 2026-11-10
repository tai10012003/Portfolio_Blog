import type { Metadata } from "next";
import "./globals.css";
import { themeInitializationScript } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Pham Duc Tai — Portfolio & Blog",
  description: "Website cá nhân của Pham Duc Tai: dự án, hành trình làm Developer và những ghi chép về lập trình.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
