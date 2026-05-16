import { useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import MarqueeStrip from './components/sections/MarqueeStrip';
import Work from './components/sections/Work';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import BlogIndex from './components/BlogIndex';
import BlogPost from './components/BlogPost';
import { posts } from './content/posts';
import { applySeo, getSeoForUrl } from './lib/seo';

const parseBlogSlug = (pathname: string): string | null => {
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/);
  return match ? match[1] : null;
};

const isBlogIndexPath = (pathname: string): boolean =>
  pathname.replace(/\/+$/, '') === '/blog';

const Home = () => {
  useEffect(() => {
    applySeo(getSeoForUrl('/'));
  }, []);

  return (
    <>
      <LoadingScreen />
      <div className="bg-gray-200 text-black min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <MarqueeStrip />
          <Work />
          <Services />
          <Process />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

type AppProps = { url?: string };

const App = ({ url }: AppProps = {}) => {
  const pathname =
    url ?? (typeof window !== 'undefined' ? window.location.pathname : '/');

  const blogSlug = parseBlogSlug(pathname);
  if (blogSlug) {
    const post = posts.find((p) => p.slug === blogSlug);
    if (post) return <BlogPost post={post} />;
  }

  if (isBlogIndexPath(pathname)) return <BlogIndex />;

  return <Home />;
};

export default App;
