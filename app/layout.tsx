import type { Metadata } from "next";
import "./globals.css";

import { Nunito } from "next/font/google";
import { Navbar } from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";

import LoginModel from "./components/models/LoginModel";
import RegisterModel from "./components/models/RegisterModel";
import RentModel from "./components/models/RentModel";

import ToasterProvider from "./providers/ToasterProvider";
import { getCurrentUser } from "./actions/getCurrentUser";

export const metadata: Metadata = {
  title: "Your Hotel!",
  description: "The best hotel in the world! 🏨",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModel />
          <LoginModel />
          <RentModel />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
