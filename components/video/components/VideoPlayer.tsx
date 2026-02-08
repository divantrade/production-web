export default function VideoPlayer({
  src = "/videos/hero.mp4",
  poster = "/images/hero.jpg",
  autoPlay = true,
  muted = true,
  loop = true,
}: {
  src?: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        poster={poster}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}