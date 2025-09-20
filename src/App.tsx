import HeroSection from "./components/Hero";
import FeaturesSection from "./components/Features";
import Navigation from "./components/Navbar";
import CameraSection from "./components/Camera";
import DesignSection from "./components/Design";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

const iPhone17Website: React.FC = () => {
  return (
    <>
      <div
        className={`relative min-h-screen w-[100vw] max-w-[100vw] !overflow-x-hidden `}
      >
        <Navigation />
        <Preloader />
        <HeroSection />
        <FeaturesSection />
        <CameraSection />
        <DesignSection />
        <Footer />
      </div>
    </>
  );
};

export default iPhone17Website;
