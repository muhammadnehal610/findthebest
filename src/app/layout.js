// app/layout.tsx
import "./globals.css"; // Global CSS
import { ThemeProvider } from "next-themes"; // Import ThemeProvider
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel with light/dark theme support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {/* Wrap the application with ThemeProvider */}
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
