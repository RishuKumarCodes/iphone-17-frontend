import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    featuresRef.current.forEach((feature, index) => {
      if (feature) {
        gsap.fromTo(
          feature,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2,
          }
        );
      }
    });
  }, []);

  const features = [
    {
      title: "A18 Pro Chip",
      description:
        "The most powerful chip in a smartphone. Built for Apple Intelligence.",
      icon: "⚡",
    },
    {
      title: "Camera Control",
      description:
        "Get your perfect shot faster than ever with the new Camera Control.",
      icon: "📸",
    },
    {
      title: "Action Button",
      description: "Do more with less effort. Customize your Action Button.",
      icon: "⚙️",
    },
    {
      title: "All-Day Battery",
      description:
        "Up to 33 hours of video playback with intelligent power management.",
      icon: "🔋",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-thin text-gray-900 mb-4">
            Built for what's next
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            iPhone 17 brings together cutting-edge technology and intuitive
            design
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featuresRef.current[index] = el!)}
              className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
