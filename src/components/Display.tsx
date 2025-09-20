import React, { useRef, useEffect, useState } from "react";

const Display: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Play video when in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => console.error(err));
          }
        });
      },
      { threshold: 0.5 } // play when 50% visible
    );

    observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
    };
  }, [isMobile]);

  // Pause video at the end, keeping last frame
  const handleEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = video.duration; // keep last frame
    }
  };

  return (
    <div className="w-full text-center mt-40 md:mt-60">
      <p className="text-3xl md:text-5xl font-semibold max-w-4xl text-left p-10">
        Brighter display, now with ProMotion up to 120Hz. Durable Ceramic Shield
        2 front with 3x better scratch resistance.
      </p>

      {isMobile ? (
        <img
          src="/display_sm.jpg"
          alt="Display"
          className="w-full h-auto"
        />
      ) : (
        <video
          ref={videoRef}
          src="/display.mp4"
          className="w-full h-auto"
          onEnded={handleEnded}
          muted
          playsInline
          preload="auto"
        />
      )}
    </div>
  );
};

export default Display;
