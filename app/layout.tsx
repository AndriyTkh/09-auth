import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import "./global.css"
import AuthProvider from '@/components/AuthProvider/AuthProvider';

export const metadata: Metadata = {
  title: "NoteHub – Manage Your Notes Easily",
  description: "NoteHub is a modern note-taking app with search, filtering, and more.",
  openGraph: {
    title: "NoteHub – Manage Your Notes Easily",
    description: "NoteHub is a modern note-taking app with search, filtering, and more.",
    url: "https://08-zustand-xi-dun.vercel.app/", // what sould be here?
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview image",
      },
    ],
  },
};

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],    
  variable: "--font-roboto", 
  display: "swap",       
});

type RootLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({
  children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}{modal}</main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
