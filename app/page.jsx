import PartnersCarousel from "./components/Partners";
import TestimonialCarousel from "./components/Testimonials";

const HomePage = () => {
  return (
    <main>
      <video
        src={"/videos/home.mp4"}
        playsInline
        muted
        autoPlay
        loop
        preload="auto"
        className="min-w-full min-h-full h-screen object-contain lg:object-cover"
      />
      <PartnersCarousel />
      <TestimonialCarousel />
    </main>
  );
};

export default HomePage;
