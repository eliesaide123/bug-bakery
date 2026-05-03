type Props = {
  items: string[];
  reverse?: boolean;
  speedSec?: number;
};

const Marquee = ({ items, reverse = false, speedSec = 40 }: Props) => {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`marquee-track flex items-center gap-16 py-8 ${
          reverse ? 'marquee-reverse' : ''
        }`}
        style={{ animationDuration: `${speedSec}s` }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="text-3xl md:text-5xl font-bold tracking-tight whitespace-nowrap flex items-center gap-16"
          >
            {item}
            <span aria-hidden className="opacity-30 text-2xl">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
