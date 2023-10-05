import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "@/context/ToasterContext";
import QueryContext from "@/context/QueryContext";
import AuthContext from "@/context/AuthContext";
import ActiveStatus from "@/components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS Chat App",
  description: "chat app built with nextjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={inter.className}>
        <QueryContext>
          <AuthContext>
            <ToasterContext />
            <ActiveStatus />
            {children}
          </AuthContext>
        </QueryContext>
      </body>
    </html>
  );
}
