import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import './globals.css';
import Providers from './providers';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sofit App',
  description: 'Get to know your body!'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Head>
          <link rel="favicon" href="/favicon.ico" />
        </Head>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
