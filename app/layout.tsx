import { NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";

import { GeistSans } from "geist/font/sans";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Clinic Management App</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className="bg-background text-foreground lightdark"
        suppressHydrationWarning
      >
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
