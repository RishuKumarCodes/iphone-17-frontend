import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CameraSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      imageRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    ).fromTo(
      textRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <div className="aspect-square bg-gradient-to-br from-purple-400 to-blue-600 rounded-3xl flex items-center justify-center text-white text-6xl">
              📱
            </div>
          </div>
          <div ref={textRef} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900">
              Pro camera system
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Take your best photos and videos with the new 48MP Fusion camera.
              Capture stunning detail with 2x Telephoto. And get close with the
              new 13mm Ultra Wide camera.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">48MP Fusion camera</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">2x Telephoto lens</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">13mm Ultra Wide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CameraSection;
