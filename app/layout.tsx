import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LEE DONGGYU | Editorial Motion Portfolio',
  description: 'Interactive typography 중심의 포트폴리오'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
