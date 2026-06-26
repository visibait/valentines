import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Card Game",
  description:
    "Complete the collection !",
  keywords: [
    "card game",
    "romantic proposal game",
    "photo card challenge",
    "surprise",
    "couples game",
    "game",
    "proposal game",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
