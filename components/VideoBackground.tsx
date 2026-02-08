'use client';

import { useEffect, useRef } from 'react';
import { VideoProps } from '@/types';

export default function VideoBackground({
  src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video && autoPlay) {
      video.play().catch((error) => {
        console.log('Auto-play was prevented:', error);
      });
    }
  }, [autoPlay]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        poster={poster}
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}