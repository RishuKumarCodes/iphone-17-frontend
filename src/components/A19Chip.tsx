import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const A19Chip: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const headingRef1 = useRef<HTMLParagraphElement>(null);
  const subHeadingRef1 = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const headingRef2 = useRef<HTMLParagraphElement>(null);
  const subHeadingRef2 = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headingRef1.current ||
      !subHeadingRef1.current ||
      !textRef.current ||
      !headingRef2.current ||
      !subHeadingRef2.current
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
      headingRef1.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        subHeadingRef1.current,
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
        headingRef2.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        subHeadingRef2.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mb-12 text-center">
          <p ref={headingRef1} className="text-xl font-bold mb-4 text-gray-900">
            A19 chip. All-day battery life.
          </p>
          <p
            ref={subHeadingRef1}
            className="text-4xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-green-500"
          >
            Power player. <br /> Energy expert.
          </p>
        </div>

        <div className="my-20">
          <video
            src="/performance.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full"
          />
        </div>

        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center">
          <p
            ref={textRef}
            className="text-gray-500 font-semibold text-base md:text-lg leading-relaxed max-w-xl"
          >
            The A19 chip{" "}
            <span className="text-black">
              powers everything you do on iPhone,
            </span>{" "}
            including Apple Intelligence features like Live Translation and
            Image Playground, and ProMotion for playing advanced AAA games. And
            with <span className="text-black">all-day battery life,</span> you
            can work, watch and wander with no worries. If you need a quick
            top-up,{" "}
            <span className="text-black">
              just 10 minutes of charge gives you up to 8 hours of video
              playback
            </span>{" "}
            with a high-wattage adapter.7
          </p>

          {/* Right block */}
          <div className="text-center">
            <p
              ref={headingRef2}
              className="text-lg font-bold mb-2 text-gray-900"
            >
              up to
            </p>
            <p
              ref={subHeadingRef2}
              className="text-2xl lg:text-3xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-green-500"
            >
              50% charge in <br /> 20 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default A19Chip;
