import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { FolderContextProvider } from '@/contexts/FolderContext';
import Footer from '@/components/common/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FolderContextProvider>
      <Component {...pageProps} />;
      <Footer />
    </FolderContextProvider>
  );
}
