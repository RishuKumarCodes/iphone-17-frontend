import React, { useEffect, useRef, useState } from "react";

interface PreloaderProps {
  onFinish?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress (fast)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 300);
          return 100;
        }
        return prev + Math.random() * 8 + 5;
      });
    }, 35);

    return () => clearInterval(progressInterval);
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 flex items-center justify-center transition-all duration-1000 -z-50 ${
        isComplete 
          ? 'opacity-0 pointer-events-none' 
          : 'opacity-100'
      }`}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-black/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center space-y-8 z-10">
        {/* Apple Logo */}
        <div 
          ref={logoRef}
          className={`transition-all duration-700 ease-out ${
            isComplete ? 'scale-110 opacity-90' : 'scale-100 opacity-100'
          }`}
        >
          <div className="relative">
            <img 
              src="/apple.svg" 
              alt="Apple Logo" 
              className={`w-16 h-16 drop-shadow-2xl filter brightness-0 transition-all duration-1000 ${
                progress > 20 ? 'opacity-100' : 'opacity-60'
              }`}
            />
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-black/20 blur-xl scale-150 animate-pulse"></div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 space-y-4">
          {/* Progress Bar */}
          <div className="relative h-1 bg-black/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-black/60 via-black/80 to-black/60 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div 
            ref={textRef}
            className={`text-center transition-all duration-500 ${
              isComplete ? 'opacity-80 scale-105' : 'opacity-100 scale-100'
            }`}
          >
            <p className="text-black/90 text-sm font-light tracking-widest mb-1">
              {isComplete ? 'Welcome' : 'Loading iPhone 17...'}
            </p>
            <p className="text-black/50 text-xs font-light">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        {/* Floating dots animation */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-black/30 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.4s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-100/20"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(0,0,0,0.05) 100%)'
        }}
      />
    </div>
  );
};

export default Preloader;