import StoreProvider from "./storeProvider";
import { Header } from "./ui/header";
import { montserrat } from "./ui/fonts";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={`${montserrat.className}`}>
          <Header />
          <main>{children}</main>
        </body>
      </StoreProvider>
    </html>
  );
}
