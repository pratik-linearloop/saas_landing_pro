import React from 'react';
import '../styles/index.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Next.js with Tailwind CSS',
  description: 'A boilerplate project with Next.js and Tailwind CSS',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}

        <script type="module" async src="https://quality-cdn.dhiwise.com/rocket-web.js?_cfg=https%3A%2F%2Fsaaslandi8261back.dhiwise.co&_be=https%3A%2F%2Fqualityproject.dhiwise.com&_v=0.1.9" />
        <script type="module" defer src="https://quality-cdn.dhiwise.com/rocket-shot.js?v=0.0.1" /></body>
    </html>
  );
}
