import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderLayout from "@/Providers/ProviderLayout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/Providers/Providers";
import Call from "@/components/Call/Call";
import CallProvider from "@/Context/CallContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderLayout>
          <ProtectedRoute>
            <CallProvider>
              {children}
              {/* <Call /> */}
            </CallProvider>
            <Toaster position="top-center" reverseOrder={false} />
          </ProtectedRoute>
        </ProviderLayout>
      </body>
    </html>
  );
}
