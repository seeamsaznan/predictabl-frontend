// app/layout.tsx
// This is the root layout file -- the outermost shell of the entire app.
// Every page in Predictabl is rendered inside this layout.
// It sets up the global font, background color, sidebar navigation,
// and the main content area that pages get rendered into.

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

// Metadata is a Next.js feature that sets the browser tab title
// and description for SEO purposes.
export const metadata: Metadata = {
  title: "Predictabl",
  description: "Community-driven predictive score market. Predict game scores, join pools, win tokens.",
};

// RootLayout receives {children} which represents whichever page
// the user is currently visiting. Next.js injects this automatically.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-dark text-brand-white min-h-screen">

        {/* The main app container uses flexbox to place the sidebar
            on the left and the content area on the right, side by side */}
        <div className="flex min-h-screen">

          {/* Sidebar sits on the left and stays fixed while pages scroll.
              It contains the logo, navigation links, and token balance. */}
          <Sidebar />

          {/* The right side takes up all remaining space.
              It stacks the header on top and the page content below. */}
          <div className="flex flex-col flex-1 min-w-0">

            {/* Header sits at the top of every page.
                It shows the page title and token balance on desktop. */}
            <Header />

            {/* Main content area -- this is where each page renders.
                padding gives breathing room around the page content. */}
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>

          </div>
        </div>

      </body>
    </html>
  );
}