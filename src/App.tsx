import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import MarqueeStrip from './components/sections/MarqueeStrip';
import IpadShowcase from './components/sections/IpadShowcase';
import Work from './components/sections/Work';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import BlogIndex from './components/BlogIndex';
import BlogPost from './components/BlogPost';
import { posts } from './content/posts';

const getParams = (): URLSearchParams => {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
};

const isEmbedded = (): boolean => {
  const params = getParams();
  if (params.has('embed')) return true;
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};

const RecordingIpad = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-white p-8 lg:p-16">
    <div className="ipad-frame">
      <span className="ipad-camera" aria-hidden />
      <div className="ipad-screen">
        <iframe
          src="/?embed=1"
          title="Bug Bakery recording"
          className="w-full h-full border-0 bg-gray-200"
        />
      </div>
    </div>
  </div>
);

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
  const params = getParams();
  if (params.get('recording') === 'ipad') return <RecordingIpad />;

  const blogSlug = getBlogSlug();
  if (blogSlug) {
    const post = posts.find((p) => p.slug === blogSlug);
    if (post) return <BlogPost post={post} />;
  }

  if (isBlogIndex()) return <BlogIndex />;

  const embed = isEmbedded();

  return (
    <>
      <LoadingScreen />
      <div className="bg-gray-200 text-black min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <MarqueeStrip />
          {!embed && <IpadShowcase />}
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
