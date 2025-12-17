import type { Metadata, Viewport } from "next";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sales Projection for Rituva - Dashboard",
  description: "Professional sales projection dashboard showing 2025 annual projections",
  keywords: ["sales", "dashboard", "projection", "rituva"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        {children}
      </body>
    </html>
  );
}

