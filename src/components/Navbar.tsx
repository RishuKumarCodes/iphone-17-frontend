import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Navigation: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-3xl mx-auto p-1.5 pl-4 </div> bg-white/50 backdrop-blur-xl m-4 rounded-full border border-white  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8 text-black font-semibold text-xl gap-2">
            <img src="/apple.svg" className="h-5" alt="" />
            iPhone 17
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/60 hover:bg-black text-black hover:text-white px-6 py-1.5 rounded-full transition-colors cursor-pointer">
              Explore
            </div>
            <div className="bg-black hover:bg-black/80 text-white px-6 py-1.5 rounded-full transition-colors cursor-pointer">
              Buy
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
