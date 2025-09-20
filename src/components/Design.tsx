import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DesignSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate the section title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate the color cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      }
    });
  }, []);

  const colors = [
    {
      name: "Natural Titanium",
      bg: "bg-gradient-to-br from-gray-300 to-gray-500",
    },
    {
      name: "Blue Titanium",
      bg: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      name: "White Titanium",
      bg: "bg-gradient-to-br from-gray-100 to-gray-300",
    },
    {
      name: "Black Titanium",
      bg: "bg-gradient-to-br from-gray-700 to-gray-900",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-thin text-center mb-16"
        >
          Titanium. So strong. So light.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colors.map((color, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el!)}
              className="group cursor-pointer"
            >
              <div
                className={`aspect-square ${color.bg} rounded-2xl mb-4 transform group-hover:scale-105 transition-transform duration-300`}
              ></div>
              <p className="text-center text-lg font-medium">{color.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
