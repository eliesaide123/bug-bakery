import Marquee from '@/components/ui/Marquee';

const MarqueeStrip = () => {
  return (
    <div className="border-y border-black/10 bg-black text-white overflow-hidden">
      <Marquee
        speedSec={45}
        items={[
          'Web apps',
          'Mobile apps',
          'Desktop software',
          'AI & LLMs',
          'Backend & APIs',
          'Bug fixes',
          '1,000+ happy clients',
        ]}
      />
    </div>
  );
};

export default MarqueeStrip;
