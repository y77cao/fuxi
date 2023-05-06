import "./globals.css";
import { Providers } from "@/redux/provider";

export const metadata = {
  title: "Fuxi",
  description: "I Ching oracle reading powered by GPT-4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
