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

const getBlogSlug = (): string | null => {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname;
  const match = path.match(/^\/blog\/([^/]+)\/?$/);
  return match ? match[1] : null;
};

const isBlogIndex = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.replace(/\/+$/, '');
  return path === '/blog';
};

const App = () => {
  const blogSlug = getBlogSlug();
  if (blogSlug) {
    const post = posts.find((p) => p.slug === blogSlug);
    if (post) return <BlogPost post={post} />;
  }

  if (isBlogIndex()) return <BlogIndex />;

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

export default App;
