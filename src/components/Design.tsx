import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ConfigOption {
  id: string;
  title: string;
  description?: string;
  options?: string[];
  colors?: string[];
  expanded: boolean;
}

const IPhoneConfigurator: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState("lavender");
  const [selectedOption, setSelectedOption] = useState("default");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const colorOptions = [
    { name: "lavender", bg: "bg-purple-300", color: "#DFCEEA" },
    { name: "green", bg: "bg-green-300", color: "#A9B689" },
    { name: "blue", bg: "bg-blue-300", color: "#96AED1" },
    { name: "white", bg: "bg-gray-200", color: "#F5F5F5" },
    { name: "black", bg: "bg-gray-800", color: "#353839" },
  ];

  const [configSections, setConfigSections] = useState<ConfigOption[]>([
    {
      id: "colors",
      title: "Colours",
      expanded: false,
    },
    {
      id: "display",
      title: "Display",
      expanded: false,
    },
    {
      id: "ceramic",
      title: "Ceramic Shield 2 front",
      expanded: false,
    },
    {
      id: "camera",
      title: "Camera Control",
      expanded: false,
    },
    {
      id: "action",
      title: "Action button",
      expanded: false,
    },
    {
      id: "dynamic",
      title: "Dynamic Island",
      expanded: false,
    },
  ]);

  const getSectionContent = (sectionId: string, isExpanded: boolean) => {
    const content = {
      colors: {
        collapsed: "Colours",
        expanded:
          "Choose from five gorgeous finishes. iPhone 17 shown in " +
          selectedColor.charAt(0).toUpperCase() +
          selectedColor.slice(1) +
          ".",
      },
      display: {
        collapsed: "Display",
        expanded:
          '6.9" Super Retina XDR display with ProMotion technology and Always-On display.',
      },
      ceramic: {
        collapsed: "Ceramic Shield 2 front",
        expanded:
          "Ceramic Shield 2 front. Tougher than any smartphone glass with advanced protection.",
      },
      camera: {
        collapsed: "Camera Control",
        expanded:
          "Camera Control. Press to launch Camera, press and hold to record video.",
      },
      action: {
        collapsed: "Action button",
        expanded:
          "Action button. Customizable button for your most-used features and shortcuts.",
      },
      dynamic: {
        collapsed: "Dynamic Island",
        expanded:
          "Dynamic Island. Interactive area that adapts to show alerts, notifications, and activities.",
      },
    };

    return (
      content[sectionId as keyof typeof content] || {
        collapsed: sectionId,
        expanded: sectionId,
      }
    );
  };

  const getImagePath = (color: string, option: string) => {
    if (option === "default" || option.includes("color")) {
      const colorMap = {
        lavender: "lavendar.jpg",
        green: "sage.jpg",
        blue: "mist_blue.jpg",
        white: "white.jpg",
        black: "black.jpg",
      };
      return `/design/iphone_colors/${
        colorMap[color as keyof typeof colorMap]
      }`;
    }

    const optionMap = {
      "camera-focused": "camera_control.jpg",
      "action-highlighted": "actionButton.png",
      "ceramic-shield": "ceramic_shield.jpg",
      "display-enhanced": "display.png",
      "dynamic-active": "dynamic_island.jpg",
    };

    return `/design/${
      optionMap[option as keyof typeof optionMap] ||
      "iphone_colors/lavendar.jpg"
    }`;
  };

  const handleColorChange = (colorName: string) => {
    if (selectedColor === colorName) return;

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          setSelectedColor(colorName);
          gsap.to(imageRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    }
  };

  const handleOptionChange = (sectionId: string) => {
    if (sectionId === "colors") return;

    const newOption =
      sectionId === "camera"
        ? "camera-focused"
        : sectionId === "action"
        ? "action-highlighted"
        : sectionId === "dynamic"
        ? "dynamic-active"
        : sectionId === "display"
        ? "display-enhanced"
        : sectionId === "ceramic"
        ? "ceramic-shield"
        : "default";

    if (selectedOption === newOption) return;

    // Swipe animation for option change
    if (imageRef.current) {
      const direction = Math.random() > 0.5 ? 1 : -1; // Random left or right

      gsap.to(imageRef.current, {
        x: direction * 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setSelectedOption(newOption);
          gsap.set(imageRef.current, { x: -direction * 100 });
          gsap.to(imageRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    }
  };

  const toggleSection = (sectionId: string) => {
    const section = sectionsRef.current[sectionId];
    if (!section) return;

    if (expandedSection === sectionId) {
      gsap.to(section.querySelector(".section-content"), {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setExpandedSection(null);
    } else {
      if (expandedSection) {
        const openSection = sectionsRef.current[expandedSection];
        if (openSection) {
          gsap.to(openSection.querySelector(".section-content"), {
            height: 0,
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
          });
        }
      }

      // Expand new section
      const content = section.querySelector(".section-content");
      if (content) {
        gsap.set(content, { height: "auto" });
        const height = content.offsetHeight;
        gsap.set(content, { height: 0, opacity: 0 });
        gsap.to(content, {
          height: height,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
        });
      }
      setExpandedSection(sectionId);

      // Reset selectedOption when going back to colors
      if (sectionId === "colors") {
        setSelectedOption("default");
      } else {
        // Trigger option change with swipe animation
        handleOptionChange(sectionId);
      }
    }

    // Update config sections
    setConfigSections((prev) =>
      prev.map((section) => ({
        ...section,
        expanded: section.id === sectionId ? !section.expanded : false,
      }))
    );
  };

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    }

    Object.values(sectionsRef.current).forEach((section, index) => {
      if (section) {
        const content = section.querySelector(".section-content");
        if (content) {
          gsap.set(content, { height: 0, opacity: 0 });
        }

        gsap.fromTo(
          section,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
          }
        );
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 mt-40 md:mt-60">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mb-8">
          <p className="!text-2xl font-bold mb-4 text-gray-900">Design.</p>
          <p className="text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-green-500">
            Even more delightful. <br /> Even more durable.
          </p>
          <p className="text-gray-500 font-semibold text-lg lg:text-md leading-relaxed">
            Meet the new iPhone 17. Designed with contoured edges, thinner
            borders and durable materials like Ceramic Shield 2 on the front, it{" "}
            <span className="text-black">looks — and stays — beautiful.</span>
            You can see and do more of everything you love on a 15.93 cm (6.3″)
            Super Retina XDR display. And enjoy{" "}
            <span className="text-black">
              smoother scrolling and more immersive gaming with ProMotion
            </span>
            , with an adaptive refresh rate up to 120Hz. Take it for a spin.
          </p>
        </div>
        <div className="relative flex flex-col lg:flex-row justify-evenly gap-8 lg:gap-12 mt-20">
          {/* Left Panel */}
          <div className="space-y-3 w-sm lg:absolute top-0 left-0 h-full z-50">
            {configSections.map((section) => (
              <div
                key={section.id}
                ref={(el) => (sectionsRef.current[section.id] = el)}
                className="bg-gray-200 rounded-2xl overflow-hidden"
              >
                <div
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 text-left flex items-center justify-between bg-gray-200 transition-colors duration-200 font-semibold"
                >
                  {getSectionContent(section.id, true).collapsed}
                </div>

                <div className="section-content overflow-hidden bg-gray-200">
                  <div className="p-4 pt-0">
                    {section.id === "colors" ? (
                      <div className="flex space-x-4">
                        {colorOptions.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => handleColorChange(color.name)}
                            className={`w-12 h-12 mt-4 rounded-full border-4 transition-all duration-300 ${
                              selectedColor === color.name
                                ? "border-black shadow-lg"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color.color }}
                            aria-label={`Select ${color.name} color`}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {getSectionContent(section.id, true).expanded}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel*/}
          <div className="flex items-center justify-center h-[500px] lg:min-w-[800px] ml-auto relative">
            <div className="relative h-[100%] bg-amber- 100">
              <img
                ref={imageRef}
                src={getImagePath(selectedColor, selectedOption)}
                alt={`iPhone 17 in ${selectedColor}`}
                className="h-full object-cover object-center flex-1"
                onError={(e) => {
                  console.log(
                    "Image not found:",
                    getImagePath(selectedColor, selectedOption)
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPhoneConfigurator;
