import type { Metadata } from "next";
import "./globals.css";
import { Tajawal } from "next/font/google";
import { Toaster } from "sonner";
import { useTranslate } from "@/public/localization";
const t = useTranslate();
const tajawal = Tajawal({
  variable: "--font-geist-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: t("AutoLab"),
  description: t("AutoLab – The Ultimate Car Maintenance Management System"),
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tajawal.variable} antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontSize: "17px",
              padding: "14px 20px",
            },
          }}
        />
      </body>
    </html>
  );
}
