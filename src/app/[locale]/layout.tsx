import { NextIntlClientProvider } from "next-intl";
import { Providers } from "@/redux/provider";
import { notFound } from "next/navigation";

import "./globals.css";
import { GoogleAnalytics } from "./GoogleAnalytics";

export const metadata = {
  title: "Fuxi",
  description: "I Ching oracle reading powered by GPT-4",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ch" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no"
      ></meta>
      <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_GA_TRACKING_ID} />
      <Providers>
        <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </Providers>
    </html>
  );
}
