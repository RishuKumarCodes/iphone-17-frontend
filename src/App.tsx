import HeroSection from "./components/Hero";
import Navigation from "./components/Navbar";
import CameraSection from "./components/Camera";
import DesignSection from "./components/Design";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Display from "./components/Display";
import A19Chip from "./components/A19Chip";

const iPhone17Website: React.FC = () => {
  return (
    <>
      <div
        className={`relative min-h-screen w-[100vw] max-w-[100vw] !overflow-x-hidden `}
      >
        <Navigation />
        <Preloader />
        <HeroSection />
        <Display />
        <DesignSection />
        <CameraSection />
        <A19Chip />
        <Footer />
      </div>
    </>
  );
};

export default iPhone17Website;
