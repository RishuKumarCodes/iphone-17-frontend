import { useRef } from "react";
import Spline from "@splinetool/react-spline";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <Spline scene="https://prod.spline.design/HpuSujPH2sh-dHQp/scene.splinecode" />
      <p className="font-bold text-7xl absolute bottom-[15%] md:hidden">
        iphone 17.
      </p>

      <div className="absolute bottom-0 z-50 right-0 bg-white/50 p-4 px-6 rounded-full mb-3 mx-4 backdrop-blur-xl flex items-center gap-4  md:w-[400px]">
        <p className="font-bold md:block">
          From ₹82900.00* or ₹12983.00/mo. for 6 mo.
        </p>
        <div className="bg-blue-600 text-white rounded-full p-2 px-6 ">buy</div>
      </div>
    </section>
  );
};

export default HeroSection;
