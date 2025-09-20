import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CameraSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !imageRef.current ||
      !textRef.current ||
      !headingRef.current ||
      !subHeadingRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.fromTo(
      headingRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        subHeadingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        textRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-8 mx-auto text-center">
          <p
            ref={headingRef}
            className="!text-2xl font-bold mb-4 text-gray-900"
          >
            Design.
          </p>
          <p
            ref={subHeadingRef}
            className="text-4xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-green-500"
          >
            All 48MP rear cameras. <br /> An evolution in resolution.
          </p>
          <p
            ref={textRef}
            className="text-gray-500 font-semibold text-sm md:text-lg lg:text-md leading-relaxed"
          >
            iPhone 17 has a 48MP Fusion Main camera with a 2x optical-quality
            telephoto and a{" "}
            <span className="text-black">
              48MP Fusion Ultra Wide camera with 4x the resolution
            </span>{" "}
            of the Ultra Wide camera on iPhone 16. And now, Ultra Wide photos
            are 24MP by default, the perfect file size for high-quality storing
            and sharing. So you’ll get stunning, super-high-resolution shots —
            up close or far away, indoors and out, in conditions that go from
            bright to low light. And at 256GB, it has{" "}
            <span className="text-black">double the starting storage</span> of
            the previous model. So you can capture to your heart’s content — and
            beyond. You can see and do more of everything you love on a 15.93 cm
            (6.3″) Super Retina XDR display. And enjoy, with an adaptive refresh
            rate up to 120Hz. Take it for a spin.
          </p>
        </div>

        <div className="flex justify-center mt-12">
          <img
            ref={imageRef}
            src="/camera.jpg"
            alt="iPhone Camera"
            className="w-4xl max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default CameraSection;
