import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Agrani Model High School & College | অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজ',
  description: 'Complete, modern, and production-oriented School & College Management System from Play Group to Class 12.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="antialiased flex flex-col min-h-screen">
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
