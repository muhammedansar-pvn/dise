import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Darul Irshad School of Excellence | DISE',
  description: 'Darul Irshad School of Excellence (DISE) - A premier Islamic educational institution blending values with academic excellence. Offering an 8-year comprehensive integration of Islamic knowledge and university degrees.',
  keywords: ['DISE', 'Darul Irshad', 'School of Excellence', 'Islamic School', 'Kerala State Curriculum', 'Integrated Degree', 'Islamic Education Kuttippala'],
  authors: [{ name: 'Darul Irshad School of Excellence' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
