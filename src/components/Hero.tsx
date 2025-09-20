import { useRef } from "react";
import Spline from "@splinetool/react-spline";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <Spline scene="https://prod.spline.design/HpuSujPH2sh-dHQp/scene.splinecode" />
    </section>
  );
};

export default HeroSection;
