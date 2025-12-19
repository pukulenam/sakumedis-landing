import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "SakuMedis - Informasi Klinis Tepat, Siap di Genggaman",
  description: "SakuMedis adalah aplikasi referensi dan perhitungan klinis yang dirancang untuk mendukung praktik dokter dan tenaga medis. Aplikasi ini menyediakan informasi klinis yang ringkas, akurat, dan mudah diakses, sehingga dapat digunakan secara praktis dalam berbagai situasi praktik sehari-hari.",
  keywords: "sakumedis, dosis obat, kalkulator dosis, interaksi obat, aplikasi medis, tenaga kesehatan, kalkulator klinis, puyer, database obat",
  authors: [{ name: "PT. Bangun Pukul Enam" }],
  openGraph: {
    title: "SakuMedis - Informasi Klinis Tepat, Siap di Genggaman",
    description: "SakuMedis adalah aplikasi referensi dan perhitungan klinis yang dirancang untuk mendukung praktik dokter dan tenaga medis. Aplikasi ini menyediakan informasi klinis yang ringkas, akurat, dan mudah diakses.",
    url: "https://sakumedis.id",
    siteName: "SakuMedis",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Google Fonts - Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${figtree.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
