import PartnersCarousel from "./components/Partners";
import TestimonialCarousel from "./components/Testimonials";

const HomePage = () => {
  return (
    <main>
      <video
        src={
          "https://bartergram-static-bucket.s3.ap-south-1.amazonaws.com/videos/home.mp4"
        }
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
