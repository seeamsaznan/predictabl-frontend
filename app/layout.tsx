// app/layout.tsx
// Root layout file updated to handle responsive margin properly.
// On desktop: sidebar is fixed on the left, content gets 240px left margin.
// On mobile: sidebar is hidden, content has no left margin.

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "Predictabl",
  description: "Community-driven predictive score market.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#0A0A0A",
          color: "#FFFFFF",
          margin: 0,
          padding: 0,
          fontFamily: "Inter, sans-serif",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        {/* Responsive layout styles */}
        <style>{`
          .desktop-sidebar {
            flex-shrink: 0;
            width: 240px;
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 100;
          }
          .main-content-area {
            margin-left: 240px;
            flex: 1;
            height: 100vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
          }
          @media (max-width: 1024px) {
            .desktop-sidebar {
              display: none;
            }
            .main-content-area {
              margin-left: 0;
              padding-bottom: 80px;
            }
          }
        `}</style>

        <div style={{ display: "flex", height: "100vh" }}>
          <div className="desktop-sidebar">
            <Sidebar />
          </div>

          <div className="main-content-area">
            <Header />
            <main style={{ flex: 1, padding: "24px" }}>
              {children}
            </main>
          </div>
        </div>

        <MobileNav />
      </body>
    </html>
  );
}