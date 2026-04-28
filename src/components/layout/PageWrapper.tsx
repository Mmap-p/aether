import StarField from '@/components/stars/StarField';
import NebulaBlobs from '@/components/stars/NebulaBlobs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <StarField />
      <NebulaBlobs />
      <Navbar />
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '64px',
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
