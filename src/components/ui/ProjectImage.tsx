import { useState } from 'react';

type Props = {
  primary: string;
  fallback: string;
  alt: string;
  fallbackGradient: string;
};

const ProjectImage = ({ primary, fallback, alt, fallbackGradient }: Props) => {
  const [src, setSrc] = useState(primary);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient}`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (src === primary) {
          setSrc(fallback);
        } else {
          setFailed(true);
        }
      }}
      className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
    />
  );
};

export default ProjectImage;
