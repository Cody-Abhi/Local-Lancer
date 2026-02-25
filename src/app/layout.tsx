import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LucknowConnect | Geo-Targeted Freelance Marketplace',
  description: 'Connect with local freelancers and clients in Lucknow with AI-powered matching and secure escrow payments.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#10111A" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}